// app/[lang]/blog/school-website-nepal-why-every-school-should-be-online/page.tsx
// Bilingual (EN + NE) blog article — legal-style layout
// JSON-LD: Article + FAQPage + BreadcrumbList schemas
// Deploy: app/[lang]/blog/school-website-nepal-why-every-school-should-be-online/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, Globe, Search, AlertTriangle, Sparkles,
  ArrowRight, ChevronDown, LayoutDashboard, Clock, Star,
  CheckCircle, Building2, Users, Camera, Zap, TrendingUp,
  MessageSquare, Bell, BookOpen, CalendarDays, Shield,
} from "lucide-react";

// ─── Slug ─────────────────────────────────────────────────────────────────────
const SLUG = "school-website-nepal-why-every-school-should-be-online";
const DATE_PUBLISHED = "2026-03-13";
const DATE_MODIFIED  = "2026-03-13";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const ne = lang === "ne";
  return {
    title: ne
      ? "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ"
      : "School Website in Nepal: Why Every School Should Be Online in 2026",
    description: ne
      ? "मुखको चर्चा मात्र पर्याप्त छैन। वेबसाइटले कसरी विद्यालयको विश्वसनीयता, भर्ना र अभिभावक सञ्चार सुधार गर्छ भनी जान्नुहोस्।"
      : "Relying only on word-of-mouth? Learn why a professional website is crucial for Nepali schools to improve enrollment and parent communication.",
    keywords: ne
      ? ["विद्यालय वेबसाइट नेपाल", "नेपाली विद्यालय अनलाइन", "विद्यालय डिजिटल नेपाल", "HamroLink विद्यालय"]
      : ["school website Nepal", "Nepali school online presence", "how schools can go digital", "school marketing Nepal", "digital tools for schools Nepal"],
    openGraph: {
      type: "article",
      locale: ne ? "ne_NP" : "en_US",
      siteName: "HamroLink",
      title: ne
        ? "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ"
        : "School Website in Nepal: Why Every School Should Be Online in 2026",
      description: ne
        ? "वेबसाइटले विद्यालयको विश्वसनीयता, भर्ना र अभिभावक सञ्चार कसरी सुधार गर्छ।"
        : "Why a website can transform enrollment, credibility, and parent communication for Nepali schools.",
      url: `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
      images: [
        {
          url: "https://hamrolink.com/school-website-nepal.jpg",
          width: 1200,
          height: 630,
          alt: ne
            ? "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ"
            : "Why Every School in Nepal Needs a Website in 2026",
        },
      ],
    },
    alternates: {
      canonical: `https://hamrolink.com/${lang}/blog/${SLUG}`,
      languages: {
        "en": `https://hamrolink.com/en/blog/${SLUG}`,
        "ne": `https://hamrolink.com/ne/blog/${SLUG}`,
        "x-default": `https://hamrolink.com/en/blog/${SLUG}`,
      },
    },
  };
}

// ─── JSON-LD: Article ─────────────────────────────────────────────────────────
function ArticleSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ne
      ? "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ"
      : "School Website in Nepal: Why Every School Should Be Online in 2026",
    "description": ne
      ? "वेबसाइटले विद्यालयको विश्वसनीयता, भर्ना र अभिभावक सञ्चार कसरी सुधार गर्छ।"
      : "Why a website can transform enrollment, credibility, and parent communication for Nepali schools.",
    "image": {
      "@type": "ImageObject",
      "url": "https://hamrolink.com/school-website-nepal.jpg",
      "width": 1200,
      "height": 630,
      "caption": ne
        ? "नेपालको विद्यालयका लागि वेबसाइट"
        : "School website for Nepal — HamroLink",
    },
    "author": { "@type": "Organization", "name": "HamroLink", "url": "https://hamrolink.com" },
    "publisher": {
      "@type": "Organization",
      "name": "HamroLink",
      "logo": { "@type": "ImageObject", "url": "https://hamrolink.com/icons/icon-192.png" },
    },
    "datePublished": DATE_PUBLISHED,
    "dateModified":  DATE_MODIFIED,
    "inLanguage": ne ? "ne" : "en",
    "url": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": ne ? "नेपाली विद्यालय वेबसाइट" : "Nepal School Website",
    },
    "keywords": ne
      ? "विद्यालय वेबसाइट नेपाल, नेपाली विद्यालय डिजिटल, HamroLink विद्यालय"
      : "school website Nepal, Nepali school online presence, digital marketing for schools Nepal",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

