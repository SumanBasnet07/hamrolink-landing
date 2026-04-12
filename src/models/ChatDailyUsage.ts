import mongoose from "mongoose";

const ChatDailyUsageSchema = new mongoose.Schema(
  {
    fingerprint: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    dayKey: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ChatDailyUsageSchema.index({ fingerprint: 1, dayKey: 1 }, { unique: true });

const ChatDailyUsage =
  mongoose.models.ChatDailyUsage ||
  mongoose.model("ChatDailyUsage", ChatDailyUsageSchema);

export default ChatDailyUsage;
