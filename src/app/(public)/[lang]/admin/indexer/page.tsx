'use client';
import { useState, useEffect, useRef } from 'react';

type CheckStatus = 'pending' | 'checking' | 'indexed' | 'not_indexed' | 'unknown' | 'error';
type SubmitStatus = 'none' | 'submitting' | 'submitted' | 'failed';

interface UrlItem {
  url: string;
  checkStatus: CheckStatus;
  coverageState?: string;
  lastCrawlTime?: string;
  verdict?: string;
  submitStatus: SubmitStatus;
  submitError?: string;
}

const VERDICT_TO_CHECK: Record<string, CheckStatus> = {
  PASS: 'indexed',
  FAIL: 'not_indexed',
  NEUTRAL: 'unknown',
  VERDICT_UNSPECIFIED: 'unknown',
};

function statusBadge(status: CheckStatus) {
  const map: Record<CheckStatus, { label: string; bg: string; color: string }> = {
    pending:     { label: '⏳ Pending',     bg: '#f0f0f0', color: '#555' },
    checking:    { label: '🔄 Checking…',   bg: '#fff3cd', color: '#856404' },
    indexed:     { label: '✅ Indexed',      bg: '#d1fae5', color: '#065f46' },
    not_indexed: { label: '❌ Not indexed',  bg: '#fee2e2', color: '#991b1b' },
    unknown:     { label: '🔍 Unknown',      bg: '#e0e7ff', color: '#3730a3' },
    error:       { label: '⚠️ Error',        bg: '#fff1f2', color: '#be123c' },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

function submitBadge(status: SubmitStatus) {
  if (status === 'none') return null;
  const map: Record<SubmitStatus, { label: string; color: string }> = {
    none:       { label: '', color: '' },
    submitting: { label: '⏳ Sending…', color: '#6c757d' },
    submitted:  { label: '✅ Queued',   color: '#28a745' },
    failed:     { label: '❌ Failed',   color: '#dc3545' },
  };
  const s = map[status];
  return <span style={{ color: s.color, fontSize: '11px', fontWeight: 'bold' }}>{s.label}</span>;
}

export default function BulkIndexer() {
  const [phase, setPhase] = useState<'idle' | 'checking' | 'done_check' | 'submitting' | 'done'>('idle');
  const [urlItems, setUrlItems] = useState<UrlItem[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [manualUrls, setManualUrls] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [isFetchingSitemap, setIsFetchingSitemap] = useState(false);
  const [gscSiteUrl, setGscSiteUrl] = useState('sc-domain:hamrolink.com');

  // Auth
  const [authUrl, setAuthUrl] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);

  // Progress
  const [checkProgress, setCheckProgress] = useState(0);
  const abortRef = useRef(false);

  // Counts
  const indexed    = urlItems.filter(u => u.checkStatus === 'indexed').length;
  const notIndexed = urlItems.filter(u => u.checkStatus === 'not_indexed').length;
  const unknown    = urlItems.filter(u => u.checkStatus === 'unknown').length;
  const errors     = urlItems.filter(u => u.checkStatus === 'error').length;
  const toSubmit   = urlItems.filter(u => u.checkStatus === 'not_indexed' || u.checkStatus === 'unknown');
  const submitted  = urlItems.filter(u => u.submitStatus === 'submitted').length;

  useEffect(() => {
    const saved = localStorage.getItem('indexer_gsc_site_url');
    if (saved) setGscSiteUrl(saved);

    const at = localStorage.getItem('indexer_access_token');
    const rt = localStorage.getItem('indexer_refresh_token');
    if (at || rt) {
      if (at) setAccessToken(at);
      if (rt) setRefreshToken(rt);
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/admin/indexer`);
    // Request BOTH scopes: inspect (webmasters) + submit (indexing)
    const scope = encodeURIComponent([
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/indexing',
    ].join(' '));
    setAuthUrl(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}&response_type=code&scope=${scope}` +
      `&access_type=offline&prompt=consent`
    );

    if (typeof window !== 'undefined') {
      setSitemapUrl(`${window.location.origin}/solutions/sitemap.xml`);
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        setAuthCode(code);
        setIsAuthed(true);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const saveTokens = (at: string | null, rt: string | null) => {
    if (at) { setAccessToken(at); localStorage.setItem('indexer_access_token', at); }
    if (rt) { setRefreshToken(rt); localStorage.setItem('indexer_refresh_token', rt); }
  };

  const handleDisconnect = () => {
    setAccessToken(null); setRefreshToken(null); setAuthCode(null); setIsAuthed(false);
    localStorage.removeItem('indexer_access_token');
    localStorage.removeItem('indexer_refresh_token');
  };

  const handleFetchSitemap = async () => {
    if (!sitemapUrl) return;
    setIsFetchingSitemap(true);
    try {
      const res = await fetch(sitemapUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      const locs = Array.from(doc.getElementsByTagName('loc'))
        .map(l => l.textContent?.trim())
        .filter((u): u is string => !!u && !u.endsWith('.xml'));
      setUrlItems(locs.map(url => ({ url, checkStatus: 'pending', submitStatus: 'none' })));
      setPhase('idle');
    } catch (e: any) {
      alert(`Failed to fetch sitemap: ${e.message}`);
    } finally {
      setIsFetchingSitemap(false);
    }
  };

  const handleLoadManual = () => {
    const urls = manualUrls.split('\n').map(l => l.trim()).filter(Boolean);
    setUrlItems(urls.map(url => ({ url, checkStatus: 'pending', submitStatus: 'none' })));
    setShowManual(false);
    setPhase('idle');
  };

  // Phase 1: Check all URLs one by one (1/sec rate limit)
  const handleCheckAll = async () => {
    if (!isAuthed) return alert('Connect your Google account first.');
    if (urlItems.length === 0) return alert('Load URLs first.');
    abortRef.current = false;
    setPhase('checking');
    setCheckProgress(0);

    let currentAuthCode = authCode;
    let currentAccessToken = accessToken;
    let currentRefreshToken = refreshToken;

    for (let i = 0; i < urlItems.length; i++) {
      if (abortRef.current) break;

      // Mark as checking
      setUrlItems(prev => prev.map((item, idx) =>
        idx === i ? { ...item, checkStatus: 'checking' } : item
      ));

      try {
        const res = await fetch('/api/bulk-index/inspect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: urlItems[i].url,
            siteUrl: gscSiteUrl,
            authCode: currentAuthCode,
            accessToken: currentAccessToken,
            refreshToken: currentRefreshToken,
            redirectUri: window.location.origin + '/admin/indexer',
          }),
        });
        const data = await res.json();

        // Save refreshed tokens for next iteration
        if (data.accessToken) { saveTokens(data.accessToken, data.refreshToken); currentAccessToken = data.accessToken; currentAuthCode = null; }
        if (data.refreshToken) { currentRefreshToken = data.refreshToken; }

        if (data.error) {
          setUrlItems(prev => prev.map((item, idx) =>
            idx === i ? { ...item, checkStatus: 'error', coverageState: data.error } : item
          ));
        } else {
          const checkStatus = VERDICT_TO_CHECK[data.verdict] ?? 'unknown';
          setUrlItems(prev => prev.map((item, idx) =>
            idx === i ? {
              ...item,
              checkStatus,
              verdict: data.verdict,
              coverageState: data.coverageState,
              lastCrawlTime: data.lastCrawlTime,
            } : item
          ));
        }
      } catch (e: any) {
        setUrlItems(prev => prev.map((item, idx) =>
          idx === i ? { ...item, checkStatus: 'error', coverageState: e.message } : item
        ));
      }

      setCheckProgress(i + 1);
      // Respect GSC API rate limit: 1 request/second
      if (i < urlItems.length - 1) await new Promise(r => setTimeout(r, 1100));
    }

    setPhase('done_check');
  };

  // Phase 2: Submit only not_indexed + unknown URLs
  const handleSubmitUnindexed = async () => {
    if (!isAuthed) return;
    const targets = urlItems.filter(u => u.checkStatus === 'not_indexed' || u.checkStatus === 'unknown');
    if (targets.length === 0) return alert('No unindexed URLs to submit!');
    if (targets.length > 200) {
      if (!window.confirm(`${targets.length} URLs exceed the 200/day quota. Only 200 will succeed. Continue?`)) return;
    }

    setPhase('submitting');

    // Mark all targets as submitting
    setUrlItems(prev => prev.map(item =>
      (item.checkStatus === 'not_indexed' || item.checkStatus === 'unknown')
        ? { ...item, submitStatus: 'submitting' }
        : item
    ));

    try {
      const res = await fetch('/api/bulk-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: targets.map(t => t.url),
          accessToken,
          refreshToken,
          authCode,
          redirectUri: window.location.origin + '/admin/indexer',
        }),
      });
      const data = await res.json();

      if (data.accessToken) saveTokens(data.accessToken, data.refreshToken);
      if (data.refreshToken) { setRefreshToken(data.refreshToken); localStorage.setItem('indexer_refresh_token', data.refreshToken); }

      if (data.success) {
        const resultMap = new Map(data.results.map((r: any) => [r.url, r]));
        setUrlItems(prev => prev.map(item => {
          const r: any = resultMap.get(item.url);
          if (!r) return item;
          return {
            ...item,
            submitStatus: r.status === 'Submitted' ? 'submitted' : 'failed',
            submitError: r.error,
          };
        }));
        setPhase('done');
      } else {
        alert(`Submission error: ${data.error}`);
        setUrlItems(prev => prev.map(item =>
          item.submitStatus === 'submitting' ? { ...item, submitStatus: 'failed', submitError: data.error } : item
        ));
        setPhase('done_check');
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
      setPhase('done_check');
    }
  };

  const isChecking   = phase === 'checking';
  const isDoneCheck  = phase === 'done_check' || phase === 'done';
  const isSubmitting = phase === 'submitting';

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>🚀 HamroLink Bulk Indexer</h1>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>
        Smart 2-phase flow: <strong>Check status first</strong> → <strong>Submit only the unindexed pages</strong>. Saves your 200 URL/day quota.
      </p>

      {/* ── AUTH ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', background: isAuthed ? '#f0fdf4' : '#fafafa', border: `1px solid ${isAuthed ? '#86efac' : '#e5e7eb'}`, borderRadius: '8px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: '14px' }}>Step 1 — Google Account</strong>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#666' }}>Must be the verified owner of hamrolink.com in Search Console</p>
        </div>
        {isAuthed ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '13px' }}>✅ Connected</span>
            <button onClick={handleDisconnect} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Disconnect</button>
          </div>
        ) : (
          <a href={authUrl} style={{ background: '#4285F4', color: '#fff', padding: '9px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>🔑 Connect Google Account</a>
        )}
      </div>

      {/* ── GSC PROPERTY ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', padding: '14px 20px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <strong style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>GSC Property:</strong>
        <input
          value={gscSiteUrl}
          onChange={e => { setGscSiteUrl(e.target.value); localStorage.setItem('indexer_gsc_site_url', e.target.value); }}
          style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace' }}
          placeholder="sc-domain:hamrolink.com"
        />
        {['sc-domain:hamrolink.com', 'https://hamrolink.com/'].map(opt => (
          <button key={opt} onClick={() => { setGscSiteUrl(opt); localStorage.setItem('indexer_gsc_site_url', opt); }}
            style={{ background: gscSiteUrl === opt ? '#6f42c1' : '#e9ecef', color: gscSiteUrl === opt ? '#fff' : '#333', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
            {opt}
          </button>
        ))}
      </div>

      {/* ── LOAD URLS ─────────────────────────────────────── */}
      <div style={{ padding: '14px 20px', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px' }}>
        <strong style={{ fontSize: '14px' }}>Step 2 — Load URLs</strong>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)}
            style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}
            placeholder="/solutions/sitemap.xml" />
          <button onClick={handleFetchSitemap} disabled={isFetchingSitemap}
            style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', opacity: isFetchingSitemap ? 0.7 : 1 }}>
            {isFetchingSitemap ? 'Loading…' : '📋 Load Sitemap'}
          </button>
          <button onClick={() => setShowManual(v => !v)}
            style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
            ✏️ Manual
          </button>
        </div>
        {showManual && (
          <div style={{ marginTop: '10px' }}>
            <textarea rows={6} value={manualUrls} onChange={e => setManualUrls(e.target.value)}
              placeholder="https://hamrolink.com/solutions/consultancy/kathmandu&#10;https://hamrolink.com/solutions/restaurant/pokhara"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', boxSizing: 'border-box', resize: 'vertical' }} />
            <button onClick={handleLoadManual}
              style={{ marginTop: '8px', background: '#334155', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
              Load These URLs
            </button>
          </div>
        )}
        {urlItems.length > 0 && (
          <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#555' }}>
            <strong>{urlItems.length}</strong> URLs loaded.
          </p>
        )}
      </div>

      {/* ── ACTION BUTTONS ───────────────────────────────── */}
      {urlItems.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Check button */}
          <button
            onClick={isChecking ? () => { abortRef.current = true; } : handleCheckAll}
            disabled={!isAuthed || isSubmitting}
            style={{
              background: isChecking ? '#dc2626' : '#6f42c1',
              color: '#fff', border: 'none', padding: '12px 24px',
              borderRadius: '6px', cursor: (!isAuthed || isSubmitting) ? 'not-allowed' : 'pointer',
              fontWeight: 'bold', fontSize: '14px',
              opacity: (!isAuthed || isSubmitting) ? 0.6 : 1,
            }}>
            {isChecking ? `⏹ Stop (${checkProgress}/${urlItems.length})` : `🔍 Check All ${urlItems.length} URLs`}
          </button>

          {/* Submit button — only shows after check */}
          {isDoneCheck && toSubmit.length > 0 && (
            <button
              onClick={handleSubmitUnindexed}
              disabled={isSubmitting || !isAuthed}
              style={{
                background: isSubmitting ? '#6c757d' : '#16a34a',
                color: '#fff', border: 'none', padding: '12px 24px',
                borderRadius: '6px', cursor: (isSubmitting || !isAuthed) ? 'not-allowed' : 'pointer',
                fontWeight: 'bold', fontSize: '14px',
              }}>
              {isSubmitting ? '⏳ Submitting…' : `🚀 Submit ${toSubmit.length} Unindexed URLs`}
            </button>
          )}

          {/* Stats */}
          {isDoneCheck && (
            <div style={{ display: 'flex', gap: '10px', fontSize: '12px', flexWrap: 'wrap' }}>
              {indexed    > 0 && <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>✅ {indexed} indexed</span>}
              {notIndexed > 0 && <span style={{ background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>❌ {notIndexed} not indexed</span>}
              {unknown    > 0 && <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>🔍 {unknown} unknown</span>}
              {errors     > 0 && <span style={{ background: '#fff1f2', color: '#be123c', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>⚠️ {errors} error</span>}
              {phase === 'done' && <span style={{ background: '#fef9c3', color: '#854d0e', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>🚀 {submitted} queued</span>}
            </div>
          )}
        </div>
      )}

      {/* ── PROGRESS BAR ─────────────────────────────────── */}
      {isChecking && urlItems.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
            <span>Checking URLs (1/sec to respect GSC quota)…</span>
            <span>{checkProgress} / {urlItems.length}</span>
          </div>
          <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
            <div style={{ background: '#6f42c1', height: '100%', width: `${(checkProgress / urlItems.length) * 100}%`, transition: 'width 0.3s ease', borderRadius: '999px' }} />
          </div>
        </div>
      )}

      {/* ── RESULTS TABLE ────────────────────────────────── */}
      {urlItems.length > 0 && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>#</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>URL</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151', whiteSpace: 'nowrap' }}>Index Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Coverage</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151', whiteSpace: 'nowrap' }}>Last Crawl</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Submit</th>
              </tr>
            </thead>
            <tbody>
              {urlItems.map((item, i) => (
                <tr key={item.url} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '8px 14px', color: '#9ca3af' }}>{i + 1}</td>
                  <td style={{ padding: '8px 14px', maxWidth: '360px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontFamily: 'monospace' }}>
                      {item.url.replace('https://hamrolink.com', '')}
                    </a>
                  </td>
                  <td style={{ padding: '8px 14px' }}>{statusBadge(item.checkStatus)}</td>
                  <td style={{ padding: '8px 14px', color: '#6b7280', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.coverageState ?? '—'}
                  </td>
                  <td style={{ padding: '8px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {item.lastCrawlTime ? new Date(item.lastCrawlTime).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ padding: '8px 14px' }}>{submitBadge(item.submitStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
