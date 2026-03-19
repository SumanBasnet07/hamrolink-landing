// lib/dictionaries.ts
// Repositioned copy — selling FEAR of irrelevance, STATUS of professionalism,
// and HOPE through AI automation. Not a website builder — Nepal's first
// AI-powered business presence platform.

export type Lang = "en" | "ne";

export const dictionaries = {
  // ══════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ══════════════════════════════════════════════════════════════════════════
  en: {
    // ── Navbar ───────────────────────────────────────────────────────────────
    nav: {
      templates: "AI Staff",
      features: "Features",
      pricing: "Pricing",
      docs: "Stories",
      contact: "Contact",
      signIn: "Sign In",
      cta: "Claim Early Access",
      ctaPostLaunch: "Get Started Free",
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      // FEAR-based badge — the digital shift is happening NOW
      badge: "Nepal's businesses are going digital. Are you ready?",

      // STATUS + URGENCY headline
      line1: "Your competitor already has",
      // line2 is injected dynamically per slide
      line3: "While you're still 'thinking about it'?",

      // FEAR + HOPE subtext
      subtext:
        "Customers Google before they visit. International clients judge by your link. Every day without a website is a customer you never knew you lost. HamroLink fixes that in minutes.",

      supportLine:
        "Look professional. Get found. Never miss a customer — even at 2am.",

      ctaPrimary: "Claim Early Access",
      ctaPrimaryPostLaunch: "Get Started Free",
      ctaSecondary: "See Real Examples",

      // STATUS-driven trust strip
      trust: [
        "Look more professional instantly",
        "No coding. No tech knowledge needed.",
        "Local payments: eSewa & Khalti built-in",
      ],

      identityLine:
        "For shops · restaurants · schools · freelancers · consultancies in Nepal",

      slideLabels: [
        "a website",
        "an online store",
        "a school page",
        "a portfolio",
        "a restaurant menu",
      ],

      floatingClicks: "Clicks today",
      floatingSites: "Already waiting",
      scrollLabel: "Scroll",

      // 3-step process section
      process: {
        heading: "From zero to professional in 3 steps.",
        steps: [
          {
            title: "Pick your template",
            desc: "Choose from 120+ templates built for Nepali businesses — shops, schools, restaurants, freelancers.",
          },
          {
            title: "Add your details",
            desc: "Your name, logo, services, prices. No coding. It takes minutes, not days.",
          },
          {
            title: "Go live and get found",
            desc: "Your website is published. Share the link, print the QR code, and start looking professional.",
          },
        ],
        footer: "Average time from signup to live website: under 15 minutes.",
      },
      generationalHook: "Your hard work deserves the status of a professional brand.",
      mixedNepali: "Your business needs a website — right now.",
    },

    // ── Waitlist form ────────────────────────────────────────────────────────
    waitlist: {
      placeholder: "Enter your email",
      cta: "Claim My Early Access Spot",
      submitting: "Reserving your spot…",
      successTitle: "You're in! 🎉",
      successText:
        "We'll email you the moment HamroLink launches. Your early access perks are reserved.",
      errorDuplicate: "This email is already on the waitlist.",
      errorGeneric: "Something went wrong. Please try again.",
      launchLabel: "HamroLink launches soon — limited early spots.",
      launchSub:
        "Your competitor might already be on the list. Claim your spot now.",
      countPrefix: "",
      countSuffix: " businesses already ahead of you",

      // FEAR-driven headline
      heading: "Don't let your\ncompetitor launch first.",
      subheading:
        "240+ Nepali businesses have already claimed their spot. Join them — and get exclusive early access perks.",

      // HOPE + STATUS perks
      perk1Title: "500 AI Response Credits",
      perk1Desc:
        "That's 500 customer conversations handled automatically while you sleep. Free users pay per response after 100.",
      perk2Title: "Priority Access",
      perk2Desc: "Get access before the public launch and skip the queue.",
      perk3Title: "Launch Price Locked Forever",
      perk3Desc:
        "NPR 399/month locked in permanently. Price goes up after public launch.",

      socialProof: "businesses already on the list",

      formTitle: "Reserve your spot now",
      formSub: "10 seconds. No credit card. No commitment.",
      urgency: "Early spots are limited. Latecomers pay full price.",

      trust1: "No spam, ever",
      trust2: "Unsubscribe anytime",
      trust3: "Built for Nepal 🇳🇵",

      // Real social proof framing
      quote:
        '"My customers kept asking for my website. I didn\'t have one. Now I do — and it took 12 minutes."',
      quoteAuthor: "Early waitlist member, Kathmandu",
      urgencyMicro: "Only 47 early access spots remaining this month",
      limitedSpot: "Your competitor #{n} is already on the list",
      recentSignups: [
        "Sita Gurung, Beauty Studio - Pokhara",
        "Anish Thapa, Freelance Photo - Kathmandu",
        "Deepa Rai, Fashion Boutique - Dharan",
        "Suresh KC, Hardware Supplies - Butwal",
        "Nabina Sharma, Montessori School - Lalitpur",
        "Rajesh Mehtara, Auto Parts - Itahari",
        "Pooja Pandey, Café & Bistro - Hetauda",
        "Manoj Dahal, Agri-Trading - Birtamode",
        "Sunita Biswakarma, Tailoring - Nepalgunj",
        "Binod Katwal, Furniture Workshop - Jhapa",
      ],
      countdownText: "Early access closes in 10 days",
    },

    // ── Demo video section ───────────────────────────────────────────────────
    video: {
      badge: "Watch it happen",
      // STATUS headline
      heading: "From Facebook page to professional website. In minutes.",
      subtext:
        "This is what your competitors are doing right now. Watch how fast it happens — and what it looks like when it's done.",
      steps: [
        "Enter your business name",
        "Pick a template",
        "Add your content",
        "Set up payments",
        "Website is live — you look professional",
      ],
      finalFrame: "Professional. Live. Yours.",
      src: "/demo.mp4",
      cta: "Claim My Spot",
    },

    // ── Micro-proof block ────────────────────────────────────────────────────
    microProof: {
      eyebrow: "Real HamroLink websites →",
      domains: [
        "hamrostore.hamrolink.com",
        "hamroschool.hamrolink.com",
        "hamrokhajaghar.hamrolink.com",
      ],
      cta: "Claim Early Access",
    },

    // ── Stats bar ────────────────────────────────────────────────────────────
    preLaunchStats: [
      { value: "240+", label: "Businesses on waitlist" },
      { value: "120+", label: "Ready-made templates" },
      { value: "99.9%", label: "Uptime guaranteed" },
      { value: "< 15 min", label: "Avg. time to go live" },
    ],
    stats: [
      { value: "5,000+", label: "Websites launched" },
      { value: "120+", label: "Ready-made templates" },
      { value: "99.9%", label: "Uptime guaranteed" },
      { value: "< 15 min", label: "Avg. time to go live" },
    ],

    // ── Fear/Status/Hope "Why" section (replaces generic "who it's for") ────
    // NOTE: In your component, rename this section to something like
    // "The Problem" or "Why Your Business Needs This Now"
    who: {
      badge: "The reality for Nepali businesses in 2025",
      heading: "Facebook isn't enough\nanymore.",
      subtext:
        "Young customers Google you before they visit. International clients judge you by your link. Competitors who look more professional win customers you never knew you lost.",
      cards: [
        {
          emoji: "😟",
          title: "\"I'll just use Facebook\"",
          label: "The old way",
          desc: "Facebook limits your reach, owns your audience, and can shut you down any day. Your business deserves its own home on the internet.",
        },
        {
          emoji: "🔍",
          title: "Customers Google you first",
          label: "The new reality",
          desc: "75% of people search online before visiting a business. If you're not there, your competitor is — and they get the customer.",
        },
        {
          emoji: "💸",
          title: "Missed customers at 2am",
          label: "The hidden loss",
          desc: "Someone messages you at 11pm asking your price. You're asleep. They go to a competitor who has a website that answers automatically.",
        },
        {
          emoji: "🏆",
          title: "Professionals charge more",
          label: "The opportunity",
          desc: "A photographer with a professional portfolio charges 40% more than one with just a Facebook link. Your website is your price justification.",
        },
        {
          emoji: "⛓️",
          title: "Facebook jailed you once",
          label: "It will happen again",
          desc: "Remember when Facebook banned your page for 7 days? Your business stopped. With HamroLink, YOU control your presence. No algorithm, no bans, no begging for reach.",
        },
      ],
    },

    // ── AI Chatbot / "24/7 Staff" section (NEW — your killer feature) ────────
    // Add this as a new section between features and templates in your page
    aiStaff: {
      badge: "Your 24/7 online staff — powered by AI",
      heading: "Never miss a customer again.\nEven while you sleep.",
      subtext:
        "Most Nepali businesses lose customers because no one is available to answer at night, on holidays, or during busy hours. Your HamroLink AI assistant handles it for you — automatically.",
      features: [
        {
          title: "Answers questions instantly",
          desc: "\"What are your prices?\" \"Are you open?\" \"Where are you located?\" Your AI answers before the customer gets frustrated and leaves.",
          icon: "MessageSquare",
        },
        {
          title: "Customized by you — in minutes",
          desc: "Set your hours, your menu, your services, your WhatsApp number. The AI learns your business and speaks for it. No technical knowledge needed.",
          icon: "Settings",
        },
        {
          title: "Sends customers to WhatsApp or your site",
          desc: "For serious inquiries, the AI says: \"Message us on WhatsApp for a quote\" or \"Book your appointment here.\" You wake up to warm leads, not missed messages.",
          icon: "ArrowRight",
        },
        {
          title: "Available in Nepali and English",
          desc: "Your customers message in Nepali. Your AI responds in Nepali. No awkward English-only bots that feel foreign and cold.",
          icon: "Globe",
        },
      ],
      stat: "Businesses with AI chatbots respond to 100% of inquiries. Businesses without them miss up to 67% of after-hours messages.",
      cta: "Get Your 24/7 AI Staff",
      // Positioning line — this is the money line
      tagline: "NPR 399/month hires you a 24/7 employee who never sleeps, never complains, and never misses a customer.",
      twoAm: [
        "2:15 AM: Someone in America needs a Nepal tour package. Your competitor's AI responds. You're sleeping.",
        "3:30 AM: A student in Australia has questions about your consultancy. Your AI answers. You're dreaming.",
        "4:45 AM: A couple planning their wedding wants a photographer. Your AI sends your portfolio. You wake up to a booking.",
      ],
      beforeBed: {
        heading: "Tonight, while you sleep:",
        points: [
          "12 AM: Your AI responds to a customer in Australia",
          "2 AM: Someone books your service automatically",
          "4 AM: An inquiry comes in — your AI qualifies it",
          "6 AM: You wake up to leads, not missed opportunities",
        ],
      },
      mockup: {
        user1: "Namaste! Can I see your menu?",
        ai1: "Namaste! Our menu for today:\n🍛 Dal Bhat — Rs 350\n🍽️ Thakali Thali — Rs 550\n☕ Sel Roti+Tea — Rs 120",
        user2: "Can I book a table?",
        ai2: "Yes, certainly! We have the following slots available for tonight:",
        slots: ["6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"],
        cta: "Book Now",
      },
    },

    // ── Email marketing education section (NEW) ──────────────────────────────
    // Add as a small callout or feature card
    emailMarketing: {
      badge: "Most Nepali businesses don't know this exists",
      heading: "Your customer list is your biggest asset. Are you building it?",
      desc: "Every visitor to your HamroLink site can become a subscriber. Collect emails, send offers, announce new products — automatically. While your competitors post on Facebook and hope the algorithm shows it, you're landing directly in your customers' inboxes.",
      cta: "Learn how it works",
    },

    // ── Transformation / "Before vs After" section (NEW) ────────────────────
    // Use this to replace or supplement the generic examples section
    transformation: {
      badge: "Real transformations",
      heading: "What changes when you look professional.",
      items: [
        {
          business: "Photographer, Kathmandu",
          before: "Facebook page with inconsistent posts. Lost international clients to others with portfolio websites.",
          after: "Professional portfolio on HamroLink. Now shares one clean link with international clients. Increased rates by 35%.",
          metric: "35% more per client → NPR 15,000/month extra",
        },
        {
          business: "Café, Pokhara",
          before: "Customers messaging on Facebook asking for hours and menu. Missed 10-15 messages a day. No WhatsApp automation.",
          after: "AI chatbot on their HamroLink site answers menu, hours, and location questions automatically. WhatsApp redirect for reservations.",
          metric: "0 missed inquiries",
        },
        {
          business: "Consultancy, Butwal",
          before: "Only on Facebook. Potential abroad students couldn't find them on Google. Lost to competitors.",
          after: "Professional site with Google visibility, online booking, and lead capture form. 3x more consultation requests.",
          metric: "3x more leads",
        },
      ],
      lostClient: {
        story: "A Japanese tourist walked into a Pokhara café yesterday. 'Found you on Google,' she said. The café owner smiled. The restaurant next door? Still on Facebook. Still waiting.",
        cta: "Be the café they find",
      },
    },

    // ── Features ─────────────────────────────────────────────────────────────
    features: {
      badge: "Everything a professional Nepali business needs",
      heading: "Tools that make you look\nserious about your business.",
      subtext:
        "Every feature is built around one goal: making your business look and work more professionally than your competitors.",
      items: [
        {
          title: "Your own domain",
          desc: "yourname.hamrolink.com free forever — or connect your own domain. Share it on your visiting card like a real business.",
        },
        {
          title: "eSewa & Khalti payments",
          desc: "Accept payments directly on your site. No third-party setup, no complicated integration. It just works.",
        },
        {
          title: "AI 24/7 Assistant",
          desc: "Your AI answers customer questions automatically — prices, hours, location, WhatsApp redirect. Never miss a lead again.",
        },
        {
          title: "Mobile-first design",
          desc: "Every template looks perfect on phones. Because 90% of your customers visit from their mobile.",
        },
        {
          title: "Google visibility (SEO)",
          desc: "When someone searches \"best café in Pokhara\" or \"photographer in Kathmandu\" — your site can show up. Facebook pages cannot.",
        },
        {
          title: "QR Code — ready to print",
          desc: "Every site gets a QR code. Print it on menus, visiting cards, banners, packaging. Scan → your professional website.",
        },
        {
          title: "Email list builder",
          desc: "Collect customer emails automatically. Send offers, news, and promotions directly to their inbox — not hoping Facebook shows your post.",
        },
        {
          title: "Analytics dashboard",
          desc: "See how many people visited, where they came from, what they clicked. Make decisions like a real business owner.",
        },
        {
          title: "Google vs Facebook: The Truth",
          desc: "Try Googling 'best momo in your city'. You'll see websites, not Facebook pages. Google prioritizes real websites. Your HamroLink site is built to rank. Your Facebook page is invisible to search engines.",
        },
      ],
    },

    // ── Templates section ────────────────────────────────────────────────────
    templates: {
      badge: "120+ professional templates",
      heading: "Pick a template.\nLook professional immediately.",
      subtext:
        "Every template is designed to make your business look credible, trustworthy, and professional — from the first second a customer lands on your page.",
      browseAll: "Browse all templates",
      useThis: "Claim Early Access",
      hoverCta: "Use this template →",
    },

    // ── Examples section ─────────────────────────────────────────────────────
    examples: {
      badge: "Real HamroLink websites",
      heading: "This is what your business could look like.",
      subtext:
        "These are real websites built on HamroLink templates. Every one of them looks more professional than a Facebook page — and took less than 15 minutes to launch.",
      items: [
        {
          emoji: "🛍️",
          name: "Hamro Store",
          desc: "Products listed, eSewa payments enabled, orders coming in.",
          url: "hamrostore.hamrolink.com",
          href: "https://hamrostore.hamrolink.com",
        },
        {
          emoji: "🏫",
          name: "Hamro School",
          desc: "Admissions open, programs listed, parents trust it immediately.",
          url: "hamroschool.hamrolink.com",
          href: "https://hamroschool.hamrolink.com",
        },
        {
          emoji: "🍽️",
          name: "Hamro Khaja Ghar",
          desc: "Menu, location, hours — and AI chatbot for after-hours questions.",
          url: "hamrokhajaghar.hamrolink.com",
          href: "https://hamrokhajaghar.hamrolink.com",
        },
        {
          emoji: "🎨",
          name: "Creator Portfolio",
          desc: "One clean link that shows your work better than any social profile.",
          url: "creator.hamrolink.com",
          href: "https://creator.hamrolink.com",
        },
      ],
      closing:
        "Your competitor might already be building theirs. Join early access and launch first.",
      cta: "Claim My Early Access Spot",
    },

    // ── Founder trust section ────────────────────────────────────────────────
    founder: {
      badge: "From the founder",
      heading: "Nepal's businesses deserve\nmore than a Facebook page.",
      paragraphs: [
        "I grew up watching talented Nepali business owners work incredibly hard — and still lose customers to competitors who simply looked more professional online. A restaurant with a website got the tourist. A photographer with a portfolio got the international client. A consultant with a professional page charged twice as much.",
        "The frustrating part? Building a website was expensive, complicated, and required technical knowledge most people don't have. So they stayed on Facebook. And kept losing customers they never knew they were losing.",
        "HamroLink exists to end that. Not just a website builder — a complete digital presence that includes AI tools to answer customers 24/7, email marketing to build loyal relationships, and local payment integrations that actually work in Nepal. Professional. Automated. Affordable.",
      ],
      signature: "— Suman Basnet",
      role: "Founder, HamroLink · Pakhribas, Dhankuta",
      cta: "Join the Mission",
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      badge: "Less than a dinner out — and it works 24/7",
      heading: "Your 24/7 business presence.\nStarting at NPR 399/month.",
      anchoring: "A developer costs NPR 50,000. A freelancer costs NPR 15,000. HamroLink costs NPR 399 — and includes AI that works 24/7.",
      subtext:
        "A web developer charges NPR 30,000–80,000 to build a site. HamroLink gives you a better one — with AI tools included — for NPR 399/month. Join the waitlist now to lock in this price forever.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "SAVE 12%",
      free: "Free",
      perMonth: "/mo",
      perYear: "/yr",
      approxMonth: "≈ NPR {n}/month",
      ctaFree: "Start Free",
      ctaPaid: "Claim Early Price",
      footer:
        "Every plan includes: your website · hamrolink.com subdomain · drag & drop editor · QR code · Nepali & English dashboard",
      plans: [
        {
          name: "Free",
          desc: "Start for free. No card needed. Always.",
          feats: [
            { t: "1 website", ok: true },
            { t: "5 pages", ok: true },
            { t: "25 images · 5 file uploads", ok: true },
            { t: "50 emails / month", ok: true },
            { t: "yourname.hamrolink.com subdomain", ok: true },
            { t: "Custom domain", ok: false },
            { t: "Online store (eSewa/Khalti)", ok: false },
            { t: "AI 24/7 chatbot", ok: false },
            { t: "Remove HamroLink branding", ok: false },
          ],
        },
        {
          name: "Starter",
          desc: "Everything a serious business needs. NPR 399/month.",
          feats: [
            { t: "1 website", ok: true },
            { t: "20 pages + 30 blog posts", ok: true },
            { t: "100 images · 5 file uploads", ok: true },
            { t: "250 emails / month", ok: true },
            { t: "Custom domain", ok: true },
            { t: "Online store — 30 products (eSewa & Khalti)", ok: true },
            { t: "AI chatbot — 24/7 customer assistant", ok: true },
            { t: "70 bookings · 10 events", ok: true },
            { t: "Remove HamroLink branding", ok: true },
          ],
        },
        {
          name: "Pro",
          desc: "For businesses serious about growth.",
          feats: [
            { t: "1 website", ok: true },
            { t: "50 pages + 150 blog posts", ok: true },
            { t: "200 images · 10 file uploads", ok: true },
            { t: "600 emails / month", ok: true },
            { t: "Custom domain", ok: true },
            { t: "Online store — 300 products (eSewa & Khalti)", ok: true },
            { t: "AI chatbot — advanced customization", ok: true },
            { t: "150 bookings · 25 events", ok: true },
            { t: "Remove HamroLink branding", ok: true },
          ],
        },
        {
          name: "Local Starter",
          desc: "Perfect for local shops. NPR 199/month.",
          feats: [
            { t: "1 website", ok: true },
            { t: "10 pages + 10 blog posts", ok: true },
            { t: "50 images · 5 file uploads", ok: true },
            { t: "100 emails / month", ok: true },
            { t: "Custom domain", ok: false },
            { t: "Online store — 20 products (eSewa & Khalti)", ok: true },
            { t: "AI chatbot — 1000 messages limit", ok: true },
            { t: "5 bookings · 10 notices", ok: true },
            { t: "Remove HamroLink branding", ok: false },
          ],
        },
      ],
      priceMetaphor: {
        daily: "NPR 13/day — less than a cup of milk tea",
        weekly: "NPR 93/week — less than a plate of momo",
        monthly: "NPR 399/month — one less dinner out",
      },
      freePlanHook: {
        heading: "Free forever? Yes. Limited forever? Also yes.",
        desc: "Try HamroLink free. No card. No commitment. But if you're serious about your business, you'll upgrade in the first 15 minutes — because the free plan is just a taste of what professional looks like.",
      },
      objections: {
        tooBusy: "It takes only 15 minutes. Less time than you spend scrolling Facebook tonight.",
        notTechSavvy: "If you can use Facebook, you can use HamroLink. It's exactly that simple.",
        expensive: "Losing one client is expensive. NPR 399/month is cheap compared to missed opportunities.",
        alreadyOnFacebook: "Facebook is a rented space. HamroLink is your own digital property.",
        questions: {
          tooBusy: "I'm too busy currently.",
          notTechSavvy: "I'm not good with tech.",
          expensive: "Is it really worth the price?",
          alreadyOnFacebook: "I'm already on Facebook."
        }
      },
      decisionHelper: {
        heading: "Still thinking? Here's what happens if you wait:",
        points: [
          "Early access price expires → Pay 25% more",
          "Your competitor claims your business name first",
          "240+ businesses start looking more professional than you",
        ],
        cta: "I don't want to regret this later →",
      },
    },

    // ── Final CTA ────────────────────────────────────────────────────────────
    cta: {
      // FEAR-based urgency
      line1: "Your competitor is going",
      line2: "digital right now.",
      subtext:
        "Join 240+ Nepali businesses who've already claimed their spot. The ones who launch first win the online customers. Don't be the last one.",
      primary: "Claim My Early Access Spot",
      secondary: "See Pricing",
      disclaimer:
        "Free to join · No credit card · Launch price locked forever for early members",
    },

    // ── Contact Page ──────────────────────────────────────────────────────────
    contactPage: {
      title: "Contact HamroLink — Nepal's Professional Website Platform",
      description:
        "Get in touch with HamroLink. Questions, support, or partnerships — our team in Dhankuta is ready to help.",
      badge: "Get in touch",
      heading: "We're here to help.",
      subheading:
        "Have questions about HamroLink? Our team is ready to assist you.",
      businessInfo: {
        name: "HamroLink (HamroLink Nepal)",
        phone: "+977-9713101957",
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
        placeholderMessage: "Tell us about your business...",
        cta: "Send Message",
        sending: "Sending…",
        success: "Message sent! We'll get back to you soon.",
        error: "Failed to send. Please try again.",
      },
      info: {
        email: "Email us",
        location: "Our HQ",
        hours: "Support Hours",
        hoursValue: "Sunday – Friday, 9am – 6pm",
        address: "Pakhribas-04, Dhankuta",
      },
    },

    // ── About Page ────────────────────────────────────────────────────────────
    aboutPage: {
      title: "About HamroLink — Nepal's First AI-Powered Business Presence Platform",
      description:
        "HamroLink was built because talented Nepali businesses kept losing customers to competitors who simply looked more professional online. Founded in Pakhribas, Dhankuta.",
      badge: "Our Story",
      heading: "Built because Nepal's businesses\ndeserve better.",
      subheading:
        "Every day, talented Nepali entrepreneurs lose customers to competitors who simply look more professional online. HamroLink exists to end that.",
      story: {
        title: "From Pakhribas to Every Corner of Nepal",
        content: `HamroLink didn't start in a Kathmandu office. It started with a simple observation: in the hills of Pakhribas, Dhankuta — and in every district across Nepal — hardworking business owners were invisible online. Not because they weren't good at what they did. But because building a website required money, technical knowledge, or a developer who charged more than a month's revenue.

So they stayed on Facebook. And watched tourists choose the restaurant with a website. Watched international clients hire the photographer with a portfolio link. Watched more corporate-looking competitors take the contracts.

HamroLink was built to fix this. Not just a website builder — a complete digital presence platform that gives every Nepali business the tools that were previously only available to large companies with big budgets: AI-powered 24/7 customer assistants, email marketing, local payment integration, professional templates, and Google visibility.

Because in the AI era, looking professional isn't optional anymore. It's survival.`,
      },
      mission: {
        title: "Our Mission",
        text: "To make every Nepali business impossible to ignore online — with professional websites, AI automation, and local tools that work for Nepal's unique market.",
      },
      vision: {
        title: "Our Vision",
        text: "A Nepal where every entrepreneur — from Dhankuta to Darchula, from Pokhara to Palpa — has the digital presence to compete, grow, and thrive.",
      },
      values: [
        {
          title: "Fear is a Motivator",
          desc: "We're honest: if you're not online professionally, you're losing customers. We say it clearly because it's true.",
        },
        {
          title: "Professionalism is Accessible",
          desc: "A visiting card with a website URL changes how people see you. That should cost NPR 399 — not NPR 50,000.",
        },
        {
          title: "AI Should Work for Everyone",
          desc: "AI chatbots and email automation aren't just for big companies. Your local café deserves a 24/7 assistant too.",
        },
      ],
      team: {
        title: "Meet the Founder",
        members: [
          {
            name: "Suman Basnet",
            role: "Founder & CEO",
            bio: "Suman founded HamroLink after watching Nepali businesses consistently lose customers to competitors who simply looked more professional online. A full-stack engineer from Pakhribas, Dhankuta, he built HamroLink to give every Nepali business owner the digital tools previously only available to large companies — at a price they can actually afford.",
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
          "Built in the hills of Pakhribas, Dhankuta — where we saw the digital divide firsthand. That's why every feature we build is designed for the Nepali context, not copy-pasted from Silicon Valley.",
        district: "Dhankuta District, Koshi Province",
      },
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:
        "Nepal's first AI-powered business presence platform — launching soon.",
      taglinePostLaunch:
        "Nepal's first AI-powered business presence platform.",
      cta: "Claim Early Access",
      ctaPostLaunch: "Get Started Free",
      copyright: "All rights reserved · Built with ❤️ in Nepal 🇳🇵",
      businessName: "Hamrolink Digital",
      address: "Pakhribas-04, Dhankuta, Koshi Province, Nepal",
      regIdLabel: "Reg No",
      regIdValue: "ध-९४५८/०८२/०८३",
      panLabel: "PAN",
      panValue: "६२३२५११९१",
      proprietorLabel: "Proprietor",
      proprietorValue: "Lila Basnet",
      founderLabel: "Founder",
      founderValue: "Suman Basnet",
      trust: {
        registeredWith: "Registered with Government of Nepal",
        companyReg: "Company Registration: ध-9458/082/083",
        panVerified: "PAN verified · Tax compliant",
        localSupport: "Support in Nepali · 7 days a week",
      },
      sections: {
        Product: [
          ["AI Staff", "/#ai-staff"],
          ["Features", "/#features"],
          ["Pricing", "/pricing"],
          ["Success Stories", "/#stories"],
          ["Contact", "/contact"],
        ],
        Company: [
          ["About", "/about"],
        ],
        Legal: [
          ["Privacy Policy", "/privacy"],
          ["Terms of Use", "/terms"],
          ["Refund Policy", "/refund"],
          ["FAQ", "/faqs"],
        ],
      },
    },
    legacy: {
      badge: "For businesses that last generations",
      heading: "Your website should outlast your Facebook account.",
      desc: "Facebook pages die when you stop posting. Algorithms change. Accounts get hacked. Your HamroLink site is YOURS — permanently. Your children can update it when they take over the business.",
    },
    seasonal: {
      dashain: "Dashain is coming. Customers are searching. Be found.",
      tihar: "Tihar offers start now. Last year you missed them. Not this time.",
      touristSeason: "Tourist season starts in 3 weeks. Will they find you or your competitor?",
    },
    liveActivity: {
      justNow: "Just now: {businessType} in {city} went live",
      today: "Today: {count} Nepali businesses launched",
      watching: "{count} people viewing this page right now",
    },
    visitingCard: {
      before: "Your visiting card: Name, phone, 'Visit our Facebook page'",
      after: "Your visiting card: Name, phone, yourname.com.np",
      cta: "Which one looks more professional? Exactly.",
    },
    analogy: {
      heading: "Your 'Parcha' is now digital.",
      desc: "Remember printing paper pamphlets (Parcha) and distributing? Costly, limited, one-time. Your HamroLink site is your digital Parcha — infinite reach, always available, constantly working.",
    },
    objections: {
      tooBusy: "Takes 15 minutes. Less time than you spend on Facebook this evening.",
      notTechSavvy: "If you can use Facebook, you can use HamroLink. That's the bar.",
      expensive: "Losing customers is expensive. NPR 399 is cheaper than losing one.",
      alreadyOnFacebook: "Facebook is renting. HamroLink is owning.",
    },
    localized: {
      kathmandu: "Kathmandu businesses are moving fast. Don't get left behind.",
      pokhara: "Pokhara's tourism runs on Google. Be searchable.",
      biratnagar: "Biratnagar's business community is going digital. Join them.",
      dhankuta: "Built in Dhankuta. For all of Nepal.",
    },
    exitIntent: {
      heading: "Wait! You're falling behind.",
      subheading: "Your competitors are already securing their spot. Don't let them take the customers searching for you today.",
      cta: "Join Now →",
      alternative: "Leave Site",
    },
    personalAddress: {
      generic: "Your business",
      respectful: "Dai/Didi, your business needs a website",
      friendly: "Bhai/Bahini, Facebook is getting old",
    },
    campaign: {
      name: "Digital Darta Campaign",
      hook: "Just as you register your business with the municipality, register your business on the Internet.",
      cta: "Register Your Business Digitally",
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // NEPALI — नेपाली
  // ═════════════════════════════════════════════════════════════════════════
  ne: {
    // ── Navbar ───────────────────────────────────────────────────────────────
    nav: {
      templates: "AI कर्मचारी",
      features: "विशेषताहरू",
      pricing: "मूल्य",
      docs: "सफलताको कथा",
      contact: "सम्पर्क",
      signIn: "साइन इन",
      cta: "अर्ली एक्सेस लिनुहोस्",
      ctaPostLaunch: "नि:शुल्क सुरु गर्नुहोस्",
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    hero: {
      // FEAR badge — direct, Nepali style
      badge: "नेपालका व्यवसायहरू डिजिटल बन्दैछन्। के तपाईं तयार हुनुहुन्छ?",

      // STATUS + FEAR headline
      line1: "तपाईंका प्रतिस्पर्धीको",
      line3: "तपाईं चाहिँ अझै 'सोच्दै' हुनुहुन्छ?",

      // FEAR + HOPE — real, direct Nepali copy
      subtext:
        "ग्राहकहरू तपाईंको व्यवसायमा आउनुअघि गुगलमा खोज्छन्। विदेशी क्लाइन्टले तपाईंको लिङ्क हेरेर मूल्याङ्कन गर्छन्। वेबसाइट नहुँदा तपाईंले दिनहुँ कति ग्राहक गुमाइरहनुभएको छ, तपाईंलाई पत्तो नै हुँदैन। HamroLink ले यो समस्या मिनेटमै समाधान गर्छ।",

      supportLine:
        "प्रोफेसनल देखिनुहोस्। इन्टरनेटमा सजिलै भेटिनुहोस्। राति ११ बजे आएको सोधपुछ पनि नछुटाउनुहोस्।",

      ctaPrimary: "अर्ली एक्सेस लिनुहोस्",
      ctaPrimaryPostLaunch: "नि:शुल्क सुरु गर्नुहोस्",
      ctaSecondary: "उदाहरणहरू हेर्नुहोस्",

      // STATUS trust strip
      trust: [
        "तत्काल प्रोफेसनल देखिनुहोस्",
        "कुनै कोडिङ वा प्राविधिक ज्ञान नचाहिने",
        "ई-सेवा र खल्ती (eSewa & Khalti) इन-बिल्ट",
      ],

      identityLine:
        "नेपालका पसल, रेस्टुरेन्ट, स्कुल, फ्रिल्यान्सर र कन्सल्टेन्सीका लागि",

      slideLabels: [
        "वेबसाइट",
        "अनलाइन स्टोर",
        "स्कुल पेज",
        "पोर्टफोलियो",
        "रेस्टुरेन्ट मेनु",
      ],

      floatingClicks: "आजका क्लिकहरू",
      floatingSites: "पर्खाइमा रहेका व्यवसायहरू",
      scrollLabel: "तल स्क्रोल गर्नुहोस्",

      process: {
        heading: "३ चरणमा शून्यबाट प्रोफेसनलसम्म।",
        steps: [
          {
            title: "आफ्नो टेम्प्लेट छान्नुहोस्",
            desc: "नेपाली व्यवसाय—पसल, स्कुल, रेस्टुरेन्ट, फ्रिल्यान्सर—का लागि तयार गरिएका १२०+ टेम्प्लेटमध्येबाट उपयुक्त डिजाइन छान्नुहोस्।",
          },
          {
            title: "आफ्नो विवरण राख्नुहोस्",
            desc: "तपाईंको नाम, लोगो, सेवा र मूल्य राख्नुहोस्। कोडिङ चाहिँदैन। यो काम दिनमा होइन, मिनेटमा सकिन्छ।",
          },
          {
            title: "लाइभ जानुहोस् र ग्राहक बढाउनुहोस्",
            desc: "तपाईंको वेबसाइट तयार भयो। लिङ्क सेयर गर्नुहोस्, QR कोड प्रिन्ट गर्नुहोस् र प्रोफेसनल देखिन सुरु गर्नुहोस्।",
          },
        ],
        footer: "साइन अप गरेदेखि वेबसाइट लाइभ हुनेसम्मको औसत समय: १५ मिनेटभन्दा कम।",
      },
      generationalHook: "तपाईंको मेहनतले अब एउटा प्रोफेसनल ब्रान्डको पहिचान पाउनुपर्छ।",
      mixedNepali: "तपाईंको business लाई website चाहियो — अहिले नै।",
    },

    // ── Waitlist ─────────────────────────────────────────────────────────────
    waitlist: {
      placeholder: "आफ्नो इमेल राख्नुहोस्",
      cta: "मेरो अर्ली एक्सेस सिट सुरक्षित गर्नुहोस्",
      submitting: "तपाईंको सिट सुरक्षित गरिँदैछ…",
      successTitle: "बधाई छ, तपाईं सूचीमा पर्नुभयो! 🎉",
      successText:
        "HamroLink लन्च हुने बित्तिकै हामी तपाईंलाई इमेल गर्नेछौं। तपाईंका अर्ली एक्सेस सुविधाहरू सुरक्षित भइसकेका छन्।",
      errorDuplicate: "यो इमेल पहिले नै वेटलिस्टमा दर्ता छ।",
      errorGeneric: "केही गडबडी भयो। कृपया फेरि प्रयास गर्नुहोस्।",
      launchLabel: "HamroLink छिट्टै आउँदैछ — सुरुवाती सिटहरू सीमित छन्।",
      launchSub:
        "तपाईंका प्रतिस्पर्धीहरू सूचीमा दर्ता भइसकेका हुन सक्छन्। अहिल्यै आफ्नो सिट सुरक्षित गर्नुहोस्।",
      countPrefix: "",
      countSuffix: " व्यवसायहरू तपाईंभन्दा अगाडि छन्",

      // FEAR headline
      heading: "प्रतिस्पर्धीलाई पहिले\nलन्च गर्न नदिनुहोस्।",
      subheading:
        "२४०+ नेपाली व्यवसायहरूले आफ्नो सिट सुरक्षित गरिसकेका छन्। उनीहरूसँगै जोडिनुहोस् र विशेष अर्ली एक्सेस सुविधाहरू प्राप्त गर्नुहोस्।",

      perk1Title: "५०० एआई रिस्पोन्स क्रेडिट",
      perk1Desc:
        "यसको अर्थ तपाईं सुतिरहेको बेला पनि ५०० ग्राहकका प्रश्नहरूको जवाफ स्वतः दिइनेछ। नि:शुल्क प्रयोगकर्ताले १०० पछि प्रति जवाफ शुल्क तिर्नुपर्छ।",
      perk2Title: "प्राथमिकता पहुँच (Priority Access)",
      perk2Desc: "सार्वजनिक लन्च हुनु अगावै पहुँच पाउनुहोस् र पालो नकुरी सिधै सुरु गर्नुहोस्।",
      perk3Title: "लन्च मूल्य सधैँका लागि लक",
      perk3Desc:
        "प्रति महिना मात्र रु ३९९ सधैँका लागि लक गर्नुहोस्। सार्वजनिक लन्चपछि यसको मूल्य बढ्नेछ।",

      socialProof: "व्यवसायहरू पहिले नै वेटलिस्टमा छन्",

      formTitle: "अहिल्यै आफ्नो सिट सुरक्षित गर्नुहोस्",
      formSub: "मात्र १० सेकेन्ड लाग्छ। क्रेडिट कार्ड चाहिँदैन। कुनै प्रतिबद्धता आवश्यक छैन।",
      urgency: "सुरुवाती सिटहरू सीमित छन्। ढिलो गर्नेले पूरा मूल्य तिर्नुपर्नेछ।",

      trust1: "कुनै स्प्याम आउँदैन",
      trust2: "जुनसुकै बेला अनसब्सक्राइब गर्न सकिने",
      trust3: "नेपालकै लागि बनाइएको 🇳🇵",

      quote:
        '"मेरा ग्राहकहरूले वेबसाइट मागिरहन्थे। मसँग थिएन। अहिले छ—र यो बनाउन मलाई मात्र १२ मिनेट लाग्यो।"',
      quoteAuthor: "सुरुवाती वेटलिस्ट सदस्य, काठमाडौं",
      urgencyMicro: "यस महिनाका लागि मात्र ४७ वटा अर्ली एक्सेस सिट बाँकी छन्",
      limitedSpot: "तपाईंको प्रतिस्पर्धी #{n} पहिले नै सूचीमा छ",
      recentSignups: [
        "सीता गुरुङ, ब्युटी पार्लर - पोखरा",
        "विकास थापा, फोटोग्राफर - काठमाडौं",
        "दीपा राई, बुटिक - धरान",
        "सुरेश केसी, हार्डवेयर पसल - बुटवल",
        "नबिना शर्मा, मन्टेश्वरी - ललितपुर",
        "राजेश मेहता, अटो पार्ट्स - इटहरी",
        "पूजा पाण्डे, क्याफे - हेटौंडा",
        "मनोज दाहाल, कृषि व्यापार - बिर्तामोड",
        "सुनीता विश्वकर्मा, टेलरिङ - नेपालगन्ज",
        "विनोद कट्वाल, फर्निचर वर्कशप - झापा",
      ],
      countdownText: "अर्ली एक्सेस १० दिनमा बन्द हुँदैछ",
    },

    // ── Demo video ───────────────────────────────────────────────────────────
    video: {
      badge: "आफैँ हेर्नुहोस्",
      heading: "फेसबुक पेजबाट प्रोफेसनल वेबसाइटसम्म। मात्र केही मिनेटमा।",
      subtext:
        "तपाईंका प्रतिस्पर्धीहरू अहिले यही गर्दैछन्। यो काम कति छिटो हुन्छ र तयार भएपछि कस्तो देखिन्छ—आफैँ हेर्नुहोस्।",
      steps: [
        "व्यवसायको नाम राख्नुहोस्",
        "टेम्प्लेट छान्नुहोस्",
        "आफ्नो विवरण थप्नुहोस्",
        "पेमेन्ट सेटअप गर्नुहोस्",
        "वेबसाइट लाइभ भयो—अब तपाईं प्रोफेसनल देखिनुहुन्छ",
      ],
      finalFrame: "प्रोफेसनल। लाइभ। पूर्ण रूपमा तपाईंको आफ्नै।",
      src: "/demo.mp4",
      cta: "मेरो सिट सुरक्षित गर्नुहोस्",
    },

    // ── Micro-proof ──────────────────────────────────────────────────────────
    microProof: {
      eyebrow: "वास्तविक HamroLink वेबसाइटहरू →",
      domains: [
        "hamrostore.hamrolink.com",
        "hamroschool.hamrolink.com",
        "hamrokhajaghar.hamrolink.com",
      ],
      cta: "अर्ली एक्सेस दाबी गर्नुहोस्",
    },

    // ── Stats ────────────────────────────────────────────────────────────────
    preLaunchStats: [
      { value: "२४०+", label: "वेटलिस्टमा रहेका व्यवसायहरू" },
      { value: "१२०+", label: "रेडिमेड टेम्प्लेटहरू" },
      { value: "९९.९%", label: "अपटाइम ग्यारेन्टी" },
      { value: "< १५ मिनेट", label: "औसत लाइभ हुने समय" },
    ],
    stats: [
      { value: "५,०००+", label: "लन्च भएका वेबसाइटहरू" },
      { value: "१२०+", label: "रेडिमेड टेम्प्लेटहरू" },
      { value: "९९.९%", label: "अपटाइम ग्यारेन्टी" },
      { value: "< १५ मिनेट", label: "औसत लाइभ हुने समय" },
    ],

    // ── Who (repositioned as "The Problem") ─────────────────────────────────
    who: {
      badge: "सन् २०२५ मा नेपाली व्यवसायको यथार्थ",
      heading: "अब फेसबुक मात्रै\nपर्याप्त छैन।",
      subtext:
        "युवा ग्राहकहरू व्यवसायमा आउनुअघि गुगलमा खोज्छन्। विदेशी क्लाइन्टहरूले तपाईंको लिङ्क हेरेर मूल्याङ्कन गर्छन्। बढी प्रोफेसनल देखिने प्रतिस्पर्धीहरूले तपाईंका ती ग्राहकहरू लगिरहेका छन्, जसको बारेमा तपाईंलाई पत्तोसम्म हुँदैन।",
      cards: [
        {
          emoji: "😟",
          title: '"फेसबुक भए पुग्छ नि"',
          label: "पुरानो तरिका",
          desc: "फेसबुकले तपाईंको पहुँच (Reach) सीमित गरिदिन्छ, तपाईंका ग्राहकहरूलाई आफ्नै नियन्त्रणमा राख्छ, र जुनसुकै बेला तपाईंको पेज बन्द गरिदिन सक्छ। तपाईंको व्यवसायको इन्टरनेटमा आफ्नै छुट्टै ठेगाना हुनुपर्छ।",
        },
        {
          emoji: "🔍",
          title: "ग्राहकले पहिले गुगलमा खोज्छन्",
          label: "नयाँ यथार्थ",
          desc: "७५% मानिसले कुनै पनि व्यवसायमा जानुअघि अनलाइन खोज्छन्। यदि तपाईं त्यहाँ भेटिनुभएन भने, तपाईंका प्रतिस्पर्धी भेटिन्छन्—र उनीहरूले नै ग्राहक पाउँछन्।",
        },
        {
          emoji: "💸",
          title: "राति २ बजे गुम्ने ग्राहक",
          label: "लुकेको घाटा",
          desc: "कसैले राति ११ बजे मेसेज गरेर मूल्य सोध्छ। तपाईं सुत्नुभएको छ। उनीहरू प्रतिस्पर्धीको वेबसाइटमा जान्छन्, जसले स्वचालित रूपमा तत्काल जवाफ दिन्छ।",
        },
        {
          emoji: "🏆",
          title: "प्रोफेसनलले बढी मूल्य पाउँछन्",
          label: "नयाँ अवसर",
          desc: "प्रोफेसनल पोर्टफोलियो वेबसाइट भएको फोटोग्राफरले फेसबुक लिङ्क मात्र भएको भन्दा ४०% बढी शुल्क लिन सक्छ। तपाईंको वेबसाइट नै तपाईंको मूल्य र गुणस्तर प्रमाणित गर्ने आधार हो।",
        },
        {
          emoji: "⛓️",
          title: "फेसबुकले तपाईंलाई जेल हाल्यो?",
          label: "यो फेरि हुनेछ",
          desc: "सम्झिनुहोस् जब फेसबुकले तपाईंको पेज ७ दिनका लागि बन्द गरिदिएको थियो? तपाईंको व्यवसाय नै ठप्प भयो। HamroLink मा, तपाईंको आफ्नो उपस्थितिमा तपाईंको आफ्नै नियन्त्रण हुन्छ। कुनै अल्गोरिदम वा प्रतिबन्धको डर हुँदैन।",
        },
      ],
    },

    // ── AI Staff (NEW) ────────────────────────────────────────────────────────
    aiStaff: {
      badge: "तपाईंको २४/७ अनलाइन स्टाफ — एआई (AI) द्वारा सञ्चालित",
      heading: "अब कुनै पनि ग्राहक नछुटाउनुहोस्।\nतपाईं सुतिरहेको बेला पनि।",
      subtext:
        "धेरैजसो नेपाली व्यवसायले राति, बिदाको दिन वा व्यस्त समयमा तत्काल जवाफ दिन नसक्दा ग्राहक गुमाउने गर्छन्। HamroLink को एआई असिस्टेन्टले यो काम तपाईंको तर्फबाट स्वचालित रूपमा गर्छ।",
      features: [
        {
          title: "प्रश्नहरूको तत्काल जवाफ",
          desc: `"मूल्य कति हो?" "अहिले पसल खुल्ला छ?" "तपाईंको लोकेसन कहाँ हो?" — ग्राहकले पर्खेर निराश हुनुअघि नै एआईले जवाफ दिन्छ।`,
          icon: "MessageSquare",
        },
        {
          title: "तपाईं आफैँले कस्टमाइज गर्न मिल्ने",
          desc: "आफ्नो समय, मेनु, सेवा र ह्वाट्सएप (WhatsApp) नम्बर सेट गर्नुहोस्। एआईले तपाईंको व्यवसायबारे सिक्छ र तपाईंको तर्फबाट कुरा गर्छ। प्राविधिक ज्ञान पटक्कै चाहिँदैन।",
          icon: "Settings",
        },
        {
          title: "ग्राहकलाई ह्वाट्सएप वा साइटमा पठाउँछ",
          desc: 'गम्भीर सोधपुछका लागि एआईले भन्छ: "थप जानकारीको लागि हामीलाई ह्वाट्सएपमा मेसेज गर्नुहोस्" वा "यहाँ अपोइन्टमेन्ट बुक गर्नुहोस्।" बिहान उठ्दा तपाईंले छुटेका मेसेज होइन, तयार भएका ग्राहक (Leads) पाउनुहुनेछ।',
          icon: "ArrowRight",
        },
        {
          title: "नेपाली र अङ्ग्रेजी दुवै भाषामा उपलब्ध",
          desc: "ग्राहकले नेपालीमा मेसेज गर्दा एआईले नेपालीमै जवाफ दिन्छ। अङ्ग्रेजी मात्र बोल्ने र विदेशी जस्तो लाग्ने रोबोटिक च्याटबोटको झन्झट हुँदैन।",
          icon: "Globe",
        },
      ],
      stat: "एआई च्याटबोट भएका व्यवसायहरूले १००% सोधपुछको जवाफ दिन्छन्। यो सुविधा नभएकाहरूले अफ-आवर (Off-hours) मा आउने ६७% सम्म ग्राहक गुमाउँछन्।",
      cta: "आफ्नो २४/७ एआई स्टाफ पाउनुहोस्",
      tagline: "महिनाको मात्र रु ३९९ मा एउटा यस्तो २४/७ कर्मचारी पाउनुहोस् जसले कहिल्यै सुत्दैन, गुनासो गर्दैन र कुनै पनि ग्राहक छुटाउँदैन।",
      twoAm: [
        "राति २:१५: अमेरिकाका कोही ग्राहकलाई नेपाल टुर प्याकेज चाहियो। तपाईंको प्रतिस्पर्धीको एआईले जवाफ दिन्छ। तपाईं सुत्नुभएको छ।",
        "राति ३:३०: अस्ट्रेलियामा रहेका विद्यार्थीले कन्सल्टेन्सीबारे प्रश्न सोध्छन्। एआईले जवाफ दिन्छ। तपाईं सपना देख्दै हुनुहुन्छ।",
        "बिहान ४:४५: कुनै जोडीले विवाहको फोटोग्राफीका लागि सोध्छन्। एआईले पोर्टफोलियो पठाउँछ। तपाईं ब्युँझिँदा बुकिङ पाउनुहुन्छ।",
      ],
      beforeBed: {
        heading: "आज राति तपाईं सुतेको बेला:",
        points: [
          "राति १२ बजे: एआईले अस्ट्रेलियाको ग्राहकलाई जवाफ दिन्छ",
          "राति २ बजे: कसैले सेवा स्वतः बुक गर्छ",
          "बिहान ४ बजे: सोधपुछ आउँछ र एआईले विवरण बुझ्छ",
          "बिहान ६ बजे: तपाईं ब्युँझिँदा छुटेका प्रश्न होइन, तयार भएका ग्राहक पाउनुहुन्छ",
        ],
      },
      mockup: {
        user1: "नमस्ते! तपाईंको menu देख्न सकिन्छ?",
        ai1: "नमस्ते! हाम्रो आजको menu:\n🍛 दाल भात — रु ३५०\n🍽️ थकाली थाली — रु ५५०\n☕ सेल रोटी र चिया — रु १२०",
        user2: "table book गर्न सकिन्छ?",
        ai2: "हजुर, सकिन्छ! आज साँझको लागि उपलब्ध समयहरू:",
        slots: ["६:३० PM", "७:०० PM", "८:०० PM", "८:३० PM"],
        cta: "अहिल्यै बुक गर्नुहोस्",
      },
    },

    // ── Email marketing education (NEW) ──────────────────────────────────────
    emailMarketing: {
      badge: "धेरैजसो नेपाली व्यवसायलाई यो सुविधाबारे थाहा नै छैन",
      heading: "ग्राहकहरूको सूची नै तपाईंको सबैभन्दा ठूलो सम्पत्ति हो। के तपाईं यसलाई सङ्कलन गर्दै हुनुहुन्छ?",
      desc: "तपाईंको HamroLink साइटमा आउने हरेक भिजिटर (Visitor) तपाईंको सब्सक्राइबर बन्न सक्छ। इमेल सङ्कलन गर्नुहोस्, अफरहरू पठाउनुहोस् र नयाँ उत्पादनहरूको जानकारी दिनुहोस्—त्यो पनि स्वचालित रूपमा। तपाईंका प्रतिस्पर्धीहरू फेसबुकको अल्गोरिदमको भर परिरहँदा, तपाईं सिधै ग्राहकको इनबक्समा पुग्नुहुनेछ।",
      cta: "यो कसरी काम गर्छ, हेर्नुहोस्",
    },

    // ── Transformation / "Before vs After" section (NEW) ────────────────────
    transformation: {
      badge: "वास्तविक परिवर्तनहरू",
      heading: "प्रोफेसनल देखिँदा के परिवर्तन आउँछ?",
      items: [
        {
          business: "फोटोग्राफर, काठमाडौं",
          before: "फेसबुक पेजमा अस्तव्यस्त पोस्टहरू थिए। पोर्टफोलियो वेबसाइट भएका अन्य फोटोग्राफरसँग अन्तर्राष्ट्रिय ग्राहकहरू गुमाइरहेका थिए।",
          after: "HamroLink मा प्रोफेसनल पोर्टफोलियो बनाए। अहिले अन्तर्राष्ट्रिय ग्राहकहरूसँग एउटा सफा लिङ्क सेयर गर्छन्। उनीहरूको शुल्क (Rates) ३५% ले बढेको छ।",
          metric: "हरेक ग्राहकबाट ३५% बढी → महिनाको रु १५,००० अतिरिक्त आम्दानी",
        },
        {
          business: "क्याफे, पोखरा",
          before: "ग्राहकहरूले फेसबुकमा समय र मेनु सोधिरहन्थे। दिनमै १०-१५ वटा मेसेज छुट्ने गर्थ्यो। ह्वाट्सएप अटोमेसन थिएन।",
          after: "HamroLink साइटमा रहेको एआई च्याटबोटले मेनु, खुल्ने समय र लोकेसनसम्बन्धी प्रश्नहरूको स्वतः जवाफ दिन्छ। टेबल रिजर्भेसनका लागि सिधै ह्वाट्सएपमा पठाउँछ।",
          metric: "० छुटेका सोधपुछ",
        },
        {
          business: "कन्सल्टेन्सी, बुटवल",
          before: "फेसबुकमा मात्र सीमित थिए। विदेश जान चाहने विद्यार्थीहरूले गुगलमा उनीहरूलाई भेट्दैनथे। प्रतिस्पर्धीसँग ग्राहक गुमाउनुपरेको थियो।",
          after: "गुगलमा देखिने, अनलाइन बुकिङ गर्न मिल्ने र लिड क्याप्चर फर्मसहितको प्रोफेसनल वेबसाइट बनाए। परामर्शका लागि आउने अनुरोध ३ गुणाले बढेको छ।",
          metric: "३ गुणा बढी लिडहरू",
        },
      ],
    },

    // ── Features ─────────────────────────────────────────────────────────────
    features: {
      badge: "एउटा प्रोफेसनल नेपाली व्यवसायलाई चाहिने सबै कुरा",
      heading: "तपाईंको व्यवसायलाई\nगम्भीर र विश्वसनीय देखाउने टुल्स।",
      subtext:
        "हाम्रो हरेक सुविधा एउटै लक्ष्यका साथ बनाइएको छ: तपाईंको व्यवसायलाई प्रतिस्पर्धीहरूको भन्दा बढी प्रोफेसनल र प्रभावकारी देखाउनु।",
      items: [
        {
          title: "तपाईंको आफ्नै डोमेन",
          desc: "yourname.hamrolink.com सधैँका लागि नि:शुल्क पाउनुहोस्—वा आफ्नै कस्टम डोमेन जोड्नुहोस्। यसलाई भिजिटिङ कार्डमा राखेर वास्तविक व्यवसायजस्तो देखिनुहोस्।",
        },
        {
          title: "ई-सेवा र खल्ती पेमेन्ट",
          desc: "आफ्नै वेबसाइटबाट सिधै पेमेन्ट लिनुहोस्। कुनै झन्झटिलो थर्ड-पार्टी सेटअप चाहिँदैन। यो सजिलै काम गर्छ।",
        },
        {
          title: "एआई २४/७ असिस्टेन्ट",
          desc: "तपाईं सुतिरहेको बेला पनि एआईले ग्राहकका प्रश्नहरूको जवाफ दिन्छ—मूल्य, खुल्ने समय, लोकेसन र ह्वाट्सएप रिडाइरेक्ट। अब कुनै पनि ग्राहक नछुटाउनुहोस्।",
        },
        {
          title: "मोबाइल-फर्स्ट डिजाइन",
          desc: "हरेक टेम्प्लेट मोबाइलमा चिटिक्क देखिन्छ। किनकि तपाईंका ९०% भन्दा बढी ग्राहकहरूले मोबाइलबाटै वेबसाइट हेर्छन्।",
        },
        {
          title: "गुगलमा देखिने (SEO)",
          desc: 'कसैले "पोखराको उत्कृष्ट क्याफे" वा "काठमाडौंको फोटोग्राफर" खोज्दा तपाईंको साइट गुगलमा देखिन सक्छ। फेसबुक पेजले यसो गर्न सक्दैन।',
        },
        {
          title: "प्रिन्ट गर्न तयार QR कोड",
          desc: "हरेक वेबसाइटले एउटा QR कोड पाउँछ। यसलाई मेनु, भिजिटिङ कार्ड, ब्यानर वा प्याकेजिङमा प्रिन्ट गर्नुहोस्। स्क्यान गरेपछि सिधै तपाईंको प्रोफेसनल वेबसाइट खुल्छ।",
        },
        {
          title: "इमेल लिस्ट बिल्डर",
          desc: "ग्राहकको इमेल स्वतः सङ्कलन गर्नुहोस्। फेसबुकले तपाईंको पोस्ट देखाउला भनेर आश गर्नुको सट्टा, आफ्ना अफर र समाचारहरू सिधै उनीहरूको इनबक्समा पठाउनुहोस्।",
        },
        {
          title: "एनालिटिक्स ड्यासबोर्ड",
          desc: "कति मानिसले वेबसाइट हेरे, कहाँबाट आए र के-के क्लिक गरे—सबै हेर्नुहोस्। एक वास्तविक व्यवसायीले जस्तै डाटा हेरेर निर्णय लिनुहोस्।",
        },
      ],
    },

    // ── Templates ────────────────────────────────────────────────────────────
    templates: {
      badge: "१२०+ प्रोफेसनल टेम्प्लेटहरू",
      heading: "टेम्प्लेट छान्नुहोस्।\nतत्काल प्रोफेसनल देखिनुहोस्।",
      subtext:
        "हरेक टेम्प्लेट तपाईंको व्यवसायलाई पहिलो सेकेन्डदेखि नै विश्वसनीय र प्रोफेसनल देखाउनका लागि डिजाइन गरिएको छ।",
      browseAll: "सबै टेम्प्लेटहरू हेर्नुहोस्",
      useThis: "अर्ली एक्सेस लिनुहोस्",
      hoverCta: "यो टेम्प्लेट प्रयोग गर्नुहोस् →",
    },

    // ── Examples ─────────────────────────────────────────────────────────────
    examples: {
      badge: "वास्तविक HamroLink वेबसाइटहरू",
      heading: "तपाईंको व्यवसाय यस्तो देखिन सक्छ।",
      subtext:
        "यी HamroLink टेम्प्लेटहरू प्रयोग गरेर बनाइएका वास्तविक वेबसाइट हुन्। यहाँको हरेक वेबसाइट एउटा फेसबुक पेजभन्दा निकै प्रोफेसनल देखिन्छ—र यी तयार हुन १५ मिनेटभन्दा कम समय लागेको थियो।",
      items: [
        {
          emoji: "🛍️",
          name: "हाम्रो स्टोर",
          desc: "सामानहरू लिस्टेड छन्, ई-सेवा पेमेन्ट जोडिएको छ र अर्डरहरू आइरहेका छन्।",
          url: "hamrostore.hamrolink.com",
          href: "https://hamrostore.hamrolink.com",
        },
        {
          emoji: "🏫",
          name: "हाम्रो स्कुल",
          desc: "भर्ना खुलेको छ, प्रोग्रामहरू राखिएका छन् र अभिभावकले तुरुन्तै विश्वास गर्छन्।",
          url: "hamroschool.hamrolink.com",
          href: "https://hamroschool.hamrolink.com",
        },
        {
          emoji: "🍽️",
          name: "हाम्रो खाजाघर",
          desc: "मेनु, लोकेसन, खुल्ने समय—र अफ-आवर (Off-hours) का प्रश्नहरूको लागि एआई च्याटबोट।",
          url: "hamrokhajaghar.hamrolink.com",
          href: "https://hamrokhajaghar.hamrolink.com",
        },
        {
          emoji: "🎨",
          name: "क्रिएटर पोर्टफोलियो",
          desc: "एउटा यस्तो क्लिन लिङ्क जसले तपाईंको काम जुनसुकै सोसल प्रोफाइलभन्दा उत्कृष्ट तरिकाले देखाउँछ।",
          url: "creator.hamrolink.com",
          href: "https://creator.hamrolink.com",
        },
      ],
      closing:
        "तपाईंका प्रतिस्पर्धीहरू अहिले आफ्नो साइट बनाउँदै हुन सक्छन्। अर्ली एक्सेसमा जोडिनुहोस् र उनीहरूभन्दा पहिले लन्च गर्नुहोस्।",
      cta: "मेरो अर्ली एक्सेस सिट सुरक्षित गर्नुहोस्",
    },

    // ── Founder ──────────────────────────────────────────────────────────────
    founder: {
      badge: "संस्थापकको भनाइ",
      heading: "नेपालका व्यवसायहरू एउटा\nफेसबुक पेजभन्दा धेरै बढीका हकदार छन्।",
      paragraphs: [
        "मैले धेरै प्रतिभाशाली नेपाली व्यवसायीहरूले अथक मेहनत गर्दागर्दै पनि ग्राहक गुमाएको देखेको छु—केवल यसकारण कि उनीहरूका प्रतिस्पर्धीहरू अनलाइनमा अलि बढी प्रोफेसनल देखिन्थे। वेबसाइट भएको रेस्टुरेन्टले विदेशी पर्यटक पायो। पोर्टफोलियो लिङ्क भएको फोटोग्राफरले अन्तर्राष्ट्रिय क्लाइन्ट पायो। प्रोफेसनल पेज भएको कन्सल्टेन्टले दोब्बर शुल्क लिन सक्यो।",
        "सबैभन्दा निराशाजनक कुरा के थियो भने, वेबसाइट बनाउन महँगो र झन्झटिलो थियो। एउटा वेब डेभलपरले एक महिनाको कमाइभन्दा बढी शुल्क माग्थ्यो। त्यसैले धेरैजना फेसबुकमै सीमित रहे। र, आफूलाई थाहै नभई अनगिन्ती ग्राहक गुमाइरहे।",
        "HamroLink यही समस्याको अन्त्य गर्न बनाइएको हो। यो एउटा सामान्य वेबसाइट बिल्डर मात्र होइन—यो २४/७ ग्राहकलाई जवाफ दिने एआई टुल्स, इमेल मार्केटिङ र नेपालमा काम गर्ने पेमेन्ट इन्टिग्रेशनसहितको पूर्ण डिजिटल प्रेजेन्स (Digital Presence) हो। प्रोफेसनल। स्वचालित। र सबैको पहुँचमा पुग्ने मूल्यमा।",
      ],
      signature: "— सुमन बस्नेत",
      role: "संस्थापक, HamroLink · पाख्रिबास, धनकुटा",
      cta: "हाम्रो अभियानमा जोडिनुहोस्",
    },

    // ── Pricing ──────────────────────────────────────────────────────────────
    pricing: {
      badge: "बाहिर एक छाक खाजा खाएको खर्चभन्दा कम — र यसले २४/७ काम गर्छ",
      heading: "तपाईंको २४/७ डिजिटल प्रेजेन्स।\nप्रति महिना मात्र रु ३९९ बाट सुरु।",
      anchoring: "एउटा डेभलपरलाई रु ५०,००० लाग्छ। फ्रिल्यान्सरलाई रु १५,०००। HamroLink मात्र रु ३९९ मा उपलब्ध छ—जसमा २४/७ काम गर्ने एआई पनि समावेश छ।",
      subtext:
        "एउटा वेब डेभलपरले साइट बनाउन रु ३०,००० देखि ८०,००० सम्म लिन्छ। HamroLink ले तपाईंलाई एआई टुल्ससहितको त्योभन्दा राम्रो वेबसाइट दिन्छ—मात्र रु ३९९ प्रति महिनामा। यो मूल्यलाई सधैँका लागि लक गर्न अहिल्यै वेटलिस्टमा जोडिनुहोस्।",
      monthly: "मासिक",
      yearly: "वार्षिक",
      save: "१२% बचत गर्नुहोस्",
      free: "नि:शुल्क",
      perMonth: "/महिना",
      perYear: "/वर्ष",
      approxMonth: "≈ रु {n}/महिना",
      ctaFree: "नि:शुल्क सुरु गर्नुहोस्",
      ctaPaid: "अर्ली मूल्य दाबी गर्नुहोस्",
      footer:
        "हरेक प्लानमा समावेश: तपाईंको वेबसाइट · hamrolink.com सब-डोमेन · ड्र्याग एन्ड ड्रप (Drag & Drop) एडिटर · QR कोड · नेपाली र अङ्ग्रेजी ड्यासबोर्ड",
      plans: [
        {
          name: "नि:शुल्क",
          desc: "सित्तैमा सुरु गर्नुहोस्। कार्ड चाहिँदैन। सधैँका लागि।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "५ पेजहरू", ok: true },
            { t: "२५ इमेज · ५ फाइल अपलोड", ok: true },
            { t: "५० इमेल / महिना", ok: true },
            { t: "yourname.hamrolink.com सब-डोमेन", ok: true },
            { t: "कस्टम डोमेन", ok: false },
            { t: "अनलाइन स्टोर (ई-सेवा/खल्ती)", ok: false },
            { t: "एआई २४/७ च्याटबोट", ok: false },
            { t: "HamroLink ब्रान्डिङ हटाउने सुविधा", ok: false },
          ],
        },
        {
          name: "स्टार्टर",
          desc: "एउटा गम्भीर व्यवसायलाई चाहिने सबै कुरा। रु ३९९/महिना।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "२० पेजहरू + ३० ब्लग पोस्ट", ok: true },
            { t: "१०० इमेज · ५ फाइल अपलोड", ok: true },
            { t: "२५० इमेल / महिना", ok: true },
            { t: "कस्टम डोमेन", ok: true },
            { t: "अनलाइन स्टोर — ३० प्रडक्ट (ई-सेवा र खल्ती)", ok: true },
            { t: "एआई च्याटबोट — २४/७ ग्राहक असिस्टेन्ट", ok: true },
            { t: "७० बुकिङ · १० इभेन्ट", ok: true },
            { t: "HamroLink ब्रान्डिङ हटाउने सुविधा", ok: true },
          ],
        },
        {
          name: "प्रो",
          desc: "व्यवसाय बढाउन (Growth) चाहनेहरूका लागि।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "५० पेजहरू + १५० ब्लग पोस्ट", ok: true },
            { t: "२०० इमेज · १० फाइल अपलोड", ok: true },
            { t: "६०० इमेल / महिना", ok: true },
            { t: "कस्टम डोमेन", ok: true },
            { t: "अनलाइन स्टोर — ३०० प्रडक्ट (ई-सेवा र खल्ती)", ok: true },
            { t: "एआई च्याटबोट — एडभान्स्ड कस्टमाइजेसन", ok: true },
            { t: "१५० बुकिङ · २५ इभेन्ट", ok: true },
            { t: "HamroLink ब्रान्डिङ हटाउने सुविधा", ok: true },
          ],
        },
        {
          name: "लोकल स्टार्टर",
          desc: "स्थानीय पसलहरूको लागि उत्तम। रु १९९/महिना।",
          feats: [
            { t: "१ वेबसाइट", ok: true },
            { t: "१० पेजहरू + १० ब्लग पोस्ट", ok: true },
            { t: "५० इमेज · ५ फाइल अपलोड", ok: true },
            { t: "१०० इमेल / महिना", ok: true },
            { t: "कस्टम डोमेन", ok: false },
            { t: "अनलाइन स्टोर — २० प्रडक्ट (ई-सेवा र खल्ती)", ok: true },
            { t: "एआई च्याटबोट — १००० म्यासेज सीमा", ok: true },
            { t: "५ बुकिङ · १० नोटिस", ok: true },
            { t: "HamroLink ब्रान्डिङ हटाउने सुविधा", ok: false },
          ],
        },
      ],
      priceMetaphor: {
        daily: "मात्र रु १३/दिन — एक कप चियाभन्दा कम",
        weekly: "रु ९३/हप्ता — एक प्लेट मःमभन्दा कम",
        monthly: "रु ३९९/महिना — एक पटक बाहिर खाजा खाए जति",
      },
      freePlanHook: {
        heading: "सधैँका लागि नि:शुल्क? हो। तर सीमित पनि।",
        desc: "HamroLink नि:शुल्क प्रयोग गर्नुहोस्। तर यदि व्यवसायमा गम्भीर हुनुहुन्छ भने, तपाईं १५ मिनेटमै अपग्रेड गर्नुहुनेछ—किनकि नि:शुल्क प्लान प्रोफेसनल कस्तो हुन्छ भन्ने स्वाद मात्र हो।",
      },
      decisionHelper: {
        heading: "अझै सोच्दै हुनुहुन्छ? पर्खिँदा के हुन्छ, हेर्नुहोस्:",
        points: [
          "अर्ली एक्सेस मूल्य सकिन्छ → २५% बढी तिर्नुपर्नेछ",
          "तपाईंको प्रतिस्पर्धीले तपाईंको व्यवसायको नाम पहिले नै ओगट्नेछ",
          "२४०+ व्यवसायहरू तपाईंभन्दा बढी प्रोफेसनल देखिन सुरु गर्नेछन्",
        ],
        cta: "म पछि पछुताउन चाहन्न →",
      },
    },

    // ── Final CTA ────────────────────────────────────────────────────────────
    cta: {
      line1: "तपाईंका प्रतिस्पर्धीहरू अहिले",
      line2: "डिजिटल बन्दैछन्।",
      subtext:
        "आफ्नो सिट सुरक्षित गरिसकेका २४०+ नेपाली व्यवसायहरूसँग जोडिनुहोस्। जसले पहिले लन्च गर्छ, अनलाइन ग्राहक उसैले जित्छ। पछि नपर्नुहोस्।",
      primary: "मेरो अर्ली एक्सेस सिट सुरक्षित गर्नुहोस्",
      secondary: "मूल्य हेर्नुहोस्",
      disclaimer:
        "जोडिन नि:शुल्क · क्रेडिट कार्ड चाहिँदैन · अर्ली सदस्यहरूका लागि लन्च मूल्य सधैँका लागि लक",
    },

    // ── Contact Page ──────────────────────────────────────────────────────────
    contactPage: {
      title: "सम्पर्क — HamroLink Nepal",
      description:
        "HamroLink सँग सम्पर्क गर्नुहोस्। कुनै प्रश्न, सहयोग, वा साझेदारीको कुरा छ भने धनकुटास्थित हाम्रो टिम तपाईंलाई मद्दत गर्न सधैँ तयार छ।",
      badge: "सम्पर्क गर्नुहोस्",
      heading: "हामी तपाईंलाई मद्दत गर्न तयार छौं।",
      subheading:
        "HamroLink को बारेमा कुनै प्रश्न छ? हाम्रो टिम तपाईंलाई सहयोग गर्न तयार छ।",
      businessInfo: {
        name: "हाम्रोलिङ्क (HamroLink Nepal)",
        phone: "+९७७-९७१३१०१९५७",
        email: "support@hamrolink.com",
        address: "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल",
      },
      form: {
        name: "पूरा नाम",
        email: "इमेल ठेगाना",
        subject: "विषय",
        message: "सन्देश",
        placeholderName: "तपाईंको नाम",
        placeholderEmail: "you@example.com",
        placeholderSubject: "हामी कसरी मद्दत गर्न सक्छौं?",
        placeholderMessage: "तपाईंको व्यवसायको बारेमा बताउनुहोस्...",
        cta: "सन्देश पठाउनुहोस्",
        sending: "पठाउँदैछ…",
        success: "सन्देश पठाइयो! हामी चाँडै तपाईंलाई सम्पर्क गर्नेछौं।",
        error: "सन्देश पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
      },
      info: {
        email: "हामीलाई इमेल गर्नुहोस्",
        location: "हाम्रो कार्यालय",
        hours: "सहयोग समय",
        hoursValue: "आइतबार – शुक्रबार, बिहान ९ – बेलुका ६",
        address: "पाख्रिबास-०४, धनकुटा",
      },
    },

    // ── About Page ────────────────────────────────────────────────────────────
    aboutPage: {
      title: "हाम्रोबारे — HamroLink: नेपालको पहिलो AI-Powered Business Presence Platform",
      description:
        "नेपालका प्रतिभाशाली व्यवसायहरूले अनलाइनमा प्रोफेसनल नदेखिएको कारणले मात्र ग्राहक गुमाइरहेको देखेर HamroLink बनाइएको हो। पाख्रिबास, धनकुटामा स्थापित।",
      badge: "हाम्रो कथा",
      heading: "नेपालका व्यवसायहरू\nउत्कृष्टताका हकदार छन्।",
      subheading:
        "हरेक दिन, प्रतिभाशाली नेपाली उद्यमीहरूले आफ्ना ग्राहक गुमाउँछन्—केबल यसकारण कि उनीहरूका प्रतिस्पर्धीहरू अनलाइनमा बढी प्रोफेसनल देखिन्छन्। HamroLink यसैलाई रोक्न बनाइएको हो।",
      story: {
        title: "पाख्रिबासदेखि नेपालको हरेक कुनासम्म",
        content: `HamroLink काठमाडौंको कुनै कर्पोरेट अफिसबाट सुरु भएको होइन। यो एउटा यथार्थ भोगाइबाट सुरु भयो: धनकुटाको पाख्रिबासका पहाडहरूमा—र नेपालका हरेक जिल्लाहरूमा—मेहनती व्यवसायीहरू अनलाइन संसारमा अदृश्य थिए। उनीहरूले राम्रो काम नगरेर होइन। एउटा वेबसाइट बनाउन ठूलो रकम, प्राविधिक ज्ञान वा एक महिनाको कमाइभन्दा बढी माग्ने डेभलपर चाहिन्थ्यो।

त्यसैले उनीहरू फेसबुकमै सीमित रहे। र, पर्यटकहरूले वेबसाइट भएको रेस्टुरेन्ट छानेको हेरिरहे। अन्तर्राष्ट्रिय क्लाइन्टहरूले पोर्टफोलियो लिङ्क भएको फोटोग्राफरलाई रोजेको देखे। बढी प्रोफेसनल देखिने कर्पोरेट प्रतिस्पर्धीहरूले ठेक्का (Contracts) लगेको टुलुटुलु हेर्न बाध्य भए।

HamroLink यही अवस्था बदल्न बनाइएको हो। यो वेबसाइट बिल्डर मात्र नभई एउटा पूर्ण डिजिटल प्रेजेन्स प्लेटफर्म हो, जसले हरेक नेपाली व्यवसायलाई ती टुल्सहरू दिन्छ जुन पहिले ठूला बजेट भएका कम्पनीहरूले मात्र प्रयोग गर्थे: एआई-सञ्चालित २४/७ ग्राहक असिस्टेन्ट, इमेल मार्केटिङ, लोकल पेमेन्ट इन्टिग्रेशन, प्रोफेसनल टेम्प्लेट र गुगल भिजिबिलिटी (Google Visibility)।

किनकि एआईको यो युगमा, प्रोफेसनल देखिनु अब कुनै विकल्प (Option) होइन, यो व्यवसाय बचाउने (Survival) आधार हो।`,
      },
      mission: {
        title: "हाम्रो मिशन",
        text: "प्रोफेसनल वेबसाइट, एआई अटोमेसन र नेपालको बजार सुहाउँदो लोकल टुल्सको प्रयोगमार्फत हरेक नेपाली व्यवसायलाई अनलाइनमा बेवास्ता गर्न नसकिने (Impossible to ignore) बनाउनु।",
      },
      vision: {
        title: "हाम्रो भिजन",
        text: "एउटा यस्तो नेपालको निर्माण गर्नु जहाँ धनकुटादेखि दार्चुलासम्म, र पोखरादेखि पाल्पासम्मका हरेक उद्यमीसँग प्रतिस्पर्धा गर्न र फस्टाउन सक्ने बलियो डिजिटल प्रेजेन्स होस्।",
      },
      values: [
        {
          title: "डर एउटा प्रेरणा हो",
          desc: "हामी यथार्थ भन्छौं: यदि तपाईं अनलाइनमा प्रोफेसनल रूपमा उपस्थित हुनुहुन्न भने, तपाईंले ग्राहक गुमाइरहनुभएको छ। हामी यो कुरा स्पष्ट रूपमा भन्छौं किनभने यो सत्य हो।",
        },
        {
          title: "प्रोफेसनलिजम सबैको पहुँचमा हुनुपर्छ",
          desc: "भिजिटिङ कार्डमा वेबसाइटको लिङ्क (URL) हुँदा मानिसले तपाईंलाई हेर्ने दृष्टिकोण नै बदलिन्छ। यसको लागि तपाईंले रु ५०,००० होइन, मात्र रु ३९९ तिर्नुपर्छ।",
        },
        {
          title: "एआईले सबैका लागि काम गर्नुपर्छ",
          desc: "एआई च्याटबोट र इमेल अटोमेसन ठूला कम्पनीका लागि मात्र होइन। तपाईंको लोकल क्याफेले पनि २४/७ काम गर्ने असिस्टेन्ट पाउनुपर्छ।",
        },
      ],
      team: {
        title: "संस्थापकलाई भेट्नुहोस्",
        members: [
          {
            name: "सुमन बस्नेत",
            role: "संस्थापक र CEO",
            bio: "सुमनले नेपाली व्यवसायहरू अनलाइनमा कम प्रोफेसनल देखिएको कारणले मात्र आफ्ना प्रतिस्पर्धीसँग ग्राहक गुमाइरहेको देखेर HamroLink को स्थापना गरेका हुन्। पाख्रिबास, धनकुटाका एक फुल-स्ट्याक इन्जिनियरका रूपमा, उनले हरेक नेपाली व्यवसायीलाई ती डिजिटल टुल्स उपलब्ध गराउन HamroLink बनाए, जुन पहिले ठूला कम्पनीले मात्र प्रयोग गर्न सक्थे—त्यो पनि उनीहरूले तिर्न सक्ने मूल्यमा।",
          },
        ],
      },
      stats: [
        { label: "स्थापना", value: "२०२६" },
        { label: "कम्युनिटी", value: "बढ्दो" },
        { label: "कार्यक्षेत्र", value: "नेपाल 🇳🇵" },
      ],
      location: {
        title: "हाम्रो जड (Roots)",
        address: "पाख्रिबास-०४, धनकुटा",
        description:
          "धनकुटाको पाख्रिबासका पहाडहरूमा निर्मित—जहाँ हामीले डिजिटल खाडल (Digital Divide) आफ्नै आँखाले देख्यौं। त्यसैले हामीले बनाउने हरेक फिचर सिलिकन भ्यालीबाट कपी-पेस्ट गरिएको होइन, नेपालको आफ्नै परिवेश सुहाउँदो गरी डिजाइन गरिएको छ।",
        district: "धनकुटा जिल्ला, कोशी प्रदेश",
      },
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      tagline:
        "नेपालको पहिलो AI-powered business presence platform — छिट्टै आउँदैछ।",
      taglinePostLaunch:
        "नेपालको पहिलो AI-powered business presence platform।",
      cta: "अर्ली एक्सेस लिनुहोस्",
      ctaPostLaunch: "नि:शुल्क सुरु गर्नुहोस्",
      copyright: "सर्वाधिकार सुरक्षित · नेपालमा ❤️ सँगै निर्मित 🇳🇵",
      businessName: "हाम्रोलिङ्क डिजिटल",
      address: "पाख्रिबास-०४, धनकुटा, कोशी प्रदेश, नेपाल",
      regIdLabel: "दर्ता नं",
      regIdValue: "ध-९४५८/०८२/०८३",
      panLabel: "प्यान नं",
      panValue: "६२३२५११९१",
      proprietorLabel: "प्रोप्राइटर",
      proprietorValue: "लिला बस्नेत",
      founderLabel: "संस्थापक",
      founderValue: "सुमन बस्नेत",
      sections: {
        उत्पादन: [
          ["AI कर्मचारी", "/#ai-staff"],
          ["विशेषताहरू", "/#features"],
          ["मूल्य", "/pricing"],
          ["सफलताको कथा", "/#stories"],
          ["सम्पर्क", "/contact"],
        ],
        हाम्रोबारे: [
          ["हाम्रोबारे", "/about"],
        ],
        कानुनी: [
          ["गोपनीयता नीति", "/privacy"],
          ["सेवाका सर्तहरू", "/terms"],
          ["रकम फिर्ता (Refund) नीति", "/refund"],
          ["प्रश्नोत्तर (FAQ)", "/faqs"],
        ],
      },
    },
    legacy: {
        badge: "पुस्तापुस्तासम्म चल्ने व्यवसायका लागि",
        heading: "तपाईंको वेबसाइट तपाईंको फेसबुक अकाउन्टभन्दा धेरै टिक्नुपर्छ।",
        desc: "फेसबुक पेजहरू तपाईंले पोस्ट गर्न छोडेपछि हराउँछन्। अल्गोरिदम परिवर्तन हुन्छन्। अकाउन्ट ह्याक हुन सक्छन्। तपाईंको HamroLink साइट सधैँका लागि तपाईंको नियममा चल्छ।",
      },
      seasonal: {
        dashain: "दसैँ नजिकिँदैछ। ग्राहकहरूले अनलाइन खोजिरहेका छन्। अहिल्यै तयार हुनुहोस्।",
        tihar: "तिहारका अफरहरू सुरु हुँदैछन्। गत वर्ष तपाईंले अवसर गुमाउनुभयो। यस पटक नछुटाउनुहोस्।",
        touristSeason: "पर्यटक सिजन ३ हप्तामा सुरु हुँदैछ। उनीहरूले तपाईंलाई भेट्लान् कि तपाईंको प्रतिस्पर्धीलाई?",
      },
      liveActivity: {
        justNow: "अहिले भर्खरै: {city} मा {businessType} लाइभ भयो",
        today: "आज: {count} नेपाली व्यवसायहरू लन्च भए",
        watching: "{count} जनाले अहिले यो पेज हेरिरहेका छन्",
      },
      visitingCard: {
        before: "तपाईंको भिजिटिङ कार्ड: नाम, फोन, 'फेसबुक पेजमा जानुहोस्'",
        after: "तपाईंको भिजिटिङ कार्ड: नाम, फोन, yourname.com.np",
        cta: "कुन चाहिँ बढी प्रोफेसनल देखिन्छ? पक्कै पनि वेबसाइट भएको।",
      },
      analogy: {
        heading: "तपाईंको 'पर्चा' अब डिजिटल भयो।",
        desc: "कागजको पर्चा छापेर बाँडेको सम्झिनुहोस्? महँगो, सीमित र एकपटक मात्र काम लाग्ने। तपाईंको HamroLink साइट तपाईंको डिजिटल पर्चा हो—जसको पहुँच असीमित छ र यसले सधैँ काम गर्छ।",
      },
      objections: {
        tooBusy: "मात्र १५ मिनेट लाग्छ। आज साँझ फेसबुक चलाउने समयभन्दा कम।",
        notTechSavvy: "यदि तपाईं फेसबुक चलाउन सक्नुहुन्छ भने, HamroLink पनि चलाउन सक्नुहुन्छ। यो त्यति नै सजिलो छ।",
        expensive: "ग्राहक गुमाउनु महँगो कुरा हो। महिनाको रु ३९९ त एउटा ग्राहक गुमाउनुभन्दा निकै सस्तो छ।",
        alreadyOnFacebook: "फेसबुक त भाडाको घर जस्तै हो। HamroLink तपाईंको आफ्नै डिजिटल घर हो।",
        questions: {
          tooBusy: "म अहिले निकै व्यस्त छु।",
          notTechSavvy: "म प्रविधिमा खासै जान्ने छैन।",
          expensive: "के वेबसाइट साच्चै मूल्य अनुसारको छ?",
          alreadyOnFacebook: "म त फेसबुकमै छु नि।"
        }
      },
      localized: {
        kathmandu: "काठमाडौंका व्यवसायहरू छिटो अघि बढ्दैछन्। तपाईं पछि नपर्नुहोस्।",
        pokhara: "पोखराको पर्यटन गुगलमा चल्छ। इन्टरनेटमा भेटिने बन्नुहोस्।",
        biratnagar: "विराटनगरको व्यवसायी समुदाय डिजिटल बन्दैछ। तपाईं पनि सामेल हुनुहोस्।",
        dhankuta: "धनकुटामा बनेको। सधैँ नेपालका लागि।",
      },
      exitIntent: {
        heading: "पख्नुहोस्! तपाईं पछि पर्दै हुनुहुन्छ।",
        subheading: "तपाईंका प्रतिस्पर्धीहरूले ठाउँ ओगटिसके। उनीहरूलाई मात्र ग्राहकहरू लैजान नदिनुहोस्।",
        cta: "सहभागी हुनुहोस् →",
        alternative: "छोड्नुहोस्",
      },
      personalAddress: {
        generic: "तपाईंको व्यवसाय",
        respectful: "दाइ/दिदी, तपाईंको व्यवसायलाई वेबसाइट चाहियो",
        friendly: "भाइ/बहिनी, अब फेसबुक पुरानो भयो",
      },
      campaign: {
        name: "डिजिटल दर्ता अभियान",
        hook: "जसरी नगरपालिकामा व्यवसाय दर्ता गर्नुहुन्छ, त्यसरी नै इन्टरनेटमा पनि आफ्नो व्यवसाय दर्ता गर्नुहोस्।",
        cta: "आफ्नो व्यवसाय डिजिटल दर्ता गर्नुहोस्",
      },
      ctaNepali: {
        casual: "अहिले नै सुरु गर्नुहोस्",
        urgent: "आफ्नो ठाउँ नछुटाउनुहोस्",
        friendly: "हामीसँग जोडिनुहोस्",
        direct: "मेरो वेबसाइट बनाउनुहोस् →",
      },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];
export type DictKey = keyof Dictionary;

export function getDictionary(lang: string): Dictionary {
  return (dictionaries as any)[lang] ?? dictionaries.en;
}