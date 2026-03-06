export const curriculumPoints = [
  {
    title: "Communicative Method",
    desc: "Learn through real-life situations and conversations",
  },
  {
    title: "Cultural Integration",
    desc: "Connect language learning with cultural context",
  },
  {
    title: "Modern Materials",
    desc: "Up-to-date textbooks and digital resources",
  },
  {
    title: "Regular Assessment",
    desc: "Track progress with constructive feedback",
  },
];

export const faqs = [
  {
    id: "faq-1",
    question: "What age groups do you accept for enrollment?",
    answer:
      "We accept students of all ages! Our programs are designed for different age groups: children (ages 5-12), teens (ages 13-17), and adults. Each program is specifically tailored to meet the learning needs and interests of that particular age group.",
  },
  {
    id: "faq-2",
    question: "Do I need any prior knowledge of Arabic to enroll?",
    answer:
      "Not at all! We welcome students of all levels, from complete beginners to advanced learners. Our placement assessment will help determine the right level for you or your child to ensure the most effective learning experience.",
  },
  {
    id: "faq-3",
    question: "What is your teaching approach?",
    answer:
      "We use a communicative, interactive approach that focuses on practical language skills. Our curriculum balances reading, writing, speaking, and listening while incorporating cultural elements to provide a comprehensive Arabic language education.",
  },
  {
    id: "faq-4",
    question: "Do you offer online classes?",
    answer:
      "Yes, we offer both in-person and online classes to accommodate different scheduling needs and preferences. Our online classes use interactive tools and resources to create an engaging virtual learning environment.",
  },
  {
    id: "faq-5",
    question: "How can I register for classes?",
    answer:
      "Registration can be completed online through our website, by phone, or in person at our school. We recommend scheduling an initial consultation to discuss your learning goals and determine the best program for you or your child.",
  },
];

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
      emoji: "🧠",
      title: "Hifz Memory Mastery",
      description:
        "Practical memorization techniques designed to improve retention, focus, revision methods, and long-term consistency in Qur'an memorization.",
    },
    {
      emoji: "💍",
      title: "Marriage & Family Guidance",
      description:
        "Structured lessons on communication, responsibilities, Islamic family values, and building a peaceful home.",
    },
    {
      emoji: "🌙",
      title: "Ramadan Reflections",
      description:
        "Guided reflections, worship planning, and practical lessons to help you maximize spiritual growth during Ramadan.",
    },
    {
      emoji: "🌱",
      title: "Introduction for New Muslims",
      description:
        "A supportive foundational course covering Islamic beliefs, prayer basics, daily practices, and essential guidance for new Muslims.",
    },
  ],
  benefits: [
    {
      emoji: "📖",
      text: "Self-paced learning – Study at your own convenience",
    },
    { emoji: "🎥", text: "Structured recorded lessons" },
    { emoji: "📝", text: "Reflection activities & practical exercises" },
    { emoji: "📊", text: "Simple assessments for progress tracking" },
    { emoji: "🌍", text: "Flexible online access from anywhere" },
  ],
};
