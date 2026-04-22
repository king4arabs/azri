/**
 * @azri/content — Source-of-truth bilingual content
 *
 * This file is the canonical AZRI content. It is consumed by the website,
 * patient app, doctor dashboard, institutional platform, and wearable
 * surfaces. Both `ar` (Arabic) and `en` (English) variants are required
 * for every visible string.
 *
 * Authoring rules:
 *  1. Preserve careful medical wording. AZRI "supports", "helps monitor",
 *     "assists with early awareness", "enables follow-up". It does NOT
 *     diagnose, predict with certainty, cure, or replace a clinician.
 *  2. Do not invent partnerships, certifications, or regulatory claims.
 *  3. When changing user-visible text, also update `CHANGELOG.md` under
 *     the appropriate version with a short note.
 *  4. Stable `id` fields are part of the public contract — do not rename
 *     them without coordinating with consumers.
 *  5. Keep section order aligned with `AzriContent` in `types.ts`.
 */

import type { AzriContent } from "../types.ts";

export const azriContent: AzriContent = {
  // -------------------------------------------------------------------------
  // Brand
  // -------------------------------------------------------------------------
  brand: {
    name: "AZRI",
    arabicWordmark: "أزري",
    tagline: {
      ar: "ذكاء اصطناعي بإنسانية",
      en: "AI with Humanity",
    },
  },

  // -------------------------------------------------------------------------
  // Hero
  // -------------------------------------------------------------------------
  hero: {
    brand: { ar: "AZRI | أزري", en: "AZRI" },
    tagline: {
      ar: "ذكاء اصطناعي بإنسانية",
      en: "AI with Humanity",
    },
    description: {
      ar: "منصة وتطبيق وساعة ذكية لمتابعة مرضى الصرع والحالات الخاصة، مع تنبيهات مبكرة، تقارير ذكية، وتجربة تحفظ كرامة المريض وخصوصيته.",
      en: "A platform, app, and smart watch experience designed for epilepsy patients and special-condition care, with early alerts, intelligent reports, and a privacy-first experience that protects dignity.",
    },
    emphasis: {
      ar: "نرافق المريض… نطمئن الأسرة… وندعم الطبيب بالبيانات والرؤية.",
      en: "Supporting the patient, reassuring the family, and empowering the doctor with better visibility.",
    },
    longDescription: {
      ar: "AZRI تساعد على متابعة المؤشرات الحيوية، وتحليل الأنماط، وإرسال تنبيهات مبكرة قبل تصاعد الخطر، بما يدعم الرعاية اليومية والمتابعة الطبية بطريقة أكثر هدوءًا ووضوحًا.",
      en: "AZRI helps monitor vital signals, analyze patterns, and issue early alerts before risk escalates—supporting daily care and clinical follow-up with more clarity and confidence.",
    },
    ctas: [
      {
        id: "getStarted",
        intent: "primary",
        label: { ar: "ابدأ الآن", en: "Get Started" },
      },
      {
        id: "requestDemo",
        intent: "secondary",
        label: { ar: "اطلب عرضًا تجريبيًا", en: "Request a Demo" },
      },
      {
        id: "forDoctorsAndInstitutions",
        intent: "tertiary",
        label: {
          ar: "للأطباء والمنشآت",
          en: "For Doctors & Institutions",
        },
      },
      {
        id: "contactUs",
        intent: "tertiary",
        label: { ar: "تواصل معنا", en: "Contact Us" },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Hero supporting note
  // -------------------------------------------------------------------------
  supportingNote: {
    body: {
      ar: "حل إنساني وتقني يجمع بين المراقبة الذكية، والتنبيه المبكر، والتقارير الطبية، والتواصل الأسرع بين المريض وذويه والطبيب.",
      en: "A human-centered technology solution that combines intelligent monitoring, early alerts, medical reporting, and faster coordination between patients, families, and clinicians.",
    },
  },

  // -------------------------------------------------------------------------
  // Why AZRI
  // -------------------------------------------------------------------------
  whyAzri: {
    title: { ar: "لماذا أزري", en: "Why AZRI" },
    lead: {
      ar: "لأن الرعاية لا تبدأ بعد الأزمة، بل قبلها.",
      en: "Because care should begin before the crisis—not after it.",
    },
    body: {
      ar: "AZRI صُممت لتجعل التعامل مع الصرع والحالات الخاصة أكثر وعيًا واستباقية وطمأنينة. نحن نؤمن بأن التقنية يجب أن تخدم الإنسان أولًا، وأن تحافظ على الخصوصية والكرامة في كل لحظة.",
      en: "AZRI is designed to make epilepsy and special-condition care more proactive, more informed, and more reassuring. We believe technology should serve people first while preserving privacy and dignity at every step.",
    },
    bulletsIntro: {
      ar: "مع AZRI يمكنك:",
      en: "With AZRI, you can:",
    },
    bullets: {
      ar: [
        "متابعة المؤشرات الحيوية بشكل مستمر",
        "الحصول على تنبيهات مبكرة قبل تفاقم الخطر",
        "مشاركة بيانات وتقارير أوضح مع الطبيب",
        "تمكين الأسرة من المتابعة والاطمئنان",
        "دعم المنشآت الصحية بأدوات متابعة وتحليل أوسع",
      ],
      en: [
        "Monitor vital signals continuously",
        "Receive early alerts before risk escalates",
        "Share clearer reports and insights with doctors",
        "Help families stay informed and reassured",
        "Support healthcare institutions with broader monitoring and analytics",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // Audience segments (For Who)
  // -------------------------------------------------------------------------
  audienceSegments: {
    title: { ar: "لمن هذه المنصة", en: "For Who" },
    segments: [
      {
        id: "patients",
        title: { ar: "للمرضى", en: "For Patients" },
        description: {
          ar: "متابعة يومية أسهل، تنبيهات مبكرة، وسجل صحي أوضح.",
          en: "Simpler daily monitoring, earlier alerts, and a clearer health record.",
        },
      },
      {
        id: "families",
        title: { ar: "لذوي المرضى", en: "For Families & Caregivers" },
        description: {
          ar: "اطمئنان أكبر، تنبيهات عند الحاجة، ورؤية أفضل للحالة.",
          en: "More reassurance, timely notifications, and better visibility into patient status.",
        },
      },
      {
        id: "doctors",
        title: { ar: "للأطباء", en: "For Doctors" },
        description: {
          ar: "بيانات منظمة، تقارير أذكى، ومتابعة ممتدة خارج الزيارة التقليدية.",
          en: "Structured data, smarter reports, and continuity beyond the traditional visit.",
        },
      },
      {
        id: "institutions",
        title: {
          ar: "للمستشفيات والمنشآت الصحية",
          en: "For Hospitals & Healthcare Institutions",
        },
        description: {
          ar: "منصة SaaS لإدارة الحالات، التحليلات، ودعم برامج المتابعة السريرية.",
          en: "A SaaS platform for case management, analytics, and extended clinical monitoring programs.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Core value propositions
  // -------------------------------------------------------------------------
  valuePropositions: {
    title: { ar: "القيم الأساسية", en: "Core Value Propositions" },
    items: [
      {
        id: "continuousMonitoring",
        title: { ar: "المراقبة المستمرة", en: "Continuous Monitoring" },
        description: {
          ar: "متابعة المؤشرات الحيوية والأنماط المرتبطة بالحالة على مدار الوقت.",
          en: "Track vital signs and condition-related patterns over time.",
        },
      },
      {
        id: "earlyAlerts",
        title: { ar: "التنبيهات المبكرة", en: "Early Alerts" },
        description: {
          ar: "إشعارات ذكية تساعد على الانتباه قبل تصاعد الخطر.",
          en: "Smart notifications that help identify risk before it escalates.",
        },
      },
      {
        id: "medicalReporting",
        title: { ar: "التقارير الطبية", en: "Medical Reporting" },
        description: {
          ar: "ملخصات ورؤى منظمة تساعد في المتابعة واتخاذ القرار.",
          en: "Organized summaries and insights that support follow-up and decision-making.",
        },
      },
      {
        id: "privacyAndDignity",
        title: { ar: "الخصوصية والكرامة", en: "Privacy & Dignity" },
        description: {
          ar: "تجربة إنسانية تحترم خصوصية المريض وتضع كرامته في المقام الأول.",
          en: "A human-centered experience that protects privacy and puts dignity first.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Product suite
  // -------------------------------------------------------------------------
  productSuite: {
    title: { ar: "منظومة المنتج", en: "Product Suite" },
    products: [
      {
        id: "watch",
        order: 1,
        name: {
          ar: "ساعة AZRI الذكية",
          en: "AZRI Smart Watch Experience",
        },
        description: {
          ar: "مراقبة متقدمة للإشارات الحيوية، وتنبيهات ذكية مبكرة، وتجربة سهلة ترافق المريض في حياته اليومية.",
          en: "Advanced vital-sign monitoring, intelligent early alerts, and a simple experience that stays with the patient throughout daily life.",
        },
      },
      {
        id: "patientApp",
        order: 2,
        name: {
          ar: "تطبيق AZRI للمريض",
          en: "AZRI Patient App",
        },
        description: {
          ar: "لوحة بسيطة وواضحة لعرض الحالة، التنبيهات، سجل المتابعة، وإمكانية التواصل السريع عند الحاجة.",
          en: "A clear and simple dashboard for status, alerts, monitoring history, and fast communication when needed.",
        },
      },
      {
        id: "doctorDashboard",
        order: 3,
        name: { ar: "لوحة الطبيب", en: "Doctor Dashboard" },
        description: {
          ar: "متابعة أكثر عمقًا للحالات، تقارير منظمة، عرض للتغيرات والأنماط، وأدوات تساعد في الرؤية السريرية.",
          en: "Deeper case visibility, organized reports, trend tracking, and tools that support clinical understanding.",
        },
      },
      {
        id: "institutionalPlatform",
        order: 4,
        name: {
          ar: "منصة المنشآت الصحية",
          en: "Institutional Platform",
        },
        description: {
          ar: "حل SaaS للمستشفيات وشركات التأمين والبرامج الصحية، يدعم إدارة أعداد أكبر من الحالات، والتحليلات، والتكاملات المؤسسية.",
          en: "A SaaS solution for hospitals, insurers, and health programs, supporting larger-scale case management, analytics, and enterprise integrations.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // How it works
  // -------------------------------------------------------------------------
  howItWorks: {
    title: { ar: "كيف تعمل أزري", en: "How It Works" },
    steps: [
      {
        id: "dataCollection",
        order: 1,
        title: { ar: "جمع البيانات", en: "Data Collection" },
        description: {
          ar: "تلتقط AZRI البيانات من الساعة الذكية والأجهزة الصحية المتصلة بطريقة سلسة وآمنة.",
          en: "AZRI collects data from the smart watch and connected health devices in a secure and seamless way.",
        },
      },
      {
        id: "intelligentAnalysis",
        order: 2,
        title: { ar: "التحليل الذكي", en: "Intelligent Analysis" },
        description: {
          ar: "يتم تحليل المؤشرات الحيوية والأنماط مثل التوتر والنوم والتغيرات المتكررة لفهم الحالة بشكل أفضل.",
          en: "Vital signals and patterns such as stress, sleep, and recurring changes are analyzed to better understand the condition.",
        },
      },
      {
        id: "earlyAlerting",
        order: 3,
        title: { ar: "التنبيه المبكر", en: "Early Alerting" },
        description: {
          ar: "عند رصد مؤشرات تستدعي الانتباه، يتم إرسال تنبيهات مبكرة وهادئة إلى الجهات المناسبة.",
          en: "When attention-worthy signals are detected, AZRI issues calm, timely early alerts to the right people.",
        },
      },
      {
        id: "reportingAndFollowUp",
        order: 4,
        title: {
          ar: "التقارير والمتابعة",
          en: "Reporting & Follow-Up",
        },
        description: {
          ar: "تُعرض البيانات بشكل منظم يساعد المرضى والأسر والأطباء على المتابعة واتخاذ قرارات أكثر وضوحًا.",
          en: "Data is presented in an organized way that helps patients, families, and doctors follow up with greater clarity.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Apple Watch
  // -------------------------------------------------------------------------
  appleWatch: {
    title: {
      ar: "جاهزة للعمل مع Apple Watch",
      en: "Ready for Apple Watch",
    },
    description: {
      ar: "AZRI مصممة للاستفادة من تجربة الأجهزة القابلة للارتداء، مع جاهزية للعمل مع Apple Watch وتكامل HealthKit، لتقديم متابعة أكثر سهولة ومرونة دون تعقيد إضافي.",
      en: "AZRI is designed to take advantage of wearable experiences, with readiness for Apple Watch and HealthKit integration—making monitoring more seamless and accessible without added complexity.",
    },
  },

  // -------------------------------------------------------------------------
  // Benefits (per audience)
  // -------------------------------------------------------------------------
  benefits: {
    title: { ar: "الفوائد", en: "Benefits" },
    groups: [
      {
        audienceId: "patients",
        title: { ar: "للمريض", en: "For the Patient" },
        bullets: {
          ar: [
            "شعور أعلى بالأمان والاطمئنان",
            "تجربة متابعة أقل تعقيدًا",
            "رؤية أوضح للحالة اليومية",
          ],
          en: [
            "Greater confidence and reassurance",
            "A simpler monitoring experience",
            "Better daily visibility",
          ],
        },
      },
      {
        audienceId: "families",
        title: { ar: "للأسرة", en: "For the Family" },
        bullets: {
          ar: [
            "تنبيهات ومتابعة أفضل",
            "تقليل القلق الناتج عن غياب الرؤية",
            "تحسين سرعة الاستجابة عند الحاجة",
          ],
          en: [
            "Better alerts and follow-up",
            "Reduced anxiety caused by uncertainty",
            "Faster response when needed",
          ],
        },
      },
      {
        audienceId: "doctors",
        title: { ar: "للطبيب", en: "For the Doctor" },
        bullets: {
          ar: [
            "بيانات أوضح ومنظمة",
            "متابعة ممتدة بين الزيارات",
            "دعم أفضل لتقييم الحالة",
          ],
          en: [
            "Clearer, more structured data",
            "Continuity between visits",
            "Better support for case evaluation",
          ],
        },
      },
      {
        audienceId: "institutions",
        title: { ar: "للمنشأة", en: "For the Institution" },
        bullets: {
          ar: [
            "إدارة حالات بشكل أكثر كفاءة",
            "إمكانيات تحليل ومتابعة أوسع",
            "قابلية للتوسع والتكامل المؤسسي",
          ],
          en: [
            "More efficient case management",
            "Broader analytics and monitoring capabilities",
            "Scalable enterprise integration potential",
          ],
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Pricing
  // -------------------------------------------------------------------------
  pricing: {
    title: { ar: "الباقات والأسعار", en: "Plans & Pricing" },
    lead: {
      ar: "اختر الباقة التي تناسب احتياجك",
      en: "Choose the plan that fits your needs",
    },
    plans: [
      {
        id: "basic",
        name: { ar: "Basic", en: "Basic" },
        price: { ar: "9$", en: "$9" },
        cadence: { ar: "/شهريًا", en: "/month" },
        tagline: {
          ar: "للمتابعة الأساسية واليومية",
          en: "For essential daily monitoring",
        },
        features: {
          ar: [
            "مراقبة العلامات الحيوية",
            "تنبيهات للأنماط غير الطبيعية",
            "ملخص صحي يومي",
            "تخزين آمن للبيانات",
          ],
          en: [
            "Vital-sign monitoring",
            "Abnormal-pattern alerts",
            "Daily health summary",
            "Secure data storage",
          ],
        },
      },
      {
        id: "advanced",
        name: { ar: "Advanced", en: "Advanced" },
        price: { ar: "19$", en: "$19" },
        cadence: { ar: "/شهريًا", en: "/month" },
        tagline: {
          ar: "لحماية ومتابعة أكثر تقدمًا",
          en: "For more advanced protection and follow-up",
        },
        highlighted: true,
        features: {
          ar: [
            "تنبؤ مبكر بالمخاطر",
            "تنبيهات SOS للمشرفين أو ذوي المريض",
            "تقارير طبية جاهزة",
            "خطوط أساس مخصصة لكل حالة",
          ],
          en: [
            "Early risk prediction",
            "SOS alerts for caregivers/supervisors",
            "Ready medical reports",
            "Custom baselines per case",
          ],
        },
      },
      {
        id: "insuranceDoctors",
        name: {
          ar: "Insurance / Doctors",
          en: "Insurance / Doctors",
        },
        price: { ar: "49$", en: "$49" },
        cadence: { ar: "/شهريًا", en: "/month" },
        tagline: {
          ar: "للأطباء والجهات ذات المتابعة المهنية",
          en: "For doctors and professional care teams",
        },
        features: {
          ar: [
            "لوحة تحكم للطبيب",
            "تحليلات طويلة المدى",
            "دعم لسيناريوهات التأمين",
            "مراقبة المرضى عن بُعد",
          ],
          en: [
            "Doctor dashboard",
            "Long-term analytics",
            "Insurance-oriented workflows",
            "Remote patient monitoring",
          ],
        },
      },
      {
        id: "enterprise",
        name: { ar: "Enterprise", en: "Enterprise" },
        price: { ar: "سعر مخصص", en: "Custom Pricing" },
        tagline: {
          ar: "للمستشفيات والمنشآت والبرامج الصحية",
          en: "For hospitals, institutions, and care programs",
        },
        features: {
          ar: [
            "منصة SaaS كاملة",
            "تكامل مع EHR / HIS",
            "تحليلات سكانية",
            "دعم مخصص 24/7",
          ],
          en: [
            "Full SaaS platform",
            "EHR / HIS integration",
            "Population analytics",
            "24/7 custom support",
          ],
        },
      },
    ],
    note: {
      ar: "هذه الباقات والأسعار مبنية على ما هو ظاهر حاليًا في المحتوى العام للموقع.",
      en: "These plans and prices reflect what is currently presented in the public site content.",
    },
    ctas: [
      {
        id: "getStarted",
        intent: "primary",
        label: { ar: "ابدأ الآن", en: "Get Started" },
      },
      {
        id: "requestInstitutionalDemo",
        intent: "secondary",
        label: {
          ar: "اطلب عرضًا للمنشآت",
          en: "Request an Institutional Demo",
        },
      },
      {
        id: "talkToTeam",
        intent: "tertiary",
        label: { ar: "تحدث مع الفريق", en: "Talk to the Team" },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Trust & Responsibility
  // -------------------------------------------------------------------------
  trustAndResponsibility: {
    title: {
      ar: "تقنية إنسانية بمسؤولية",
      en: "Human-Centered Technology, Responsibly Built",
    },
    body: {
      ar: "AZRI تهدف إلى دعم الرعاية والمتابعة المبكرة، وتقديم مؤشرات وتنبيهات وتقارير تساعد المرضى وذويهم والأطباء. لا تُغني المنصة عن التقييم الطبي أو الرعاية الطارئة عند الحاجة، لكنها توفر طبقة ذكية داعمة للمتابعة والاطمئنان.",
      en: "AZRI is designed to support care, early awareness, and follow-up through helpful signals, alerts, and reports for patients, families, and doctors. The platform does not replace medical evaluation or emergency care when needed, but adds an intelligent support layer for monitoring and reassurance.",
    },
  },

  // -------------------------------------------------------------------------
  // Final CTA
  // -------------------------------------------------------------------------
  finalCTA: {
    title: {
      ar: "ابدأ رحلة أكثر اطمئنانًا مع AZRI",
      en: "Start a More Reassuring Care Journey with AZRI",
    },
    body: {
      ar: "سواء كنت مريضًا، من ذوي المريض، طبيبًا، أو منشأة صحية، فإن AZRI تمنحك تجربة أكثر ذكاءً وإنسانية في المتابعة.",
      en: "Whether you are a patient, family member, doctor, or healthcare institution, AZRI gives you a smarter and more human approach to monitoring and care.",
    },
    ctas: [
      {
        id: "getStarted",
        intent: "primary",
        label: { ar: "ابدأ الآن", en: "Get Started" },
      },
      {
        id: "requestTrial",
        intent: "secondary",
        label: { ar: "اطلب تجربة", en: "Request a Trial" },
      },
      {
        id: "bookInstitutionalDemo",
        intent: "tertiary",
        label: {
          ar: "احجز عرضًا للمنشآت",
          en: "Book an Institutional Demo",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // About page
  // -------------------------------------------------------------------------
  aboutPage: {
    title: { ar: "من نحن", en: "About AZRI" },
    intro: {
      ar: "AZRI هي منصة صحية ذكية تنطلق من فكرة بسيطة وعميقة: الرعاية الحقيقية تبدأ بحفظ الكرامة قبل العلاج.",
      en: "AZRI is a health technology platform built around one simple but profound belief: Real care begins by preserving dignity before treatment.",
    },
    body: {
      ar: "نطوّر تجربة متكاملة تشمل المنصة والتطبيق والساعة الذكية، بهدف دعم مرضى الصرع والحالات الخاصة، ومساندة ذويهم، وتمكين الأطباء والمنشآت الصحية من متابعة أفضل وأكثر استباقية.",
      en: "We are building an integrated experience across platform, app, and smart watch workflows to support epilepsy patients and special-condition care, while helping families, doctors, and healthcare institutions achieve more proactive and connected follow-up.",
    },
    focusAreasIntro: {
      ar: "نؤمن أن الذكاء الاصطناعي يجب أن يُستخدم بطريقة إنسانية، واضحة، ومسؤولة. لذلك نركز على:",
      en: "We believe AI should be used in a way that is human, transparent, and responsible. That is why we focus on:",
    },
    focusAreas: {
      ar: [
        "التنبيه المبكر",
        "الفهم الأوضح للحالة",
        "تحسين التواصل بين الأطراف",
        "الحفاظ على الخصوصية",
        "تقديم تجربة قابلة للتوسع للمريض والمنشأة",
      ],
      en: [
        "early awareness",
        "better condition visibility",
        "stronger coordination between stakeholders",
        "privacy protection",
        "scalable patient and institutional experiences",
      ],
    },
    mission: {
      title: { ar: "رسالتنا", en: "Our Mission" },
      body: {
        ar: "تمكين المرضى والأسر والأطباء من الوقاية المبكرة، والحماية، والتدخل الذكي باستخدام ذكاء اصطناعي إنساني.",
        en: "To empower patients, families, and physicians through early prevention, protection, and humane AI-assisted intervention.",
      },
    },
    vision: {
      title: { ar: "رؤيتنا", en: "Our Vision" },
      body: {
        ar: "عالم تُدار فيه النوبات والحالات الخاصة ببصيرة وكرامة، بدل المفاجأة والخوف.",
        en: "A world where seizures and special conditions are managed with insight and dignity instead of fear and surprise.",
      },
    },
    values: {
      title: { ar: "قيمنا", en: "Our Values" },
      items: {
        ar: [
          "الإنسانية أولًا",
          "الكرامة والخصوصية",
          "البساطة والوضوح",
          "الاعتمادية والثقة",
          "الابتكار المسؤول",
        ],
        en: [
          "Humanity First",
          "Dignity & Privacy",
          "Simplicity & Clarity",
          "Reliability & Trust",
          "Responsible Innovation",
        ],
      },
    },
  },

  // -------------------------------------------------------------------------
  // Solutions page
  // -------------------------------------------------------------------------
  solutionsPage: {
    title: { ar: "حلول AZRI", en: "AZRI Solutions" },
    segments: [
      {
        id: "patients",
        title: { ar: "للأفراد والمرضى", en: "For Individuals & Patients" },
        description: {
          ar: "تجربة متابعة صحية يومية تساعد على فهم الحالة بشكل أفضل من خلال البيانات والتنبيهات والتقارير.",
          en: "A daily health-monitoring experience that helps users better understand their condition through data, alerts, and reports.",
        },
      },
      {
        id: "families",
        title: {
          ar: "لذوي المرضى ومقدمي الرعاية",
          en: "For Families & Caregivers",
        },
        description: {
          ar: "رؤية أوضح، تنبيهات أسرع، وإمكانية متابعة الحالة بثقة أكبر.",
          en: "Clearer visibility, faster alerts, and more confidence in following the patient's status.",
        },
      },
      {
        id: "doctors",
        title: { ar: "للأطباء", en: "For Doctors" },
        description: {
          ar: "لوحة مخصصة لعرض المعلومات الطبية بصورة منظمة، مع تقارير وتحليلات تساعد في المتابعة.",
          en: "A dedicated dashboard that presents medical information in an organized way, with reports and analytics that support follow-up.",
        },
      },
      {
        id: "institutions",
        title: {
          ar: "للمستشفيات والمنشآت الصحية",
          en: "For Hospitals & Healthcare Institutions",
        },
        description: {
          ar: "حل مؤسسي مرن يدعم إدارة الحالات، التحليلات، والتكاملات التقنية على مستوى أوسع.",
          en: "A flexible enterprise solution for case management, analytics, and broader technical integrations.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Patients & Families page
  // -------------------------------------------------------------------------
  patientsFamiliesPage: {
    title: {
      ar: "حياة يومية أكثر هدوءًا وثقة",
      en: "A Daily Experience with More Calm and Confidence",
    },
    intro: {
      ar: "AZRI صُممت لتكون سهلة وواضحة ومطمئنة. من خلال التنبيهات الذكية وسجل المتابعة والبيانات المنظمة، يمكن للمريض وذويه البقاء على اطلاع أفضل بالحالة.",
      en: "AZRI is designed to be simple, clear, and reassuring. Through smart alerts, monitoring history, and organized data, patients and families can stay better informed about the condition.",
    },
    benefitsTitle: { ar: "أهم المزايا", en: "Key Benefits" },
    benefits: {
      ar: [
        "متابعة مستمرة للحالة",
        "تنبيهات مبكرة عند الحاجة",
        "إشعارات SOS",
        "سجل واضح للمتابعة",
        "مشاركة أسهل مع الطبيب",
        "تجربة تراعي الخصوصية والكرامة",
      ],
      en: [
        "Continuous condition monitoring",
        "Early alerts when needed",
        "SOS notifications",
        "Clear follow-up history",
        "Easier sharing with doctors",
        "A privacy- and dignity-centered experience",
      ],
    },
    supportLine: {
      title: { ar: "عبارة داعمة", en: "Support Line" },
      body: {
        ar: "لأن الاطمئنان لا يأتي من كثرة القلق، بل من وضوح الرؤية.",
        en: "Reassurance comes not from more worry, but from better visibility.",
      },
    },
  },

  // -------------------------------------------------------------------------
  // Doctors page
  // -------------------------------------------------------------------------
  doctorsPage: {
    title: {
      ar: "رؤية سريرية أوضح، ووقت أكثر لما يهم",
      en: "Clearer Clinical Visibility, More Time for What Matters",
    },
    intro: {
      ar: "تقدم AZRI للأطباء لوحة تحكم تساعد على متابعة الحالات بصورة منظمة، مع عرض للاتجاهات والتغيرات والتقارير بما يدعم الرؤية الطبية والمتابعة الممتدة.",
      en: "AZRI provides doctors with a dashboard designed to support structured case follow-up, with trend views, change patterns, and reporting that enhance medical visibility and continuity.",
    },
    benefitsTitle: { ar: "فوائد للطبيب", en: "Doctor Benefits" },
    benefits: {
      ar: [
        "لوحة متابعة للحالات",
        "تقارير منظمة وسريعة القراءة",
        "عرض للتغيرات والأنماط",
        "دعم المتابعة عن بُعد",
        "تحسين التواصل مع المريض وذويه",
      ],
      en: [
        "Case monitoring dashboard",
        "Organized, readable reports",
        "Trend and pattern visibility",
        "Remote monitoring support",
        "Better coordination with patients and families",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // Institutions page
  // -------------------------------------------------------------------------
  institutionsPage: {
    title: {
      ar: "منصة مؤسسية قابلة للتوسع",
      en: "A Scalable Institutional Platform",
    },
    intro: {
      ar: "AZRI تدعم المستشفيات والمنشآت والبرامج الصحية بحل SaaS يساعد على إدارة الحالات، دعم المتابعة عن بُعد، وتحسين الرؤية التشغيلية والتحليلية.",
      en: "AZRI supports hospitals, institutions, and healthcare programs through a SaaS solution that helps manage cases, extend remote monitoring, and improve operational and analytical visibility.",
    },
    capabilitiesTitle: {
      ar: "لمنشأتك يمكن لـ AZRI أن تدعم:",
      en: "AZRI can help your organization with:",
    },
    capabilities: {
      ar: [
        "إدارة أعداد أكبر من الحالات",
        "برامج متابعة صحية أكثر تنظيمًا",
        "تحليلات وتقارير على مستوى أوسع",
        "تكاملات مؤسسية",
        "تجربة أكثر احترافية للفرق الطبية والإدارية",
      ],
      en: [
        "Managing larger patient populations",
        "Structuring remote care programs",
        "Broader analytics and reporting",
        "Enterprise integrations",
        "A more professional workflow for medical and administrative teams",
      ],
    },
    cta: {
      id: "bookInstitutionalDemo",
      intent: "primary",
      label: {
        ar: "احجز عرضًا مخصصًا لمنشأتك.",
        en: "Book a tailored institutional demo.",
      },
    },
  },

  // -------------------------------------------------------------------------
  // Technology page
  // -------------------------------------------------------------------------
  technologyPage: {
    title: {
      ar: "تقنية ذكية… بتجربة إنسانية",
      en: "Intelligent Technology with a Human Experience",
    },
    intro: {
      ar: "تعتمد AZRI على جمع البيانات من الأجهزة القابلة للارتداء والأجهزة الصحية المتصلة، ثم تحليلها لاكتشاف الأنماط المهمة وإرسال تنبيهات مبكرة وتقديم تقارير واضحة.",
      en: "AZRI combines data collection from wearables and connected health devices with intelligent analysis to identify meaningful patterns, generate early alerts, and produce clear reports.",
    },
    highlightsTitle: {
      ar: "ما الذي يميز التقنية؟",
      en: "What Makes the Technology Different",
    },
    highlights: {
      ar: [
        "بنية تدعم المراقبة المستمرة",
        "تحليل للأنماط والتغيرات",
        "تنبيهات مبكرة ذكية",
        "تجربة استخدام بسيطة",
        "قابلية للتكامل والتوسع",
        "اهتمام مرتفع بالخصوصية وأمن البيانات",
      ],
      en: [
        "Continuous monitoring support",
        "Pattern and change analysis",
        "Intelligent early alerts",
        "Simple user experience",
        "Scalable integration readiness",
        "Strong focus on privacy and data security",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // FAQ page
  // -------------------------------------------------------------------------
  faqPage: {
    title: { ar: "الأسئلة الشائعة", en: "FAQ" },
    items: [
      {
        id: "whatIsAzri",
        question: { ar: "ما هي AZRI؟", en: "What is AZRI?" },
        answer: {
          ar: "AZRI منصة وتطبيق وتجربة ساعة ذكية تساعد على متابعة مرضى الصرع والحالات الخاصة من خلال المراقبة والتنبيهات والتقارير.",
          en: "AZRI is a platform, app, and smart-watch experience that supports epilepsy and special-condition monitoring through tracking, alerts, and reporting.",
        },
      },
      {
        id: "whoBenefits",
        question: {
          ar: "من يستفيد من AZRI؟",
          en: "Who is AZRI for?",
        },
        answer: {
          ar: "المرضى، ذووهم، الأطباء، والمستشفيات والمنشآت الصحية.",
          en: "Patients, families, doctors, hospitals, and healthcare institutions.",
        },
      },
      {
        id: "doctorReplacement",
        question: {
          ar: "هل AZRI بديل عن الطبيب؟",
          en: "Is AZRI a replacement for a doctor?",
        },
        answer: {
          ar: "لا. AZRI تدعم المتابعة والوعي المبكر، لكنها لا تُغني عن الرعاية الطبية أو الطوارئ عند الحاجة.",
          en: "No. AZRI supports monitoring and early awareness, but it does not replace medical care or emergency services when needed.",
        },
      },
      {
        id: "wearables",
        question: {
          ar: "هل تدعم AZRI الأجهزة القابلة للارتداء؟",
          en: "Does AZRI support wearables?",
        },
        answer: {
          ar: "نعم، يتم تقديم AZRI كحل جاهز للعمل مع Apple Watch ومع تكامل HealthKit.",
          en: "Yes. AZRI is publicly presented as ready for Apple Watch and HealthKit integration.",
        },
      },
      {
        id: "institutionalUse",
        question: {
          ar: "هل يمكن استخدامها في المنشآت الصحية؟",
          en: "Can it be used by healthcare institutions?",
        },
        answer: {
          ar: "نعم، تقدم AZRI منصة SaaS للمستشفيات والمنشآت والبرامج الصحية.",
          en: "Yes. AZRI publicly presents an institutional SaaS offering for hospitals and healthcare programs.",
        },
      },
      {
        id: "bilingual",
        question: {
          ar: "هل تدعم AZRI اللغة العربية والإنجليزية؟",
          en: "Is AZRI bilingual?",
        },
        answer: {
          ar: "نعم، يجب أن تكون التجربة ثنائية اللغة ومصممة لاحتياجات المنطقة.",
          en: "Yes. The experience should be designed for both Arabic and English users.",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Contact page
  // -------------------------------------------------------------------------
  contactPage: {
    title: { ar: "تواصل مع AZRI", en: "Contact AZRI" },
    intro: {
      ar: "نحن هنا للإجابة على أسئلتكم، ومناقشة احتياجات المرضى والأطباء والمنشآت الصحية، واستعراض فرص التعاون والتجربة.",
      en: "We are here to answer your questions, discuss patient, doctor, and institutional needs, and explore demos and collaboration opportunities.",
    },
    details: {
      address: {
        label: { ar: "العنوان", en: "Location" },
        value: {
          ar: "الرياض، المملكة العربية السعودية",
          en: "Riyadh, Saudi Arabia",
        },
      },
      phone: {
        label: { ar: "الهاتف", en: "Phone" },
        value: "+966 555 584 191",
      },
      email: {
        label: { ar: "البريد الإلكتروني", en: "Email" },
        value: "info@azri.ai",
      },
    },
    ctas: [
      {
        id: "bookDemo",
        intent: "primary",
        label: { ar: "احجز عرضًا", en: "Book a Demo" },
      },
      {
        id: "contactTeam",
        intent: "secondary",
        label: { ar: "تواصل مع الفريق", en: "Contact the Team" },
      },
      {
        id: "requestTrial",
        intent: "tertiary",
        label: { ar: "اطلب تجربة", en: "Request a Trial" },
      },
    ],
    note: {
      ar: "بيانات التواصل أعلاه مبنية على ما هو ظاهر علنًا في المحتوى الحالي.",
      en: "The contact details above are based on what is publicly presented in current content.",
    },
  },

  // -------------------------------------------------------------------------
  // UI microcopy (shared between web and app)
  // -------------------------------------------------------------------------
  uiMicrocopy: {
    labels: {
      getStarted: { ar: "ابدأ الآن", en: "Get Started" },
      requestDemo: { ar: "اطلب عرضًا", en: "Request a Demo" },
      forDoctors: { ar: "للأطباء", en: "For Doctors" },
      forInstitutions: { ar: "للمنشآت", en: "For Institutions" },
      learnMore: { ar: "اعرف أكثر", en: "Learn More" },
      exploreFeatures: { ar: "شاهد المزايا", en: "Explore Features" },
      bookMeeting: { ar: "احجز اجتماعًا", en: "Book a Meeting" },
      contactUs: { ar: "تواصل معنا", en: "Contact Us" },
      myMonitoring: { ar: "متابعة حالتي", en: "My Monitoring" },
      viewReports: { ar: "عرض التقارير", en: "View Reports" },
      newAlert: { ar: "تنبيه جديد", en: "New Alert" },
      shareWithDoctor: {
        ar: "مشاركة مع الطبيب",
        en: "Share with Doctor",
      },
      backToHome: { ar: "رجوع للصفحة الرئيسية", en: "Back to Home" },
    },
  },

  // -------------------------------------------------------------------------
  // SEO
  // -------------------------------------------------------------------------
  seo: {
    defaultDescription: {
      ar: "AZRI منصة وتطبيق وساعة ذكية بذكاء اصطناعي إنساني لمتابعة مرضى الصرع والحالات الخاصة، مع تنبيهات مبكرة، تقارير ذكية، وتجربة تحفظ الخصوصية والكرامة.",
      en: "AZRI is a human-centered AI platform, app, and smart-watch experience for epilepsy and special-condition care, with early alerts, intelligent reports, and a privacy-first approach.",
    },
    pages: {
      home: {
        title: {
          ar: "AZRI | ذكاء اصطناعي بإنسانية لمتابعة مرضى الصرع والحالات الخاصة",
          en: "AZRI | AI with Humanity for Epilepsy and Special-Condition Care",
        },
      },
      about: {
        title: {
          ar: "من نحن | AZRI منصة صحية ذكية للمرضى وذويهم والأطباء والمنشآت",
          en: "About AZRI | A Human-Centered Health Platform for Patients, Families, Doctors, and Institutions",
        },
      },
      solutions: {
        title: {
          ar: "حلول AZRI | تطبيق، ساعة ذكية، ومنصة للمستشفيات والأطباء",
          en: "AZRI Solutions | App, Smart Watch Experience, and Platform for Doctors and Hospitals",
        },
      },
      contact: {
        title: {
          ar: "تواصل مع AZRI | احجز عرضًا أو اطلب تجربة",
          en: "Contact AZRI | Request a Demo or Get in Touch",
        },
      },
    },
  },

  // -------------------------------------------------------------------------
  // Footer
  // -------------------------------------------------------------------------
  footer: {
    brand: { ar: "AZRI", en: "AZRI" },
    tagline: {
      ar: "ذكاء اصطناعي بإنسانية",
      en: "AI with Humanity",
    },
    description: {
      ar: "منصة صحية ذكية لدعم مرضى الصرع والحالات الخاصة، وتمكين ذويهم والأطباء والمنشآت الصحية من متابعة أفضل وأكثر وضوحًا.",
      en: "A smart health platform supporting epilepsy and special-condition care for patients, families, doctors, and healthcare institutions.",
    },
    groups: [
      {
        id: "quickLinks",
        title: { ar: "روابط سريعة", en: "Quick Links" },
        links: [
          {
            id: "home",
            label: { ar: "الرئيسية", en: "Home" },
            href: "/",
          },
          {
            id: "about",
            label: { ar: "من نحن", en: "About" },
            href: "/about",
          },
          {
            id: "solutions",
            label: { ar: "الحلول", en: "Solutions" },
            href: "/solutions",
          },
          {
            id: "doctors",
            label: { ar: "للأطباء", en: "For Doctors" },
            href: "/doctors",
          },
          {
            id: "institutions",
            label: { ar: "للمنشآت", en: "For Institutions" },
            href: "/institutions",
          },
          {
            id: "pricing",
            label: { ar: "الأسعار", en: "Pricing" },
            href: "/pricing",
          },
          {
            id: "faq",
            label: { ar: "الأسئلة الشائعة", en: "FAQ" },
            href: "/faq",
          },
          {
            id: "contact",
            label: { ar: "تواصل معنا", en: "Contact" },
            href: "/contact",
          },
        ],
      },
      {
        id: "legal",
        title: { ar: "قانوني", en: "Legal" },
        links: [
          {
            id: "privacy",
            label: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
            href: "/legal/privacy",
          },
          {
            id: "terms",
            label: { ar: "الشروط والأحكام", en: "Terms of Service" },
            href: "/legal/terms",
          },
          {
            id: "medicalDisclaimer",
            label: {
              ar: "إخلاء المسؤولية الطبية",
              en: "Medical Disclaimer",
            },
            href: "/legal/medical-disclaimer",
          },
        ],
      },
    ],
    contact: {
      title: { ar: "التواصل", en: "Contact" },
      address: {
        ar: "الرياض، السعودية",
        en: "Riyadh, Saudi Arabia",
      },
      email: "info@azri.ai",
      phone: "+966 555 584 191",
    },
  },

  // -------------------------------------------------------------------------
  // Medical disclaimer
  // -------------------------------------------------------------------------
  medicalDisclaimer: {
    title: { ar: "إخلاء مسؤولية", en: "Medical Disclaimer" },
    body: {
      ar: "AZRI منصة داعمة للمتابعة والتوعية المبكرة، ولا تُعد بديلًا عن الطبيب أو التشخيص أو الرعاية الطارئة. في الحالات الطبية الطارئة، يجب التواصل فورًا مع الجهات الطبية المختصة أو خدمات الطوارئ.",
      en: "AZRI is a support platform for monitoring and early awareness. It is not a substitute for a physician, diagnosis, or emergency medical care. In urgent situations, users should contact qualified medical professionals or emergency services immediately.",
    },
  },

  // -------------------------------------------------------------------------
  // Brand message
  // -------------------------------------------------------------------------
  brandMessage: {
    body: {
      ar: "AZRI ليست مجرد تقنية صحية. إنها تجربة صُممت لتجعل الرعاية أكثر إنسانية، والبيانات أكثر فائدة، والمتابعة أكثر طمأنينة.",
      en: "AZRI is more than health technology. It is an experience designed to make care more human, data more useful, and monitoring more reassuring.",
    },
  },

  // -------------------------------------------------------------------------
  // Sitemap
  // -------------------------------------------------------------------------
  sitemap: {
    entries: [
      { id: "home", label: { ar: "الرئيسية", en: "Home" }, href: "/" },
      { id: "about", label: { ar: "من نحن", en: "About" }, href: "/about" },
      {
        id: "solutions",
        label: { ar: "الحلول", en: "Solutions" },
        href: "/solutions",
      },
      {
        id: "patientsFamilies",
        label: {
          ar: "للمرضى وذويهم",
          en: "For Patients & Families",
        },
        href: "/patients-families",
      },
      {
        id: "doctors",
        label: { ar: "للأطباء", en: "For Doctors" },
        href: "/doctors",
      },
      {
        id: "institutions",
        label: {
          ar: "للمنشآت الصحية",
          en: "For Institutions",
        },
        href: "/institutions",
      },
      {
        id: "technology",
        label: { ar: "التقنية", en: "Technology" },
        href: "/technology",
      },
      {
        id: "pricing",
        label: { ar: "الأسعار", en: "Pricing" },
        href: "/pricing",
      },
      {
        id: "faq",
        label: { ar: "الأسئلة الشائعة", en: "FAQ" },
        href: "/faq",
      },
      {
        id: "contact",
        label: { ar: "تواصل معنا", en: "Contact" },
        href: "/contact",
      },
      {
        id: "privacy",
        label: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
        href: "/legal/privacy",
      },
      {
        id: "terms",
        label: { ar: "الشروط والأحكام", en: "Terms of Service" },
        href: "/legal/terms",
      },
      {
        id: "medicalDisclaimer",
        label: {
          ar: "إخلاء المسؤولية الطبية",
          en: "Medical Disclaimer",
        },
        href: "/legal/medical-disclaimer",
      },
    ],
  },
} as const;

export default azriContent;
