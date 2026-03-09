export const curriculumPoints = [
  {
    title: "Qur'an Memorization",
    desc: "Memorize with correct recitation (Tajweed) and proper understanding",
  },
  {
    title: "Tafsir",
    desc: "Understanding meanings through structured study of Qur'anic interpretation",
  },
  {
    title: "Arabic Language",
    desc: "Language skills to facilitate comprehension of the Qur'an",
  },
  {
    title: "Islamic Knowledge & Ethics",
    desc: "Practical life guidance rooted in the Qur'an and Sunnah",
  },
  {
    title: "Daily Application",
    desc: "Applying lessons in daily life, grounded in correct Islamic creed (Aqeedah)",
  },
];

export const faqs = [
  {
    id: 'faq-1',
    question: 'Who can join?',
    answer:
      'Females of all ages! We have courses designed specifically for different age groups, plus special programs for unique learning needs.',
  },
  {
    id: 'faq-2',
    question: 'Do I need prior experience?',
    answer:
      'No! Beginners and advanced learners are welcome. Our guidance covers Qur\'an memorization, understanding, and Arabic lessons.',
  },
  {
    id: 'faq-3',
    question: 'What courses do you offer?',
    answer:
      'We offer Age-Based Courses — structured programs tailored to different age groups focusing on Qur\'an memorization, Arabic, and Islamic knowledge — as well as Special Courses including The First Day (essential guidance for new Muslims), Qur\'an Memorization Techniques (practical strategies for easier retention), Ramadhan Reflection (lessons for spiritual growth), and Islamic Marriage Guidance (understanding the sacred bond).',
  },
  {
    id: 'faq-4',
    question: 'Can I learn online?',
    answer:
      'Yes! Some courses are online or pre-recorded, so you can study from anywhere.',
  },
  {
    id: 'faq-5',
    question: 'How do I enroll?',
    answer:
      'Visit our website or contact the institute for schedules, enrollment, and course details. Start your journey today — let the Qur\'an guide you!',
  },
]

// ── NEW CONTENT BELOW ──

export const PROGRAM_TYPES = [
  {
    key: "onsite",
    title: "Onsite Program",
    subtitle: "Ibadan Madrasah",
    emoji: "🏫",
    image: "/onsite.jpg",
    description:
      "A structured full curriculum with supervised classes on weekdays and weekends. Hostel accommodation is available for eligible students.",
    highlights: [
      "Supervised weekday & weekend classes",
      "Full curriculum structure",
      "Hostel accommodation available",
      "In-person interaction with teachers",
    ],
    href: "Programs/onsite",
  },
  {
    key: "online",
    title: "Online Program",
    subtitle: "Learn From Anywhere",
    emoji: "💻",
    image: "/online.jpg",
    description:
      "Flexible, well-organized learning with full programs or individual subjects, live and pre-recorded lessons, one-on-one interaction, and continuous assessments.",
    highlights: [
      "Full programs or individual subjects",
      "Live & pre-recorded lessons",
      "One-on-one interaction",
      "Continuous assessments",
    ],
    href: "Programs/online",
  },
];

