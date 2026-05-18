// src/app/api/admin/solutions/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSessionOrHeaderSecret } from "@/lib/adminAuth";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Admin Secret Authentication Gate
    const authError = requireAdminSessionOrHeaderSecret(request);
    if (authError) return authError;

    const { cityName, province, rawText, selectedIndustries } = await request.json();

    if (!cityName) {
      return NextResponse.json({ error: "City name is required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "DeepSeek API Key is not configured on the server. Please add DEEPSEEK_API_KEY to your .env file." 
      }, { status: 500 });
    }

    const industries = selectedIndustries && selectedIndustries.length > 0 
      ? selectedIndustries 
      : ["ecommerce", "consultancy", "restaurant", "school", "club", "portfolio"];

    // 2. Draft the specialized DeepSeek system prompt
    const systemPrompt = `You are a Senior Programmatic SEO & Database Engineer. Your task is to generate a highly detailed, localized, schema-compliant MongoDB location document for HamroLink (an AI website builder in Nepal).
Your generation MUST completely avoid Google's "thin-content" filter through premium localized density.

You must return EXACTLY a JSON object matching this TypeScript schema:
\`\`\`typescript
export interface IIndustryBlock {
  market_insight: string; // Hyper-local detailed insight about this industry in this city, references landmarks or roads
  growth_metric: string; // High impact growth metric, format: "X% Growth in [City] [Industry] Registrations"
  prominent_local_demand: string; // comma separated list of specific demands eSewa setup, home delivery, etc
  common_operational_hurdle: string; // The biggest local bottleneck (e.g., poor mapping, high cargo rates, loading delays)
  localized_schema_subtext: string; // A descriptive SEO snippet
  trust_proof_point: string; // Detailed proof point on how HamroLink automates this operational bottleneck
}

export interface ILocation {
  slug: string; // lowercased, trimmed, dash-separated e.g. "pokhara" or "lake-side-pokhara"
  city_name: string; // e.g. "Pokhara"
  province: string; // e.g. "Gandaki Province"
  regional_education_hub: string; // e.g. "Lakeside Commercial Hub" or "Prithvi Narayan Belt"
  primary_client_demographic: string; // e.g. "local travel agencies and organic shops"
  nearby_hubs: string[]; // 3-4 actual nearby cities or suburbs in Nepal
  industries_data: Record<string, IIndustryBlock>; // keys MUST be the selected industries (lowercased)
}
\`\`\`

Strict Rules:
1. Return ONLY the raw JSON block. No markdown, no triple backticks, no comments.
2. Localize all details to the city of ${cityName} inside ${province || "Nepal"}. Use actual places, challenges, and landmarks (e.g. for Pokhara reference Lakeside, Mahendrapul, or Prithvi highway, for Dharan reference Bhanuchowk or BPKIHS, etc.).
3. If unstructured raw text notes are provided below, you MUST extract and format them accurately, and enrich any missing fields to be high-density.
4. Ensure values are realistic and grammatically perfect in English.`;

    const userPrompt = rawText 
      ? `Parse and enrich this raw text/notes to build the location document.
City: ${cityName}
Province: ${province || ""}
Selected Industries: ${industries.join(", ")}

Raw Notes/Text:
"""
${rawText}
"""`
      : `Generate a premium, dense location document for:
City: ${cityName}
Province: ${province || ""}
Selected Industries: ${industries.join(", ")}`;

    // 3. Query DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error Status:", response.status, errorText);
      return NextResponse.json({ 
        error: `DeepSeek API returned status ${response.status}: ${errorText}` 
      }, { status: 502 });
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;

    if (!resultText) {
      return NextResponse.json({ error: "Empty response from AI engine" }, { status: 500 });
    }

    // 4. Validate and Parse the generated JSON
    try {
      const locationData = JSON.parse(resultText);
      return NextResponse.json({ success: true, locationData });
    } catch (parseErr) {
      console.error("Failed to parse AI response:", resultText);
      return NextResponse.json({ 
        error: "AI engine generated invalid JSON format.", 
        rawResponse: resultText 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Generate API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
