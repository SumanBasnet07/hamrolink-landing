// lib/dictionaries.ts
// Conversion-optimised copy — EN + NE.
// Updated for plan consistency and natural Nepali flow.

export type Lang = "en" | "ne";

export const dictionaries = {
  // ══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ══════════════════════════════════════════════════════════════════════════
  en: {
    // ── Navbar ───────────────────────────────────────────────────────────────
    nav: {
      templates: "Templates",
      features: "Features",
      pricing: "Pricing",
      docs: "Docs",
      contact: "Contact",
      signIn: "Sign In",
      cta: "Join Early Access",
      ctaPostLaunch: "Get Started",
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      // Fix #2: More trustworthy badge
      badge: "Built for Nepali creators and businesses — Launching soon",

      // Fix #3: Stronger headline structure
      line1: "Your own website.",
      // line2 is injected dynamically (e.g. "For your brand")
      line3: "Built in minutes.",

      // Fix #4: Sharper subtext
      subtext:
        "Creators, shops, schools, and local businesses in Nepal can now launch their own website in minutes. Join the waitlist to be first in line.",

      supportLine: "Choose a template → Add your details → Publish. Done.",

      ctaPrimary: "Join Early Access",
      ctaPrimaryPostLaunch: "Get Started Free",
      ctaSecondary: "See Examples",

      // Fix #13: Natural trust strip
      trust: [
        "Free to join",
        "No credit card needed",
        "Early access before public launch",
      ],

      identityLine:
        "Made for creators · shops · schools · consultants · restaurants in Nepal",

      slideLabels: [
        "For your business",
        "For your brand",
        "For your shop",
        "For your school",
        "For your work",
      ],

      floatingClicks: "Clicks today",
      floatingSites: "On waitlist",
      scrollLabel: "Scroll",
    },

    // ── Waitlist form ────────────────────────────────────────────────────────
    waitlist: {
      // Fix #12: Less friction
      placeholder: "Enter your email",
      cta: "Join Early Access",
      submitting: "Joining…",
      successTitle: "You're on the list! 🎉",
      successText: "We'll email you the moment HamroLink launches.",
      errorDuplicate: "This email is already on the waitlist.",
      errorGeneric: "Something went wrong. Please try again.",
      launchLabel: "HamroLink is launching soon.",
      launchSub:
        "Join the early access list and be the first to create your website.",
      countPrefix: "",
      countSuffix: " people already waiting",

      heading: "Be first to launch\non HamroLink.",
      subheading:
        "Join thousands of Nepali businesses getting early access. We'll notify you the moment we go live.",

      // Fix #6: Safer promise for Perk 2
      perk1Title: "500 Early Access Credits",
perk1Desc: "Early access users will receive 500 credits to use on your website features upon signup.",
perk2Title: "Priority Access",
perk2Desc: "Get access before the public launch and skip the queue.",
perk3Title: "Locked-in Early Price",
perk3Desc: "Your plan price is frozen at launch pricing (NPR 399/899), forever.",

      socialProof: "businesses already on the waitlist",

      formTitle: "Reserve your spot",
      formSub: "Takes 10 seconds. No credit card needed.",
      // Fix #14: Added urgency
      urgency: "Limited early access spots available.",

      trust1: "No spam, ever",
      trust2: "Unsubscribe anytime",
      trust3: "Made for Nepal",

      // Fix #7: Transparency/Social proof fix
      quote: '"Nepali businesses have needed something like this for years."',
      quoteAuthor: "Early waitlist member",
    },

    // ── Demo video section ───────────────────────────────────────────────────
    video: {
      badge: "See it in action",
      // Fix #5: Scannable headline
      heading: "Watch a website go live in minutes.",
      subtext:
        "See how fast you can launch your own website — no coding, no setup, no stress.",
      steps: [
        "Enter your business name",
        "Choose a template",
        "Add your logo or text",
        "Click publish",
        "Your website goes live",
      ],
      finalFrame: "Your website live in minutes.",
      src: "/demo.mp4",
      cta: "Join Early Access",
    },

    // ── Micro-proof block ────────────────────────────────────────────────────
    microProof: {
      // Fix #8: Clearer label
      eyebrow: "Example websites →",
      domains: [
        "hamrostore.hamrolink.com",
        "hamroschool.hamrolink.com",
        "hamrokhajaghar.hamrolink.com",
      ],
      cta: "Join Early Access",
    },

    // ── Contact Page ──────────────────────────────────────────────────────────
    contactPage: {
      title: "Contact Us - HamroLink Website Builder Nepal",
      description:
        "Get in touch with HamroLink. Whether you have questions about our website builder, need technical support, or want to partner with us, our team in Dhankuta is ready to help.",
      badge: "Get in touch",
      heading: "We're here to help.",
      subheading:
        "Have questions about HamroLink? Our team is ready to assist you.",
      businessInfo: {
        name: "HamroLink (HamroLink Nepal)",
        phone: "+977-9816326639",
        email: "support@hamrolink.com",
        address: "Pakhribas-04, Dhankuta, Koshi Province, Nepal",
      },
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        placeholderName: "Your name",
        placeholderEmail: "you@example.com",
        placeholderSubject: "How can we help?",
        placeholderMessage: "Tell us more about your business needs...",
        cta: "Send Message",
        sending: "Sending Message...",
        success: "Message sent! We'll get back to you soon.",
        error: "Failed to send message. Please try again.",
      },
      info: {
        email: "Email us",
        location: "Our HQ",
        hours: "Support Hours",
        hoursValue: "Sunday - Friday, 9am - 6pm",
        address: "Pakhribas-04, Dhankuta",
      },
    },

    // ── About Page ────────────────────────────────────────────────────────────
    aboutPage: {
      title:
        "About HamroLink - Empowerment through Digital Innovation in Nepal",
      description:
        "Learn more about HamroLink, Nepal's mission-driven website builder. Founded in Pakhribas, Dhankuta, we are dedicated to helping local businesses, schools, and creators build their digital presence.",
      badge: "Our Story",
      heading: "Building the digital future of Nepal.",
      subheading:
        "HamroLink was born from a simple idea: every Nepali business, no matter how small or remote, deserves a professional presence on the web.",
      story: {
        title: "From Pakhribas to the World",
        content: `HamroLink started not in a fancy office in Kathmandu, but in the serene hills of Pakhribas, Dhankuta. We saw firsthand how talented local entrepreneurs, dedicated teachers, and skilled artisans were being left behind in the digital age because building a website was too complex, too expensive, or required technical knowledge they didn't have.

        We decided to change that. Our journey began with a single mission: to build a platform that speaks the language of Nepal—both literally and figuratively. We've spent countless hours understanding the unique needs of Nepali schools, the challenges of local e-commerce, and the aspirations of individual creators.

        Today, HamroLink is more than just a website builder. It is a community of thousands of Nepalis who are taking their first steps into the digital world. From eSewa and Khalti integrations to localized templates, every feature we build is designed to solve a real problem for a real Nepali.`,
      },
      mission: {
        title: "Our Mission",
        text: "To empower Nepali creators, entrepreneurs, and institutions with the simplest, most powerful tools to share their work with the world — without technical barriers.",
      },
      vision: {
        title: "Our Vision",
        text: "To be the foundation upon which Nepal's digital economy is built, fostering innovation from the hills of Dhankuta to the streets of Kathmandu.",
      },
      values: [
        {
          title: "Authenticity",
          desc: "We are built by Nepalis, for Nepalis. We understand the local context like no one else.",
        },
        {
          title: "Simplicity",
          desc: "Technology should be invisible. If a grandmother can't use it to start hershop, it's too complex.",
        },
        {
          title: "Empowerment",
          desc: "We don't just build sites; we build confidence for businesses to grow online.",
        },
      ],
      team: {
        title: "Meet the Founder",
        members: [
          {
            name: "Suman Basnet",
            role: "Founder & Visionary",
            bio: "A technologist by heart and a social entrepreneur by soul. Suman founded HamroLink after witnessing the digital divide in his hometown, Pakhribas. With a background in full-stack engineering and a passion for local empowerment, he is on a mission to ensure that every Nepali business can compete in the global digital economy. He believes that true innovation starts when technology becomes invisible and accessible to all.",
          },
        ],
      },
      stats: [
        { label: "Founded", value: "2026" },
        { label: "Community", value: "Growing" },
        { label: "Focus", value: "Nepal 🇳🇵" },
      ],
      location: {
        title: "Our Roots",
        address: "Pakhribas-04, Dhankuta",
        description:
          "While we serve the entire nation, our heart remains in the serene hills of Pakhribas, Dhankuta. This is where our journey began, and it remains our source of inspiration for building a better digital Nepal.",
        district: "Dhankuta District, Koshi Province",
      },
    },

    // ── Stats bar ────────────────────────────────────────────────────────────
    preLaunchStats: [
      { value: "240+", label: "On the waitlist" },
      { value: "120+", label: "Ready templates" },
      { value: "99.9%", label: "Uptime guaranteed" },
      { value: "3 min", label: "Avg. time to launch" },
    ],
    stats: [
      { value: "5,000+", label: "Websites launched" },
      { value: "120+", label: "Ready templates" },
      { value: "99.9%", label: "Uptime guaranteed" },
      { value: "3 min", label: "Avg. time to launch" },
    ],

    // ── Who it's for ─────────────────────────────────────────────────────────
    who: {
      badge: "Built for every Nepali business",
      heading: "Whatever you do,\nHamroLink gives you a website for it.",
      subtext:
        "No technical knowledge needed. Pick your type, pick a template, go live.",
      cards: [
        {
          emoji: "🛍️",
          title: "Sell online",
          label: "Shops & Stores",
          desc: "List products, accept eSewa & Khalti payments, manage orders — all from one place.",
        },
        {
          emoji: "🏫",
          title: "Grow your school",
          label: "Schools & Colleges",
          desc: "Share admissions, programs, galleries, and announcements with parents and students.",
        },
        {
          emoji: "✈️",
          title: "Get more clients",
          label: "Consultancies",
          desc: "Build trust with a professional page. Let clients book sessions and manage leads.",
        },
        {
          emoji: "💼",
          title: "Stand out locally",
          label: "Small Businesses",
          desc: "Show your menu, services, location, and events. Make it easy for customers to find you.",
        },
      ],
    },

    // ── Examples section ─────────────────────────────────────────────────────
    examples: {
      badge: "Real examples",
      heading: "See what you can build with HamroLink",
      subtext:
        "These are example websites created using HamroLink templates. Yours could be next.",
      items: [
        {
          emoji: "🛍️",
          name: "Hamro Store",
          desc: "Sell products online and accept orders easily.",
          url: "hamrostore.hamrolink.com",
          // Fix #9: Real links for credibility
          href: "https://hamrostore.hamrolink.com",
        },
        {
          emoji: "🏫",
          name: "Hamro School",
          desc: "Share admissions, programs, and announcements.",
          url: "hamroschool.hamrolink.com",
          href: "https://hamroschool.hamrolink.com",
        },
        {
          emoji: "🍽️",
          name: "Hamro Khaja Ghar",
          desc: "Show your menu, location, and contact information.",
          url: "hamrokhajaghar.hamrolink.com",
          href: "https://hamrokhajaghar.hamrolink.com",
        },
        {
          emoji: "🎨",
          name: "Creator Portfolio",
          desc: "Show your work, bio, and social links.",
          url: "creator.hamrolink.com",
          href: "https://creator.hamrolink.com",
        },
      ],
      closing:
        "HamroLink is launching soon. Join early access to be among the first to build your website.",
      cta: "Join Early Access",
    },

    // ── Features ─────────────────────────────────────────────────────────────
    features: {
      badge: "Everything you need",
      heading: "All the tools. None of the complexity.",
      subtext:
        "Every feature is built for Nepal — local payments, local languages, local businesses.",
      // Fix #1: Consistent features (Removed AI/Analytics/Code)
      items: [
        {
          title: "Your own domain",
          desc: "Get yourname.hamrolink.com free, or connect any domain you own.",
        },
        {
          title: "Sell online",
          desc: "Add products, set prices, and accept eSewa & Khalti payments instantly.",
        },
        {
          title: "Fast website hosting",
          desc: "Your site loads fast anywhere in Nepal with reliable global hosting.",
        },
        {
          title: "Mobile-first design",
          desc: "Every template looks perfect on phones, tablets, and computers.",
        },
        {
          title: "SEO ready",
          desc: "Your site is optimized so people can find you on Google.",
        },
        {
          title: "QR Code included",
          desc: "Every site gets a print-ready QR code. Put it on cards, banners, menus.",
        },
        {
          title: "School tools",
          desc: "Enrollment forms, photo galleries, and a full institution dashboard.",
        },
        {
          title: "Consultancy pages",
          desc: "Capture leads, take bookings, and manage client inquiries easily.",
        },
      ],
    },

    // ── Templates section ────────────────────────────────────────────────────
    templates: {
      badge: "120+ templates",
      heading: "Pick a template.\nYour site is 80% done.",
      subtext:
        "Every template is designed for a Nepali audience. Just add your content.",
      browseAll: "Browse all templates",
      useThis: "Join Early Access",
      hoverCta: "Join Early Access →",
    },

    // ── Founder trust section ────────────────────────────────────────────────
    founder: {
      badge: "From the founder",
      heading: "Why I built HamroLink",
      paragraphs: [
        "Many talented creators and small businesses in Nepal still don't have their own website — because building one feels expensive or complicated.",
        "HamroLink was created to make launching a website as simple as creating a social media profile.",
        // Fix #10: Clearer closing
        "Anyone should be able to launch their own website easily.",
      ],
      signature: "— Suman Basnet",
      role: "Founder, HamroLink",
      cta: "Join Early Access",
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      // Fix #11: Less placeholder feeling
      badge: "Simple pricing, launching soon",
      heading: "Plans for every stage of your business.",
      subtext:
        "Join the waitlist now. Pricing activates at launch — free plan stays free forever.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "SAVE",
      free: "Free",
      perMonth: "/mo",
      perYear: "/yr",
      approxMonth: "≈ NPR {n}/month",
      ctaFree: "Get Started Free",
      ctaPaid: "Get Started",
      footer:
        "Every plan includes 1 website · hamrolink.com subdomain · Drag & drop editor · Built-in QR code · Nepali & English dashboard",
      plans: [
        {
          name: "Free",
          desc: "Try everything. No card needed.",
          feats: [
            { t: "1 website", ok: true },
            { t: "5 pages", ok: true },
            { t: "10 images · 2 file uploads", ok: true },
            { t: "10 emails / month", ok: true },
            { t: "yourname.hamrolink.com", ok: true },
            { t: "Custom domain", ok: false },
            { t: "Online store", ok: false },
            { t: "Remove HamroLink branding", ok: false },
          ],
        },
        {
          name: "Starter",
          desc: "Everything a growing business needs.",
          feats: [
            { t: "1 website", ok: true },
            { t: "20 pages + 30 blog posts", ok: true },
            { t: "50 images · 5 file uploads", ok: true },
            { t: "250 emails / month", ok: true },
            { t: "Custom domain", ok: true },
            { t: "Online store — 30 products", ok: true },
            { t: "70 bookings · 10 events", ok: true },
            { t: "Remove HamroLink branding", ok: true },
          ],
        },
        {
          name: "Pro",
          desc: "For businesses that are serious about growth.",
          feats: [
            { t: "1 website", ok: true },
            { t: "50 pages + 150 blog posts", ok: true },
            { t: "100 images · 10 file uploads", ok: true },
            { t: "600 emails / month", ok: true },
            { t: "Custom domain", ok: true },
            { t: "Online store — 300 products", ok: true },
            { t: "150 bookings · 25 events", ok: true },
            { t: "Remove HamroLink branding", ok: true },
          ],
        },
      ],
    },

    // ── Final CTA ────────────────────────────────────────────────────────────
    cta: {
      line1: "HamroLink is",
      line2: "launching soon.",
      subtext:
        "Join early access to be among the first creators and businesses to build their website.",
      primary: "Join Early Access",
      secondary: "See Pricing",
      disclaimer: "Free to join · No credit card · Be notified at launch",
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:
        "The simplest way for anyone in Nepal to launch a website — coming soon.",
      taglinePostLaunch:
        "The simplest way for anyone in Nepal to launch a website.",
      cta: "Join Early Access",
      ctaPostLaunch: "Get Started Free",
      copyright: "All rights reserved · Built with ❤️ in Nepal 🇳🇵",
      sections: {
        Product: [
          ["Templates", "/#examples"],
          ["Features", "/#features"],
          ["Pricing", "/#pricing"],
          ["Support", "/docs"],
          ["Contact", "/contact"],
        ],
        Company: [
          ["About", "/about"],
          // ["Blog", "/blog"],
          // ["Status", "/status"],
        ],
        Legal: [
          ["Privacy Policy", "/privacy"],
          ["Terms of Use", "/terms"],
          ["Refund Policy", "/refund"],
          ["FAQ", "/faqs"],
        ],
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NEPALI — नेपाली
  // ══════════════════════════════════════════════════════════════════════════
  ne: {
    // ── Navbar ───────────────────────────────────────────────────────────────
    nav: {
      templates: "टेम्प्लेट",
      features: "सुविधाहरू",
      pricing: "मूल्य",
      docs: "सहयोग",
      contact: "सम्पर्क",
      signIn: "साइन इन",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      // Fix #2: Reliable badge
      badge: "नेपाली क्रिएटर र व्यवसायका लागि निर्मित — छिट्टै आउँदैछ",

      // Fix #3: Stronger headlines
      line1: "तपाईंको आफ्नै वेबसाइट।",
      line3: "मिनेटमै तयार।",

      // Fix #4: Sharp subtext
      subtext:
        "नेपालका क्रिएटर, पसल, विद्यालय र साना व्यवसायहरूले अब केही मिनेटमै आफ्नो वेबसाइट लन्च गर्न सक्छन्। पहिलो हुनका लागि आजै प्रतीक्षासूचीमा जोइन गर्नुहोस्।",

      supportLine:
        "टेम्प्लेट छान्नुहोस् → विवरण थप्नुहोस् → प्रकाशित गर्नुहोस्। सकियो।",

      ctaPrimary: "प्रतीक्षासूचीमा बस्नुहोस्",
      ctaPrimaryPostLaunch: "नि:शुल्क सुरु गर्नुहोस्",
      ctaSecondary: "उदाहरण हेर्नुहोस्",

      // Fix #13: Natural trust strip
      trust: [
        "जोइन गर्न पैसा लाग्दैन",
        "क्रेडिट कार्ड चाहिँदैन",
        "सबैभन्दा पहिले चलाउन पाउनुहोस्",
      ],

      identityLine:
        "क्रिएटर · पसल · विद्यालय · परामर्श · रेस्टुरेन्टका लागि बनाइएको",

      slideLabels: [
        "तपाईंको व्यवसायका लागि",
        "तपाईंको ब्रान्डका लागि",
        "तपाईंको पसलका लागि",
        "तपाईंको स्कुलका लागि",
        "तपाईंको काम देखाउन",
      ],

      floatingClicks: "आजका क्लिकहरू",
      floatingSites: "प्रतीक्षासूचीमा",
      scrollLabel: "तल हेर्नुहोस्",
    },

    // ── Waitlist form ────────────────────────────────────────────────────────
    waitlist: {
      // Fix #12: Frictionless
      placeholder: "आफ्नो इमेल लेख्नुहोस्",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
      submitting: "थपिँदैछ…",
      successTitle: "तपाईं सूचीमा पर्नुभयो! 🎉",
      successText: "HamroLink लन्च हुने बित्तिकै हामी तपाईंलाई खबर गर्नेछौं।",
      errorDuplicate: "यो इमेल पहिल्यै प्रतीक्षासूचीमा छ।",
      errorGeneric: "केही गल्ती भयो। कृपया फेरि प्रयास गर्नुहोस्।",
      launchLabel: "HamroLink छिट्टै लन्च हुँदैछ।",
      launchSub:
        "प्रतीक्षासूचीमा बस्नुहोस् र आफ्नो वेबसाइट बनाउने पहिलो व्यक्ति बन्नुहोस्।",
      countPrefix: "",
      countSuffix: " जना प्रतीक्षारत",

      heading: "HamroLink मा\nसबैभन्दा पहिले लन्च गर्नुहोस्।",
      subheading:
        "हजारौं नेपाली व्यवसायहरूसँगै अर्ली एक्सेस पाउनुहोस्। लन्च हुने बित्तिकै सूचना पाउनुहुन्छ।",

      // Fix #6: Safety
      perk1Title: "अर्ली एक्सेस क्रेडिट ५००",
perk1Desc: "अर्ली एक्सेस प्रयोगकर्ताहरूले आफ्नो खाता खोल्दा ५०० क्रेडिट पाउनेछन्, जुन तपाईंको वेबसाइटमा सुविधाहरू प्रयोग गर्न सकिन्छ।",
perk2Title: "प्राथमिकतामा एक्सेस",
perk2Desc: "सबैका लागि खुल्नु अगाडि नै तपाईंले साइट चलाउन पाउनुहुनेछ।",
perk3Title: "सस्तो मूल्य सधैँका लागि",
perk3Desc: "अहिलेको लन्च मूल्य (NPR ३९९/८९९) तपाईंको लागि सधैँका लागि स्थिर (Freeze) रहनेछ।",
      socialProof: "व्यवसायहरू प्रतीक्षासूचीमा",

      formTitle: "आफ्नो सिट सुरक्षित गर्नुहोस्",
      formSub: "१० सेकेन्ड लाग्छ। क्रेडिट कार्ड चाहिँदैन।",
      // Fix #14: Urgency
      urgency: "केही सीमित ठाउँहरू मात्र बाँकी छन्।",

      trust1: "स्प्याम आउँदैन",
      trust2: "जुनसुकै बेला हट्न सकिने",
      trust3: "नेपालका लागि बनाइएको",

      // Fix #7: Honest pre-launch proof
      quote: '"नेपाली व्यवसायहरूका लागि यस्तो सेवाको खाँचो थियो।"',
      quoteAuthor: "वेटलिस्टका एक सदस्य",
    },

    // ── Demo video section ───────────────────────────────────────────────────
    video: {
      badge: "चलाउन सजिलो",
      // Fix #5: Scannable
      heading: "मिनेटमै वेबसाइट लाइभ भएको हेर्नुहोस्।",
      subtext:
        "तपाईंको वेबसाइट कति छिटो तयार हुन्छ आफैं हेर्नुहोस् — कुनै कोडिङ वा झन्झट बिना।",
      steps: [
        "व्यवसायको नाम लेख्नुहोस्",
        "टेम्प्लेट छान्नुहोस्",
        "लोगो वा विवरण थप्नुहोस्",
        "पब्लिश गर्नुहोस्",
        "वेबसाइट लाइभ भयो!",
      ],
      finalFrame: "वेबसाइट अब लाइभ छ।",
      src: "/demo.mp4",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
    },

    // ── Micro-proof ──────────────────────────────────────────────────────────
    microProof: {
      // Fix #8: Label
      eyebrow: "वेबसाइटका उदाहरणहरू →",
      domains: [
        "hamrostore.hamrolink.com",
        "hamroschool.hamrolink.com",
        "hamrokhajaghar.hamrolink.com",
      ],
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
    },

    // ── Contact Page ──────────────────────────────────────────────────────────
    contactPage: {
      title: "सम्पर्क - HamroLink वेबसाइट बिल्डर नेपाल",
      description:
        "HamroLink सँग सम्पर्क गर्नुहोस्। हाम्रो वेबसाइट बिल्डरको बारेमा प्रश्नहरू, प्राविधिक सहयोग, वा साझेदारीका लागि धनकुटामा रहेको हाम्रो टिम मद्दत गर्न तयार छ।",
      badge: "सम्पर्क गर्नुहोस्",
      heading: "हामी तपाईलाई मद्दत गर्न तयार छौं।",
      subheading:
        "HamroLink को बारेमा कुनै प्रश्न छ? हाम्रो टिम तपाईलाई मद्दत गर्न तयार छ।",
      businessInfo: {
        name: "हाम्रोलिंक (HamroLink Nepal)",
        phone: "+९७७-९८१६३२६६३९",
        email: "support@hamrolink.com",
        address: "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल",
      },
      form: {
        name: "पूरा नाम",
        email: "इमेल ठेगाना",
        subject: "विषय",
        message: "सन्देश",
        placeholderName: "तपाईको नाम",
        placeholderEmail: "you@example.com",
        placeholderSubject: "हामी कसरी मद्दत गर्न सक्छौं?",
        placeholderMessage:
          "तपाईको व्यवसायिक आवश्यकताको बारेमा थप जानकारी दिनुहोस्...",
        cta: "सन्देश पठाउनुहोस्",
        sending: "सन्देश पठाउँदै...",
        success: "सन्देश पठाइयो! हामी चाँडै तपाईलाई सम्पर्क गर्नेछौं।",
        error: "सन्देश पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
      },
      info: {
        email: "हामीलाई इमेल गर्नुहोस्",
        location: "हाम्रो कार्यालय",
        hours: "सहायता समय",
        hoursValue: "आइतबार - शुक्रबार, बिहान ९ - बेलुका ६",
        address: "पाख्रिबास-०४, धनकुटा",
      },
    },

    // ── About Page ────────────────────────────────────────────────────────────
    aboutPage: {
      title: "हाम्रोबारे - नेपालमा डिजिटल नवीनता मार्फत सशक्तिकरण",
      description:
        "HamroLink को बारेमा थप जान्नुहोस्, जुन नेपालको मिशन-संचालित वेबसाइट बिल्डर हो। पाख्रिबास, धनकुटामा स्थापना भएको, हामी स्थानीय व्यवसाय, विद्यालय र सिर्जनाकर्ताहरूलाई उनीहरूको डिजिटल उपस्थिति निर्माण गर्न मद्दत गर्न समर्पित छौं।",
      badge: "हाम्रो कथा",
      heading: "नेपालको डिजिटल भविष्य निर्माण गर्दै।",
      subheading:
        "HamroLink एक सरल विचारबाट जन्मिएको हो: प्रत्येक नेपाली व्यवसाय, चाहे त्यो जतिसुकै सानो वा टाढा किन नहोस्, वेबमा व्यावसायिक उपस्थिति पाउन योग्य छ।",
      story: {
        title: "पाख्रिबास देखि संसार सम्म",
        content: `HamroLink काठमाडौंको कुनै महँगो कार्यालयमा नभई पाख्रिबास, धनकुटाको शान्त पहाडहरूमा सुरु भएको हो। हामीले प्रत्यक्ष रूपमा देख्यौं कि डिजिटल युगमा प्रतिभाशाली स्थानीय उद्यमीहरू, समर्पित शिक्षकहरू र दक्ष शिल्पकारहरू कसरी पछि परिरहेका थिए किनभने वेबसाइट निर्माण एकदमै जटिल, महँगो थियो, वा उनीहरूसँग नभएको प्राविधिक ज्ञान आवश्यक थियो।

        हामीले त्यसलाई परिवर्तन गर्ने निर्णय गर्यौं। हाम्रो यात्रा एउटै मिशनको साथ सुरु भयो: नेपालको भाषा बोल्ने प्लेटफर्म निर्माण गर्ने। हामीले नेपाली विद्यालयहरूको अद्वितीय आवश्यकताहरू, स्थानीय ई-कमर्सका चुनौतीहरू र व्यक्तिगत सिर्जनाकर्ताहरूको आकांक्षाहरू बुझ्न अनगिन्ती घण्टा बिताएका छौं।

        आज, HamroLink एउटा वेबसाइट बिल्डर मात्र होइन। यो हजारौं नेपालीहरूको समुदाय हो जसले डिजिटल संसारमा आफ्नो पहिलो कदम चालिरहेका छन्। eSewa र Khalti एकीकरण देखि स्थानीयकृत टेम्प्लेट सम्म, हामीले निर्माण गर्ने प्रत्येक सुविधा वास्तविक नेपालीको वास्तविक समस्या समाधान गर्न डिजाइन गरिएको हो।`,
      },
      mission: {
        title: "हाम्रो मिशन",
        text: "नेपाली सिर्जनाकर्ता, उद्यमी र संस्थाहरूलाई प्राविधिक अवरोध बिना आफ्नो काम विश्वसँग साझा गर्न सरल र शक्तिशाली उपकरणहरू प्रदान गर्ने।",
      },
      vision: {
        title: "हाम्रो भिजन",
        text: "धनकुटाका पहाडदेखि काठमाडौंका गल्लीसम्म नवप्रवर्तनलाई प्रोत्साहन गर्दै नेपालको डिजिटल अर्थतन्त्र निर्माणको आधार बन्ने।",
      },
      values: [
        {
          title: "मौलिकता",
          desc: "हामी नेपालीद्वारा, नेपालीका लागि बनाइएका हौं। हामी स्थानीय सन्दर्भलाई राम्रोसँग बुझ्छौं।",
        },
        {
          title: "सरलता",
          desc: "प्रविधि अदृश्य हुनुपर्छ। यदि एक हजुरआमाले आफ्नो पसल सुरु गर्न यो प्रयोग गर्न सक्नुहुन्न भने, यो धेरै जटिल छ।",
        },
        {
          title: "सशक्तिकरण",
          desc: "हामी केवल साइटहरू मात्र बनाउँदैनौं; हामी व्यवसायहरूलाई अनलाइन बढ्नको लागि आत्मविश्वास पनि प्रदान गर्छौं।",
        },
      ],
      team: {
        title: "संस्थापकलाई भेट्नुहोस्",
        members: [
          {
            name: "सुमन बस्नेत",
            role: "संस्थापक र दूरदर्शी",
            bio: "हृदयले एक प्राविधिक र आत्माले एक सामाजिक उद्यमी। आफ्नो जन्मथलो पाख्रिबासमा डिजिटल खाडल देखेपछि सुमनले HamroLink को स्थापना गर्नुभयो। फुल-स्ट्याक इन्जिनियरिङमा पृष्ठभूमि र स्थानीय सशक्तिकरणको जोशका साथ, उहाँ प्रत्येक नेपाली व्यवसायले विश्वव्यापी डिजिटल अर्थतन्त्रमा प्रतिस्पर्धा गर्न सकोस् भन्ने मिशनमा हुनुहुन्छ। उहाँ विश्वास गर्नुहुन्छ कि वास्तविक नवीनता तब सुरु हुन्छ जब प्रविधि अदृश्य र सबैका लागि पहुँचयोग्य हुन्छ।",
          },
        ],
      },
      stats: [
        { label: "स्थापना", value: "२०२६" },
        { label: "समुदाय", value: "बढ्दो" },
        { label: "कार्यक्षेत्र", value: "नेपाल 🇳🇵" },
      ],
      location: {
        title: "हाम्रो जड",
        address: "पाख्रिबास-०४, धनकुटा",
        description:
          "हामी सम्पूर्ण राष्ट्रको सेवा गर्छौं, तर हाम्रो हृदय पाख्रिबास, धनकुटाको शान्त पहाडहरूमा छ। यहीँबाट हाम्रो यात्रा सुरु भएको हो र राम्रो डिजिटल नेपाल निर्माणका लागि यो हाम्रो प्रेरणाको स्रोत बनेको छ।",
        district: "धनकुटा जिल्ला, कोशी प्रदेश",
      },
    },

    // ── Stats ────────────────────────────────────────────────────────────────
    preLaunchStats: [
      { value: "२४०+", label: "प्रतीक्षासूचीमा" },
      { value: "१२०+", label: "तयार टेम्प्लेट" },
      { value: "९९.९%", label: "अपटाइम ग्यारेन्टी" },
      { value: "३ मिनेट", label: "औसत लन्च समय" },
    ],
    stats: [
      { value: "५,०००+", label: "वेबसाइट लन्च" },
      { value: "१२०+", label: "तयार टेम्प्लेट" },
      { value: "९९.९%", label: "अपटाइम ग्यारेन्टी" },
      { value: "३ मिनेट", label: "औसत लन्च समय" },
    ],

    // ── Who it's for ─────────────────────────────────────────────────────────
    who: {
      badge: "हरेक नेपाली व्यवसायका लागि",
      heading:
        "तपाईं जे गर्नुहुन्छ,\nHamroLink बाट त्यसैको वेबसाइट बनाउन सकिन्छ।",
      subtext:
        "प्राविधिक ज्ञान चाहिँदैन। व्यवसायको प्रकार छान्नुहोस् र वेबसाइट सुरु गर्नुहोस्।",
      cards: [
        {
          emoji: "🛍️",
          title: "अनलाइन बेच्नुहोस्",
          label: "पसल र स्टोरहरू",
          desc: "सामान राख्नुहोस्, eSewa र Khalti बाट पैसा बुझ्नुहोस् र अर्डर व्यवस्थापन गर्नुहोस्।",
        },
        {
          emoji: "🏫",
          title: "स्कुलको विकास",
          label: "स्कुल र कलेज",
          desc: "भर्ना, कार्यक्रम, फोटो र सूचनाहरू विद्यार्थी र अभिभावकसम्म सजिलै पुर्‍याउनुहोस्।",
        },
        {
          emoji: "✈️",
          title: "थप ग्राहक पाउनुहोस्",
          label: "कन्सल्टेन्सी",
          desc: "प्रोफेसनल पेज बनाउनुहोस्। ग्राहकले अनलाइनबाटै बुकिङ र सोधपुछ गर्न सक्नेछन्।",
        },
        {
          emoji: "💼",
          title: "स्थानीय बजारमा चिनिनुहोस्",
          label: "साना व्यवसाय",
          desc: "आफ्नो मेनु, सेवा, लोकेसन र सम्पर्क विवरण राख्नुहोस्। ग्राहकले सजिलै फेला पार्नेछन्।",
        },
      ],
    },

    // ── Examples section ─────────────────────────────────────────────────────
    examples: {
      badge: "वास्तविक उदाहरण",
      heading: "HamroLink बाट के-के बनाउन सकिन्छ हेर्नुहोस्",
      subtext:
        "यी हाम्रा टेम्प्लेट प्रयोग गरेर बनाइएका नमुना वेबसाइट हुन्। तपाईंको पनि यस्तै बन्न सक्छ।",
      items: [
        {
          emoji: "🛍️",
          name: "हाम्रो स्टोर",
          desc: "सामानहरू अनलाइन बेच्न र अर्डर लिन सजिलो।",
          url: "hamrostore.hamrolink.com",
          // Fix #9: Credibility
          href: "https://hamrostore.hamrolink.com",
        },
        {
          emoji: "🏫",
          name: "हाम्रो स्कुल",
          desc: "भर्ना र सूचनाहरू डिजिटल माध्यमबाट पुर्‍याउन।",
          url: "hamroschool.hamrolink.com",
          href: "https://hamroschool.hamrolink.com",
        },
        {
          emoji: "🍽️",
          name: "हाम्रो खाजाघर",
          desc: "मेनु र लोकेसन देखाउन उत्तम।",
          url: "hamrokhajaghar.hamrolink.com",
          href: "https://hamrokhajaghar.hamrolink.com",
        },
        {
          emoji: "🎨",
          name: "क्रिएटर पोर्टफोलियो",
          desc: "आफ्नो काम र सोसल लिंकहरू देखाउन।",
          url: "creator.hamrolink.com",
          href: "https://creator.hamrolink.com",
        },
      ],
      closing:
        "HamroLink छिट्टै आउँदैछ। पहिलो बन्नका लागि आजै प्रतीक्षासूचीमा बस्नुहोस्।",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
    },

    // ── Features ─────────────────────────────────────────────────────────────
    features: {
      badge: "सबै सुविधाहरू",
      heading: "शक्तिशाली टुलहरू, चलाउन एकदमै सजिलो।",
      subtext:
        "हरेक सुविधा नेपालका लागि सोचिएको छ — स्थानीय पेमेन्ट र स्थानीय व्यवसायका लागि।",
      // Fix #1: Consistency (Replacements for AI/Code/Analytics)
      items: [
        {
          title: "आफ्नै डोमेन",
          desc: "hamrolink.com सब-डोमेन सित्तैमा पाउनुहोस् वा आफ्नै डोमेन जोड्नुहोस्।",
        },
        {
          title: "अनलाइन बिक्री",
          desc: "सामान राख्नुहोस् र eSewa/Khalti बाट तुरुन्तै भुक्तानी लिनुहोस्।",
        },
        {
          title: "फास्ट वेबसाइट होस्टिङ",
          desc: "नेपालको जुनसुकै ठाउँबाट तपाईंको वेबसाइट छिटो खुल्ने ग्यारेन्टी।",
        },
        {
          title: "मोबाइल-मै राम्रो देखिने",
          desc: "हरेक टेम्प्लेट मोबाइल, ट्याब्लेट र कम्प्युटरमा मिलेर बस्छन्।",
        },
        {
          title: "SEO को चिन्ता छैन",
          desc: "तपाईंको वेबसाइट गुगल (Google) मा सजिलै भेटिने गरी बनाइएको छ।",
        },
        {
          title: "QR कोड सुविधा",
          desc: "वेबसाइटको आफ्नै QR कोड पाउनुहोस्। यसलाई मेनु वा भिजिटिङ कार्डमा छाप्नुहोस्।",
        },
        {
          title: "स्कुलका लागि टुलहरू",
          desc: "भर्ना फारम, फोटो ग्यालेरी र पूर्ण ड्यासबोर्डको सुविधा।",
        },
        {
          title: "परामर्श पेज",
          desc: "बुकिङ लिनुहोस् र ग्राहकका जिज्ञासाहरू सजिलै व्यवस्थापन गर्नुहोस्।",
        },
      ],
    },

    // ── Templates ────────────────────────────────────────────────────────────
    templates: {
      badge: "१२०+ टेम्प्लेट",
      heading: "मात्र टेम्प्लेट छान्नुहोस्।\nतपाईंको काम ८०% सकियो।",
      subtext:
        "हरेक टेम्प्लेट नेपाली दर्शकलाई ध्यानमा राखेर बनाइएको छ। बस आफ्नो विवरण भर्नुहोस्।",
      browseAll: "सबै टेम्प्लेट हेर्नुहोस्",
      useThis: "प्रतीक्षासूचीमा बस्नुहोस्",
      hoverCta: "प्रतीक्षासूचीमा बस्नुहोस् →",
    },

    // ── Founder trust ────────────────────────────────────────────────────────
    founder: {
      badge: "संस्थापकको सन्देश",
      heading: "मैले HamroLink किन बनाएँ?",
      paragraphs: [
        "नेपालका अनगिन्ती प्रतिभाशाली व्यक्ति र साना व्यवसायहरू अझै पनि डिजिटल पहिचानबाट टाढा छन्, जसको प्रमुख कारण वेबसाइट निर्माणमा लाग्ने उच्च लागत र प्राविधिक जटिलता हो। हाम्रो उद्देश्य यो प्रक्रियालाई पूर्णतः रूपान्तरण गरी वेबसाइट निर्माणलाई सोसल मिडिया प्रोफाइल सेटअप गरे जत्तिकै सहज र सुलभ बनाउनु हो। हामी दृढ विश्वास गर्छौँ कि डिजिटल युगमा आफ्नो उपस्थिति विस्तार गर्न कसैले पनि प्राविधिक वा आर्थिक अवरोध झेल्नु नपरोस्; त्यसैले हामी हरेक उद्यमी र सर्जकलाई सहजै आफ्नो वेबसाइट लन्च गर्ने सामर्थ्य प्रदान गर्न प्रतिबद्ध छौँ।",
      ],
      signature: "— सुमन बस्नेत",
      role: "संस्थापक, HamroLink",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      // Fix #11: Tone
      badge: "सजिलो मूल्य, छिट्टै सार्वजनिक हुँदै",
      heading: "तपाईंको व्यवसायको हरेक चरणका लागि योजना।",
      subtext:
        "अहिले नै प्रतीक्षासूचीमा बस्नुहोस्। मूल्यहरू लन्चपछि मात्र लागू हुनेछन् — नि:शुल्क योजना सधैँ नि:शुल्क रहनेछ।",
      monthly: "मासिक",
      yearly: "वार्षिक",
      save: "बचत",
      free: "नि:शुल्क",
      perMonth: "/महिना",
      perYear: "/वर्ष",
      approxMonth: "≈ NPR {n}/महिना",
      ctaFree: "नि:शुल्क सुरु गर्नुहोस्",
      ctaPaid: "सुरु गर्नुहोस्",
      footer:
        "हरेक योजनामा: १ वेबसाइट · hamrolink.com सब-डोमेन · ड्र्याग एण्ड ड्रप एडिटर · QR कोड · नेपाली र अंग्रेजी ड्यासबोर्ड",
      plans: [
        {
          name: "नि:शुल्क",
          desc: "सबै कुरा चलाएर हेर्नुहोस्। कार्ड चाहिँदैन।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "५ पेजहरू", ok: true },
            { t: "१० इमेज · २ फाइल अपलोड", ok: true },
            { t: "१० इमेल / महिना", ok: true },
            { t: "yourname.hamrolink.com", ok: true },
            { t: "कस्टम डोमेन", ok: false },
            { t: "अनलाइन स्टोर", ok: false },
            { t: "HamroLink ब्रान्डिङ हटाउने", ok: false },
          ],
        },
        {
          name: "स्टार्टर",
          desc: "बढ्दो व्यवसायका लागि आवश्यक सबै कुरा।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "२० पेज + ३० ब्लग पोस्ट", ok: true },
            { t: "५० इमेज · ५ फाइल अपलोड", ok: true },
            { t: "२५० इमेल / महिना", ok: true },
            { t: "कस्टम डोमेन", ok: true },
            { t: "अनलाइन स्टोर — ३० उत्पादन", ok: true },
            { t: "७० बुकिङ · १० इभेन्ट", ok: true },
            { t: "HamroLink ब्रान्डिङ हटाउने", ok: true },
          ],
        },
        {
          name: "प्रो",
          desc: "छिटो प्रगति गर्न चाहने व्यवसायका लागि।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "५० पेज + १५० ब्लग पोस्ट", ok: true },
            { t: "१०० इमेज · १० फाइल अपलोड", ok: true },
            { t: "६०० इमेल / महिना", ok: true },
            { t: "कस्टम डोमेन", ok: true },
            { t: "अनलाइन स्टोर — ३०० उत्पादन", ok: true },
            { t: "१५० बुकिङ · २५ इभेन्ट", ok: true },
            { t: "HamroLink ब्रान्डिङ हटाउने", ok: true },
          ],
        },
      ],
    },

    // ── Final CTA ────────────────────────────────────────────────────────────
    cta: {
      line1: "HamroLink",
      line2: "छिट्टै आउँदैछ।",
      subtext:
        "अहिले नै प्रतीक्षासूचीमा जोइन गर्नुहोस् र आफ्नो वेबसाइट बनाउने पहिलो व्यक्ति बन्नुहोस्।",
      primary: "प्रतीक्षासूचीमा बस्नुहोस्",
      secondary: "मूल्य हेर्नुहोस्",
      disclaimer:
        "जोइन गर्न नि:शुल्क · क्रेडिट कार्ड चाहिँदैन · लन्च हुँदा खबर पाउनुहोस्",
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:
        "नेपालमा जो कोहीले वेबसाइट बनाउने सबैभन्दा सजिलो तरिका — छिट्टै आउँदैछ।",
      taglinePostLaunch:
        "नेपालमा जो कोहीले वेबसाइट बनाउने सबैभन्दा सजिलो तरिका।",
      cta: "प्रतीक्षासूचीमा बस्नुहोस्",
      ctaPostLaunch: "नि:शुल्क सुरु गर्नुहोस्",
      copyright: "सर्वाधिकार सुरक्षित · नेपालमा ❤️ सँगै बनाइएको 🇳🇵",
      sections: {
        उत्पादन: [
          ["टेम्प्लेट", "/#examples"],
          ["सुविधाहरू", "/#features"],
          ["मूल्य", "/#pricing"],
          ["सहयोग", "/docs"],
          ["सम्पर्क", "/contact"],
        ],
        हाम्रोबारे: [
          ["हाम्रोबारे", "/about"],
          // ["ब्लग", "/blog"],
          // ["स्थिति", "/status"],
        ],
        कानुनी: [
          ["गोपनीयता नीति", "/privacy"],
          ["सेवाका सर्त", "/terms"],
          ["फिर्ता नीति", "/refund"],
          ["प्रश्नोत्तर (FAQ)", "/faqs"],
        ],
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];
export type DictKey = keyof Dictionary;

export function getDictionary(lang: string): Dictionary {
  return (dictionaries as any)[lang] ?? dictionaries.en;
}