export const ONLINE_AGE_GROUPS = [
  {
    key: "kiddies",
    label: "Kiddies",
    ages: "5–7",
    emoji: "🌟",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    intro:
      "An introductory stage where young learners develop basic reading skills, simple Qur'an recitation, and foundational Islamic knowledge in a gentle and engaging manner.",
    subjects: [
      { name: "Basic Qur'an Recitation", detail: "Short surahs & Juz Amma" },
      { name: "Beginner Tajweed", detail: "Simple pronunciation rules" },
      {
        name: "Arabic Foundation",
        detail: "Reading alphabet & spelling words, Qo'idah",
      },
      { name: "Islamic Studies", detail: "Adkar, Tawheed and manners" },
    ],
    options: [
      "Full Program (All 4 subjects)",
      "Individual Subjects (Pick 1–3 subjects)",
    ],
    format: [
      "Flexible online class 3x a week",
      "One-on-one session available",
      "Assessments and tests",
      "Parental guidance encouraged",
    ],
    assessment: [],
    notes: [],
  },
  {
    key: "children",
    label: "Children Learning Program",
    ages: "8–12",
    agesDetail: "8–12",
    emoji: "📖",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    intro:
      "Designed for children ready to progress from the Kiddies level, focusing on improved Qur'an recitation and memorization, Tajweed, Arabic reading, and Islamic knowledge.",
    subjects: [
      {
        name: "Qur'an Memorization / Recitation",
        detail: "Selected surahs, revision, and fluency improvement",
      },
      {
        name: "Tajweed",
        detail: "Pronunciation rules and practical application",
      },
      {
        name: "Arabic",
        detail: "Daily communication skills, reading, and writing",
      },
      {
        name: "Islamic Studies",
        detail: "Adkar, Tawheed, and basic manners",
      },
    ],
    options: [
      "Full Program (All 4 subjects)",
      "Individual Subjects (Pick any 1–3 subjects)",
    ],
    format: [
      "Flexible online classes 2–3x weekly",
      "Small group & one-on-one sessions",
      "Structured lesson plan with progressive levels",
    ],
    assessment: [
      "Weekly recitation checks and periodic tests",
      "Memorization/revision evaluations",
      "Certificate awarded at completion",
    ],
    notes: [],
  },
  {
    key: "teens",
    label: "Teens Learning Program",
    ages: "13–17",
    agesDetail: "13–17",
    emoji: "📖",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    intro:
      "Designed for teenage sisters to strengthen Qur'an memorization, improve recitation, master Tajweed, and build a solid foundation in Arabic and Islamic knowledge in a structured and engaging environment.",
    subjects: [
      {
        name: "Qur'an Memorization / Recitation",
        detail:
          "Based on individual Hifdh goals, with structured revision to maintain fluency and retention",
      },
      {
        name: "Tajweed",
        detail:
          "Correct pronunciation, articulation points (Makharij), and practical application of Tajweed rules",
      },
      {
        name: "Arabic",
        detail:
          "Reading and writing skills, Arabic vocabulary and comprehension to support Qur'an memorization and understanding",
      },
      {
        name: "Islamic Studies",
        detail:
          "Fiqh of Ibaadah (practical worship), Hadith studies, and Tafsir of selected Soorahs",
      },
    ],
    options: [
      "Full Program (All 4 subjects)",
      "Individual Subjects (Pick any 1–3 subjects)",
    ],
    format: [
      "Flexible online classes 2–3x weekly",
      "Small group & one-on-one sessions",
      "Video recording sessions: 1 video per week per subject, alternating weekly",
      "Structured lesson plan with progressive levels",
    ],
    assessment: [
      "Periodic memorization/revision checks to reinforce retention",
      "Regular tests on Qur'an recitation, Tajweed, Arabic, and Islamic Studies",
      "Certificate of Completion awarded upon successful completion",
    ],
    notes: [],
  },
  {
    key: "adults",
    label: "Adult Programme",
    ages: "18+",
    agesDetail: "Sisters & Mothers",
    emoji: "📖",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    intro:
      "Designed for sisters and mothers who want to memorize, revise, or improve Qur'an recitation, strengthen Tajweed, deepen Arabic understanding, and gain practical Islamic knowledge — all in a flexible and engaging online environment.",
    subjects: [
      {
        name: "Qur'an Memorization / Revision / Recitation",
        detail:
          "Focus on selected surahs, Juz Amma, or personal memorization goals; structured revision to retain what is learned; fluency and recitation improvement.",
      },
      {
        name: "Tajweed",
        detail:
          "Correct pronunciation, articulation points (Makharij), and practical application of Tajweed rules.",
      },
      {
        name: "Arabic (Durus Lughah Arabiyya Focus)",
        detail:
          "Reading & writing proficiency, learnm the fundamentals of Arabic Grammar (Nahw), build vocabulary, and pratice reading comprehension through passages with questions and answers.",
      },
      {
        name: "Islamic Studies",
        detail:
          "Fiqh of Ibaadah (practical worship), Hadith studies, Tafsir of selected Soorahs.",
      },
    ],
    options: [
      "Full Program (All 4 subjects)",
      "Individual Subjects (Pick any 1–3 subjects)",
    ],
    format: [
      "Flexible online classes, 2–3 times weekly",
      "One-on-one sessions available",
      "Small group interactive sessions",
      "Video recording sessions: 1 video per week per subject, alternating each week",
      "Structured lesson plan with progressive levels",
    ],
    assessment: [
      "Weekly recitation checks",
      "Monthly quizzes",
      "Periodic memorization/revision evaluation",
      "Certificate awarded upon successful completion",
    ],
    notes: [
      "Suitable for sisters and mothers of all ages",
      "Flexible scheduling options available",
      "Personalized learning goals discussed before enrollment",
    ],
  },
];

