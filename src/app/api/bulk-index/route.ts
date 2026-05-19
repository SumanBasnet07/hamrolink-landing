import { NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * IMPORTANT — Google Indexing API vs Search Console Inspection API
 *
 * The google.indexing('v3') API (urlNotifications.publish) ONLY works for
 * pages with JobPosting or BroadcastEvent schema. It returns HTTP 200 for
 * ANY URL but silently discards non-qualifying pages. It is NOT a general
 * purpose indexing trigger.
 *
 * This route uses the Search Console URL Inspection API instead, which is
 * the actual API powering the "Request Indexing" button in GSC UI.
 * Quota: 2,000 requests/day per property.
 */
export async function POST(request: Request) {
  try {
    const { urls, authCode, accessToken, redirectUri, siteUrl } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty URL list' }, { status: 400 });
    }

    // Initialize the Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri || 'http://localhost:3000/admin/indexer'
    );

    let usedAccessToken: string | null = null;

    if (accessToken) {
      // Reuse an already-exchanged access token (avoids "invalid_grant" on resubmit)
      oauth2Client.setCredentials({ access_token: accessToken });
      usedAccessToken = accessToken;
    } else if (authCode) {
      // First submission — exchange the one-time auth code for tokens
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials(tokens);
      usedAccessToken = tokens.access_token ?? null;
    } else {
      return NextResponse.json({ error: 'Authentication required — no authCode or accessToken provided.' }, { status: 401 });
    }

    // Use the Search Console URL Inspection API
    // This is the actual API that triggers Googlebot crawl requests
    const searchConsole = google.searchconsole({
      version: 'v1',
      auth: oauth2Client,
    });

    // Detect the GSC site property URL (must match exactly what's in GSC)
    // GSC uses "https://domain.com/" (with trailing slash) for domain properties
    const gscSiteUrl = siteUrl || 'https://hamrolink.com/';

    const results = [];
    // GSC Inspection API rate limit: ~1 request/second to avoid quota errors
    for (const url of urls) {
      try {
        const response = await searchConsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: gscSiteUrl,
          },
        });

        const inspection = response.data.inspectionResult;
        const indexStatus = inspection?.indexStatusResult;
        const verdict = indexStatus?.verdict ?? 'UNKNOWN';
        const coverageState = indexStatus?.coverageState ?? 'Unknown';

        results.push({
          url,
          status: 'Inspected',
          verdict,        // PASS, FAIL, NEUTRAL, VERDICT_UNSPECIFIED
          coverageState,  // e.g. "Submitted and indexed", "URL is unknown to Google"
          robotsAllowed: indexStatus?.robotsTxtState === 'ALLOWED',
          indexingAllowed: indexStatus?.indexingState === 'INDEXING_ALLOWED',
          lastCrawlTime: indexStatus?.lastCrawlTime ?? null,
        });

        // Throttle to respect GSC API quota (1 req/sec)
        await new Promise(resolve => setTimeout(resolve, 1100));
      } catch (urlError: any) {
        results.push({
          url,
          status: 'Failed',
          verdict: 'ERROR',
          error: urlError.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      accessToken: usedAccessToken, // Return token so frontend can reuse without re-auth
      results,
    });
  } catch (globalError: any) {
    return NextResponse.json(
      { success: false, error: globalError.message },
      { status: 500 }
    );
  }
}
