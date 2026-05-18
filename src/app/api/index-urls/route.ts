import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    // 1. Paste the exact values from your downloaded Client ID JSON file here
    // Alternatively, use environment variables for better security
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID.apps.googleusercontent.com",
      process.env.GOOGLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
      "http://localhost:3000/api/auth/callback/google" // Must match Step 1 exactly
    );

    // 2. Set your active refresh token or user authentication
    // (Alternatively, use a saved offline token to automate this without logging in every time)
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const indexing = google.indexing({
      version: 'v3',
      auth: oauth2Client,
    });

    const body = await req.json();
    const urls: string[] = body.urls; // Array of pSEO URLs passed from your frontend or database

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'Invalid or missing "urls" array in request body' }, { status: 400 });
    }

    const results = [];
    for (const url of urls) {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED', // Tells Google to crawl/re-crawl this page
        },
      });
      results.push({ url, status: 'Submitted', data: response.data });
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error: any) {
    console.error("SEO Indexing API Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
