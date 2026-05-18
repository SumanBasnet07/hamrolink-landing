import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { urls, authCode, redirectUri } = await request.json();

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'Invalid URL list' }, { status: 400 });
    }

    // Initialize the Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri || 'http://localhost:3000/admin/indexer' // Dynamically match the environment
    );

    // If an authCode is passed, exchange it for access tokens
    if (authCode) {
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials(tokens);
    } else {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Connect to the Web Search Indexing API
    const indexing = google.indexing({
      version: 'v3',
      auth: oauth2Client,
    });

    const results = [];

    // Loop through your 200 URLs and submit them one by one
    for (const url of urls) {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        results.push({ url, status: 'Success', message: response.data });
      } catch (urlError: any) {
        results.push({ url, status: 'Failed', error: urlError.message });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (globalError: any) {
    return NextResponse.json({ success: false, error: globalError.message }, { status: 500 });
  }
}
