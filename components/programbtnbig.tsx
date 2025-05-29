"use client";
import React, { useState } from "react";
import Registerbtn from "@/components/registerbtn";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  ChevronRight,
  MessageCircle,
  User,
  Target,
  Globe,
} from "lucide-react";

// Type definitions
interface Feature {
  icon: React.ElementType;
  text: string;
}

interface CurriculumWeek {
  week: number;
  title: string;
  topics: string[];
}

interface ScheduleDate {
  label: string;
  date: string;
}

interface Schedule {
  duration: string;
  time: string;
  dates: ScheduleDate[];
}

interface Instructor {
  name: string;
  title: string;
  initials: string;
  experience: string;
  credentials: string;
  bio: string;
}

interface Course {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  rating: number;
  reviews: number;
  students: number;
  color: string;
  description: string;
  features: Feature[];
  whatYouLearn: string[];
  curriculum: CurriculumWeek[];
  schedule: Schedule;
  instructor: Instructor;
}

interface CourseData {
  [key: string]: Course;
}

interface CourseCardProps {
  courseKey: string;
  title: string;
  description: string;
  onClick: (courseKey: string) => void;
}

type TabId = "overview" | "curriculum" | "schedule" | "instructor";

interface Tab {
  id: TabId;
  label: string;
}

const courseData: CourseData = {
  "summer-intensive": {
    title: "Summer Intensive Arabic Course",
    subtitle: "4-Week Accelerated Learning Program",
    icon: BookOpen,
    rating: 4.9,
    reviews: 245,
    students: 1420,
    color: "from-orange-500 to-orange-600",
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
      bio: "Prof. Al-Mansoori has extensive experience training professionals across various industries. He has worked with multinational corporations, government agencies, and healthcare institutions to deliver targeted Arabic language training.",
    },
  },
};

export default function MultiCourseDetails(): React.ReactElement {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const CourseCard: React.FC<CourseCardProps> = ({
    courseKey,
    title,
    description,
    onClick,
  }) => (
    <div className="bg-white rounded-lg overflow-hidden flex shadow-sm mb-6 hover:shadow-md transition-shadow">
      <div className="w-56 md:w-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <BookOpen size={56} className="text-gray-400" />
      </div>
      <div className="flex-1 p-8">
        <h4 className="text-2xl font-semibold mb-3 text-slate-800">{title}</h4>
        <p className="text-slate-600 mb-6 leading-relaxed text-lg">{description}</p>
        <button
          onClick={() => onClick(courseKey)}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg"
        >
          View Details
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const handleCourseSelect = (courseKey: string): void => {
    setSelectedCourse(courseKey);
    setActiveTab("overview");
  };

  if (!selectedCourse) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Special Programs
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Choose from our comprehensive selection of Arabic language
              Beyond our regular courses, we offer specialized programs to meet
              diverse learning needs and interests.
            </p>
            <div className=" bg-orange-500 border border-orange-500  w-[10%] mx-auto mt-3 h-1"></div>
          </div>
          

          <div className="space-y-6">
            <CourseCard
              courseKey="summer-intensive"
              title="Summer Intensive Course"
              description="Accelerate your Arabic learning with our 4-week intensive summer program. Perfect for those who want to make rapid progress in a short time frame with structured daily lessons and immersive cultural experiences."
              onClick={handleCourseSelect}
            />

            <CourseCard
              courseKey="conversation-club"
              title="Arabic Conversation Club"
              description="Practice speaking Arabic in a relaxed, social environment. Our weekly conversation clubs are facilitated by native speakers and provide excellent speaking practice for learners at all levels."
              onClick={handleCourseSelect}
            />

            <CourseCard
              courseKey="private-tutoring"
              title="Private Tutoring"
              description="Personalized one-on-one instruction tailored to your specific learning goals, schedule, and pace. Ideal for students who need targeted help or have unique objectives and prefer individualized attention."
              onClick={handleCourseSelect}
            />

            <CourseCard
              courseKey="arabic-for-professionals"
              title="Arabic for Professionals"
              description="Specialized courses for business professionals, healthcare workers, diplomats, and others who need Arabic language skills for their career advancement and professional development."
              onClick={handleCourseSelect}
            />
          </div>
        </div>
      </div>
    );
  }

  const course: Course = courseData[selectedCourse];
  // const IconComponent: React.ElementType = course.icon;

  const tabs: Tab[] = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "schedule", label: "Schedule" },
    { id: "instructor", label: "Instructor" },
  ];

  return (
    <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className={`relative bg-gradient-to-r ${course.color} text-white p-8`}
        >
          <button
            onClick={() => setSelectedCourse(null)}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-start gap-6">
            <div className=" bg-black bg-opacity-20 rounded-xl flex items-center justify-center">
                <Image
                  src="/Gladtidings_LOGO.JPG"
                  alt="Glad"
                  // fill
                  // style={{ objectFit: "cover" }} 
                  width={48}
                  height={48}
                  sizes="68px"
                  className="w-24 h-24 rounded object-contain"
                />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
              <p className="text-white text-opacity-90 text-lg mb-4">
                {course.subtitle}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="fill-yellow-300 text-yellow-300" size={16} />
                  {course.rating} ({course.reviews} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {course.students}+ students enrolled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[50vh] overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Course Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">
                    What You&apos;ll Learn
                  </h4>
                  <ul className="space-y-2">
                    {course.whatYouLearn.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <ChevronRight
                          size={16}
                          className="text-orange-500 flex-shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">
                    Course Features
                  </h4>
                  <div className="space-y-3">
                    {course.features.map((feature: Feature, index: number) => {
                      const FeatureIcon: React.ElementType = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <FeatureIcon
                            className="text-orange-500 flex-shrink-0"
                            size={20}
                          />
                          <span className="text-gray-600">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Weekly Breakdown</h3>
              {course.curriculum.map((week: CurriculumWeek) => (
                <div
                  key={week.week}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-200 transition-colors"
                >
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">
                    Week {week.week}: {week.title}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {week.topics.map((topic: string, index: number) => (
                      <li
                        key={index}
                        className="text-gray-600 text-sm flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Class Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar
                        className="text-orange-500 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <div className="font-medium">
                          {course.schedule.duration}
                        </div>
                        <div className="text-gray-600 text-sm">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock
                        className="text-orange-500 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <div className="font-medium">
                          {course.schedule.time}
                        </div>
                        <div className="text-gray-600 text-sm">Class times</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Important Dates
                  </h3>
                  <div className="space-y-2 text-sm">
                    {course.schedule.dates.map(
                      (date: ScheduleDate, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-1"
                        >
                          <span className="text-gray-600">{date.label}:</span>
                          <span className="font-medium">{date.date}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${course.color} rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}
                >
                  {course.instructor.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {course.instructor.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {course.instructor.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                    <span>{course.instructor.experience}</span>
                    <span>•</span>
                    <span>{course.instructor.credentials}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-600">
              <div className="font-medium">Ready to get started?</div>
              <div>Contact us for more information about enrollment</div>
            </div>
            <div className="flex gap-3">
            <a href="Contact" className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </a>
              <Registerbtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}