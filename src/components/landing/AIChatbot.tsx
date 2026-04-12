"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { getRelevantKnowledgeSnippets } from "@/lib/chatbotKnowledge";

type ChatMsg = {
  role: "assistant" | "user";
  content: string;
};

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={`strong-${idx}`} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={`text-${idx}`}>{part}</React.Fragment>;
  });
}

function FormattedAssistantMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1">
          {items.map((item, idx) => (
            <li key={`uli-${idx}`}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 space-y-1">
          {items.map((item, idx) => (
            <li key={`oli-${idx}`}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^[-*]\s+/.test(lines[i].trim()) && !/^\d+\.\s+/.test(lines[i].trim())) {
      paragraphLines.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {renderInlineMarkdown(paragraphLines.join(" "))}
      </p>
    );
  }

  return <div className="space-y-2">{blocks}</div>;
}

function getClientId() {
  const key = "hl_chat_client_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `hl-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(key, generated);
  return generated;
}

export function AIChatbot({ ne }: { ne: boolean }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileViewportTop, setMobileViewportTop] = useState(0);
  const [mobileViewportHeight, setMobileViewportHeight] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(20);
  const [needsHumanHelp, setNeedsHumanHelp] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const whatsappHref = ne
    ? "https://wa.me/9779816326639?text=नमस्ते%20HamroLink%20team%2C%20मलाई%20chatbot%20बाट%20नपाएको%20सहायता%20चाहिएको%20छ%E0%A5%A4"
    : "https://wa.me/9779816326639?text=Hi%20HamroLink%20team%2C%20I%20need%20help%20with%20a%20question%20the%20chatbot%20could%20not%20fully%20answer.";

  const welcome = useMemo(
    () =>
      ne
        ? "नमस्ते! म HamroLink सहायक हुँ। वेबसाइट सुरु गर्न वा प्लानबारे जे सोध्न चाहनुहुन्छ, सोध्नुहोस्।"
        : "Hi! I am your HamroLink assistant. Ask me anything about launching your website or choosing a plan.",
    [ne]
  );

  useEffect(() => {
    setMessages([{ role: "assistant", content: welcome }]);
  }, [welcome]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open || !isMobile) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (!open || !isMobile) {
      setMobileViewportTop(0);
      setMobileViewportHeight(null);
      return;
    }

    const viewport = window.visualViewport;
    const syncViewport = () => {
      if (!viewport) return;

      setMobileViewportTop(Math.max(0, Math.floor(viewport.offsetTop)));
      setMobileViewportHeight(Math.max(320, Math.floor(viewport.height)));

      if (listRef.current) {
        requestAnimationFrame(() => {
          if (!listRef.current) return;
          listRef.current.scrollTop = listRef.current.scrollHeight;
        });
      }
    };

    if (viewport) {
      syncViewport();
      viewport.addEventListener("resize", syncViewport);
      viewport.addEventListener("scroll", syncViewport);

      return () => {
        viewport.removeEventListener("resize", syncViewport);
        viewport.removeEventListener("scroll", syncViewport);
      };
    }

    const syncWindowHeight = () => {
      setMobileViewportTop(0);
      setMobileViewportHeight(Math.max(320, window.innerHeight));
    };

    syncWindowHeight();
    window.addEventListener("resize", syncWindowHeight);
    return () => {
      window.removeEventListener("resize", syncWindowHeight);
    };
  }, [open, isMobile]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    if ((remaining ?? 1) <= 0) return;

    const userMsg: ChatMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const clientId = getClientId();
      const knowledge = getRelevantKnowledgeSnippets({
        message: text,
        lang: ne ? "ne" : "en",
        maxSnippets: 4,
      });

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": clientId,
        },
        body: JSON.stringify({
          message: text,
          lang: ne ? "ne" : "en",
          context: {
            page: "hamrolink-landing",
            planFocus: "LOCAL_START_TRIAL_15_DAYS",
            sourceDocuments: knowledge.sourceDocuments,
            docSnippets: knowledge.snippets,
            hasKnowledgeMatch: knowledge.hasKnowledgeMatch,
            topKnowledgeScore: knowledge.topScore,
          },
          history: nextMessages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (typeof data?.remaining === "number") setRemaining(data.remaining);
      setNeedsHumanHelp(Boolean(data?.needsHumanHelp));

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data?.error ||
              (ne ? "अहिले उत्तर दिन सकिएन, फेरि प्रयास गर्नुहोस्।" : "Could not reply right now, please try again."),
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.reply || (ne ? "ठीक छ, अझ सोध्नुहोस्।" : "Sure, ask me another question."),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: ne ? "नेटवर्क समस्या भयो, फेरि प्रयास गर्नुहोस्।" : "Network issue, please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed z-50 transition-[top] duration-150 ${open && isMobile ? "inset-x-0" : "bottom-6 right-6"}`}
      style={open && isMobile ? { top: `${mobileViewportTop}px`, bottom: "auto" } : undefined}
    >
      {open ? (
        <div
          className="w-screen md:w-80 md:max-w-[calc(100vw-1.5rem)] rounded-t-3xl md:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl flex flex-col h-[80dvh] md:h-[min(75dvh,34rem)]"
          style={open && isMobile && mobileViewportHeight ? { height: `${mobileViewportHeight}px` } : undefined}
        >
          {isMobile ? (
            <div className="flex justify-center bg-slate-900 pt-2 pb-1">
              <span className="h-1.5 w-12 rounded-full bg-white/45" aria-hidden="true" />
            </div>
          ) : null}
          <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <p className="text-sm font-black">{ne ? "HamroLink सहायक" : "HamroLink Assistant"}</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10" aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600">
            {ne ? "आज बाँकी सन्देश:" : "Messages left today:"} {remaining ?? "-"}/20
          </div>

          <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 bg-white">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-indigo-600 text-white rounded-br-md"
                    : "mr-auto bg-slate-100 text-slate-800 rounded-bl-md"
                }`}
              >
                {m.role === "assistant" ? <FormattedAssistantMessage content={m.content} /> : m.content}
              </div>
            ))}
            {loading ? (
              <div className="mr-auto bg-slate-100 text-slate-700 rounded-2xl rounded-bl-md px-3 py-2 text-sm">
                {ne ? "टाइप गर्दै..." : "Typing..."}
              </div>
            ) : null}
          </div>

          <div className="p-3 border-t border-slate-200 bg-white">
            {needsHumanHelp ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 h-10 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-black flex items-center justify-center"
              >
                {ne ? "WhatsApp मा सम्पर्क गर्नुहोस्" : "Contact on WhatsApp"}
              </a>
            ) : null}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                onFocus={() => {
                  requestAnimationFrame(() => {
                    if (!listRef.current) return;
                    listRef.current.scrollTop = listRef.current.scrollHeight;
                  });
                }}
                disabled={loading || (remaining ?? 1) <= 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="sentences"
                className="flex-1 h-11 rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder={
                  (remaining ?? 1) <= 0
                    ? ne
                      ? "आजको सीमा सकियो"
                      : "Daily limit reached"
                    : ne
                      ? "आफ्नो प्रश्न लेख्नुहोस्..."
                      : "Ask your question..."
                }
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim() || (remaining ?? 1) <= 0}
                className="h-11 w-11 rounded-xl bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-2xl shadow-amber-500/40 px-4 pl-3 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </span>
          <span className="text-xs font-black whitespace-nowrap">
            {ne ? "AI सहायक" : "AI Assistant"}
          </span>
        </button>
      )}
    </div>
  );
}
