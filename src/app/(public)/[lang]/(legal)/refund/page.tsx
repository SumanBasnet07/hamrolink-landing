// app/[lang]/refund/page.tsx
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  AlertTriangle,
} from "lucide-react";
import LegalLayout from "../LegalLayout";
import React from "react";

const UPDATED_EN = "March 25, 2026";
const UPDATED_NE = "मार्च २५, २०२६";

const content = {
  en: [
    {
      icon: CheckCircle,
      title: "When You're Eligible for a Refund",
      body: [
        "If you are unsatisfied with our service, you may request a refund for your unused subscription time. Refunds are calculated based on your remaining usage and issued exclusively as internal HamroLink credits.",
        "One HamroLink credit is equivalent to one Nepalese Rupee (NPR). These credits can be used for future subscription renewals, new sites, or other premium services within the platform.",
        "If HamroLink experiences significant downtime (more than 24 consecutive hours) due to a fault on our side, you may be eligible for a pro-rated credit refund for the affected period.",
        "If you were charged in error (duplicate charge, wrong amount), we will issue a full cash refund to your original payment method immediately upon verification. In cases where the original method is not available, manual refunds are processed via QR (eSewa/Khalti) or Bank Transfer.",
      ],
    },
    {
      icon: XCircle,
      title: "When Cash Refunds Are Not Available",
      body: [
        "Refunds are strictly not available for usage that has already occurred. Credits will only be issued for the remaining, unused time of your current billing cycle.",
        "Direct cash refunds to your original payment method (eSewa, Khalti) are not provided for subscription cancellations.",
        "Refunds are not available for the Free plan, as it has no charge.",
      ],
    },
    {
      icon: Clock,
      title: "How to Cancel Your Subscription",
      body: [
        "You can cancel your subscription at any time from your account dashboard under Settings → Billing.",
        "You can choose to let your subscription run until the end of your current billing period, or you can cancel immediately to receive a pro-rated refund in internal credits.",
        "After your subscription ends, your website will revert to the Free plan limitations. You will have 30 days to re-subscribe or export your data.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Waitlist & Pre-Launch",
      body: [
        "Joining the HamroLink waitlist is completely free and requires no payment. No charges will be made to you until you purchase credits after launch.",
        "If you pre-paid for early access (if applicable), such payments are refundable as internal credits valid for use when the platform officially launches.",
      ],
    },
    {
      icon: Mail,
      title: "How to Request a Refund",
      body: [
        "To request a pro-rated credit refund, please email support@hamrolink.com with:",
        "• Your registered email address",
        "• Your plan name and purchase date",
        "• The reason for your refund request",
        "We aim to process all refund requests within 3–5 business days. Approved refunds are credited directly to your HamroLink account balance.",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      body: [
        "All payments on HamroLink are processed in Nepalese Rupees (NPR) through eSewa and Khalti to purchase internal HamroLink credits.",
        "Approved refunds for unused subscription time are processed strictly as internal credits. Cash processing times for incorrect duplicate charges back to your original payment method may vary (typically 3–7 business days).",
      ],
    },
  ],

  ne: [
    {
      icon: CheckCircle,
      title: "फिर्ताका लागि कहिले योग्य हुनुहुन्छ",
      body: [
        "यदि तपाईं हाम्रो सेवासँग असन्तुष्ट हुनुहुन्छ भने, तपाईंले प्रयोग गर्न बाँकी रहेको सदस्यता अवधिको लागि फिर्ता अनुरोध गर्न सक्नुहुन्छ। फिर्ता रकम तपाईंको बाँकी प्रयोगको आधारमा गणना गरिन्छ र HamroLink आन्तरिक क्रेडिटको रूपमा मात्र जारी गरिन्छ।",
        "एक HamroLink क्रेडिट एक नेपाली रुपैयाँ (NPR) बराबर हुन्छ। यी क्रेडिटहरू भविष्यमा सदस्यता नवीकरण वा अन्य सेवाहरूको लागि प्रयोग गर्न सकिन्छ।",
        "यदि हाम्रो तर्फबाट HamroLink मा महत्त्वपूर्ण अवरोध (लगातार २४ घण्टाभन्दा बढी) भयो भने, प्रभावित अवधिका लागि तपाईं अनुपातिक क्रेडिट फिर्ताको लागि योग्य हुन सक्नुहुन्छ।",
        "यदि तपाईंलाई गलत शुल्क लगाइयो (जस्तै दोहोरो शुल्क) भने, प्रमाणीकरण पश्चात तुरुन्त तपाईंको मूल भुक्तानी विधिमा पूर्ण नगद फिर्ता गरिनेछ। मूल भुक्तानी विधि उपलब्ध नभएको अवस्थामा, QR (eSewa/Khalti) वा बैंक ट्रान्सफर मार्फत म्यानुअल रूपमा फिर्ता गरिनेछ।",
      ],
    },
    {
      icon: XCircle,
      title: "नगद फिर्ता कहिले उपलब्ध छैन",
      body: [
        "तपाईंले प्रयोग गरिसकेको समय वा सेवाको लागि फिर्ता उपलब्ध हुनेछैन। तपाईंको बिलिङ चक्रको बाँकी समयको लागि मात्र क्रेडिटहरू जारी गरिनेछ।",
        "सदस्यता रद्द गर्दा तपाईंको मूल भुक्तानी विधि (eSewa, Khalti) मार्फत प्रत्यक्ष नगद फिर्ता प्रदान गरिने छैन।",
        "नि:शुल्क योजनाका लागि फिर्ता उपलब्ध छैन, किनकि यसमा कुनै शुल्क छैन।",
      ],
    },
    {
      icon: Clock,
      title: "सदस्यता कसरी रद्द गर्ने",
      body: [
        "तपाईं आफ्नो खाता ड्यासबोर्डबाट Settings → Billing अन्तर्गत जुनसुकै बेला आफ्नो सदस्यता रद्द गर्न सक्नुहुन्छ।",
        "तपाईं आफ्नो सदस्यता हालको बिलिङ अवधिको अन्त्यसम्म चल्न दिन सक्नुहुन्छ, वा आन्तरिक क्रेडिटमा अनुपातिक फिर्ता प्राप्त गर्न तुरुन्तै रद्द गर्न सक्नुहुन्छ।",
        "तपाईंको सदस्यता समाप्त भएपछि, तपाईंको वेबसाइट नि:शुल्क योजनाको सीमामा फर्कनेछ। तपाईंसँग निर्यात गर्न वा फेरि सदस्यता लिन ३० दिन हुनेछ।",
      ],
    },
    {
      icon: AlertTriangle,
      title: "प्रतीक्षासूची र प्रि-लन्च",
      body: [
        "HamroLink प्रतीक्षासूचीमा जोइन गर्न पूर्णतः नि:शुल्क छ र कुनै भुक्तानी आवश्यक छैन। लन्चपछि क्रेडिट खरिद नगरेसम्म तपाईंलाई कुनै शुल्क लगाइनेछैन।",
        "यदि तपाईंले अर्ली एक्सेसका लागि अग्रिम भुक्तानी गर्नुभयो (यदि लागू भएमा) भने, प्लेटफर्म आधिकारिक रूपमा लन्च हुँदा प्रयोग गर्न मान्य हुने गरी त्यस्ता भुक्तानीहरू आन्तरिक क्रेडिटको रूपमा फिर्ता गर्न सकिन्छ।",
      ],
    },
    {
      icon: Mail,
      title: "फिर्ताको अनुरोध कसरी गर्ने",
      body: [
        "क्रेडिट फिर्ताको अनुरोध गर्न, कृपया support@hamrolink.com मा निम्न जानकारीसहित इमेल गर्नुहोस्:",
        "• तपाईंको दर्ता इमेल ठेगाना",
        "• तपाईंको योजनाको नाम र खरिद मिति",
        "• तपाईंको फिर्ता अनुरोधको कारण",
        "हामी सबै फिर्ता अनुरोधहरू ३–५ व्यावसायिक दिनभित्र प्रशोधन गर्ने लक्ष्य राख्छौं। स्वीकृत फिर्ताहरू सिधै तपाईंको HamroLink खाताको ब्यालेन्समा जम्मा गरिन्छ।",
      ],
    },
    {
      icon: CreditCard,
      title: "भुक्तानी प्रशोधन",
      body: [
        "HamroLink मा सबै भुक्तानीहरू आन्तरिक क्रेडिट खरिद गर्न eSewa र Khalti मार्फत नेपाली रुपैयाँ (NPR) मा प्रशोधन गरिन्छ।",
        "प्रयोग नगरिएको सदस्यता समयको लागि स्वीकृत फिर्ताहरू कडाइका साथ आन्तरिक क्रेडिटको रूपमा प्रशोधन गरिन्छ। गलत शुल्कको लागि तपाईंको मूल भुक्तानी विधिमा नगद फिर्ता हुन लाग्ने समय फरक हुन सक्छ (सामान्यतः ३–७ व्यावसायिक दिन)।",
      ],
    },
  ],
};

export default function RefundPage({
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
      icon={CreditCard}
      gradient="from-emerald-600 to-teal-700"
      titleEn="Refund Policy"
      titleNe="फिर्ता नीति"
      descEn="We want you to be happy with HamroLink. Here's our straightforward refund policy."
      descNe="हामी चाहन्छौं कि तपाईं HamroLink सँग खुसी हुनुहोस्। यो हाम्रो सरल फिर्ता नीति हो।"
      updatedEn={`Last updated: ${UPDATED_EN}`}
      updatedNe={`अन्तिम अपडेट: ${UPDATED_NE}`}
      backLabelEn="Back to HamroLink"
      backLabelNe="HamroLink मा फर्कनुहोस्"
      slug="refund"
    >
      <div className="space-y-10">
        {secs.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <section key={idx} className="scroll-mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-emerald-600" />
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
