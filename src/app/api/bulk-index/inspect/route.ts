import { NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Inspects a SINGLE URL via the GSC URL Inspection API.
 * Called once per URL by the frontend loop (rate-limited to 1/sec client-side).
 */
export async function POST(request: Request) {
  try {
    const { url, siteUrl, accessToken, refreshToken, authCode, redirectUri } = await request.json();

    if (!url || !siteUrl) {
      return NextResponse.json({ error: 'url and siteUrl are required' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri || 'http://localhost:3000/admin/indexer'
    );

    let newAccessToken: string | null = null;
    let newRefreshToken: string | null = null;

    if (accessToken || refreshToken) {
      oauth2Client.setCredentials({
        access_token: accessToken || undefined,
        refresh_token: refreshToken || undefined,
      });
      newAccessToken = accessToken;
      newRefreshToken = refreshToken;
    } else if (authCode) {
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials(tokens);
      newAccessToken = tokens.access_token ?? null;
      newRefreshToken = tokens.refresh_token ?? null;
    } else {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const sc = google.searchconsole({ version: 'v1', auth: oauth2Client });

    const res = await sc.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl },
    });

    const result = res.data.inspectionResult?.indexStatusResult;
    const verdict = result?.verdict ?? 'VERDICT_UNSPECIFIED';
    const coverageState = result?.coverageState ?? 'Unknown';
    const robotsTxtState = result?.robotsTxtState ?? 'UNSPECIFIED';
    const indexingState = result?.indexingState ?? 'UNSPECIFIED';
    const lastCrawlTime = result?.lastCrawlTime ?? null;

    return NextResponse.json({
      url,
      verdict,
      coverageState,
      robotsTxtState,
      indexingState,
      lastCrawlTime,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err: any) {
    const msg = err?.response?.data?.error?.message || err.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
