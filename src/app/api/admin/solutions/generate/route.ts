// src/app/api/admin/solutions/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSessionOrHeaderSecret } from "@/lib/adminAuth";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Admin Secret Authentication Gate
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    const {
      cityName,
      province,
      rawText,
      selectedIndustries,
      // Admin-provided hints — used to anchor generation and prevent hallucination
      slug,
      regionalHub,
      demographic,
      nearbyHubs,
      localLandmarks,
    } = await request.json();

    if (!cityName) {
      return NextResponse.json({ error: "City name is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: "DeepSeek API Key is not configured on the server. Please add DEEPSEEK_API_KEY to your .env file.",
      }, { status: 500 });
    }

    const industries =
      selectedIndustries && selectedIndustries.length > 0
        ? selectedIndustries
        : ["ecommerce", "consultancy", "restaurant", "school", "club", "portfolio"];

    // 2. Overhauled system prompt — enforces formats, anchors on hints, prevents thin content
    const systemPrompt = `You are an elite Programmatic SEO Content Architect specializing in hyper-local Nepali business markets. Your output directly powers public-facing Google-indexed landing pages for HamroLink — an AI website builder for Nepal.

CRITICAL: Your output will be reviewed by Google's helpful content system. Generic, vague, or placeholder content will cause these pages to be penalized as thin content. Every field must be specific, locally-grounded, and factually accurate.

═══════════════════════════════════════
RETURN FORMAT
═══════════════════════════════════════
Return EXACTLY one raw JSON object — no markdown, no triple backticks, no comments, no trailing text.

{
  "slug": "lowercase-dashed-url-slug",
  "city_name": "Proper Capitalized City Name",
  "province": "Full Province Name e.g. Gandaki Province",
  "regional_education_hub": "The dominant commercial or business corridor label for this city",
  "primary_client_demographic": "Specific local buyer persona, e.g. lakeside hotel owners and trekking agencies",
  "nearby_hubs": ["RealCity1", "RealCity2", "RealCity3"],
  "local_landmarks": ["Real Landmark or Road 1", "Commercial Area 2", "Known Zone 3"],
  "industries_data": {
    "[industry_key]": {
      "market_insight": "2-3 sentence hyper-local insight referencing a real road, area, or challenge specific to this city",
      "growth_metric": "XX% Growth in [City] [Industry] Sector",
      "prominent_local_demand": "short phrase 1, short phrase 2, short phrase 3, short phrase 4",
      "common_operational_hurdle": "One specific operational pain point businesses face in this city for this industry",
      "localized_schema_subtext": "SEO-optimized 1-sentence description for Google rich snippets about this service in this city",
      "trust_proof_point": "Specific explanation of how HamroLink's automation resolves the operational_hurdle above"
    }
  }
}

═══════════════════════════════════════
STRICT FORMAT ENFORCEMENT — VIOLATIONS WILL CAUSE SYSTEM ERRORS
═══════════════════════════════════════

1. growth_metric — MUST begin with a numeral and the % sign.
   ✅ CORRECT: "47% Growth in Pokhara Restaurant Sector"
   ❌ WRONG:   "High Growth in Pokhara" / "Growing Fast" / "Significant Growth"

2. prominent_local_demand — MUST be a comma-separated list of 3 to 5 SHORT PHRASES.
   ✅ CORRECT: "eSewa payment setup, home delivery integration, WhatsApp order alerts, digital menu cards"
   ❌ WRONG:   "Businesses need help with setting up payments and also managing their orders."

3. local_landmarks — MUST only contain places you are highly confident ACTUALLY EXIST in this specific city.
   ✅ Use real roads, bazaars, intersections, known commercial zones.
   ❌ NEVER invent or fabricate landmark names. If uncertain, use generic descriptors:
      "main bazaar area" / "city bus park zone" / "central market corridor"

4. nearby_hubs — MUST be real Nepali cities or towns within approximately 50km. Not districts, not provinces.
   ✅ CORRECT: ["Hetauda", "Birgunj", "Bharatpur"]
   ❌ WRONG:   ["Bagmati Province", "Central Development Region", "Madhesh"]

5. market_insight — MUST reference something SPECIFIC to this city: a road name, a local industry, a geographic feature, or a cultural pattern. No generic Nepal statements.
   ✅ CORRECT: "Businesses along Pokhara's Lakeside strip rely heavily on walk-in tourist traffic from Fishtail Road..."
   ❌ WRONG:   "Nepal's growing digital economy is creating new opportunities for local businesses."

6. regional_education_hub — Should be a descriptive label for the dominant commercial corridor, not literally an educational institution (unless the city's economy is education-driven).

7. primary_client_demographic — Should describe SPECIFIC buyer personas, not vague terms like "local businesses" or "entrepreneurs."
   ✅ CORRECT: "trekking agencies, lakeside cafes, and paragliding operators near Phewa Tal"
   ❌ WRONG:   "local business owners and entrepreneurs"

═══════════════════════════════════════
ANTI-HALLUCINATION MANDATE
═══════════════════════════════════════
- Do NOT invent fictional school names, hospital names, company names, or organization names.
- If you reference an institution, it MUST be a commonly known one (e.g. BPKIHS in Dharan, Mahendra Multiple Campus in Dang).
- When in doubt, use generic professional descriptors instead of specific names.

═══════════════════════════════════════
CONTENT DENSITY MANDATE
═══════════════════════════════════════
Each industry block must feel unique and specifically tailored. Two different industries in the same city should NOT share phrases, sentence structures, or generic observations.`;

    // 3. Build user prompt incorporating admin-provided hints as grounding anchors
    let userPrompt = `Generate a premium, hyper-local location document for the following city:\n\n`;
    userPrompt += `City: ${cityName}\n`;
    userPrompt += `Province: ${province || "Nepal"}\n`;
    userPrompt += `Industries to generate: ${industries.join(", ")}\n`;

    // Inject admin-confirmed hints — these take priority over AI guesses
    if (slug) {
      userPrompt += `\nURL Slug (use exactly this): ${slug}`;
    } else {
      userPrompt += `\nURL Slug: generate as lowercase, dash-separated (e.g. "pokhara" or "birta-mode")`;
    }
    if (regionalHub) {
      userPrompt += `\nRegional commercial hub label (use this): ${regionalHub}`;
    }
    if (demographic) {
      userPrompt += `\nPrimary client demographic (use this): ${demographic}`;
    }
    if (nearbyHubs && nearbyHubs.length > 0) {
      userPrompt += `\nNearby hubs confirmed by admin (use exactly these): ${nearbyHubs.join(", ")}`;
    }
    if (localLandmarks && localLandmarks.length > 0) {
      userPrompt += `\nConfirmed local landmarks/areas (use these in market_insight and local_landmarks): ${localLandmarks.join(", ")}`;
    }

    if (rawText) {
      userPrompt += `\n\nThe admin has provided the following raw notes and research. Extract all facts from this and use them to enrich the output. Do not contradict any facts stated here:\n"""\n${rawText}\n"""`;
    } else {
      userPrompt += `\n\nNo raw notes provided. Use your best knowledge of ${cityName} to generate authentic, locally-grounded content. Apply all format enforcement rules strictly.`;
    }

    // 4. Query DeepSeek API with tighter temperature for consistency
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.05, // Very low — prioritize format compliance and factual accuracy over creativity
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error Status:", response.status, errorText);
      return NextResponse.json(
        { error: `DeepSeek API returned status ${response.status}: ${errorText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;

    if (!resultText) {
      return NextResponse.json({ error: "Empty response from AI engine" }, { status: 500 });
    }

    // 5. Parse and validate generated JSON
    try {
      const locationData = JSON.parse(resultText);

      // 5a. Post-process validation: enforce growth_metric format
      if (locationData.industries_data) {
        for (const [ind, block] of Object.entries(locationData.industries_data as Record<string, any>)) {
          // Ensure growth_metric starts with a number
          if (block.growth_metric && !/^\d/.test(block.growth_metric)) {
            console.warn(`[generate] growth_metric for ${ind} does not start with a number: "${block.growth_metric}"`);
          }
          // Ensure local_landmarks exists
          if (!locationData.local_landmarks || locationData.local_landmarks.length === 0) {
            locationData.local_landmarks = [];
          }
        }
      }

      // 5b. If admin provided slug/hub/demographic/nearby/landmarks and AI didn't preserve them, inject them
      if (slug && locationData.slug !== slug) locationData.slug = slug;
      if (regionalHub && !locationData.regional_education_hub) locationData.regional_education_hub = regionalHub;
      if (demographic && !locationData.primary_client_demographic) locationData.primary_client_demographic = demographic;
      if (nearbyHubs && nearbyHubs.length > 0 && (!locationData.nearby_hubs || locationData.nearby_hubs.length === 0)) {
        locationData.nearby_hubs = nearbyHubs;
      }
      if (localLandmarks && localLandmarks.length > 0 && (!locationData.local_landmarks || locationData.local_landmarks.length === 0)) {
        locationData.local_landmarks = localLandmarks;
      }

      return NextResponse.json({ success: true, locationData });
    } catch (parseErr) {
      console.error("Failed to parse AI response:", resultText);
      return NextResponse.json(
        { error: "AI engine generated invalid JSON format.", rawResponse: resultText },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Generate API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
