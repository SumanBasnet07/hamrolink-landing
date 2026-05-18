import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustryBlock {
  market_insight: string;
  growth_metric: string;
  prominent_local_demand: string;
  common_operational_hurdle: string;
  localized_schema_subtext: string;
  trust_proof_point: string;
}

export interface ILocation extends Document {
  slug: string;
  city_name: string;
  province: string;
  regional_education_hub: string;
  primary_client_demographic: string;
  nearby_hubs: string[];
  industries_data: Record<string, IIndustryBlock>;
}

const LocationSchema = new Schema<ILocation>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    city_name: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    regional_education_hub: {
      type: String,
      trim: true,
    },
    primary_client_demographic: {
      type: String,
      trim: true,
    },
    nearby_hubs: {
      type: [String],
      default: [],
    },
    industries_data: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: "locations", // Explicitly query the 'locations' collection in MongoDB
  }
);

// Prevent re-definition issues due to HMR in Next.js Server Components
export const Location: Model<ILocation> =
  mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);
