import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// 1. Manually parse .env to avoid 'dotenv' package requirements
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in your .env file");
  process.exit(1);
}

// 2. Local schema definition matching src/models/Location.ts
const LocationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    city_name: { type: String, required: true },
    province: { type: String, required: true },
    regional_education_hub: { type: String },
    primary_client_demographic: { type: String },
    nearby_hubs: { type: [String], default: [] },
    industries_data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, collection: "locations" }
);

const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema);

// 3. Core local dataset representing high-density regional demographics
const locationsData = [
  {
    slug: "itahari",
    city_name: "Itahari",
    province: "Koshi Province",
    regional_education_hub: "Sunsari-Morang educational corridor",
    primary_client_demographic: "Graduating students from local colleges and local independent professionals seeking foreign credential evaluation or business registration",
    nearby_hubs: ["dharan", "biratnagar", "damak", "birtamod"],
    industries_data: {
      consultancy: {
        market_insight: "As a major transit hub, Itahari has seen an influx of educational consultancies and visa preparation centers targeting students from both Sunsari and Dhankuta who want to transition to foreign studies.",
        growth_metric: "35% increase in students opting for local language preparation centers and educational consultancies within the Sunsari-Morang region.",
        prominent_local_demand: "IELTS/PTE preparation booking, study abroad counseling, and credential assessment services.",
        common_operational_hurdle: "Managing physical token queues and missing walk-in student follow-ups due to paper-based intake registers.",
        localized_schema_subtext: "Educational and Corporate Consulting Services Hub in Sunsari, Nepal",
        trust_proof_point: "Automate student registration with built-in class schedule builders and instant eSewa class seat booking."
      },
      ecommerce: {
        market_insight: "Itahari's retail and wholesale clothing hubs along the main highway are moving aggressively online to capture the young purchasing power in neighboring hubs Dharan and Biratnagar.",
        growth_metric: "48% year-over-year increase in local digital orders for boutique fashion houses and customized electronics inside Sunsari.",
        prominent_local_demand: "Boutique dress orders, electronics delivery, and wholesale clothing catalog browsing.",
        common_operational_hurdle: "Manually processing payment screenshots via Facebook Messenger, leading to delivery disputes.",
        localized_schema_subtext: "Retail and E-commerce Hub in Sunsari, Nepal",
        trust_proof_point: "Instantly link eSewa, Khalti, and FonePay payment verification directly into your shopping cart checkout."
      }
    }
  },
  {
    slug: "dharan",
    city_name: "Dharan",
    province: "Koshi Province",
    regional_education_hub: "Dharan education and tourism gateway",
    primary_client_demographic: "College students, tourists, trek planners, and boutique restaurant entrepreneurs targeting regional holidaymakers.",
    nearby_hubs: ["itahari", "biratnagar", "dhankuta", "damak"],
    industries_data: {
      consultancy: {
        market_insight: "Dharan is a high-intent pocket for language academies and immigration consultancies preparing students from British Gorkha family backgrounds for UK/Japan higher education paths.",
        growth_metric: "40% increase in visa preparation inquiries and Gorkha credential consulting services in Dharan.",
        prominent_local_demand: "British Gurkha credential alignment, student visa bookings, and language exam preparation seats.",
        common_operational_hurdle: "Misplaced physical inquiry cards and high intake abandonment during local holidays.",
        localized_schema_subtext: "Language Prep & Immigration Consultancy Services in Dharan, Nepal",
        trust_proof_point: "Integrate a 24/7 AI consultancy chatbot that logs student contact credentials even when your Dharan office is closed."
      },
      ecommerce: {
        market_insight: "Dharan's premium coffee culture, organic produce networks, and designer apparel shops require aesthetic, custom storefronts to serve delivery hubs across Koshi Province.",
        growth_metric: "52% growth in organic food shipping and boutique beverage orders across Dharan-Laxmipur sectors.",
        prominent_local_demand: "Organic farm-to-table deliveries, boutique bakery reservation, and custom lifestyle apparel sales.",
        common_operational_hurdle: "High coordination overhead for delivery riders who have to manually map addresses.",
        localized_schema_subtext: "Lifestyle E-commerce and Organic Food Outlets in Dharan, Nepal",
        trust_proof_point: "Deploy beautiful interactive shopping carts with automatic delivery routing and instant Khalti invoice verification."
      }
    }
  },
  {
    slug: "biratnagar",
    city_name: "Biratnagar",
    province: "Koshi Province",
    regional_education_hub: "Biratnagar industrial and technological corridor",
    primary_client_demographic: "Industrial managers, corporate exporters, large retail distributors, and tech graduates seeking enterprise automation solutions.",
    nearby_hubs: ["itahari", "dharan", "rangeli", "urlabari"],
    industries_data: {
      consultancy: {
        market_insight: "Biratnagar's industrial framework requires specialized tax advisory firms, corporate registration consultancies, and digital marketing agencies.",
        growth_metric: "28% rise in businesses seeking local financial advisory, tax filing, and digital brand consultancy.",
        prominent_local_demand: "Company registration advisory, tax filing consultation, and B2B corporate branding catalogs.",
        common_operational_hurdle: "Manually emailing PDF tax proposals and tracking client document files.",
        localized_schema_subtext: "Corporate and Tax Advisory Consultation Services in Biratnagar, Nepal",
        trust_proof_point: "Securely distribute client proposals and allow booking consultations directly into your calendar."
      },
      ecommerce: {
        market_insight: "As Nepal's major industrial city, Biratnagar's retail wholesalers are seeking high-density B2B ordering pages and bulk distribution systems to automate order intakes.",
        growth_metric: "60% surge in local retail distributors moving from phone orders to bulk online checkouts.",
        prominent_local_demand: "Industrial raw supplies, wholesale FMCG distribution, and electronic catalog portals.",
        common_operational_hurdle: "Processing high-volume bulk orders on WhatsApp leads to manual entry delays and inventory mismatches.",
        localized_schema_subtext: "Industrial Distribution and Bulk Wholesale E-commerce in Biratnagar, Nepal",
        trust_proof_point: "Implement direct inventory-linked checkouts with instant ConnectIPS bank transfer verifications for B2B transactions."
      }
    }
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected successfully.");

    // Delete existing entries to prevent index collision on re-seeds
    const slugs = locationsData.map((d) => d.slug);
    await Location.deleteMany({ slug: { $in: slugs } });
    console.log("Cleaned existing locations matching slugs.");

    // Seed data
    await Location.insertMany(locationsData);
    console.log("Successfully seeded locations dataset to MongoDB!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
}

seed();
