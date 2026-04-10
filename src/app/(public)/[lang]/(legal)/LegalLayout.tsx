import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";

const PRE_LAUNCH = false;

type LegalLayoutProps = {
  lang: string;
  icon: LucideIcon;
  gradient: string; // e.g. "from-blue-600 to-indigo-700"
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  updatedEn: string;
  updatedNe: string;
  backLabelEn: string;
  backLabelNe: string;
  slug: string;
  children: React.ReactNode; // the content sections
};

export default function LegalLayout({
  lang,
  icon: Icon,
  gradient,
  titleEn,
  titleNe,
  descEn,
  descNe,
  updatedEn,
  updatedNe,
  backLabelEn,
  backLabelNe,
  slug,
  children,
}: LegalLayoutProps) {
  const ne = lang === "ne";
  const title = ne ? titleNe : titleEn;
  const desc = ne ? descNe : descEn;
  const upd = ne ? updatedNe : updatedEn;
  const back = ne ? backLabelNe : backLabelEn;
  const d = getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col">
      <div className="flex-1">
        {/* ── Language switcher + back link bar ───────────────────────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← {back}
            </Link>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["en", "ne"] as const).map((l) => (
                <Link
                  key={l}
                  href={`/${l}/${slug}`}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === l ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-700"}`}
                >
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <div className={`bg-gradient-to-r ${gradient} text-white`}>
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-medium text-white/60">
                HamroLink Digital · {title}
              </div>
            </div>
            <h1 className="text-4xl font-black mb-3">{title}</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              {desc}
            </p>
            <p className="mt-4 text-sm text-white/50">{upd}</p>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 py-12">{children}</div>
      </div>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <Footer
        lang={lang}
        d={d}
        PRE_LAUNCH={PRE_LAUNCH}
        ctaHref={(href) => (PRE_LAUNCH ? `https://app.hamrolink.com` : href)}
      />
    </div>
  );
}