export const ARABIC_ONLINE_COURSE = {
  title: "Learn Arabic Online",
  arabicTitle: "Durus Lughatul Arabiyya",
  tagline:
    "A comprehensive beginner-to-intermediate Arabic course, fully online, designed for students who want to read, write, and understand Arabic confidently.",
  highlights: [
    { emoji: "📖", text: "Grammar & Vocabulary" },
    { emoji: "✍️", text: "Reading & Writing" },
    { emoji: "📜", text: "Lessons from the Holy Quran" },
    { emoji: "💬", text: "Practical Conversation" },
    {
      emoji: "🎥",
      text: "Pre-Recorded Lessons – Updated regularly for steady progress",
    },
    {
      emoji: "🖥️",
      text: "Live Class (Once a Month with Quiz) – Optional interactive session",
    },
    { emoji: "⏰", text: "Flexible Schedule – Learn anytime at your own pace" },
    { emoji: "✏️", text: "Assignments & Assessments" },
    { emoji: "✅", text: "Main Class – Students register individually" },
  ],
  fullDescription: `Welcome to Durus Lughatul Arabiyya, offered fully online by Gladtidings Institute for Quran Memorization and Islamic Studies for Females. This course follows the well-known Durus Lughatul Arabiyya textbook series (Parts 1–4), giving you a step-by-step, comprehensive approach to mastering Arabic, including key Qur'anic words and expressions.`,
  whatYouLearn: [
    {
      emoji: "📖",
      title: "Grammar & Sentence Structure",
      detail: "Build a strong foundation",
    },
    {
      emoji: "📝",
      title: "Vocabulary & Expressions",
      detail: "Everyday Arabic words and phrases",
    },
    {
      emoji: "✍️",
      title: "Reading & Writing Skills",
      detail: "From letters to full texts",
    },
    {
      emoji: "📜",
      title: "Qur'anic Arabic Basics",
      detail: "Understand important words from the Qur'an",
    },
    {
      emoji: "💬",
      title: "Practical Conversation",
      detail: "Simple dialogues to boost confidence",
    },
  ],
  courseFeatures: [
    {
      emoji: "🎥",
      title: "Pre-Recorded Lessons",
      detail: "Updated regularly for steady progress",
    },
    {
      emoji: "🖥️",
      title: "Live Class (Once a Month with Quiz)",
      detail: "Optional interactive session with instructors",
    },
    {
      emoji: "⏰",
      title: "Flexible Schedule",
      detail: "Learn anytime at your own pace",
    },
    {
      emoji: "✏️",
      title: "Assignments & Tests",
      detail: "Practice and track your progress",
    },
    {
      emoji: "📊",
      title: "Assessments",
      detail: "Regular evaluations to ensure understanding",
    },
    {
      emoji: "✅",
      title: "Main Class",
      detail: "Students register individually",
    },
  ],
  whoItsFor: [
    "Beginners who want a strong Arabic foundation",
    "Intermediate learners aiming to improve their skills",
    "Students looking for one comprehensive course instead of multiple small courses",
  ],
};

