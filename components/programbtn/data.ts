import {
  BookOpen,
  MessageCircle,
  User,
  Target,
  Clock,
  Users,
  Award,
  Globe,
} from "lucide-react";
import { CourseData } from "./types";

export const courseData: CourseData = {
  "summer-intensive": {
    title: "Summer Intensive Arabic Course",
    subtitle: "4-Week Accelerated Learning Program",
    icon: BookOpen,
    rating: 4.9,
    reviews: 245,
    students: 1420,
    color: "from-orange-500 to-orange-600",
    image: "/special-programs.jpg",
    description:
      "Dive deep into Arabic language and culture with our intensive 4-week summer program. This immersive course combines traditional learning methods with modern interactive techniques to accelerate your Arabic proficiency.",
    features: [
      { icon: Clock, text: "40 hours of instruction" },
      { icon: Users, text: "Small class size (max 12 students)" },
      { icon: BookOpen, text: "All materials included" },
      { icon: Award, text: "Certificate of completion" },
    ],
    whatYouLearn: [
      "Arabic alphabet and pronunciation",
      "Essential vocabulary (500+ words)",
      "Basic grammar and sentence structure",
      "Conversational skills for daily situations",
      "Reading and writing fundamentals",
      "Cultural context and etiquette",
    ],
    curriculum: [
      {
        week: 1,
        title: "Foundation & Alphabet",
        topics: [
          "Arabic script basics",
          "Letter recognition",
          "Basic sounds",
          "Simple greetings",
        ],
      },
      {
        week: 2,
        title: "Vocabulary & Grammar",
        topics: [
          "Essential nouns & verbs",
          "Sentence structure",
          "Present tense",
          "Numbers 1-100",
        ],
      },
      {
        week: 3,
        title: "Conversation Skills",
        topics: [
          "Daily conversations",
          "Asking questions",
          "Past tense",
          "Family & relationships",
        ],
      },
      {
        week: 4,
        title: "Advanced Topics",
        topics: [
          "Future tense",
          "Complex sentences",
          "Cultural contexts",
          "Final project",
        ],
      },
    ],
    schedule: {
      duration: "June 1 - June 28, 2025",
      time: "Monday - Friday, 9:00 AM - 1:00 PM",
      dates: [
        { label: "Registration Deadline", date: "May 25, 2025" },
        { label: "Orientation", date: "May 31, 2025" },
        { label: "Mid-term Assessment", date: "June 14, 2025" },
        { label: "Final Exam", date: "June 28, 2025" },
      ],
    },
    instructor: {
      name: "Dr. Amira Hassan",
      title: "Senior Arabic Language Instructor",
      initials: "AH",
      experience: "15+ years experience",
      credentials: "PhD in Arabic Linguistics",
      bio: "Dr. Hassan brings over 15 years of teaching experience and a passion for Arabic language education. She has taught at prestigious universities and developed innovative teaching methods that make Arabic accessible to international students.",
    },
  },
  "conversation-club": {
    title: "Arabic Conversation Club",
    subtitle: "Weekly Speaking Practice Sessions",
    icon: MessageCircle,
    rating: 4.8,
    reviews: 156,
    students: 320,
    color: "from-blue-500 to-blue-600",
    image: "/giq2.webp",
    description:
      "Improve your Arabic speaking skills in a relaxed, supportive environment. Our conversation clubs are led by native speakers and provide excellent practice opportunities for students at all levels.",
    features: [
      { icon: Clock, text: "2 hours per session" },
      { icon: Users, text: "Groups of 6-8 participants" },
      { icon: MessageCircle, text: "Native speaker facilitation" },
      { icon: Globe, text: "Cultural exchange focus" },
    ],
    whatYouLearn: [
      "Natural conversation flow",
      "Pronunciation improvement",
      "Listening comprehension",
      "Cultural expressions and idioms",
      "Confidence in speaking",
      "Real-world language usage",
    ],
    curriculum: [
      {
        week: 1,
        title: "Getting to Know Each Other",
        topics: [
          "Introductions",
          "Hobbies & interests",
          "Family discussions",
          "Daily routines",
        ],
      },
      {
        week: 2,
        title: "Current Events & News",
        topics: [
          "News discussions",
          "Opinion sharing",
          "Debate practice",
          "Media vocabulary",
        ],
      },
      {
        week: 3,
        title: "Culture & Traditions",
        topics: [
          "Holiday celebrations",
          "Food & cooking",
          "Traditional stories",
          "Music & arts",
        ],
      },
      {
        week: 4,
        title: "Travel & Experiences",
        topics: [
          "Travel stories",
          "Future plans",
          "Life experiences",
          "Dream destinations",
        ],
      },
    ],
    schedule: {
      duration: "Ongoing - Every Saturday",
      time: "Saturdays, 10:00 AM - 12:00 PM",
      dates: [
        { label: "Next Session", date: "June 1, 2025" },
        { label: "Registration Opens", date: "Rolling basis" },
        { label: "Summer Break", date: "July 15-29, 2025" },
        { label: "Fall Sessions Begin", date: "September 7, 2025" },
      ],
    },
    instructor: {
      name: "Layla Al-Rashid",
      title: "Conversation Facilitator",
      initials: "LR",
      experience: "8+ years experience",
      credentials: "Native Arabic Speaker",
      bio: "Layla is a passionate language educator from Damascus with extensive experience in conversation-based learning. She creates a warm, encouraging environment where students feel comfortable practicing their Arabic speaking skills.",
    },
  },
  "private-tutoring": {
    title: "Private Arabic Tutoring",
    subtitle: "Personalized One-on-One Instruction",
    icon: User,
    rating: 4.95,
    reviews: 89,
    students: 450,
    color: "from-purple-500 to-purple-600",
    image: "/giq3.avif",
    description:
      "Accelerate your Arabic learning with personalized instruction tailored to your specific goals, schedule, and learning style. Perfect for students who need targeted help or have unique objectives.",
    features: [
      { icon: User, text: "One-on-one instruction" },
      { icon: Target, text: "Customized curriculum" },
      { icon: Clock, text: "Flexible scheduling" },
      { icon: Award, text: "Progress tracking & reports" },
    ],
    whatYouLearn: [
      "Personalized learning plan",
      "Targeted skill development",
      "Exam preparation support",
      "Business Arabic (if needed)",
      "Accent reduction techniques",
      "Specialized vocabulary for your field",
    ],
    curriculum: [
      {
        week: 1,
        title: "Assessment & Goal Setting",
        topics: [
          "Language assessment",
          "Learning objectives",
          "Custom curriculum design",
          "Study plan creation",
        ],
      },
      {
        week: 2,
        title: "Foundation Building",
        topics: [
          "Core skills focus",
          "Weakness addressing",
          "Strength reinforcement",
          "Practice techniques",
        ],
      },
      {
        week: 3,
        title: "Skill Development",
        topics: [
          "Advanced concepts",
          "Real-world application",
          "Practice scenarios",
          "Progress evaluation",
        ],
      },
      {
        week: 4,
        title: "Mastery & Application",
        topics: [
          "Complex topics",
          "Final assessment",
          "Future learning plan",
          "Resource recommendations",
        ],
      },
    ],
    schedule: {
      duration: "Flexible scheduling available",
      time: "Sessions available 7 days a week",
      dates: [
        { label: "Consultation Call", date: "Within 24 hours" },
        { label: "First Session", date: "Within 3 days" },
        { label: "Progress Review", date: "Every 4 sessions" },
        { label: "Flexible Rescheduling", date: "24-hour notice" },
      ],
    },
    instructor: {
      name: "Multiple Tutors Available",
      title: "Certified Arabic Instructors",
      initials: "MT",
      experience: "Varies by tutor",
      credentials: "All certified & experienced",
      bio: "Our team of private tutors includes certified Arabic instructors with diverse backgrounds and specializations. Each tutor is carefully selected and matched to your specific learning needs and goals.",
    },
  },
  "arabic-for-professionals": {
    title: "Arabic for Professionals",
    subtitle: "Specialized Career-Focused Training",
    icon: Target,
    rating: 4.7,
    reviews: 78,
    students: 190,
    color: "from-green-500 to-green-600",
    image: "/giq4.webp",
    description:
      "Master Arabic language skills tailored to your professional needs. Whether you work in business, healthcare, diplomacy, or other fields, this specialized course provides industry-specific vocabulary and communication skills.",
    features: [
      { icon: Target, text: "Industry-specific curriculum" },
      { icon: Users, text: "Professional networking opportunities" },
      { icon: BookOpen, text: "Real-world case studies" },
      { icon: Award, text: "Professional certification" },
    ],
    whatYouLearn: [
      "Professional terminology and vocabulary",
      "Business meeting and presentation skills",
      "Industry-specific writing and communication",
      "Cross-cultural business etiquette",
      "Technical document translation",
      "Professional networking in Arabic",
    ],
    curriculum: [
      {
        week: 1,
        title: "Professional Foundations",
        topics: [
          "Business Arabic basics",
          "Professional introductions",
          "Industry vocabulary",
          "Formal communication",
        ],
      },
      {
        week: 2,
        title: "Specialized Terminology",
        topics: [
          "Field-specific vocabulary",
          "Technical terms",
          "Professional documents",
          "Industry protocols",
        ],
      },
      {
        week: 3,
        title: "Communication Skills",
        topics: [
          "Presentations in Arabic",
          "Meeting facilitation",
          "Negotiation language",
          "Client communication",
        ],
      },
      {
        week: 4,
        title: "Advanced Applications",
        topics: [
          "Complex scenarios",
          "Cultural nuances",
          "Professional writing",
          "Certification preparation",
        ],
      },
    ],
    schedule: {
      duration: "8-week program - Flexible start dates",
      time: "Evenings & weekends available",
      dates: [
        { label: "Next Cohort", date: "June 15, 2025" },
        { label: "Application Deadline", date: "June 1, 2025" },
        { label: "Program Completion", date: "8 weeks from start" },
        { label: "Certification Exam", date: "Final week" },
      ],
    },
    instructor: {
      name: "Prof. Omar Al-Mansoori",
      title: "Business Arabic Specialist",
      initials: "OM",
      experience: "12+ years in corporate training",
      credentials: "MBA & Arabic Language Certification",
      bio: "Prof. Al-Mansoori has extensive experience training professionals across various industries. He has worked with multinational corporations, government agencies, and healthcare institute to deliver targeted Arabic language training.",
    },
  },
};

export const COURSE_CARDS = [
  {
    courseKey: "summer-intensive",
    title: "Summer Intensive Course",
    description:
      "Accelerate your Arabic learning with our 4-week intensive summer program. Perfect for those who want to make rapid progress in a short time frame with structured daily lessons.",
image: "/special-programs.jpg",
  },
 {
    courseKey: "conversation-club",
    title: "Arabic Conversation Club",
    description: "Practice speaking Arabic in a relaxed, social environment. Our weekly conversation clubs are facilitated by native speakers and provide excellent speaking practice.",
    image: "/giq2.webp",
  },
  {
    courseKey: "private-tutoring",
    title: "Private Tutoring",
    description: "Personalized one-on-one instruction tailored to your specific learning goals, schedule, and pace. Ideal for students who need targeted help or have unique objectives.",
    image: "/giq3.avif",
  },
  {
    courseKey: "arabic-for-professionals",
    title: "Arabic for Professionals",
    description: "Specialized courses for business professionals, healthcare workers, diplomats, and others who need Arabic language skills for their career advancement.",
    image: "/giq4.webp",
  },
]

export const TABS = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "schedule", label: "Schedule" },
  { id: "instructor", label: "Instructor" },
];
