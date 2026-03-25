// app/[lang]/(legal)/LegalLayout.tsx
// Shared chrome for all 4 legal pages — bilingual header + lang switcher + body

import Link from "next/link";
import { LucideIcon } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
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
              HamroLink · {title}
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

      {/* ── Footer strip ────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-white pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <img src="/og-image.png" alt="HamroLink" className="h-8 w-auto transition-all" />
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-900 font-bold text-sm">
                {ne ? "हाम्रोलिङ्क डिजिटल" : "Hamrolink Digital"}
              </h4>
              <p className="text-xs text-gray-500">
                {ne
                  ? "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल"
                  : "Pakhribas-04, Dhankuta, Koshi Province, Nepal"}
              </p>
              <p className="text-[10px] text-gray-400">
                {ne
                  ? "प्रोप्राइटर: लिला बस्नेत | संस्थापक: सुमन बस्नेत"
                  : "Proprietor: Lila Basnet | Founder: Suman Basnet"}
              </p>
              <p className="text-[10px] text-gray-400">
                {ne
                  ? "दर्ता नं: ध-९४५८/०८२/०८३ | प्यान नं: ६२३२५११९१"
                  : "Reg No: ध-९४५८/०८२/०८३ | PAN: ६२३२५११९१"}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-end justify-end space-y-4">
            <div className="flex flex-col md:items-end gap-1">
              <div className="flex gap-6 text-sm mb-2">
                {[
                  [lang === "ne" ? "गोपनीयता" : "Privacy", "privacy"],
                  [lang === "ne" ? "सर्तहरू" : "Terms", "terms"],
                  [lang === "ne" ? "फिर्ता" : "Refund", "refund"],
                  [lang === "ne" ? "FAQ" : "FAQ", "faqs"],
                ].map(([label, slug]) => (
                  <Link
                    key={slug}
                    href={`/${lang}/${slug}`}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <a href="mailto:support@hamrolink.com" className="hover:text-gray-900 transition-colors">support@hamrolink.com</a>
                <span className="text-gray-200">|</span>
                <a href="tel:+9779816326639" className="hover:text-gray-900 transition-colors">+977-9816326639</a>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} HamroLink · Built with ❤️ in Nepal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