// ─── JSON-LD: Breadcrumb ──────────────────────────────────────────────────────
function BreadcrumbSchema({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "HamroLink", "item": "https://hamrolink.com" },
      { "@type": "ListItem", "position": 2, "name": ne ? "ब्लग" : "Blog", "item": `https://hamrolink.com/${ne ? "ne" : "en"}/blog` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ne ? "नेपालको हरेक विद्यालयलाई वेबसाइट किन चाहिन्छ" : "School Website in Nepal: Why Every School Should Be Online",
        "item": `https://hamrolink.com/${ne ? "ne" : "en"}/blog/${SLUG}`,
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

// ─── JSON-LD: FAQ ─────────────────────────────────────────────────────────────
function FAQSchema({ lang }: { lang: string }) {
  const faqs = lang === "ne" ? FAQ_NE : FAQ_EN;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>;
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_EN = [
  {
    q: "Can a small school in Nepal afford a website?",
    a: "Yes. Platforms like HamroLink make websites affordable and easy to manage. With plans starting at NPR 349 per month, even small community schools or private tutoring centres can have a professional website without a large budget or technical team.",
  },
  {
    q: "Do schools really need a website if they are active on Facebook?",
    a: "Yes. A Facebook page helps communicate with existing followers, but it does not appear in Google search results when parents look for schools. A website ensures search visibility, gives the school full control over its information, and builds lasting credibility — things a Facebook page simply cannot do.",
  },
  {
    q: "How long does it take to set up a school website with HamroLink?",
    a: "With HamroLink's ready-made school templates, most schools can launch their website in under one hour. You choose a template, add your school name, programs, contact details, admission information, and photos — and your website is live.",
  },
  {
    q: "What information should a school website include?",
    a: "A school website should include: school name and location, academic programs and grade levels, admission process and fee structure, contact details and a contact form, principal/faculty profiles, news and announcements, upcoming events, and photos or a gallery of the campus.",
  },
  {
    q: "Will a school website help with student enrollment?",
    a: "Yes, significantly. When parents search 'best schools near me' or 'school admission Kathmandu 2026' on Google, only schools with websites appear in those results. A clear website with admission information, fee structure, and contact details makes it easy for interested parents to take the next step.",
  },
  {
    q: "Is a school website mobile-friendly?",
    a: "All HamroLink websites are automatically mobile-optimised. Since most parents in Nepal browse on smartphones, this is essential. Your school's website will look great and work perfectly on any device — phones, tablets, or desktops.",
  },
];

const FAQ_NE = [
  {
    q: "के नेपालको सानो विद्यालय वेबसाइटको खर्च उठाउन सक्छ?",
    a: "हो। HamroLink जस्ता प्लेटफर्महरूले वेबसाइटलाई किफायती र व्यवस्थापन गर्न सजिलो बनाउँछन्। NPR ३४९ प्रति महिनाबाट सुरु हुने योजनाहरूसँग, सानो सामुदायिक विद्यालय वा निजी ट्युटरिङ केन्द्रले पनि ठूलो बजेट वा प्राविधिक टोली बिना व्यावसायिक वेबसाइट राख्न सक्छ।",
  },
  {
    q: "के विद्यालयहरूलाई साँच्चै वेबसाइट चाहिन्छ यदि उनीहरू फेसबुकमा सक्रिय छन् भने?",
    a: "हो। फेसबुक पेजले अवस्थित फलोअरहरूसँग सञ्चार गर्न मद्दत गर्छ, तर अभिभावकहरूले विद्यालय खोज्दा Google खोज परिणामहरूमा देखिँदैन। वेबसाइटले खोज दृश्यता, सम्पूर्ण जानकारी नियन्त्रण र दीर्घकालीन विश्वसनीयता सुनिश्चित गर्छ।",
  },
  {
    q: "HamroLink सँग विद्यालय वेबसाइट सेटअप गर्न कति समय लाग्छ?",
    a: "HamroLink को तयार-बनाइएको विद्यालय टेम्प्लेटहरूसँग, अधिकांश विद्यालयहरूले एक घण्टाभन्दा कम समयमा आफ्नो वेबसाइट लञ्च गर्न सक्छन्। टेम्प्लेट छान्नुहोस्, विद्यालयको नाम, कार्यक्रम, सम्पर्क विवरण, भर्ना जानकारी र फोटो थप्नुहोस् — र तपाईंको वेबसाइट लाइभ छ।",
  },
  {
    q: "विद्यालय वेबसाइटमा कस्तो जानकारी समावेश गर्नुपर्छ?",
    a: "विद्यालय वेबसाइटमा समावेश गर्नुपर्ने: विद्यालयको नाम र स्थान, शैक्षिक कार्यक्रम र कक्षा स्तरहरू, भर्ना प्रक्रिया र शुल्क संरचना, सम्पर्क विवरण र सम्पर्क फारम, प्रधानाध्यापक/शिक्षक प्रोफाइलहरू, समाचार र सूचनाहरू, आगामी कार्यक्रमहरू र क्याम्पसका फोटोहरू।",
  },
  {
    q: "के विद्यालय वेबसाइटले विद्यार्थी भर्नामा मद्दत गर्छ?",
    a: "हो, उल्लेखनीय रूपमा। जब अभिभावकहरूले Google मा 'मेरो नजिकको सबैभन्दा राम्रो विद्यालय' वा 'काठमाडौं विद्यालय भर्ना २०२६' खोज्छन्, वेबसाइट भएका विद्यालयहरूमात्र ती परिणामहरूमा देखिन्छन्। स्पष्ट भर्ना जानकारी, शुल्क संरचना र सम्पर्क विवरण भएको वेबसाइटले रुचि भएका अभिभावकहरूलाई अर्को कदम चाल्न सजिलो बनाउँछ।",
  },
  {
    q: "के विद्यालय वेबसाइट मोबाइल-अनुकूल हुन्छ?",
    a: "सबै HamroLink वेबसाइटहरू स्वतः मोबाइल-अप्टिमाइज गरिएका छन्। नेपालमा अधिकांश अभिभावकहरू स्मार्टफोनमा ब्राउज गर्ने भएकाले यो अत्यावश्यक छ। तपाईंको विद्यालयको वेबसाइट कुनै पनि उपकरण — फोन, ट्याब्लेट वा डेस्कटप — मा राम्रो देखिनेछ।",
  },
];

// ─── Color map ────────────────────────────────────────────────────────────────
const CM: Record<string, { bg:string; border:string; text:string; ibg:string }> = {
  blue:    { bg:"bg-blue-50",    border:"border-blue-100",    text:"text-blue-700",    ibg:"bg-blue-100"    },
  orange:  { bg:"bg-orange-50",  border:"border-orange-100",  text:"text-orange-700",  ibg:"bg-orange-100"  },
  emerald: { bg:"bg-emerald-50", border:"border-emerald-100", text:"text-emerald-700", ibg:"bg-emerald-100" },
  violet:  { bg:"bg-violet-50",  border:"border-violet-100",  text:"text-violet-700",  ibg:"bg-violet-100"  },
  indigo:  { bg:"bg-indigo-50",  border:"border-indigo-100",  text:"text-indigo-700",  ibg:"bg-indigo-100"  },
  teal:    { bg:"bg-teal-50",    border:"border-teal-100",    text:"text-teal-700",    ibg:"bg-teal-100"    },
  pink:    { bg:"bg-pink-50",    border:"border-pink-100",    text:"text-pink-700",    ibg:"bg-pink-100"    },
};

// ─── Inline SVG: Social Media vs Website for Schools infographic ──────────────
function SocialVsWebsiteInfographic({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const rows = ne
    ? [
        { label:"Google मा देखिन्छ",         fb:"❌", web:"✅" },
        { label:"खाता बन्द हुने जोखिम",       fb:"⚠️", web:"✅" },
        { label:"भर्ना फारम राख्न सकिन्छ",   fb:"❌", web:"✅" },
        { label:"शुल्क संरचना देखाउन सकिन्छ", fb:"⚠️", web:"✅" },
        { label:"कार्यक्रम क्यालेन्डर",       fb:"⚠️", web:"✅" },
        { label:"24/7 उपलब्ध जानकारी",        fb:"⚠️", web:"✅" },
        { label:"व्यावसायिक छवि",             fb:"⚠️", web:"✅" },
        { label:"सेटअप गर्न निःशुल्क",        fb:"✅", web:"⚠️" },
        { label:"समुदाय संलग्नता",            fb:"✅", web:"⚠️" },
      ]
    : [
        { label:"Appears on Google",          fb:"❌", web:"✅" },
        { label:"Risk of account ban",        fb:"⚠️", web:"✅" },
        { label:"Admission form",             fb:"❌", web:"✅" },
        { label:"Fee structure display",      fb:"⚠️", web:"✅" },
        { label:"Events calendar",            fb:"⚠️", web:"✅" },
        { label:"Info available 24/7",        fb:"⚠️", web:"✅" },
        { label:"Professional image",         fb:"⚠️", web:"✅" },
        { label:"Free to set up",             fb:"✅", web:"⚠️" },
        { label:"Community engagement",       fb:"✅", web:"⚠️" },
      ];

  return (
    <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow-sm my-2">
      {/* Header */}
      <div className="grid grid-cols-3 bg-gray-900 text-white text-xs font-black">
        <div className="px-4 py-3 text-gray-400">{ne ? "सुविधा" : "Feature"}</div>
        <div className="px-4 py-3 text-center bg-blue-700">📘 {ne ? "सामाजिक सञ्जाल" : "Social Media"}</div>
        <div className="px-4 py-3 text-center bg-emerald-700">🌐 {ne ? "वेबसाइट" : "Website"}</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} className={`grid grid-cols-3 border-t border-gray-100 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
          <div className="px-4 py-3 text-gray-700 font-medium">{r.label}</div>
          <div className="px-4 py-3 text-center text-base">{r.fb}</div>
          <div className="px-4 py-3 text-center text-base">{r.web}</div>
        </div>
      ))}
      <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-2.5 text-xs text-emerald-700 font-semibold text-center">
        {ne
          ? "✅ पूर्ण समर्थन  ⚠️ सीमित  ❌ समर्थित छैन"
          : "✅ Full support  ⚠️ Limited  ❌ Not supported"}
      </div>
    </div>
  );
}

// ─── Inline SVG: Parent → Website → Enrolment flowchart ──────────────────────
function EnrollmentFlowchart({ lang }: { lang: string }) {
  const ne = lang === "ne";
  const steps = ne
    ? [
        { icon:"👨‍👩‍👧", label:"अभिभावक", sub:"विद्यालय खोज्दैछन्" },
        { icon:"🔍", label:"Google मा खोज्छन्", sub:"'नजिकको राम्रो विद्यालय'" },
        { icon:"🌐", label:"वेबसाइट भेट्टाउँछन्", sub:"तपाईंको विद्यालय देखिन्छ" },
        { icon:"📋", label:"कार्यक्रम हेर्छन्", sub:"भर्ना + शुल्क + सुविधाहरू" },
        { icon:"📞", label:"सम्पर्क गर्छन्", sub:"फारम भर्छन् / कल गर्छन्" },
        { icon:"🎓", label:"भर्ना हुन्छन्", sub:"नयाँ विद्यार्थी ✓" },
      ]
    : [
        { icon:"👨‍👩‍👧", label:"Parent", sub:"Looking for a school" },
        { icon:"🔍", label:"Searches on Google", sub:"'best school near me'" },
        { icon:"🌐", label:"Finds your website", sub:"Your school appears" },
        { icon:"📋", label:"Reviews programs", sub:"Admission + fees + facilities" },
        { icon:"📞", label:"Contacts the school", sub:"Fills form / calls" },
        { icon:"🎓", label:"Enrolls", sub:"New student ✓" },
      ];

  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 my-2">
      <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4 text-center">
        {ne ? "भर्ना यात्रा: अभिभावकदेखि विद्यार्थीसम्म" : "Enrollment Journey: Parent → Student"}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center text-center w-24">
              <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-200 shadow-sm flex items-center justify-center text-2xl mb-1">
                {step.icon}
              </div>
              <span className="text-xs font-black text-gray-900 leading-tight">{step.label}</span>
              <span className="text-[10px] text-gray-400 leading-tight mt-0.5">{step.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-indigo-300 shrink-0 hidden sm:block"/>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-indigo-500 font-semibold mt-4 pt-3 border-t border-indigo-100">
        {ne
          ? "🔑 यो यात्रा वेबसाइट बिना सम्भव छैन — Google ले फेसबुक पेजहरू खोज परिणामहरूमा देखाउँदैन।"
          : "🔑 This journey is impossible without a website — Google doesn't show Facebook pages in search results."}
      </p>
    </div>
  );
}

// ─── School website template screenshot (coded mock) ─────────────────────────
function SchoolTemplateMock({ lang }: { lang: string }) {
  const ne = lang === "ne";
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl my-2">
      {/* Browser bar */}
      <div className="bg-gray-900 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"/>
        </div>
        <div className="flex-1 bg-gray-700/60 rounded-md px-2.5 py-1 text-[10px] text-gray-300 font-mono">
          valley-academy.hamrolink.com
        </div>
      </div>
      {/* School website preview */}
      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-4 py-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-black text-sm">VA</div>
            <div>
              <div className="font-black text-sm">{ne ? "भ्याली एकेडेमी" : "Valley Academy"}</div>
              <div className="text-emerald-200 text-[10px]">{ne ? "काठमाडौं, नेपाल · Est. 1995" : "Kathmandu, Nepal · Est. 1995"}</div>
            </div>
            <div className="ml-auto bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">
              {ne ? "भर्ना खुला" : "Admissions Open"}
            </div>
          </div>
          <h3 className="text-base font-black leading-snug">
            {ne ? "उत्कृष्ट शिक्षा, उज्ज्वल भविष्य" : "Excellence in Education, Bright Futures"}
          </h3>
          <p className="text-emerald-200 text-[10px] mt-0.5">{ne ? "नर्सरी देखि कक्षा १२ सम्म" : "Nursery to Grade 12"}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 bg-white text-emerald-700 rounded-lg text-[10px] font-black">{ne ? "भर्ना फारम" : "Admission Form"}</button>
            <button className="px-3 py-1.5 border border-white/30 rounded-lg text-[10px] font-semibold">{ne ? "थप जान्नुहोस्" : "Learn More"}</button>
          </div>
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-4 border-b border-gray-100">
          {[
            ne ? ["१,५००+","विद्यार्थी"] : ["1,500+","Students"],
            ne ? ["९८%","पास दर"] : ["98%","Pass Rate"],
            ne ? ["८०+","शिक्षक"] : ["80+","Teachers"],
            ne ? ["३०","वर्ष"] : ["30","Years"],
          ].map(([v,l]) => (
            <div key={l} className="py-2.5 text-center border-r border-gray-100 last:border-0">
              <div className="text-sm font-black text-emerald-700">{v}</div>
              <div className="text-[9px] text-gray-400">{l}</div>
            </div>
          ))}
        </div>
        {/* Navigation tabs */}
        <div className="flex gap-3 px-4 py-2 border-b border-gray-100 overflow-x-auto">
          {(ne
            ? ["गृहपृष्ठ","कार्यक्रमहरू","भर्ना","शिक्षकहरू","समाचार","सम्पर्क"]
            : ["Home","Programs","Admissions","Faculty","News","Contact"]
          ).map((tab, i) => (
            <span key={tab} className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded ${i === 0 ? "bg-emerald-100 text-emerald-700" : "text-gray-400"}`}>{tab}</span>
          ))}
        </div>
        {/* Programs grid */}
        <div className="p-3 grid grid-cols-3 gap-2">
          {(ne
            ? [["📗","प्राथमिक","नर्सरी–५"],["📘","माध्यमिक","६–१०"],["📙","उच्च माध्यमिक","११–१२"]]
            : [["📗","Primary","Nursery–5"],["📘","Secondary","6–10"],["📙","Higher Sec.","11–12"]]
          ).map(([e,n,d]) => (
            <div key={n} className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
              <div className="text-base mb-1">{e}</div>
              <div className="text-[9px] font-black text-gray-800">{n}</div>
              <div className="text-[8px] text-gray-400">{d}</div>
            </div>
          ))}
        </div>
        <div className="px-3 pb-3 text-[9px] text-gray-400 text-center">
          {ne ? "HamroLink वेबसाइट टेम्प्लेट — विद्यालयका लागि" : "HamroLink website template — designed for schools"}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gray-200 rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
        <span className="font-bold text-gray-900 text-sm leading-relaxed">{q}</span>
        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200"/>
      </summary>
      <div className="px-6 pb-5 pt-1 border-t border-gray-100">
        <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

// ─── Article content ──────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    publishedLabel: "Published by HamroLink · March 13, 2026",
    readTime: "8 min read",
    category: "Education & Digital",
    tocTitle: "Table of Contents",
    toc: [
      { id: "intro",           label: "Introduction" },
      { id: "how-schools-comm", label: "How Schools Currently Communicate" },
      { id: "social-problems", label: "Problems With Social Media Only" },
      { id: "website-gives",   label: "What a Website Gives Your School" },
      { id: "infographic",     label: "Social Media vs Website (Chart)" },
      { id: "get-online",      label: "How Schools Can Get Online Easily" },
      { id: "enrollment",      label: "Enrollment Flowchart" },
      { id: "ideal-setup",     label: "The Ideal Setup for Schools" },
      { id: "template",        label: "School Website Template" },
      { id: "early-access",    label: "Start Today" },
      { id: "faq",             label: "Frequently Asked Questions" },
    ],
    intro: {
      h1: "Why Every School in Nepal Needs a Website in 2026",
      paras: [
        "Across Nepal — from community schools in Rukum to private academies in Kathmandu — a quiet but important gap is widening. While parents increasingly rely on Google to research schools for their children, the vast majority of Nepali schools have no website. They depend entirely on Facebook pages, Instagram posts, WhatsApp groups, or old-fashioned word-of-mouth to reach prospective families.",
        "In 2026, this is no longer good enough. The way parents choose schools has fundamentally changed. Before visiting a school — before even calling — most parents today search online. If your school does not appear in that search, you simply do not exist in their consideration set.",
        "A website is not a luxury for well-funded private schools. It is now a basic digital requirement for any school in Nepal that wants to grow, be taken seriously, and serve its community well.",
      ],
      highlights: [
        { icon: "🔍", text: "Parents search Google before visiting" },
        { icon: "📉", text: "Facebook-only schools miss search traffic" },
        { icon: "🌐", text: "A website is now a basic requirement" },
      ],
    },
    sections: [
      {
        id: "how-schools-comm",
        icon: MessageSquare,
        color: "blue",
        h2: "How Schools in Nepal Currently Communicate",
        paras: [
          "Most Nepali schools currently use a combination of offline and social tools to reach parents and students. Understanding what they use — and why those methods fall short — is the first step toward building something better.",
        ],
        methods: [
          {
            icon: "📘",
            title: "Facebook & Instagram Pages",
            desc: "Many schools post admission notices, event photos, and exam schedules on Facebook or Instagram. These reach existing followers but are largely invisible to parents who are actively searching for new schools.",
          },
          {
            icon: "💬",
            title: "WhatsApp Groups",
            desc: "WhatsApp groups are used for parent-teacher communication within the existing school community. But they offer zero discoverability — a prospective parent cannot find your school through WhatsApp.",
          },
          {
            icon: "📋",
            title: "Notice Boards & Pamphlets",
            desc: "Physical notice boards and printed pamphlets are still widely used, especially in smaller towns. These are entirely invisible to anyone who isn't already physically near the school.",
          },
          {
            icon: "🗣",
            title: "Word-of-Mouth",
            desc: "For many schools, word-of-mouth referrals from existing parents remain the primary source of new admissions. This is valuable but unpredictable — and it scales very slowly.",
          },
        ],
        callout: {
          icon: "⚠️",
          color: "orange",
          text: "The common limitation of all these methods: they only reach people who are already aware of your school. None of them help you reach parents who are actively searching for a school on Google.",
          ne_text: "यी सबै विधिहरूको साझा सीमा: तिनीहरूले केवल पहिले नै तपाईंको विद्यालयबारे जानकार मानिसहरूसम्म मात्र पुग्छन्। यीमध्ये कुनैले पनि Google मा विद्यालय खोजिरहेका अभिभावकहरूसम्म पुग्न मद्दत गर्दैन।",
        },
      },
      {
        id: "social-problems",
        icon: AlertTriangle,
        color: "orange",
        h2: "The Problems With Relying Only on Social Media",
        paras: [
          "Social media has real value for schools — but treating it as your only digital presence creates three serious vulnerabilities.",
        ],
        subsections: [
          {
            icon: "🔒",
            h3: "You Don't Own the Platform",
            paras: [
              "When your school's entire digital presence lives on Facebook, you are building on land you do not own. Meta's algorithms control who sees your posts — and those algorithms have repeatedly reduced organic reach for pages over the years. A post that once reached 3,000 parents might now reach 300, with no warning and no recourse.",
              "More critically, your Facebook page can be restricted, reported, or suspended without notice. Schools have lost years of posts, photos, and parent communities overnight due to Meta policy changes. With a website, this risk simply does not exist — because you own it entirely.",
            ],
          },
          {
            icon: "🔍",
            h3: "Parents Can't Easily Find You on Google",
            paras: [
              "Here is the most damaging gap: when parents in Kathmandu, Pokhara, or Butwal open Google and type 'good school admission 2026' or 'best English medium school near me', the results page shows websites — not Facebook pages. Schools without websites are completely invisible in this search.",
              "This matters enormously. Studies show that over 60% of parents research schools online before making contact. If your school doesn't appear in search results, those parents will find and enroll with a competitor school that does have a website — even if your school is actually better.",
            ],
          },
          {
            icon: "🏫",
            h3: "Reduced Credibility With Parents",
            paras: [
              "When parents research a school for their child — particularly for private schools where fees represent a significant family investment — they expect to find a proper website. A school with a professional website that clearly shows its programs, faculty, facilities, and fees immediately signals permanence, accountability, and seriousness.",
              "A school with only a Facebook page — no matter how active — can appear informal, unestablished, or even temporary by comparison. In competitive school markets like Kathmandu or Pokhara, this perception gap directly costs schools admissions.",
            ],
          },
        ],
      },
      {
        id: "website-gives",
        icon: LayoutDashboard,
        color: "emerald",
        h2: "What a Website Gives Your School",
        paras: [
          "A school website is not just a digital brochure. It is a 24-hour admission officer, a trust-building tool, and a searchable record of everything your school stands for. Here is what changes when your school goes online.",
        ],
        benefits: [
          {
            icon: "🎛",
            title: "Full Control Over Information",
            desc: "Display your programs, grade levels, fee structure, faculty profiles, admission process, and school calendar — exactly as you want them shown. Update anything instantly. No algorithm decides what parents see.",
          },
          {
            icon: "🔍",
            title: "Better Visibility in Google Search",
            desc: "Parents searching 'best schools near me in Kathmandu' or 'school admission open Nepal 2026' can find your school organically. This is free visibility — no advertising spend required.",
          },
          {
            icon: "⭐",
            title: "Builds Trust and Credibility",
            desc: "A professional website with photos, faculty information, and published notices signals that your school is established, accountable, and serious about education. First impressions matter enormously to parents.",
          },
          {
            icon: "📋",
            title: "Online Admission Forms",
            desc: "Allow parents to submit preliminary interest or admission inquiries directly from your website — reducing phone call load and capturing leads even outside school hours.",
          },
          {
            icon: "📅",
            title: "Events Calendar & Notices",
            desc: "Publish exam schedules, parent-teacher meetings, holidays, and school events in one organised, always-accessible place. Parents can check anytime without joining a WhatsApp group.",
          },
          {
            icon: "📱",
            title: "Mobile-Friendly for Every Parent",
            desc: "All modern school websites are mobile-optimised. Since most Nepali parents browse on smartphones, your school website works perfectly on any device — ensuring no parent is left out.",
          },
        ],
      },
      {
        id: "get-online",
        icon: Zap,
        color: "indigo",
        h2: "How Schools Can Get Online Easily",
        paras: [
          "The biggest barrier for schools has always been cost and complexity. Hiring a developer to build a custom school website in Nepal typically costs NPR 50,000–2,00,000 or more — and requires months of back-and-forth communication, technical decisions, and ongoing maintenance.",
          "That barrier is gone. HamroLink offers ready-made school website templates that any school administrator can use — no coding, no technical knowledge, no developer required.",
        ],
        features: [
          { icon:"🎨", title:"School templates", desc:"Pre-built templates designed specifically for Nepali schools — covers everything from admission pages to faculty profiles." },
          { icon:"📱", title:"Mobile-friendly by default", desc:"Every HamroLink website is automatically optimised for smartphones — essential since most parents browse on phones." },
          { icon:"📋", title:"Admission forms", desc:"Built-in inquiry and admission forms so parents can register interest directly from your website." },
          { icon:"📅", title:"Events & notices", desc:"Publish school events, exam schedules, holidays, and notices — parents stay informed without WhatsApp groups." },
          { icon:"📰", title:"News & updates", desc:"Post school news, achievements, and announcements that appear on your website and improve Google visibility." },
          { icon:"🏷", title:"Affordable pricing", desc:"School websites from NPR 349/month. No large upfront cost. No technical maintenance required from your side." },
        ],
        highlight: {
          icon: "⚡",
          text: "No technical knowledge required. Most schools launch their HamroLink website in under 60 minutes.",
          ne_text: "कुनै प्राविधिक ज्ञान आवश्यक छैन। अधिकांश विद्यालयहरूले ६० मिनेटभन्दा कम समयमा HamroLink वेबसाइट लञ्च गर्छन्।",
        },
      },
      {
        id: "ideal-setup",
        icon: TrendingUp,
        color: "violet",
        h2: "The Ideal Setup for Schools: Website + Social Media",
        paras: [
          "The best strategy for a Nepali school in 2026 is not choosing between a website and social media. It is using both together — each doing what it does best.",
          "Social media is excellent for day-to-day engagement: sharing event photos, celebrating student achievements, posting quick updates, and keeping the existing parent community connected and informed. It builds warmth and personality around your school.",
          "A website is your school's permanent, searchable, professional home on the internet. It is where prospective parents land when they discover you through Google. It is where they read about your programs, check fees, read notices, and decide to contact you.",
          "Together, they form a complete funnel: social media creates awareness and engagement → your website converts interest into inquiries and enrollments. Remove either element and the system is less effective.",
        ],
        quote: {
          text: "Social media keeps current parents happy. Your website brings new parents to your door.",
          author: "HamroLink",
        },
      },
    ],
    earlyAccess: {
      badge: "🎓 HamroLink — Built for Nepal's Schools",
      h2: "Start Building Your School's Website Today",
      paras: [
        "If your school currently relies only on Facebook or WhatsApp, now is the time to build a real digital presence. With HamroLink, your school can be online in under an hour — with a professional website that shows programs, accepts inquiries, and helps parents find you on Google.",
        "Start for free on HamroLink and get your school's website ready before admissions season.",
      ],
      cta: "Start for Free",
      ctaHref: "https://app.hamrolink.com",
      trust: ["Start for Free", "No credit card required", "Live in under 60 minutes"],
    },
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything school administrators ask about going online in Nepal.",
    shareLabel: "Share this article",
    relatedLabel: "Related reading",
    related: [
      { label: "Why Nepali Businesses Don't Have Websites", href: "/en/blog/why-nepali-businesses-dont-have-websites" },
      { label: "Facebook vs Website for Nepali Businesses",  href: "/en/blog/facebook-page-vs-website-nepali-businesses" },
      { label: "Start for Free",                              href: "https://app.hamrolink.com" },
    ],
  },

  // ─── नेपाली ──────────────────────────────────────────────────────────────────
  ne: {
    publishedLabel: "HamroLink द्वारा प्रकाशित · मार्च १३, २०२६",
    readTime: "८ मिनेट पढाइ",
    category: "शिक्षा र डिजिटल",
    tocTitle: "सामग्री तालिका",
    toc: [
      { id: "intro",            label: "परिचय" },
      { id: "how-schools-comm", label: "विद्यालयहरूले हाल कसरी सञ्चार गर्छन्" },
      { id: "social-problems",  label: "सामाजिक सञ्जाल मात्रका समस्याहरू" },
      { id: "website-gives",    label: "वेबसाइटले विद्यालयलाई के दिन्छ" },
      { id: "infographic",      label: "सामाजिक सञ्जाल vs वेबसाइट (तालिका)" },
      { id: "get-online",       label: "विद्यालयहरू कसरी सजिलैसँग अनलाइन जान सक्छन्" },
      { id: "enrollment",       label: "भर्ना यात्रा चार्ट" },
      { id: "ideal-setup",      label: "विद्यालयका लागि आदर्श सेटअप" },
      { id: "template",         label: "विद्यालय वेबसाइट टेम्प्लेट" },
      { id: "early-access",     label: "आज नै सुरु गर्नुहोस्" },
      { id: "faq",              label: "बारम्बार सोधिने प्रश्नहरू" },
    ],
    intro: {
      h1: "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ",
      paras: [
        "नेपालभर — रुकुमका सामुदायिक विद्यालयदेखि काठमाडौंका निजी एकेडेमीसम्म — एउटा शान्त तर महत्त्वपूर्ण खाडल बढ्दैछ। अभिभावकहरूले आफ्नो बच्चाका लागि विद्यालय अनुसन्धान गर्न Google मा बढ्दो निर्भरता राख्दा, नेपालका विशाल बहुमत विद्यालयहरूसँग वेबसाइट छैन। उनीहरू सम्भावित परिवारहरूसम्म पुग्न पूर्णतः फेसबुक पेज, इन्स्टाग्राम पोस्ट, WhatsApp समूह, वा पुरानो मुखको भरमा निर्भर छन्।",
        "२०२६ मा, यो अब पर्याप्त छैन। अभिभावकहरूले विद्यालय छान्ने तरिका मौलिक रूपमा परिवर्तन भएको छ। विद्यालय भ्रमण गर्नुअघि — सम्पर्क गर्नुअघि पनि — आजका अधिकांश अभिभावकहरूले अनलाइन खोज्छन्। यदि तपाईंको विद्यालय त्यो खोजमा देखिँदैन भने, तपाईं उनीहरूको विचारमा अस्तित्वमा नै हुनुहुन्न।",
        "वेबसाइट राम्रो-वित्तपोषित निजी विद्यालयहरूका लागि विलासिता होइन। यो अब नेपालको जुनसुकै विद्यालयका लागि आधारभूत डिजिटल आवश्यकता हो जुन बढ्न, गम्भीरतापूर्वक लिइन र आफ्नो समुदायलाई राम्रोसँग सेवा गर्न चाहन्छ।",
      ],
      highlights: [
        { icon: "🔍", text: "अभिभावकहरू भ्रमणअघि Google खोज्छन्" },
        { icon: "📉", text: "केवल फेसबुक विद्यालयहरूले खोज ट्राफिक गुमाउँछन्" },
        { icon: "🌐", text: "वेबसाइट अब आधारभूत आवश्यकता हो" },
      ],
    },
    sections: [
      {
        id: "how-schools-comm",
        icon: MessageSquare,
        color: "blue",
        h2: "नेपालका विद्यालयहरूले हाल कसरी सञ्चार गर्छन्",
        paras: [
          "अधिकांश नेपाली विद्यालयहरू हाल अभिभावक र विद्यार्थीहरूसम्म पुग्न अफलाइन र सामाजिक उपकरणहरूको संयोजन प्रयोग गर्छन्। उनीहरूले के प्रयोग गर्छन् — र ती विधिहरू किन कमजोर छन् — बुझ्नु राम्रो विकल्प बनाउनेतर्फको पहिलो कदम हो।",
        ],
        methods: [
          {
            icon: "📘",
            title: "फेसबुक र इन्स्टाग्राम पेजहरू",
            desc: "धेरै विद्यालयहरूले भर्ना सूचनाहरू, कार्यक्रम फोटोहरू र परीक्षा तालिकाहरू फेसबुक वा इन्स्टाग्राममा पोस्ट गर्छन्। ती अवस्थित फलोअरहरूसम्म पुग्छन् तर नयाँ विद्यालय खोजिरहेका अभिभावकहरूका लागि लगभग अदृश्य छन्।",
          },
          {
            icon: "💬",
            title: "WhatsApp समूहरू",
            desc: "WhatsApp समूहरू अवस्थित विद्यालय समुदायभित्र अभिभावक-शिक्षक सञ्चारका लागि प्रयोग हुन्छन्। तर तिनले शून्य खोज्न सकिने क्षमता प्रदान गर्छन् — सम्भावित अभिभावकले WhatsApp मार्फत तपाईंको विद्यालय भेट्टाउन सक्दैन।",
          },
          {
            icon: "📋",
            title: "सूचना बोर्ड र पम्फलेटहरू",
            desc: "भौतिक सूचना बोर्ड र मुद्रित पम्फलेटहरू अझै व्यापक रूपमा प्रयोग हुन्छन्, विशेष गरी सानो शहरहरूमा। यी विद्यालयको नजिक नभएको जो कोहीलाई पूर्णतः अदृश्य छन्।",
          },
          {
            icon: "🗣",
            title: "मुखको भर",
            desc: "धेरै विद्यालयहरूका लागि, अवस्थित अभिभावकहरूबाट मुखको भर सिफारिस नयाँ भर्नाको प्राथमिक स्रोत रहन्छ। यो मूल्यवान छ तर अनिश्चित — र यो धेरै ढिलो बढ्छ।",
          },
        ],
        callout: {
          icon: "⚠️",
          color: "orange",
          text: "The common limitation of all these methods: they only reach people who are already aware of your school. None of them help you reach parents who are actively searching for a school on Google.",
          ne_text: "यी सबै विधिहरूको साझा सीमा: तिनीहरूले केवल पहिले नै तपाईंको विद्यालयबारे जानकार मानिसहरूसम्म मात्र पुग्छन्। यीमध्ये कुनैले पनि Google मा विद्यालय खोजिरहेका अभिभावकहरूसम्म पुग्न मद्दत गर्दैन।",
        },
      },
      {
        id: "social-problems",
        icon: AlertTriangle,
        color: "orange",
        h2: "केवल सामाजिक सञ्जालमा भर पर्दाका समस्याहरू",
        paras: [
          "सामाजिक सञ्जालको विद्यालयहरूका लागि वास्तविक मूल्य छ — तर यसलाई आफ्नो एकमात्र डिजिटल उपस्थितिको रूपमा मान्दा तीनवटा गम्भीर जोखिम उत्पन्न हुन्छन्।",
        ],
        subsections: [
          {
            icon: "🔒",
            h3: "प्लेटफर्ममा तपाईंको स्वामित्व छैन",
            paras: [
              "जब तपाईंको विद्यालयको सम्पूर्ण डिजिटल उपस्थिति फेसबुकमा बस्छ, तपाईं आफ्नो नभएको जग्गामा निर्माण गर्दैहुनुहुन्छ। Meta का एल्गोरिदमहरूले तपाईंको पोस्ट कसले देख्छ भनी नियन्त्रण गर्छन् — र ती एल्गोरिदमहरूले वर्षहरूमा पेजहरूको जैविक पहुँच बारम्बार घटाएका छन्। एकसमय ३,००० अभिभावकसम्म पुगेको पोस्ट अब कुनै चेतावनी र उपाय बिना ३०० मा पुग्न सक्छ।",
              "अझ महत्त्वपूर्ण कुरा, तपाईंको फेसबुक पेज सूचना बिना प्रतिबन्धित, रिपोर्ट वा निलम्बित हुन सक्छ। विद्यालयहरूले Meta नीति परिवर्तनका कारण रातारात वर्षौंका पोस्ट, फोटो र अभिभावक समुदायहरू गुमाएका छन्। वेबसाइटसँग, यो जोखिम अस्तित्वमा नै छैन — किनभने तपाईं यसलाई पूर्ण रूपमा स्वामित्व गर्नुहुन्छ।",
            ],
          },
          {
            icon: "🔍",
            h3: "अभिभावकहरूले Google मा सजिलैसँग तपाईंलाई भेट्टाउन सक्दैनन्",
            paras: [
              "यहाँ सबैभन्दा हानिकारक खाडल छ: जब काठमाडौं, पोखरा वा बुटवलका अभिभावकहरूले Google खोल्छन् र 'राम्रो विद्यालय भर्ना २०२६' वा 'मेरो नजिकको सबैभन्दा राम्रो अंग्रेजी माध्यम विद्यालय' टाइप गर्छन्, परिणाम पृष्ठले वेबसाइटहरू देखाउँछ — फेसबुक पेजहरू होइन। वेबसाइट नभएका विद्यालयहरू यस खोजमा पूर्णतः अदृश्य छन्।",
              "यो धेरै महत्त्वपूर्ण छ। अध्ययनहरूले देखाउँछन् कि ६०% भन्दा बढी अभिभावकहरूले सम्पर्क गर्नुअघि अनलाइन विद्यालयहरू अनुसन्धान गर्छन्। यदि तपाईंको विद्यालय खोज परिणामहरूमा देखिँदैन भने, ती अभिभावकहरूले वेबसाइट भएको प्रतिस्पर्धी विद्यालय भेट्टाउनेछन् र त्यहाँ भर्ना गर्नेछन् — भले तपाईंको विद्यालय वास्तवमा राम्रो होस्।",
            ],
          },
          {
            icon: "🏫",
            h3: "अभिभावकहरूमा घटेको विश्वसनीयता",
            paras: [
              "जब अभिभावकहरूले आफ्नो बच्चाका लागि विद्यालय अनुसन्धान गर्छन् — विशेष गरी निजी विद्यालयहरूका लागि जहाँ शुल्क महत्त्वपूर्ण पारिवारिक लगानी हो — उनीहरू उचित वेबसाइट भेट्टाउने अपेक्षा गर्छन्। कार्यक्रम, शिक्षक, सुविधा र शुल्क स्पष्ट देखाउने व्यावसायिक वेबसाइट भएको विद्यालयले तुरुन्त स्थायित्व, जवाफदेहिता र गम्भीरताको संकेत दिन्छ।",
              "केवल फेसबुक पेज भएको विद्यालय — चाहे कति नै सक्रिय होस् — तुलनामा अनौपचारिक, अस्थापित वा अस्थायी देखिन सक्छ। काठमाडौं वा पोखरा जस्ता प्रतिस्पर्धी विद्यालय बजारहरूमा, यो धारणाको खाडलले सिधै भर्ना गुमाउन पुर्‍याउँछ।",
            ],
          },
        ],
      },
      {
        id: "website-gives",
        icon: LayoutDashboard,
        color: "emerald",
        h2: "वेबसाइटले तपाईंको विद्यालयलाई के दिन्छ",
        paras: [
          "विद्यालय वेबसाइट केवल डिजिटल पुस्तिका होइन। यो २४ घण्टाको भर्ना अधिकारी, विश्वास-निर्माण उपकरण र तपाईंको विद्यालय प्रतिनिधित्व गर्ने सबै कुराको खोज्न सकिने रेकर्ड हो।",
        ],
        benefits: [
          {
            icon: "🎛",
            title: "जानकारीमा पूर्ण नियन्त्रण",
            desc: "आफूले चाहेअनुसार कार्यक्रमहरू, कक्षा स्तरहरू, शुल्क संरचना, शिक्षक प्रोफाइलहरू, भर्ना प्रक्रिया र विद्यालय क्यालेन्डर प्रदर्शन गर्नुहोस्। जुनसुकै बेला तुरुन्त अपडेट गर्नुहोस्।",
          },
          {
            icon: "🔍",
            title: "Google खोजमा राम्रो दृश्यता",
            desc: "अभिभावकहरूले 'काठमाडौंमा मेरो नजिकको सबैभन्दा राम्रो विद्यालय' वा 'विद्यालय भर्ना खुला नेपाल २०२६' खोज्दा तपाईंको विद्यालय जैविक रूपमा भेट्टाउन सक्छन् — कुनै विज्ञापन खर्च बिना।",
          },
          {
            icon: "⭐",
            title: "विश्वास र विश्वसनीयता निर्माण",
            desc: "फोटो, शिक्षक जानकारी र प्रकाशित सूचनाहरू भएको व्यावसायिक वेबसाइटले तपाईंको विद्यालय स्थापित, जवाफदेही र शिक्षाप्रति गम्भीर रहेको संकेत दिन्छ।",
          },
          {
            icon: "📋",
            title: "अनलाइन भर्ना फारमहरू",
            desc: "अभिभावकहरूलाई तपाईंको वेबसाइटबाट सिधै प्रारम्भिक रुचि वा भर्ना सोधपुछ पेश गर्न दिनुहोस् — फोन कल लोड घटाउँदै र विद्यालय समय बाहिर पनि सम्पर्क कैद गर्दै।",
          },
          {
            icon: "📅",
            title: "कार्यक्रम क्यालेन्डर र सूचनाहरू",
            desc: "परीक्षा तालिका, अभिभावक-शिक्षक बैठक, बिदाहरू र विद्यालय कार्यक्रमहरू एउटा व्यवस्थित, सधैं सुलभ ठाउँमा प्रकाशित गर्नुहोस्।",
          },
          {
            icon: "📱",
            title: "हर अभिभावकका लागि मोबाइल-अनुकूल",
            desc: "सबै आधुनिक विद्यालय वेबसाइटहरू मोबाइल-अप्टिमाइज गरिएका छन्। नेपालमा अधिकांश अभिभावकहरूले स्मार्टफोनमा ब्राउज गर्ने भएकाले, कुनै अभिभावक छुटाइने छैन।",
          },
        ],
      },
      {
        id: "get-online",
        icon: Zap,
        color: "indigo",
        h2: "विद्यालयहरू कसरी सजिलैसँग अनलाइन जान सक्छन्",
        paras: [
          "विद्यालयहरूका लागि सबैभन्दा ठूलो बाधा सधैं लागत र जटिलता रहेको छ। नेपालमा कस्टम विद्यालय वेबसाइट बनाउन डेभलपर भाड्दा सामान्यतः NPR ५०,०००–२,००,००० वा बढी लाग्छ — र महिनौं पछाडि-अगाडि सञ्चार, प्राविधिक निर्णयहरू र चलिरहने मर्मत आवश्यक पर्छ।",
          "त्यो बाधा हटिसकेको छ। HamroLink ले तयार-बनाइएको विद्यालय वेबसाइट टेम्प्लेटहरू प्रदान गर्छ जुन जुनसुकै विद्यालय प्रशासकले प्रयोग गर्न सक्छन् — कुनै कोडिङ, प्राविधिक ज्ञान, वा डेभलपर आवश्यक छैन।",
        ],
        features: [
          { icon:"🎨", title:"विद्यालय टेम्प्लेटहरू", desc:"नेपाली विद्यालयका लागि विशेष रूपमा डिजाइन गरिएका पूर्व-निर्मित टेम्प्लेटहरू — भर्ना पृष्ठदेखि शिक्षक प्रोफाइलसम्म सबै कुरा समेट्छन्।" },
          { icon:"📱", title:"डिफल्ट रूपमा मोबाइल-अनुकूल", desc:"प्रत्येक HamroLink वेबसाइट स्मार्टफोनका लागि स्वतः अप्टिमाइज गरिएको छ।" },
          { icon:"📋", title:"भर्ना फारमहरू", desc:"अन्तर्निहित सोधपुछ र भर्ना फारमहरू ताकि अभिभावकहरूले तपाईंको वेबसाइटबाट सिधै दर्ता गर्न सकून्।" },
          { icon:"📅", title:"कार्यक्रम र सूचनाहरू", desc:"विद्यालय कार्यक्रमहरू, परीक्षा तालिका, बिदाहरू र सूचनाहरू प्रकाशित गर्नुहोस्।" },
          { icon:"📰", title:"समाचार र अपडेटहरू", desc:"विद्यालय समाचार, उपलब्धिहरू र घोषणाहरू पोस्ट गर्नुहोस् जुन Google दृश्यता सुधार गर्छन्।" },
          { icon:"🏷", title:"किफायती मूल्य", desc:"NPR ३४९/महिनाबाट विद्यालय वेबसाइट। ठूलो अग्रिम लागत छैन।" },
        ],
        highlight: {
          icon: "⚡",
          text: "No technical knowledge required. Most schools launch their HamroLink website in under 60 minutes.",
          ne_text: "कुनै प्राविधिक ज्ञान आवश्यक छैन। अधिकांश विद्यालयहरूले ६० मिनेटभन्दा कम समयमा HamroLink वेबसाइट लञ्च गर्छन्।",
        },
      },
      {
        id: "ideal-setup",
        icon: TrendingUp,
        color: "violet",
        h2: "विद्यालयका लागि आदर्श सेटअप: वेबसाइट + सामाजिक सञ्जाल",
        paras: [
          "२०२६ मा नेपाली विद्यालयका लागि सर्वोत्तम रणनीति वेबसाइट र सामाजिक सञ्जालबीच छनोट गर्नु होइन। यो दुवैलाई सँगै प्रयोग गर्नु हो — प्रत्येकले आफू राम्रो गर्ने काम गर्दै।",
          "सामाजिक सञ्जाल दैनिक संलग्नताका लागि उत्कृष्ट छ: कार्यक्रम फोटोहरू साझा गर्ने, विद्यार्थी उपलब्धिहरू मनाउने, छिटो अपडेटहरू पोस्ट गर्ने र अवस्थित अभिभावक समुदायलाई जोडिएको र सूचित राख्ने। यसले तपाईंको विद्यालयवरिपरि न्यानोपन र व्यक्तित्व बनाउँछ।",
          "वेबसाइट इन्टरनेटमा तपाईंको विद्यालयको स्थायी, खोज्न सकिने, व्यावसायिक घर हो। Google मार्फत तपाईंलाई भेट्टाउँदा सम्भावित अभिभावकहरू यहाँ आउँछन्। उनीहरूले तपाईंका कार्यक्रमहरू पढ्छन्, शुल्क जाँच्छन्, सूचनाहरू पढ्छन् र तपाईंलाई सम्पर्क गर्ने निर्णय गर्छन्।",
          "सँगै, तिनीहरूले पूर्ण फनेल बनाउँछन्: सामाजिक सञ्जालले जागरूकता र संलग्नता सिर्जना गर्छ → तपाईंको वेबसाइटले रुचिलाई सोधपुछ र भर्नामा रूपान्तरण गर्छ।",
        ],
        quote: {
          text: "सामाजिक सञ्जालले अवस्थित अभिभावकहरूलाई खुसी राख्छ। तपाईंको वेबसाइटले नयाँ अभिभावकहरूलाई तपाईंको ढोकामा ल्याउँछ।",
          author: "HamroLink",
        },
      },
    ],
    earlyAccess: {
      badge: "🎓 HamroLink — नेपालका विद्यालयका लागि बनाइएको",
      h2: "आज नै आफ्नो विद्यालयको वेबसाइट बनाउन सुरु गर्नुहोस्",
      paras: [
        "यदि तपाईंको विद्यालय हाल केवल फेसबुक वा WhatsApp मा भर पर्छ भने, अहिले वास्तविक डिजिटल उपस्थिति बनाउने समय हो। HamroLink सँग, तपाईंको विद्यालय एक घण्टाभित्र अनलाइन हुन सक्छ — कार्यक्रमहरू देखाउने, सोधपुछ स्वीकार गर्ने र अभिभावकहरूलाई Google मा तपाईंलाई भेट्टाउन मद्दत गर्ने व्यावसायिक वेबसाइटसँग।",
        "HamroLink मा नि:शुल्क सुरु गर्नुहोस् र भर्ना मौसमअघि नै तपाईंको विद्यालयको वेबसाइट तयार गर्नुहोस्।",
      ],
      cta: "नि:शुल्क सुरु गर्नुहोस्",
      ctaHref: "https://app.hamrolink.com",
      trust: ["नि:शुल्क सुरु गर्नुहोस्", "क्रेडिट कार्ड आवश्यक छैन", "६० मिनेटभित्र लाइभ"],
    },
    faqTitle: "बारम्बार सोधिने प्रश्नहरू",
    faqSubtitle: "नेपालमा अनलाइन जाने बारे विद्यालय प्रशासकहरूले सोध्ने सबै कुरा।",
    shareLabel: "यो लेख साझा गर्नुहोस्",
    relatedLabel: "सम्बन्धित पढाइ",
    related: [
      { label: "नेपाली व्यवसायसँग वेबसाइट किन छैन", href: "/ne/blog/why-nepali-businesses-dont-have-websites" },
      { label: "फेसबुक vs वेबसाइट",                href: "/ne/blog/facebook-page-vs-website-nepali-businesses" },
      { label: "नि:शुल्क सुरु गर्नुहोस्",    href: "https://app.hamrolink.com" },
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogSchoolWebsiteNepalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang === "ne" ? "ne" : "en";
  const ne   = lang === "ne";
  const c    = ne ? CONTENT.ne : CONTENT.en;
  const faqs = ne ? FAQ_NE : FAQ_EN;

  return (
    <>
      <ArticleSchema lang={lang}/>
      <BreadcrumbSchema lang={lang}/>
      <FAQSchema lang={lang}/>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/20">

        {/* ── Sticky top bar ── */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href={`/${lang}`} className="hover:text-gray-700 transition-colors font-medium">HamroLink</Link>
              <span>/</span>
              <Link href={`/${lang}/blog`} className="hover:text-gray-700 transition-colors">{ne ? "ब्लग" : "Blog"}</Link>
              <span>/</span>
              <span className="text-gray-600 font-medium truncate max-w-[200px]">
                {ne ? "विद्यालय वेबसाइट नेपाल" : "School Website Nepal"}
              </span>
            </nav>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["en","ne"] as const).map(l => (
                <Link key={l} href={`/${l}/blog/${SLUG}`}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang===l ? "bg-white shadow text-gray-900" : "text-gray-400 hover:text-gray-700"}`}>
                  {l === "en" ? "EN" : "नेपाली"}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cinematic featured image hero ── */}
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[520px]">
            <Image
              src="/school-website-nepal.jpg"
              alt={ne
                ? "नेपालको हरेक विद्यालयलाई २०२६ मा वेबसाइट किन चाहिन्छ"
                : "Why Every School in Nepal Needs a Website in 2026"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-700/20"/>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent"/>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent"/>
          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-6 pb-10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/80 backdrop-blur-sm">
                  <GraduationCap className="w-3.5 h-3.5"/>
                  {c.category}
                </div>
                <span className="hidden sm:block text-[11px] text-white/35">{DATE_PUBLISHED}</span>
              </div>
              <h1 className="font-black leading-tight mb-4 text-white drop-shadow-lg text-3xl sm:text-4xl lg:text-5xl">
                {ne
                  ? <>नेपालको हरेक विद्यालयलाई<br className="hidden sm:block"/> २०२६ मा वेबसाइट किन चाहिन्छ</>
                  : <>Why Every School in Nepal<br className="hidden sm:block"/> Needs a Website in 2026</>}
              </h1>
              <p className="text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed mb-5 drop-shadow">
                {ne
                  ? "वेबसाइटले कसरी भर्ना, विश्वसनीयता र अभिभावकसँगको सञ्चार रूपान्तरण गर्न सक्छ — नेपालका विद्यालयहरूका लागि।"
                  : "How a website can transform enrollment, credibility, and parent communication for schools across Nepal."}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4"/><span>HamroLink</span></div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4"/><span>{c.readTime}</span></div>
                <div className="w-px h-3 bg-white/20"/>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4"/><span>{c.publishedLabel}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex gap-12">

            {/* Sticky TOC */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-20">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{c.tocTitle}</p>
                <nav className="space-y-1">
                  {c.toc.map(item => (
                    <a key={item.id} href={`#${item.id}`}
                      className="block text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors leading-snug">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl text-white text-center">
                  <GraduationCap className="w-6 h-6 mx-auto mb-2 opacity-80"/>
                  <p className="text-xs font-black mb-3 leading-snug">
                    {ne ? "विद्यालयका लागि HamroLink" : "HamroLink for Schools"}
                  </p>
                  <a href={c.earlyAccess.ctaHref}
                    className="block w-full py-2 bg-white text-emerald-700 rounded-xl text-xs font-black hover:bg-emerald-50 transition-colors">
                    {ne ? "नि:शुल्क सुरु गर्नुहोस्" : "Start for Free"}
                  </a>
                </div>
              </div>
            </aside>

            {/* Article body */}
            <article className="flex-1 min-w-0 space-y-14">

              {/* ── INTRO ── */}
              <section id="intro" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-emerald-700"/>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {ne ? "परिचय" : "Introduction"}
                  </h2>
                </div>
                <div className="pl-[52px] space-y-4">
                  {c.intro.paras.map((p, i) => <p key={i} className="text-gray-600 leading-relaxed">{p}</p>)}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.intro.highlights.map((h: any) => (
                      <div key={h.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-sm font-semibold text-emerald-700">
                        <span>{h.icon}</span> {h.text}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── MAIN SECTIONS ── */}
              {c.sections.map((sec: any) => {
                const col  = CM[sec.color] ?? CM.blue;
                const Icon = sec.icon;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-2xl ${col.bg} ${col.border} border flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${col.text}`}/>
                      </div>
                      <h2 className="text-2xl font-black text-gray-900">{sec.h2}</h2>
                    </div>
                    <div className="pl-[52px] space-y-4">
                      {sec.paras.map((p: string, i: number) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
                      ))}

                      {/* Communication methods */}
                      {sec.methods && (
                        <div className="grid sm:grid-cols-2 gap-3 pt-2">
                          {sec.methods.map((m: any) => (
                            <div key={m.title} className={`${col.bg} ${col.border} border rounded-2xl p-4`}>
                              <div className="text-xl mb-1.5">{m.icon}</div>
                              <h4 className="font-black text-gray-900 text-sm mb-1">{m.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Callout box */}
                      {sec.callout && (
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex gap-3">
                          <span className="text-xl shrink-0">{sec.callout.icon}</span>
                          <p className="text-orange-800 text-sm leading-relaxed font-medium">
                            {ne ? sec.callout.ne_text : sec.callout.text}
                          </p>
                        </div>
                      )}

                      {/* H3 subsections */}
                      {sec.subsections && (
                        <div className="space-y-8 pt-4">
                          {sec.subsections.map((sub: any) => (
                            <div key={sub.h3}>
                              <div className="flex items-center gap-2.5 mb-3">
                                <span className="text-xl">{sub.icon}</span>
                                <h3 className="text-lg font-black text-gray-900">{sub.h3}</h3>
                              </div>
                              <div className="pl-9 space-y-3">
                                {sub.paras.map((p: string, i: number) => (
                                  <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Benefits grid */}
                      {sec.benefits && (
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          {sec.benefits.map((b: any) => (
                            <div key={b.title} className={`${col.bg} ${col.border} border rounded-2xl p-4`}>
                              <div className="text-2xl mb-2">{b.icon}</div>
                              <h4 className="font-black text-gray-900 text-sm mb-1">{b.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Features list */}
                      {sec.features && (
                        <div className="space-y-3 pt-2">
                          {sec.features.map((f: any) => (
                            <div key={f.title} className={`flex items-start gap-3 ${col.bg} ${col.border} border rounded-2xl p-4`}>
                              <span className="text-xl shrink-0">{f.icon}</span>
                              <div>
                                <div className="font-black text-gray-900 text-sm">{f.title}</div>
                                <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Highlight callout */}
                      {sec.highlight && (
                        <div className="bg-indigo-600 text-white rounded-2xl p-4 flex items-center gap-3">
                          <span className="text-2xl shrink-0">{sec.highlight.icon}</span>
                          <p className="font-bold text-sm leading-relaxed">
                            {ne ? sec.highlight.ne_text : sec.highlight.text}
                          </p>
                        </div>
                      )}

                      {/* Highlights pills */}
                      {sec.highlights && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {sec.highlights.map((h: any) => (
                            <div key={h.text} className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${col.bg} ${col.border} border rounded-full text-sm font-semibold ${col.text}`}>
                              <span>{h.icon}</span> {h.text}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pull quote */}
                      {sec.quote && (
                        <blockquote className="border-l-4 border-emerald-300 pl-5 py-1 mt-4">
                          <p className="text-lg font-bold text-gray-800 italic leading-relaxed mb-1">"{sec.quote.text}"</p>
                          <cite className="text-sm text-gray-400 not-italic">— {sec.quote.author}</cite>
                        </blockquote>
                      )}
                    </div>
                  </section>
                );
              })}

              {/* ── INFOGRAPHIC ── */}
              <section id="infographic" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-700"/>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {ne ? "सामाजिक सञ्जाल vs वेबसाइट: विद्यालयका लागि" : "Social Media vs Website for Schools"}
                  </h2>
                </div>
                <div className="pl-[52px]">
                  <p className="text-gray-500 text-sm mb-4">
                    {ne
                      ? "तलको तुलनाले विद्यालयहरूका लागि प्रत्येक उपकरणको शक्ति र सीमाहरू देखाउँछ।"
                      : "The comparison below shows the strengths and limits of each tool for schools."}
                  </p>
                  <SocialVsWebsiteInfographic lang={lang}/>
                </div>
              </section>

              {/* ── ENROLLMENT FLOWCHART ── */}
              <section id="enrollment" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-5 h-5 text-indigo-700"/>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {ne ? "भर्ना यात्रा: अभिभावकदेखि विद्यार्थीसम्म" : "The Enrollment Journey: Parent → Student"}
                  </h2>
                </div>
                <div className="pl-[52px]">
                  <p className="text-gray-500 text-sm mb-4">
                    {ne
                      ? "हेर्नुहोस् कसरी एउटा वेबसाइटले सम्भावित अभिभावकलाई नयाँ भर्नामा रूपान्तरण गर्छ।"
                      : "See how a website turns a prospective parent into a new enrolled student."}
                  </p>
                  <EnrollmentFlowchart lang={lang}/>
                </div>
              </section>

              {/* ── SCHOOL TEMPLATE MOCK ── */}
              <section id="template" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-teal-700"/>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {ne ? "विद्यालय वेबसाइट टेम्प्लेट — HamroLink" : "Sample School Website Template — HamroLink"}
                  </h2>
                </div>
                <div className="pl-[52px]">
                  <p className="text-gray-500 text-sm mb-4">
                    {ne
                      ? "तपाईंको विद्यालयको वेबसाइट यस्तो देखिन सक्छ — HamroLink को विद्यालय टेम्प्लेट प्रयोग गरेर।"
                      : "Here is what your school's website could look like — using HamroLink's school template."}
                  </p>
                  <SchoolTemplateMock lang={lang}/>
                </div>
              </section>

              {/* ── EARLY ACCESS CTA ── */}
              <section id="early-access" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 rounded-3xl p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-xs font-bold mb-4">
                      {c.earlyAccess.badge}
                    </div>
                    <h2 className="text-3xl font-black mb-4">{c.earlyAccess.h2}</h2>
                    {c.earlyAccess.paras.map((p: string, i: number) => (
                      <p key={i} className="text-white/75 text-base leading-relaxed mb-3 max-w-xl mx-auto">{p}</p>
                    ))}
                    <a href={c.earlyAccess.ctaHref}
                      className="inline-flex items-center gap-2 mt-4 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black text-base hover:scale-105 transition-transform shadow-2xl">
                      <Sparkles className="w-5 h-5"/>
                      {c.earlyAccess.cta}
                      <ArrowRight className="w-4 h-4"/>
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
                      {c.earlyAccess.trust.map((t: string) => (
                        <div key={t} className="flex items-center gap-1.5 text-sm text-white/60">
                          <CheckCircle className="w-4 h-4 text-green-400"/>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-amber-600"/>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{c.faqTitle}</h2>
                    <p className="text-gray-400 text-sm">{c.faqSubtitle}</p>
                  </div>
                </div>
                <div className="pl-[52px] space-y-3 mt-5">
                  {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a}/>)}
                </div>
              </section>

              {/* ── Share + Related ── */}
              <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{c.relatedLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.related.map(r => (
                      <a key={r.href} href={r.href}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-bold hover:bg-emerald-100 transition-colors">
                        {r.label}<ArrowRight className="w-3 h-3"/>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{c.shareLabel}</p>
                  <div className="flex items-center gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">f</a>
                    <a href={`https://twitter.com/intent/tweet?url=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">𝕏</a>
                    <a href={`https://wa.me/?text=https://hamrolink.com/${lang}/blog/${SLUG}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform text-xs font-black">W</a>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-gray-100 bg-white py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <h4 className="text-gray-900 font-black text-sm">
                  {ne ? "हाम्रोलिङ्क डिजिटल" : "Hamrolink Digital"}
                </h4>
                <p className="text-xs text-gray-500">
                  {ne
                    ? "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल"
                    : "Pakhribas-04, Dhankuta, Koshi Province, Nepal"}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {ne
                    ? "प्रोप्राइटर: लिला बस्नेत | संस्थापक: सुमन बस्नेत"
                    : "Proprietor: Lila Basnet | Founder: Suman Basnet"}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {ne
                    ? "दर्ता नं: ध-९४५८/०८२/०८३ | प्यान नं: ६२३२५११९१"
                    : "Reg No: ध-९४५८/०८२/०८३ | PAN: ६२३२५११९१"}
                </p>
              </div>
              <div className="flex flex-col md:items-end justify-center space-y-4">
                <div className="flex flex-col md:items-end gap-1">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-2">
                    {([
                      [ne ? "गोपनीयता" : "Privacy",  "privacy"],
                      [ne ? "सर्तहरू"  : "Terms",    "terms"],
                      [ne ? "फिर्ता"   : "Refund",   "refund"],
                      [ne ? "सम्पर्क"   : "Contact",  "contact"],
                      [ne ? "ब्लग"     : "Blog",     "blog"],
                    ] as [string,string][]).map(([label, slug]) => (
                      <Link key={slug} href={`/${lang}/${slug}`}
                        className="text-xs text-gray-400 hover:text-gray-900 font-bold transition-colors lowercase">{label}</Link>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <a href="mailto:support@hamrolink.com" className="hover:text-gray-900 transition-colors font-medium">support@hamrolink.com</a>
                    <span className="text-gray-200">|</span>
                    <a href="tel:+9779816326639" className="hover:text-gray-900 transition-colors font-medium">+977-9816326639</a>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  © {new Date().getFullYear()} Hamrolink · Built with ❤️ for Nepal 🇳🇵
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}