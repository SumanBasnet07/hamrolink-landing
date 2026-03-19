"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import LegalLayout from "../LegalLayout";
import React from "react";

const UPDATED_EN = "March 12, 2026";
const UPDATED_NE = "मार्च १२, २०२६";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = {
  en: [
    {
      category: "Getting Started",
      items: [
        {
          q: "What is HamroLink?",
          a: "HamroLink is Nepal's website builder — designed specifically for Nepali creators, shops, schools, consultancies, and local businesses. You can build a professional website in minutes with no coding or design skills needed.",
        },
        {
          q: "Is HamroLink free to use?",
          a: "Yes! HamroLink has a free plan that lets you create a website with a yourname.hamrolink.com subdomain, up to 5 pages, 25 images and 5 file uploads, and 50 emails per month — forever free. Paid plans (Starter and Pro) unlock more features.",
        },
        {
          q: "When will HamroLink launch?",
          a: "HamroLink is launching soon. Join the early access waitlist to be among the first to build your website and receive a launch notification the moment we go live.",
        },
        {
          q: "Do I need to know how to code?",
          a: "No. HamroLink is built so that anyone can create a beautiful website without writing a single line of code. Our drag-and-drop editor and ready-made templates do all the heavy lifting.",
        },
        {
          q: "What kind of websites can I build?",
          a: "You can build websites for online stores, schools and colleges, travel/study consultancies, restaurants, personal portfolios, small businesses, NGOs, and more. HamroLink has templates designed for every type of Nepali business.",
        },
      ],
    },
    {
      category: "Plans & Pricing",
      items: [
        {
          q: "What is included in the Free plan?",
          a: "The Free plan includes 1 website, 5 pages, 25 images and 5 file uploads, 50 emails per month, and a yourname.hamrolink.com subdomain. No credit card required.",
        },
        {
          q: "What is the difference between Starter and Pro?",
          a: "Starter gives you 20 pages + 30 blog posts, 100 images and 5 file uploads, a custom domain, AI Chatbot, online store (30 products), 70 bookings, 10 events, and removal of HamroLink branding. Pro gives you 50 pages + 150 blog posts, 200 images and 10 file uploads, 600 emails/month, online store (300 products), 150 bookings, and 25 events. Both plans allow you to connect your own domain.",
        },
        {
          q: "Can I upgrade or downgrade my plan?",
          a: "Yes. You can upgrade or downgrade your plan at any time from your account dashboard. Upgrades take effect immediately; downgrades take effect at the start of your next billing cycle.",
        },
        {
          q: "Are prices in Nepali Rupees?",
          a: "Yes. All HamroLink prices are in Nepalese Rupees (NPR). Starter is NPR 399/month (NPR 4,213/year) and Pro is NPR 899/month (NPR 9,493/year). Annual plans save you 12%.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept eSewa and Khalti — Nepal's two most popular digital payment platforms. We do not currently accept international cards.",
        },
      ],
    },
    {
      category: "Domains & Subdomains",
      items: [
        {
          q: "Can I use my own domain?",
          a: "Yes. Starter and Pro plans let you connect any domain you already own. The Free plan provides a yourname.hamrolink.com subdomain.",
        },
        {
          q: "How do I connect my own domain?",
          a: "Go to your site's Settings → Domains in your dashboard. Enter your domain and follow the DNS configuration steps. Changes usually propagate within 24 hours. We have a step-by-step guide in our documentation.",
        },
        {
          q: "Can I have multiple websites?",
          a: "Each plan (Free, Starter, Pro) currently supports 1 website. If you need multiple sites, you can create additional accounts or contact us for enterprise pricing.",
        },
      ],
    },
    {
      category: "Features",
      items: [
        {
          q: "What is the AI Chatbot?",
          a: "The AI Chatbot is a smart assistant that appears on your website and automatically answers questions from your visitors 24/7. It learns from your website content so it can respond to questions about your products, services, hours, location, and more.",
        },
        {
          q: "Can I sell products on my website?",
          a: "Yes. Starter and Pro plans include an online store where you can list products, set prices, and accept eSewa and Khalti payments directly. Starter supports up to 30 products; Pro supports up to 300 products.",
        },
        {
          q: "What is the QR Code feature?",
          a: "Every HamroLink website automatically gets a print-ready QR code that links directly to your website. You can use it on business cards, banners, menus, or flyers to let people scan and visit your site instantly.",
        },
        {
          q: "Can visitors book appointments through my site?",
          a: "Yes. Starter and Pro plans include a reservations/bookings feature. Visitors can book a table, appointment, or session directly from your website.",
        },
        {
          q: "Is my website mobile-friendly?",
          a: "Yes. All HamroLink websites are fully responsive and look great on phones, tablets, and desktops automatically.",
        },
      ],
    },
    {
      category: "Data & Privacy",
      items: [
        {
          q: "Where is my website data stored?",
          a: "Your website data is stored on secure cloud servers. We use industry-standard encryption and backups to keep your data safe.",
        },
        {
          q: "Can I export my data?",
          a: "Yes. You can export your website content and data from your account dashboard at any time.",
        },
        {
          q: "What happens to my website if I cancel?",
          a: "If you cancel a paid plan, your site downgrades to the Free plan limits at the end of your billing cycle. Your data is not immediately deleted — you have 30 days to export or re-subscribe before any data is removed.",
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          q: "How do I get help?",
          a: "You can visit our documentation at hamrolink.com/docs, ask the community at app.hamrolink.com/community, or email us at support@hamrolink.com. Pro plan subscribers receive priority support.",
        },
        {
          q: "Is support available in Nepali?",
          a: "Yes. Our support team and documentation are available in both Nepali and English.",
        },
        {
          q: "How do I report a bug or give feedback?",
          a: "Please email support@hamrolink.com or post in our community forum at app.hamrolink.com/community. We read every message and use your feedback to improve HamroLink.",
        },
      ],
    },
  ],

  ne: [
    {
      category: "सुरु गर्दै",
      items: [
        {
          q: "HamroLink के हो?",
          a: "HamroLink नेपालको वेबसाइट बिल्डर हो — विशेष गरी नेपाली क्रिएटर, पसल, विद्यालय, परामर्श केन्द्र र स्थानीय व्यवसायहरूका लागि डिजाइन गरिएको। तपाईं कुनै कोडिङ वा डिजाइन सीप बिना मिनेटमै पेशेवर वेबसाइट बनाउन सक्नुहुन्छ।",
        },
        {
          q: "के HamroLink नि:शुल्क छ?",
          a: "हो! HamroLink मा नि:शुल्क योजना छ जसले तपाईंलाई yourname.hamrolink.com सबडोमेन, ५ पेजहरू, २५ इमेज र ५ फाइल अपलोड र मासिक ५० इमेलसहित वेबसाइट बनाउन दिन्छ — सधैँ नि:शुल्क। भुक्तानी योजनाहरू (स्टार्टर र प्रो) थप सुविधाहरू अनलक गर्छन्।",
        },
        {
          q: "HamroLink कहिले लन्च हुन्छ?",
          a: "HamroLink छिट्टै लन्च हुँदैछ। अर्ली एक्सेस प्रतीक्षासूचीमा जोइन गर्नुहोस् र हामी लाइभ हुने बित्तिकै लन्च सूचना पाउनुहोस्।",
        },
        {
          q: "के मलाई कोडिङ जान्नु पर्छ?",
          a: "हैन। HamroLink यसरी बनाइएको छ कि जो कोहीले एउटा पनि कोड नलेखी सुन्दर वेबसाइट बनाउन सकोस्। हाम्रो ड्र्याग-एन्ड-ड्रप एडिटर र तयार टेम्प्लेटहरूले सबै गाह्रो काम गर्छन्।",
        },
        {
          q: "मैले कस्तो वेबसाइटहरू बनाउन सक्छु?",
          a: "तपाईं अनलाइन स्टोर, विद्यालय र कलेज, ट्राभल/अध्ययन परामर्श, रेस्टुरेन्ट, व्यक्तिगत पोर्टफोलियो, साना व्यवसाय, NGO र थप धेरैका लागि वेबसाइटहरू बनाउन सक्नुहुन्छ।",
        },
      ],
    },
    {
      category: "योजना र मूल्य",
      items: [
        {
          q: "नि:शुल्क योजनामा के समावेश छ?",
          a: "नि:शुल्क योजनामा १ वेबसाइट, ५ पेजहरू, २५ इमेज र ५ फाइल अपलोड, मासिक ५० इमेल र yourname.hamrolink.com सबडोमेन समावेश छ। कुनै क्रेडिट कार्ड आवश्यक छैन।",
        },
        {
          q: "स्टार्टर र प्रोबीच के फरक छ?",
          a: "स्टार्टरले तपाईंलाई २० पेज + ३० ब्लग पोस्ट, १०० इमेज र ५ फाइल अपलोड, कस्टम डोमेन, AI च्याटबट, अनलाइन स्टोर (३० उत्पादन), ७० बुकिङ, १० कार्यक्रम र HamroLink ब्र्यान्डिङ हटाउने सुविधा दिन्छ। प्रोले ५० पेज + १५० ब्लग पोस्ट, २०० इमेज र १० फाइल अपलोड, ६०० इमेल/महिना, अनलाइन स्टोर (३०० उत्पादन), १५० बुकिङ र २५ कार्यक्रम दिन्छ।",
        },
        {
          q: "के म आफ्नो योजना अपग्रेड वा डाउनग्रेड गर्न सक्छु?",
          a: "हो। तपाईं आफ्नो खाता ड्यासबोर्डबाट जुनसुकै बेला आफ्नो योजना अपग्रेड वा डाउनग्रेड गर्न सक्नुहुन्छ। अपग्रेड तुरुन्त लागू हुन्छ; डाउनग्रेड अर्को बिलिङ चक्रको सुरुमा लागू हुन्छ।",
        },
        {
          q: "के मूल्य नेपाली रुपैयाँमा छ?",
          a: "हो। HamroLink का सबै मूल्यहरू नेपाली रुपैयाँ (NPR) मा छन्। स्टार्टर NPR ३९९/महिना (NPR ४,२१३/वर्ष) र प्रो NPR ८९९/महिना (NPR ९,४९३/वर्ष) हो। वार्षिक योजना लिंदा १२% बचत हुन्छ।",
        },
        {
          q: "तपाईंहरू कुन भुक्तानी विधिहरू स्वीकार गर्नुहुन्छ?",
          a: "हामी eSewa र Khalti स्वीकार गर्छौं — नेपालका दुई सबैभन्दा लोकप्रिय डिजिटल भुक्तानी प्लेटफर्महरू। हामी हाल अन्तर्राष्ट्रिय कार्डहरू स्वीकार गर्दैनौं।",
        },
      ],
    },
    {
      category: "डोमेन र सबडोमेन",
      items: [
        {
          q: "के म आफ्नै डोमेन प्रयोग गर्न सक्छु?",
          a: "हो। स्टार्टर र प्रो योजनाहरूले तपाईंलाई पहिल्यै स्वामित्वमा रहेको जुनसुकै डोमेन जोड्न दिन्छन्। नि:शुल्क योजनाले yourname.hamrolink.com सबडोमेन प्रदान गर्छ।",
        },
        {
          q: "म आफ्नो डोमेन कसरी जोड्ने?",
          a: "आफ्नो ड्यासबोर्डमा साइट Settings → Domains मा जानुहोस्। आफ्नो डोमेन लेख्नुहोस् र DNS कन्फिगरेसन चरणहरू पालना गर्नुहोस्। परिवर्तनहरू सामान्यतः २४ घण्टाभित्र लागू हुन्छन्।",
        },
        {
          q: "के म धेरै वेबसाइटहरू बनाउन सक्छु?",
          a: "प्रत्येक योजनाले हाल १ वेबसाइट समर्थन गर्छ। यदि तपाईंलाई धेरै साइटहरू चाहिन्छ भने, थप खाताहरू बनाउन सक्नुहुन्छ वा उद्यम मूल्यका लागि हामीसँग सम्पर्क गर्न सक्नुहुन्छ।",
        },
      ],
    },
    {
      category: "सुविधाहरू",
      items: [
        {
          q: "AI च्याटबट के हो?",
          a: "AI च्याटबट एउटा स्मार्ट सहायक हो जो तपाईंको वेबसाइटमा देखिन्छ र २४/७ आफ्नै भिजिटरहरूको प्रश्नहरू स्वचालित रूपमा उत्तर दिन्छ। यसले तपाईंको वेबसाइट सामग्रीबाट सिक्छ।",
        },
        {
          q: "के म आफ्नो वेबसाइटमा उत्पादनहरू बेच्न सक्छु?",
          a: "हो। स्टार्टर र प्रो योजनाहरूमा अनलाइन स्टोर समावेश छ जहाँ तपाईं उत्पादनहरू सूचीबद्ध गर्न, मूल्य तोक्न र eSewa र Khalti भुक्तानी सिधै स्वीकार गर्न सक्नुहुन्छ।",
        },
        {
          q: "QR कोड सुविधा के हो?",
          a: "प्रत्येक HamroLink वेबसाइटले स्वचालित रूपमा प्रिन्टका लागि तयार QR कोड पाउँछ जो सिधै तपाईंको वेबसाइटमा लिङ्क गर्छ। तपाईं यसलाई बिजनेस कार्ड, ब्यानर, मेनु वा फ्लायरमा राख्न सक्नुहुन्छ।",
        },
        {
          q: "के भिजिटरहरूले मेरो साइटबाट अपोइन्टमेन्ट बुक गर्न सक्छन्?",
          a: "हो। स्टार्टर र प्रो योजनाहरूमा रिजर्भेसन/बुकिङ सुविधा समावेश छ। भिजिटरहरूले तपाईंको वेबसाइटबाट सिधै टेबल, अपोइन्टमेन्ट वा सत्र बुक गर्न सक्छन्।",
        },
        {
          q: "के मेरो वेबसाइट मोबाइलमा काम गर्छ?",
          a: "हो। सबै HamroLink वेबसाइटहरू पूर्णतः प्रतिक्रियाशील छन् र फोन, ट्याब्लेट र डेस्कटपमा स्वचालित रूपमा राम्रोसँग देखिन्छन्।",
        },
      ],
    },
    {
      category: "डेटा र गोपनीयता",
      items: [
        {
          q: "मेरो वेबसाइट डेटा कहाँ भण्डारण गरिन्छ?",
          a: "तपाईंको वेबसाइट डेटा सुरक्षित क्लाउड सर्भरहरूमा भण्डारण गरिन्छ। हामी तपाईंको डेटा सुरक्षित राख्न उद्योग-मानक इन्क्रिप्सन र ब्याकअपहरू प्रयोग गर्छौं।",
        },
        {
          q: "के म आफ्नो डेटा निर्यात गर्न सक्छु?",
          a: "हो। तपाईं आफ्नो खाता ड्यासबोर्डबाट जुनसुकै बेला आफ्नो वेबसाइट सामग्री र डेटा निर्यात गर्न सक्नुहुन्छ।",
        },
        {
          q: "रद्द गरेपछि मेरो वेबसाइटको के हुन्छ?",
          a: "यदि तपाईंले भुक्तानी योजना रद्द गर्नुभयो भने, तपाईंको साइट बिलिङ चक्रको अन्तमा नि:शुल्क योजनाको सीमामा डाउनग्रेड हुन्छ। तपाईंको डेटा तुरुन्त मेटाइने छैन — कुनै डेटा हटाउनु अघि निर्यात गर्न वा फेरि सदस्यता लिन तपाईंसँग ३० दिन हुनेछ।",
        },
      ],
    },
    {
      category: "सहायता",
      items: [
        {
          q: "म कसरी सहायता पाउन सक्छु?",
          a: "तपाईं hamrolink.com/docs मा हाम्रो कागजपत्र हेर्न, app.hamrolink.com/community मा समुदायमा सोध्न, वा support@hamrolink.com मा इमेल गर्न सक्नुहुन्छ। प्रो योजना ग्राहकहरूले प्राथमिकता सहायता पाउँछन्।",
        },
        {
          q: "के सहायता नेपालीमा उपलब्ध छ?",
          a: "हो। हाम्रो सहायता टोली र कागजपत्रहरू नेपाली र अंग्रेजी दुवैमा उपलब्ध छन्।",
        },
        {
          q: "म बग रिपोर्ट वा प्रतिक्रिया कसरी दिने?",
          a: "कृपया support@hamrolink.com मा इमेल गर्नुहोस् वा app.hamrolink.com/community मा हाम्रो समुदाय फोरममा पोस्ट गर्नुहोस्। हामी प्रत्येक सन्देश पढ्छौं र HamroLink सुधार गर्न तपाईंको प्रतिक्रिया प्रयोग गर्छौं।",
        },
      ],
    },
  ],
};

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all ${open ? "border-blue-200 shadow-sm" : "border-gray-100"}`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={`font-semibold text-sm leading-snug ${open ? "text-blue-700" : "text-gray-900"}`}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = React.use(params).lang;
  const ne = lang === "ne";
  const cats = ne ? faqs.ne : faqs.en;

  return (
    <LegalLayout
      lang={lang}
      icon={HelpCircle}
      gradient="from-violet-600 to-purple-700"
      titleEn="Frequently Asked Questions"
      titleNe="बारम्बार सोधिने प्रश्नहरू"
      descEn="Everything you need to know about HamroLink — plans, features, payments, and more."
      descNe="HamroLink बारे तपाईंले जान्न आवश्यक सबै कुरा — योजनाहरू, सुविधाहरू, भुक्तानीहरू र थप।"
      updatedEn={`Last updated: ${UPDATED_EN}`}
      updatedNe={`अन्तिम अपडेट: ${UPDATED_NE}`}
      backLabelEn="Back to HamroLink"
      backLabelNe="HamroLink मा फर्कनुहोस्"
      slug="faqs"
    >
      <div className="space-y-12">
        {cats.map((cat) => (
          <section key={cat.category}>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest px-3">
                {cat.category}
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}

        {/* Still have a question? */}
        <div className="mt-10 p-6 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-2xl text-center">
          <HelpCircle className="w-8 h-8 text-violet-400 mx-auto mb-3" />
          <h3 className="font-black text-gray-900 mb-2">
            {ne ? "अझै प्रश्न छ?" : "Still have a question?"}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {ne
              ? "हामी मद्दत गर्न यहाँ छौं। हामीलाई इमेल गर्नुहोस् वा समुदायमा सोध्नुहोस्।"
              : "We're here to help. Email us or ask in the community."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@hamrolink.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors"
            >
              {ne ? "इमेल गर्नुहोस्" : "Email Support"}
            </a>
            <a
              href="https://app.hamrolink.com/community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-violet-200 text-violet-700 rounded-xl text-sm font-bold hover:bg-violet-50 transition-colors"
            >
              {ne ? "समुदायमा सोध्नुहोस्" : "Ask the Community"}
            </a>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
