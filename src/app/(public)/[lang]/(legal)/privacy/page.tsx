// app/[lang]/privacy/page.tsx
import {
  Shield,
  Database,
  Eye,
  Globe,
  Lock,
  UserCheck,
  Bell,
  Trash2,
  Mail,
} from "lucide-react";
import LegalLayout from "../LegalLayout";
import React from "react";

const UPDATED_EN = "March 25, 2026";
const UPDATED_NE = "मार्च २५, २०२६";

// ─── Content ─────────────────────────────────────────────────────────────────
const content = {
  en: [
    {
      id: "information-collected",
      icon: Database,
      title: "Information We Collect",
      body: [
        "We collect information you provide directly to us when you create an account, fill out a form, or contact us for support. This includes your name, email address, and payment information.",
        "We automatically collect certain information about your device and how you interact with our services, including your IP address, browser type, operating system, and pages visited.",
        "If you use our e-commerce or payment features, we collect transaction data including purchase history and payment method details (processed securely through eSewa and Khalti).",
      ],
    },
    {
      id: "how-we-use",
      icon: Eye,
      title: "How We Use Your Information",
      body: [
        "To provide, maintain, and improve our services — including hosting your website, processing payments, and sending you important account notifications.",
        "To personalise your experience on HamroLink and to send you promotional communications (only with your consent, and you may opt out at any time).",
        "To detect, investigate, and prevent fraudulent transactions and other illegal activities to protect the rights and property of HamroLink and our users.",
      ],
    },
    {
      id: "data-sharing",
      icon: Globe,
      title: "Data Sharing & Disclosure",
      body: [
        "We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who help us operate our platform (such as cloud hosting and payment processors) under strict confidentiality agreements.",
        "We may disclose your information if required to do so by law, a court order, or government authority, or if we believe disclosure is necessary to protect the safety of any person.",
      ],
    },
    {
      id: "data-security",
      icon: Lock,
      title: "Data Security",
      body: [
        "We implement industry-standard security measures including SSL/TLS encryption, secure data storage, and regular security audits to protect your personal information.",
        "While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      icon: UserCheck,
      title: "Your Rights",
      body: [
        "You have the right to access, correct, or delete the personal information we hold about you at any time. You can do this through your account settings or by contacting our support team.",
        "You may request a copy of your data in a machine-readable format, withdraw consent for marketing communications, or request that we restrict processing of your data.",
        "To exercise any of these rights, please contact us at privacy@hamrolink.com.",
      ],
    },
    {
      id: "cookies",
      icon: Bell,
      title: "Cookies & Tracking",
      body: [
        "We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.",
        "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our service may not function properly.",
      ],
    },
    {
      id: "data-retention",
      icon: Trash2,
      title: "Data Retention",
      body: [
        "We retain your personal data for as long as your account is active or as needed to provide you services. If you request deletion of your account, we will delete or anonymise your data within 30 days, except where we are required by law to retain it.",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact Us",
      body: [
        "If you have any questions about this Privacy Policy, please contact us:",
        "Email: privacy@hamrolink.com",
        "Address: Pakhribas-04, Dhankuta, Nepal",
      ],
    },
  ],

  ne: [
    {
      id: "information-collected",
      icon: Database,
      title: "हामीले सङ्कलन गर्ने जानकारी",
      body: [
        "तपाईंले खाता बनाउँदा, फारम भर्दा वा सहायताका लागि सम्पर्क गर्दा सिधै प्रदान गर्नुभएको जानकारी हामी सङ्कलन गर्छौं। यसमा तपाईंको नाम, इमेल ठेगाना र भुक्तानी जानकारी समावेश छ।",
        "तपाईंको डिभाइस र हाम्रो सेवाहरूसँगको अन्तरक्रियाबारे केही जानकारी स्वतः सङ्कलन गरिन्छ, जसमा IP ठेगाना, ब्राउजर प्रकार, अपरेटिङ सिस्टम र भिजिट गरिएका पेजहरू समावेश छन्।",
        "यदि तपाईंले हाम्रो ई-कमर्स वा भुक्तानी सुविधाहरू प्रयोग गर्नुहुन्छ भने, eSewa र Khalti मार्फत सुरक्षित रूपमा प्रशोधन गरिएको खरिद इतिहास र भुक्तानी विधि विवरणहरू सहित लेनदेन डेटा सङ्कलन गरिन्छ।",
      ],
    },
    {
      id: "how-we-use",
      icon: Eye,
      title: "हामी तपाईंको जानकारी कसरी प्रयोग गर्छौं",
      body: [
        "तपाईंको वेबसाइट होस्ट गर्ने, भुक्तानी प्रशोधन गर्ने र महत्त्वपूर्ण खाता सूचनाहरू पठाउनेसहित हाम्रो सेवाहरू प्रदान गर्न, कायम राख्न र सुधार गर्न।",
        "HamroLink मा तपाईंको अनुभव व्यक्तिगत बनाउन र प्रचारात्मक संचार पठाउन (केवल तपाईंको सहमतिमा, र तपाईंले जुनसुकै बेला लग आउट गर्न सक्नुहुन्छ)।",
        "धोखाधडी लेनदेन र अन्य गैरकानुनी गतिविधिहरू पत्ता लगाउन, अनुसन्धान गर्न र रोक्न।",
      ],
    },
    {
      id: "data-sharing",
      icon: Globe,
      title: "डेटा साझाकरण र प्रकटीकरण",
      body: [
        "हामी तेस्रो पक्षहरूलाई तपाईंको व्यक्तिगत जानकारी बेच्दैनौ, व्यापार गर्दैनौ वा भाडामा दिदैनौ। हामी कडा गोपनीयता सम्झौताहरूमा हाम्रो प्लेटफर्म संचालन गर्न मद्दत गर्ने विश्वसनीय सेवा प्रदायकहरूसँग तपाईंको डेटा साझा गर्न सक्छौं।",
        "कानुन, अदालतको आदेश वा सरकारी अधिकारीद्वारा आवश्यक भएमा वा कुनै व्यक्तिको सुरक्षा रक्षा गर्न आवश्यक छ भन्ने विश्वास भएमा हामी तपाईंको जानकारी प्रकट गर्न सक्छौं।",
      ],
    },
    {
      id: "data-security",
      icon: Lock,
      title: "डेटा सुरक्षा",
      body: [
        "हामी तपाईंको व्यक्तिगत जानकारी सुरक्षित गर्न SSL/TLS इन्क्रिप्सन, सुरक्षित डेटा भण्डारण र नियमित सुरक्षा अडिट सहित उद्योग-मानक सुरक्षा उपायहरू लागू गर्छौं।",
        "हामी तपाईंको डेटा सुरक्षित गर्न व्यावसायिक रूपमा स्वीकार्य माध्यमहरू प्रयोग गर्ने प्रयास गर्छौं, तर इन्टरनेट वा इलेक्ट्रोनिक भण्डारण मार्फत कुनै पनि ट्रान्समिसन विधि १००% सुरक्षित छैन।",
      ],
    },
    {
      id: "your-rights",
      icon: UserCheck,
      title: "तपाईंका अधिकारहरू",
      body: [
        "तपाईंले जुनसुकै बेला हामीसंग रहेको तपाईंको व्यक्तिगत जानकारी प्राप्त गर्न, सच्याउन वा मेटाउन अधिकार छ। तपाईंले यो आफ्नो खाता सेटिङ्सबाट वा हाम्रो सहायता टोलीलाई सम्पर्क गरेर गर्न सक्नुहुन्छ।",
        "तपाईंले मेसिन-पठनीय ढाँचामा आफ्नो डेटाको प्रतिलिपि अनुरोध गर्न, मार्केटिङ संचारको लागि सहमति फिर्ता लिन वा तपाईंको डेटाको प्रशोधनका लागी अनुरोध गर्न सक्नुहुन्छ।",
        "यी कुनै पनि अधिकारहरू प्रयोग गर्न, कृपया privacy@hamrolink.com मा सम्पर्क गर्नुहोस्।",
      ],
    },
    {
      id: "cookies",
      icon: Bell,
      title: "कुकिज र ट्र्याकिङ",
      body: [
        "हामी हाम्रो सेवामा गतिविधि ट्र्याक गर्न र केही जानकारी  कुकिज र समान ट्र्याकिङ प्रविधिहरू प्रयोग गर्छौं।",
        "तपाईंले सबै कुकिज अस्वीकार गर्न वा कुकिज पठाइँदा सङ्केत दिन आफ्नो ब्राउजरलाई निर्देश दिन सक्नुहुन्छ। तर यदि तपाईंले कुकिज स्वीकार गर्नुभएन भने, हाम्रो सेवाका केही भागहरू ठीकसँग काम नगर्न सक्छन्।",
      ],
    },
    {
      id: "data-retention",
      icon: Trash2,
      title: "डेटा अवधि",
      body: [
        "तपाईंको खाता सक्रिय रहेसम्म वा तपाईंलाई सेवाहरू प्रदान गर्न आवश्यक रहेसम्म हामी तपाईंको व्यक्तिगत डेटा राख्छौं। यदि तपाईंले खाता मेटाउन अनुरोध गर्नुभयो भने, हामी कानुनद्वारा राख्न आवश्यक भएको बाहेक ३० दिनभित्र तपाईंको डेटा मेटाउनेछौं।",
      ],
    },
    {
      id: "contact",
      icon: Mail,
      title: "सम्पर्क गर्नुहोस्",
      body: [
        "यस गोपनीयता नीतिबारे कुनै प्रश्न भएमा, कृपया हामीलाई सम्पर्क गर्नुहोस्:",
        "इमेल: privacy@hamrolink.com",
        "ठेगाना: पाख्रिबास-०४, धनकुटा, नेपाल",
      ],
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPage({
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
      icon={Shield}
      gradient="from-blue-600 to-indigo-700"
      titleEn="Privacy Policy"
      titleNe="गोपनीयता नीति"
      descEn="We are committed to protecting your personal information and your right to privacy."
      descNe="हामी तपाईंको व्यक्तिगत जानकारी र गोपनीयताको अधिकार सुरक्षित गर्न प्रतिबद्ध छौं।"
      updatedEn={`Last updated: ${UPDATED_EN}`}
      updatedNe={`अन्तिम अपडेट: ${UPDATED_NE}`}
      backLabelEn="Back to HamroLink"
      backLabelNe="HamroLink मा फर्कनुहोस्"
      slug="privacy"
    >
      <div className="space-y-10">
        {secs.map((sec) => {
          const Icon = sec.icon;
          return (
            <section key={sec.id} id={sec.id} className="scroll-mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
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
