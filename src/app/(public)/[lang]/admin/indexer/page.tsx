'use client';
import { useState, useEffect } from 'react';

export default function BulkIndexer() {
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  // New State for Sitemap & History Features
  const [history, setHistory] = useState<string[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [isFetchingSitemap, setIsFetchingSitemap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load history and cached access token from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('indexer_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { /* ignore */ }
    }
    const savedToken = localStorage.getItem('indexer_access_token');
    if (savedToken) {
      setAccessToken(savedToken);
      setIsAuthed(true);
    }
  }, []);

  // 1. Generate the OAuth login URL + detect redirect-back auth code
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/admin/indexer`);

    // Scopes: inspection API requires search-console AND indexing scopes
    const scope = encodeURIComponent([
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly',
    ].join(' '));

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    setAuthUrl(url);

    if (typeof window !== 'undefined') {
      setSitemapUrl(`${window.location.origin}/sitemap.xml`);

      // Pick up the one-time auth code from URL after Google redirects back
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        setAuthCode(code);
        setIsAuthed(true);
        setStatus('✅ Google account connected! You can now submit URLs.');
        // Clean code from URL bar without page reload
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const handleFetchSitemap = async () => {
    if (!sitemapUrl) return;
    setIsFetchingSitemap(true);
    setStatus('🔄 Fetching sitemap...');

    try {
      const response = await fetch(sitemapUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const locElements = xmlDoc.getElementsByTagName('loc');
      const extractedUrls: string[] = [];

      for (let i = 0; i < locElements.length; i++) {
        const text = locElements[i].textContent?.trim();
        if (text) extractedUrls.push(text);
      }

      if (extractedUrls.length === 0) {
        setStatus('❌ No <loc> URLs found. Check that this is a valid XML sitemap.');
        return;
      }

      const historySet = new Set(history);
      const newUrls = extractedUrls.filter(u => !historySet.has(u) && !u.endsWith('.xml'));
      setUrls(newUrls.join('\n'));
      setStatus(
        `✅ Sitemap fetched — ${extractedUrls.length} total URLs.\n` +
        `📋 ${newUrls.length} new (not previously submitted).\n` +
        `⏭️  Skipped ${extractedUrls.length - newUrls.length} already-submitted or .xml index URLs.`
      );
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}\n(CORS may block remote sitemaps. Try /solutions/sitemap.xml instead.)`);
    } finally {
      setIsFetchingSitemap(false);
    }
  };

  const handleClearAuth = () => {
    setAccessToken(null);
    setAuthCode(null);
    setIsAuthed(false);
    localStorage.removeItem('indexer_access_token');
    setStatus('🔓 Auth cleared. Please reconnect your Google account.');
  };

  const handleSubmit = async () => {
    if (!isAuthed && !accessToken && !authCode) {
      setStatus('❌ Please connect your Google account first!');
      return;
    }

    const urlArray = urls.split('\n').map(l => l.trim()).filter(Boolean);
    if (urlArray.length === 0) {
      setStatus('❌ No URLs to submit.');
      return;
    }

    setIsSubmitting(true);
    setStatus(`🔄 Inspecting ${urlArray.length} URLs via Google Search Console API...\n\n⚠️ Rate limited to 1 URL/sec. This will take ~${urlArray.length}s.`);

    try {
      const redirectUri = window.location.origin + '/admin/indexer';
      const res = await fetch('/api/bulk-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: urlArray,
          authCode: authCode,        // Used on first submit, then null
          accessToken: accessToken,  // Used on subsequent submits
          redirectUri,
          siteUrl: 'https://hamrolink.com/',
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Cache the access token for reuse (no re-auth needed until expiry)
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          localStorage.setItem('indexer_access_token', data.accessToken);
          setAuthCode(null); // One-time code used up — clear it
        }

        // Track inspected URLs in history
        const inspectedUrls = data.results.map((r: any) => r.url);
        const updatedHistory = Array.from(new Set([...history, ...inspectedUrls]));
        setHistory(updatedHistory);
        localStorage.setItem('indexer_history', JSON.stringify(updatedHistory));

        // Build a human-readable summary
        const passCount = data.results.filter((r: any) => r.verdict === 'PASS').length;
        const failCount = data.results.filter((r: any) => r.verdict === 'FAIL').length;
        const unknownCount = data.results.filter((r: any) => r.verdict !== 'PASS' && r.verdict !== 'FAIL').length;

        const detailLines = data.results.map((r: any) =>
          r.status === 'Failed'
            ? `❌ ${r.url}\n   Error: ${r.error}`
            : `${r.verdict === 'PASS' ? '✅' : r.verdict === 'FAIL' ? '❌' : '🔍'} ${r.url}\n   Status: ${r.coverageState} | Indexed: ${r.verdict} | Robots: ${r.robotsAllowed ? 'Allowed' : 'Blocked'} | Last crawl: ${r.lastCrawlTime ?? 'Never'}`
        ).join('\n\n');

        setStatus(
          `📊 Inspection complete for ${data.results.length} URLs:\n` +
          `   ✅ Indexed: ${passCount}  ❌ Not indexed: ${failCount}  🔍 Unknown: ${unknownCount}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━\n\n${detailLines}`
        );
      } else {
        setStatus(`❌ API Error: ${data.error}\n\nIf you see "invalid_grant", your auth code expired. Click "Re-connect Account" below.`);
        // Clear the stale access token if auth failed
        if (data.error?.includes('invalid_grant') || data.error?.includes('invalid_token')) {
          handleClearAuth();
        }
      }
    } catch (error: any) {
      setStatus(`❌ Network Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>HamroLink GSC Inspector</h1>
      <p style={{ color: '#666', marginBottom: '8px', fontSize: '14px' }}>
        Uses the real <strong>Google Search Console URL Inspection API</strong> — shows actual indexing status and triggers re-crawl requests.
      </p>
      <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '6px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#856404' }}>
        ⚠️ <strong>Note:</strong> The old "Indexing API" only works for <code>JobPosting</code>/<code>LiveBlogPosting</code> schemas and shows a fake ✅ for all other URLs. This tool uses the correct GSC Inspection API (same as the "Request Indexing" button in GSC).
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Auth */}
        <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', border: isAuthed ? '2px solid #28a745' : '1px solid #eee' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>1. Connect GSC</h2>
          {isAuthed ? (
            <>
              <p style={{ color: '#28a745', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>✅ Connected</p>
              <button onClick={handleClearAuth} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                Re-connect Account
              </button>
            </>
          ) : (
            <a href={authUrl} style={{ display: 'block', background: '#4285F4', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: '500', fontSize: '13px' }}>
              🔑 Connect Google Account
            </a>
          )}
        </div>

        {/* History */}
        <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Inspection History</h2>
          <p style={{ marginBottom: '8px', fontSize: '13px' }}><strong>{history.length}</strong> URLs inspected.</p>
          <button
            onClick={() => {
              if (window.confirm('Clear inspection history?')) {
                setHistory([]);
                localStorage.removeItem('indexer_history');
                setStatus('✅ History cleared.');
              }
            }}
            style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            Clear History
          </button>
        </div>

        {/* Quota info */}
        <div style={{ background: '#e8f4fd', padding: '16px', borderRadius: '8px', border: '1px solid #bee3f8' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>📊 API Quota</h2>
          <p style={{ fontSize: '12px', color: '#2c5282', lineHeight: '1.6' }}>
            GSC Inspection API:<br />
            <strong>2,000 URLs / day</strong><br />
            Rate: 1 req/sec throttled<br />
            Resets midnight Pacific Time
          </p>
        </div>
      </div>

      {/* Sitemap fetcher */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>2. Fetch Sitemap URLs</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            type="text"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
            placeholder="https://hamrolink.com/sitemap.xml"
          />
          <button
            onClick={handleFetchSitemap}
            disabled={isFetchingSitemap}
            style={{ background: '#17a2b8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: isFetchingSitemap ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: isFetchingSitemap ? 0.7 : 1, whiteSpace: 'nowrap', fontSize: '13px' }}
          >
            {isFetchingSitemap ? 'Fetching...' : 'Fetch & Filter'}
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#888' }}>
          Try <code>/solutions/sitemap.xml</code> for all pSEO landing pages.
          CORS may block remote sitemaps — use local paths.
        </p>
      </div>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', resize: 'vertical', boxSizing: 'border-box' }}
        placeholder="Paste URLs here (one per line)..."
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ flex: 1, background: isSubmitting ? '#6c757d' : '#34A853', color: '#fff', border: 'none', padding: '14px', fontSize: '15px', cursor: isSubmitting ? 'not-allowed' : 'pointer', borderRadius: '6px', fontWeight: 'bold' }}
        >
          {isSubmitting ? '⏳ Inspecting (1 URL/sec)...' : '🔍 Inspect URLs via GSC API'}
        </button>
        <span style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap' }}>
          {urls.split('\n').filter(Boolean).length} URLs queued
        </span>
      </div>

      {status && (
        <pre style={{ marginTop: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '6px', border: '1px solid #eee', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '500px', overflowY: 'auto', fontSize: '12px', lineHeight: '1.6' }}>
          {status}
        </pre>
      )}
    </div>
  );
}