export const SPECIAL_WORKSHOPS = {
  intro:
    "Enhance your personal and spiritual growth through our carefully designed online seminars.",

  workshops: [
    {
      emoji: "📖",
      courseKey: "quran-memorisation-techniques",
      title: "Qur'an Memorisation Techniques",
      description:
        "Equips students with practical strategies to memorise the Qur'an more effectively, retain it longer, and revise with confidence using proven, structured methods.",
      fullDescription:
        "Many students struggle not because they lack ability, but because they have not yet learned the right memorisation methods. Students will be introduced to proven techniques that make Qur'an memorisation more organised, focused, and manageable.",
      keyLearning: [
        "Memory Palace Method – mentally organising verses using visual associations for easier recall",
        "Semantic & Meaning-Based Memorisation – understanding themes and key words to strengthen memory",
        "Structured Repetition – repeating verses in a way that improves long-term retention",
        "Verse Linking Techniques – connecting verses so recitation flows smoothly",
        "Layered Revision System – combining new and older portions for stronger recall",
        "Focus & Concentration Skills – practical tips to improve attention during memorisation",
        "Avoiding Common Hifz Mistakes – identifying and correcting errors that slow progress",
        "Confidence in Recitation – reciting memorised portions with clarity and accuracy",
        "Active Recall & Association Techniques – using creative linking and testing to reinforce memory",
      ],
      goal: "To equip students with effective, advanced memorisation tools that make the journey of Hifz structured, consistent, and spiritually rewarding.",
    },
    {
      emoji: "🌱",
      courseKey: "the-first-day",
      title: "The First Day",
      description:
        "A warm welcome course designed to guide new Muslims through essential knowledge, practices, and mindset needed on the very first day of embracing Islam.",
      fullDescription:
        "Whether you're taking your first steps in prayer, learning basic supplications, or discovering the meaning behind key Islamic teachings, The First Day equips you with the foundational knowledge to grow steadily in your faith. Start your journey with guidance, understanding, and ease.",
      keyLearning: [
        "Understanding the core beliefs of Islam",
        "Learning simple daily practices and supplications",
        "Taking your first steps in prayer",
        "Discovering the meaning behind key Islamic teachings",
        "Building confidence, clarity, and support from day one",
        "Growing steadily in faith with a strong foundation",
      ],
      goal: "To ensure that every new Muslim starts their journey with confidence, clarity, and the foundational knowledge to grow steadily in their faith.",
    },
    {
      emoji: "💍",
      courseKey: "sacred-bond-marriage",
      title: "A Sacred Bond: Marriage in Islam",
      description:
        "Explores what Islam teaches about marriage — the sacred bond between spouses, responsibilities of husband and wife, and principles that ensure harmony, justice, and mutual respect.",
      fullDescription:
        "Drawing insights from The Muslim Family by Muhammad Al-Jibaly, this course provides a clear understanding of the conditions, rules, and regulations governing marriage, including consent, rights, and duties, as well as the ethical and spiritual foundations that make marriage a cornerstone of a healthy Muslim society.",
      keyLearning: [
        "The spiritual and practical aspects of Islamic marriage",
        "Conditions, rules, and regulations governing marriage",
        "Rights and duties of both husband and wife",
        "Principles of harmony, justice, and mutual respect",
        "Consent and ethical foundations of marriage",
        "Building a strong, faith-centred relationship",
        "The family as a cornerstone of a healthy Muslim society",
      ],
      goal: "To provide a clear, Islamic understanding of marriage — its rights, responsibilities, and the spiritual foundations that build a strong, harmonious family.",
    },
    {
      emoji: "🌙",
      courseKey: "ramadan-reflections",
      title: "Ramadan Reflections",
      description:
        "Guided reflections, worship planning, and practical lessons to deepen your spiritual experience during Ramadan and carry its lessons into everyday life.",
      fullDescription:
        "Ramadan is a sacred month of spiritual renewal and self-discipline. Beyond fasting, it is a time for reflection, prayer, and deep connection with Allah. It reminds us to practise patience, empathy, and gratitude, and to seek forgiveness while nurturing kindness in our hearts. This is a season to pause, evaluate our actions, and strengthen our faith.",
      keyLearning: [
        "Deepening your connection with Allah through reflection and prayer",
        "Planning and maximising worship during Ramadan",
        "Practising patience, empathy, and gratitude",
        "Seeking forgiveness and nurturing kindness",
        "Evaluating actions and strengthening faith",
        "Carrying the spirit of Ramadan — devotion, compassion, mindfulness — into every day",
      ],
      goal: "To deepen your spiritual experience during Ramadan and carry its lessons of gratitude, discipline, and mindfulness into everyday life.",
    },
  ],

  benefits: [
    { emoji: "📖", text: "Self-paced learning – Study at your own convenience" },
    { emoji: "🎥", text: "Structured recorded lessons" },
    { emoji: "📝", text: "Reflection activities & practical exercises" },
    { emoji: "📊", text: "Simple assessments for progress tracking" },
    { emoji: "🌍", text: "Flexible online access from anywhere" },
  ],
};
