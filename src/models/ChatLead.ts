import mongoose from "mongoose";

const CHAT_LEAD_TTL_SECONDS = 60 * 60 * 24 * 3;

const ChatLeadSchema = new mongoose.Schema(
  {
    fingerprint: { type: String, required: true, index: true },
    dayKey: { type: String, required: true, index: true },
    lang: { type: String, enum: ["en", "ne"], default: "en" },
    page: { type: String, default: "landing" },
    planFocus: { type: String, default: "" },
    businessIntent: { type: String, default: "" },
    message: { type: String, required: true },
    reply: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "chat_leads",
  }
);

ChatLeadSchema.index({ dayKey: 1, createdAt: -1 });
ChatLeadSchema.index({ createdAt: 1 }, { expireAfterSeconds: CHAT_LEAD_TTL_SECONDS });

const ChatLead =
  mongoose.models.ChatLead || mongoose.model("ChatLead", ChatLeadSchema);

export default ChatLead;
