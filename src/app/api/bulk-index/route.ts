import { NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Bulk URL submission using the Google Indexing API.
 * This sends a crawl/index signal to Google for each URL.
 * Quota: 200 URLs/day per Google Cloud project.
 *
 * Note: While officially designed for JobPosting/LiveBlog schemas,
 * this API does send a real crawl signal to Googlebot for any URL
 * on a verified Search Console property.
 */
export async function POST(request: Request) {
  try {
    const { urls, authCode, accessToken, refreshToken, redirectUri } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty URL list' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri || 'http://localhost:3000/admin/indexer'
    );

    let returnAccessToken: string | null = null;
    let returnRefreshToken: string | null = null;

    if (accessToken || refreshToken) {
      // Reuse already-exchanged tokens — no re-auth needed
      oauth2Client.setCredentials({
        access_token: accessToken || undefined,
        refresh_token: refreshToken || undefined,
      });
      returnAccessToken = accessToken;
      returnRefreshToken = refreshToken;
    } else if (authCode) {
      // First submission — exchange the one-time auth code for tokens
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials(tokens);
      returnAccessToken = tokens.access_token ?? null;
      returnRefreshToken = tokens.refresh_token ?? null;
    } else {
      return NextResponse.json(
        { error: 'Authentication required — no authCode, accessToken, or refreshToken provided.' },
        { status: 401 }
      );
    }

    // Use the Indexing API to submit each URL as a crawl/index request
    const indexing = google.indexing({ version: 'v3', auth: oauth2Client });

    const results = [];
    for (const url of urls) {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });

        // The API returns urlNotificationMetadata on success
        // Cast to any since googleapis types don't expose latestUpdate directly
        const meta = response.data as any;
        results.push({
          url,
          status: 'Submitted',
          httpStatus: response.status,
          latestUpdate: meta?.latestUpdate?.notifyTime ?? null,
        });
      } catch (urlError: any) {
        const errMsg = urlError?.response?.data?.error?.message || urlError.message;
        results.push({
          url,
          status: 'Failed',
          error: errMsg,
        });
      }
    }

    const submitted = results.filter(r => r.status === 'Submitted').length;
    const failed = results.filter(r => r.status === 'Failed').length;

    return NextResponse.json({
      success: true,
      submitted,
      failed,
      accessToken: returnAccessToken,
      refreshToken: returnRefreshToken,
      results,
    });
  } catch (globalError: any) {
    const errMsg = globalError?.response?.data?.error?.message || globalError.message;
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
