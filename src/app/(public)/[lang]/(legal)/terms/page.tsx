// app/[lang]/terms/page.tsx
import {
  FileText,
  User,
  CreditCard,
  AlertTriangle,
  Ban,
  Scale,
  Globe,
  Mail,
} from "lucide-react";
import LegalLayout from "../LegalLayout";
import React from "react";
import { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

const UPDATED_EN = "March 12, 2026";
const UPDATED_NE = "मार्च १२, २०२६";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ne' ? 'सेवा सर्तहरू | HamroLink' : 'Terms of Use | HamroLink',
    description: lang === 'ne' ? 'HamroLink प्रयोगका सेवा सर्तहरू र नियमहरू।' : 'Read HamroLink Terms of Use and service agreements.',
    alternates: getAlternates("/terms", lang),
  };
}

const content = {
  en: [
    {
      icon: User,
      title: "Acceptance of Terms",
      body: [
        "By accessing or using HamroLink Digital, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services.",
        "We reserve the right to modify these terms at any time. We will notify you of significant changes via email or a prominent notice on our website.",
      ],
    },
    {
      icon: FileText,
      title: "Use of Service",
      body: [
        "HamroLink Digital grants you a personal, non-exclusive, non-transferable licence to access and use our platform to create and manage your website.",
        "You agree to use the service only for lawful purposes and in accordance with these terms. You must not use the service to host content that is illegal, defamatory, offensive, or infringes on the rights of others.",
        "You are responsible for all content you publish on your HamroLink Digital website, including text, images, and other materials.",
      ],
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      body: [
        "Paid plans (Starter and Pro) are billed monthly or annually in Nepalese Rupees (NPR). Payments are processed through eSewa or Khalti.",
        "Your subscription will automatically renew at the end of each billing period. You may cancel at any time from your account settings, and cancellation will take effect at the end of your current billing cycle.",
        "All payments are non-refundable except as described in our Refund Policy.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Content",
      body: [
        "You may not use HamroLink Digital to publish or distribute content that is illegal under Nepali or international law, including but not limited to: pirated software, hate speech, adult content, gambling, or content that promotes violence.",
        "HamroLink Digital reserves the right to remove any content that violates these terms and to suspend or terminate accounts that repeatedly violate our policies.",
      ],
    },
    {
      icon: Ban,
      title: "Account Termination",
      body: [
        "You may delete your account at any time from your account settings. Deleting your account will remove your website and all associated data from our servers within 30 days.",
        "HamroLink Digital may suspend or terminate your account immediately, without prior notice, if you violate these Terms of Use or if your account is used for fraudulent or illegal activity.",
      ],
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      body: [
        "HamroLink Digital is provided on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, regarding the reliability, availability, or suitability of the service for your purposes.",
        "To the maximum extent permitted by law, HamroLink Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.",
      ],
    },
    {
      icon: Globe,
      title: "Governing Law",
      body: [
        "These Terms of Use shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.",
      ],
    },
    {
      icon: Mail,
      title: "Contact",
      body: [
        "For questions about these Terms, please contact us at: legal@hamrolink.com",
      ],
    },
  ],

  ne: [
    {
      icon: User,
      title: "सर्तहरू स्वीकार गर्ने",
      body: [
        "HamroLink Digital पहुँच गर्न वा प्रयोग गरेर, तपाईं यी सेवा सर्तहरू र हाम्रो गोपनीयता नीतिले बाँधिन सहमत हुनुहुन्छ। यदि तपाईं यी सर्तहरूसँग सहमत हुनुहुन्न भने, कृपया हाम्रो सेवाहरू प्रयोग नगर्नुहोस्।",
        "हामी जुनसुकै बेला यी सर्तहरू परिमार्जन गर्ने अधिकार सुरक्षित राख्छौं। महत्त्वपूर्ण परिवर्तनहरूको बारेमा हामी इमेल वा हाम्रो वेबसाइटमा प्रमुख सूचनाद्वारा जानकारी दिनेछौं।",
      ],
    },
    {
      icon: FileText,
      title: "सेवाको प्रयोग",
      body: [
        "HamroLink Digital ले तपाईंलाई आफ्नो वेबसाइट बनाउन र व्यवस्थापन गर्न हाम्रो प्लेटफर्म पहुँच र प्रयोग गर्न व्यक्तिगत, गैर-अनन्य, हस्तान्तरण गर्न नसकिने लाइसेन्स प्रदान गर्छ।",
        "तपाईंले यो सेवा केवल कानुनी उद्देश्यहरूका लागि र यी सर्तहरू अनुसार प्रयोग गर्न सहमत हुनुहुन्छ। तपाईंले गैरकानुनी, मानहानिकारक, आपत्तिजनक सामग्री होस्ट गर्न वा अरूका अधिकार उल्लङ्घन गर्न सेवा प्रयोग गर्नु हुँदैन।",
        "तपाईंको HamroLink Digital वेबसाइटमा तपाईंले प्रकाशित गर्नुभएको सबै सामग्रीको जिम्मेवारी तपाईं नै हुनुहुन्छ।",
      ],
    },
    {
      icon: CreditCard,
      title: "भुक्तानी र बिलिङ",
      body: [
        "भुक्तानी योजनाहरू (आन्तरिक क्रेडिट) नेपाली रुपैयाँ (NPR) मा १ क्रेडिट बराबर १ रुपैयाँको दरले बिल गरिन्छ। भुक्तानी eSewa वा Khalti मार्फत प्रशोधन गरिन्छ।",
        "प्रत्येक बिलिङ अवधिको अन्तमा तपाईंको सदस्यता स्वतः नवीकरण हुनेछ। तपाईं आफ्नो खाता सेटिङ्सबाट जुनसुकै बेला रद्द गर्न सक्नुहुन्छ।",
        "हाम्रो फिर्ता नीतिमा उल्लेख गरिएको बाहेक सबै भुक्तानीहरू फिर्ता गर्न मिल्दैन।",
      ],
    },
    {
      icon: AlertTriangle,
      title: "निषेधित सामग्री",
      body: [
        "तपाईंले HamroLink Digital मा नेपाली वा अन्तर्राष्ट्रिय कानुनअन्तर्गत गैरकानुनी सामग्री प्रकाशित वा वितरण गर्न सक्नुहुन्न, जसमा पाइरेटेड सफ्टवेयर, घृणास्पद भाषण, वयस्क सामग्री, जुवा वा हिंसा प्रवर्द्धन गर्ने सामग्री समावेश छन्।",
        "HamroLink Digital ले यी सर्तहरू उल्लङ्घन गर्ने वा गराउने सामग्री राखेर बारम्बार नियम उल्लङ्घन गर्ने खाताहरू निलम्बन वा बन्द गर्ने अधिकार सुरक्षित राख्छ।",
      ],
    },
    {
      icon: Ban,
      title: "खाता बन्दि",
      body: [
        "तपाईं आफ्नो खाता सेटिङ्सबाट जुनसुकै बेला आफ्नो खाता मेटाउन सक्नुहुन्छ। खाता मेटाउँदा ३० दिनभित्र तपाईंको वेबसाइट र सम्बन्धित सबै डेटा हाम्रा सर्भरबाट हटाइनेछ।",
        "यदि तपाईंले यी सेवा सर्तहरू उल्लङ्घन गर्नुभयो वा तपाईंको खाता धोखाधडी वा गैरकानुनी गतिविधिका लागि प्रयोग गरिएमा HamroLink Digital ले तपाईंको खाता तुरुन्त, पूर्व सूचना बिना, निलम्बन वा बन्द गर्न सक्छ।",
      ],
    },
    {
      icon: Scale,
      title: "दायित्वको सीमा",
      body: [
        "HamroLink Digital 'जस्तो छ' र 'उपलब्ध भएसम्म' सेवा प्रदान गरिरहन्छ। हामी सेवाको विश्वसनीयता, उपलब्धता वा तपाईंको उद्देश्यका लागि उपयुक्त हुन्छ भन्ने कुनै स्पष्ट वा निहित ग्यारेन्टी दिदैनौ।",
        "कानुनले अनुमति दिएको अधिकतम हदसम्म, HamroLink Digital सेवाको तपाईंको प्रयोगबाट उत्पन्न कुनै पनि अप्रत्यक्ष, आकस्मिक, विशेष, परिणामात्मक वा दण्डात्मक क्षतिको लागि उत्तरदायी हुनेछैन्।",
      ],
    },
    {
      icon: Globe,
      title: "लागू कानुन",
      body: [
        "यी सेवा सर्तहरू नेपालको कानुनद्वारा शासित र व्याख्या गरिनेछ। यी सर्तहरूबाट उत्पन्न विवादहरू काठमाडौं, नेपालका अदालतहरूको अनन्य क्षेत्राधिकारको अधीनमा हुनेछन्।",
      ],
    },
    {
      icon: Mail,
      title: "सम्पर्क",
      body: [
        "यी सर्तहरूबारे प्रश्नका लागि, कृपया सम्पर्क गर्नुहोस्: legal@hamrolink.com",
      ],
    },
  ],
};

export default function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = React.use(params).lang;
  const ne = lang === "ne";
  const secs = ne ? content.ne : content.en;

  return (
    <LegalLayout
      lang={lang}
      icon={FileText}
      gradient="from-slate-700 to-slate-900"
      titleEn="Terms of Use"
      titleNe="सेवा सर्तहरू"
      descEn="Please read these terms carefully before using HamroLink Digital. By using our service, you agree to these terms."
      descNe="HamroLink Digital प्रयोग गर्नु अघि कृपया यी सर्तहरू ध्यानपूर्वक पढ्नुहोस्। हाम्रो सेवा प्रयोग गरेर, तपाईं यी सर्तहरूसँग सहमत हुनुहुन्छ।"
      updatedEn={`Last updated: ${UPDATED_EN}`}
      updatedNe={`अन्तिम अपडेट: ${UPDATED_NE}`}
      backLabelEn="Back to HamroLink Digital"
      backLabelNe="HamroLink Digital मा फर्कनुहोस्"
      slug="terms"
    >
      <div className="space-y-10">
        {secs.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <section key={idx} className="scroll-mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <h2 className="text-xl font-black text-gray-900">
                  {sec.title}
                </h2>
              </div>
              <div className="pl-12 space-y-3">
                {sec.body.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </LegalLayout>
  );
}
