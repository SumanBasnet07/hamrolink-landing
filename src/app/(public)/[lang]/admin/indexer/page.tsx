'use client';
import { useState, useEffect } from 'react';

export default function BulkIndexer() {
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [authUrl, setAuthUrl] = useState('');

  // 1. Generate the login link for your real GSC account
  useEffect(() => {
    // Make sure your NEXT_PUBLIC_GOOGLE_CLIENT_ID is exposed in .env
    // or hardcode the exact Client ID string below for the private tool
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_681819891002_CLIENT_ID_HERE.apps.googleusercontent.com"; 
    
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const redirectUri = encodeURIComponent(`${origin}/admin/indexer`);
    const scope = encodeURIComponent('https://www.googleapis.com/auth/indexing');
    
    // Fixed the OAuth URL. (The previous code had https://google.com{clientId} which was invalid)
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    
    setAuthUrl(url);
  }, []);

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
        setStatus(`✅ Done! Processed ${data.results.length} pages successfully.\n\nDetails:\n${JSON.stringify(data.results, null, 2)}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Network Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Hamro Programmatic Indexer</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Bypassing the Service Account bug via direct user authorization.</p>
      
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
          marginBottom: '24px',
          fontWeight: '500'
        }}
      >
        🔑 Connect Real GSC Account
      </a>

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
