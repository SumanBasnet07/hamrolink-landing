// models/WaitlistUser.ts — Mongoose model for tracking waitlist signups
import mongoose from "mongoose";

const WaitlistUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: "",
    },
    businessType: {
      type: String,
      default: "", // "shop", "school", etc.
    },
    studentCount: { // Optional for institutional leads
      type: String,
      default: "",
    },
    position: {
      type: Number,
      default: 0,
    },
    rewardType: {
      type: String,
      enum: ["LOCAL_START", "100_CREDITS", "STANDARD"],
      default: "STANDARD",
    },
    notified: { // If the welcome email has been sent successfully
      type: Boolean,
      default: false,
    },
    lastNotifiedAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for sorting/lookup
WaitlistUserSchema.index({ position: 1 });
WaitlistUserSchema.index({ email: 1 });

const WaitlistUser =
  mongoose.models.WaitlistUser || mongoose.model("WaitlistUser", WaitlistUserSchema);

export default WaitlistUser;
