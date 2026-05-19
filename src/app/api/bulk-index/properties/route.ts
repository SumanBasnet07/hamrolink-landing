import { NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Returns all Google Search Console properties the authed user owns/has access to.
 * Used to find the exact siteUrl string needed for the URL Inspection API.
 */
export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'accessToken is required' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    oauth2Client.setCredentials({ access_token: accessToken });

    const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

    const res = await searchConsole.sites.list();
    const sites = (res.data.siteEntry ?? []).map((s: any) => s.siteUrl);

    return NextResponse.json({ sites });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
