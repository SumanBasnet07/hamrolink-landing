'use client';
import { useState, useEffect } from 'react';

export default function BulkIndexer() {
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  
  // New State for Sitemap & History Features
  const [history, setHistory] = useState<string[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [isFetchingSitemap, setIsFetchingSitemap] = useState(false);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('indexer_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // 1. Generate the login link for your real GSC account
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID_HERE.apps.googleusercontent.com"; 
    
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/admin/indexer`);
    const scope = encodeURIComponent('https://www.googleapis.com/auth/indexing');
    
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    
    setAuthUrl(url);
    
    // Set default sitemap url based on origin
    if (typeof window !== 'undefined') {
        setSitemapUrl(`${window.location.origin}/sitemap.xml`);
    }
  }, []);

  const handleFetchSitemap = async () => {
    if (!sitemapUrl) return;
    
    setIsFetchingSitemap(true);
    setStatus('🔄 Fetching sitemap...');
    
    try {
      const response = await fetch(sitemapUrl);
      if (!response.ok) throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
      
      const xmlText = await response.text();
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      // Look for <loc> tags which contain the URLs
      const locElements = xmlDoc.getElementsByTagName('loc');
      const extractedUrls: string[] = [];
      
      for (let i = 0; i < locElements.length; i++) {
        if (locElements[i].textContent) {
            extractedUrls.push(locElements[i].textContent.trim());
        }
      }
      
      if (extractedUrls.length === 0) {
        setStatus('❌ No URLs found in the sitemap. Make sure it is a valid XML sitemap.');
        setIsFetchingSitemap(false);
        return;
      }
      
      // Filter out history (already submitted URLs)
      const historySet = new Set(history);
      const newUrls = extractedUrls.filter(url => !historySet.has(url) && !url.endsWith('.xml')); // Filter out .xml if it's a sitemap index
      
      setUrls(newUrls.join('\n'));
      
      setStatus(`✅ Sitemap fetched! Found ${extractedUrls.length} total URLs.\n\n${newUrls.length} are new and ready to submit.\n(Filtered out ${extractedUrls.length - newUrls.length} already submitted or invalid URLs).`);
    } catch (error: any) {
      setStatus(`❌ Error fetching sitemap: ${error.message}\n(Note: if fetching a remote sitemap, it might be blocked by CORS. You may need to fetch a local one.)`);
    } finally {
      setIsFetchingSitemap(false);
    }
  };

  const handleSubmit = async () => {
    // Extract the authorization code from the current URL browser window
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (!authCode) {
      setStatus('❌ Please click "Connect Real GSC Account" first!');
      return;
    }

    setStatus('🔄 Submitting URLs to Google Indexing Queue...');
    const urlArray = urls.split('\n').filter(line => line.trim() !== '');

    if (urlArray.length === 0) {
      setStatus('❌ Please enter at least one URL.');
      return;
    }

    try {
      const redirectUri = window.location.origin + '/admin/indexer';
      const res = await fetch('/api/bulk-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: urlArray, authCode, redirectUri }),
      });

      const data = await res.json();
      if (data.success) {
        // Save successful URLs to history
        const successfulUrls = data.results
          .filter((r: any) => r.status === 'Success')
          .map((r: any) => r.url);
        
        if (successfulUrls.length > 0) {
            const updatedHistory = Array.from(new Set([...history, ...successfulUrls]));
            setHistory(updatedHistory);
            localStorage.setItem('indexer_history', JSON.stringify(updatedHistory));
        }

        setStatus(`✅ Done! Processed ${data.results.length} pages successfully.\n\nDetails:\n${JSON.stringify(data.results, null, 2)}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Network Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Hamro Programmatic Indexer</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Bypassing the Service Account bug via direct user authorization.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>1. Authorize Google</h2>
              <a 
                href={authUrl} 
                style={{ 
                  display: 'block', 
                  background: '#4285F4', 
                  color: '#fff', 
                  padding: '12px', 
                  textAlign: 'center', 
                  borderRadius: '6px', 
                  textDecoration: 'none', 
                  fontWeight: '500'
                }}
              >
                🔑 Connect Real GSC Account
              </a>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Submission History</h2>
              <p style={{ marginBottom: '12px' }}><strong>{history.length}</strong> URLs previously submitted.</p>
              <button 
                onClick={() => {
                    if (window.confirm('Are you sure you want to clear your submission history?')) {
                        setHistory([]);
                        localStorage.removeItem('indexer_history');
                        setStatus('✅ History cleared.');
                    }
                }}
                style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
              >
                  Clear History
              </button>
          </div>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>2. Fetch & Filter Sitemap</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                  type="text" 
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="https://yourdomain.com/sitemap.xml"
              />
              <button 
                  onClick={handleFetchSitemap}
                  disabled={isFetchingSitemap}
                  style={{
                      background: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: isFetchingSitemap ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      opacity: isFetchingSitemap ? 0.7 : 1,
                      whiteSpace: 'nowrap'
                  }}
              >
                  {isFetchingSitemap ? 'Fetching...' : 'Fetch & Filter'}
              </button>
          </div>
      </div>

      <textarea 
        rows={10} 
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '16px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontFamily: 'monospace',
          resize: 'vertical'
        }} 
        placeholder="Paste your 200 URLs here (One per line)..."
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />

      <button 
        onClick={handleSubmit} 
        style={{ 
          width: '100%', 
          background: '#34A853', 
          color: '#fff', 
          border: 'none', 
          padding: '14px', 
          fontSize: '16px', 
          cursor: 'pointer',
          borderRadius: '6px',
          fontWeight: 'bold',
          marginBottom: '24px'
        }}
      >
        🚀 Start Bulk Indexing
      </button>

      {status && (
        <pre style={{ 
          marginTop: '20px', 
          background: '#f8f9fa', 
          padding: '16px',
          borderRadius: '6px',
          border: '1px solid #eee',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {status}
        </pre>
      )}
    </div>
  );
}
