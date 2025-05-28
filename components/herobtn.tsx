"use client";
import React, {useState } from "react";
import {
  X,
  ArrowRight,
  User,
  Mail,
  Phone,
  FileText,
  GraduationCap,
  Calendar,
  CheckCircle,
  BookOpen,
  Users,
  Award,
  Heart,
} from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {children}
      </div>
    </div>
  );
};

const ArabicSchoolModals = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    studentAge: "",
    grade: "",
    program: "",
    previousExperience: "",
    goals: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowApplyModal(false);
      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        studentAge: "",
        grade: "",
        program: "",
        previousExperience: "",
        goals: "",
      });
    }, 3000);
  };

  return (
    <div>
      {/* Hero Section Simulation */}
      <section className="bg-[url('/api/placeholder/1200/600')] bg-cover bg-center bg-black/60 bg-blend-overlay text-white py-[100px] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[42px] mb-5">Nurturing Knowledge and Faith</h2>
          <p className="text-lg max-w-[700px] mx-auto mb-[30px] leading-relaxed">
            GLADTIDINGS INSTITUTION provides quality Qur'an memorization and
            Islamic studies education for females in a supportive and enriching
            environment.
          </p>
          <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowApplyModal(true)}
            className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Apply Now
          </button>
          <button
            onClick={() => setShowReadMoreModal(true)}
            className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Read More
          </button>
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  School Enrollment
                </h2>
                <p className="text-sm text-gray-600">تسجيل في المدرسة</p>
              </div>
            </div>
            <button
              onClick={() => setShowApplyModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-2">
                شكراً لتسجيلكم - Thank you for registering
              </p>
              <p className="text-sm text-gray-500">
                Our admissions team will contact you within 2-3 business days
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <p className="text-sm text-emerald-800">
                  <strong>Academic Year 2025-2026</strong> - Now accepting
                  applications for all grade levels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Student Name / اسم الطالب *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Parent/Guardian Name *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Parent or guardian full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Student Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="studentAge"
                      value={formData.studentAge}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select age</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-7">6-7 years</option>
                      <option value="8-9">8-9 years</option>
                      <option value="10-11">10-11 years</option>
                      <option value="12-13">12-13 years</option>
                      <option value="14-15">14-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Desired Grade Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select grade</option>
                      <option value="pre-k">Pre-Kindergarten</option>
                      <option value="kindergarten">Kindergarten</option>
                      <option value="1st">1st Grade</option>
                      <option value="2nd">2nd Grade</option>
                      <option value="3rd">3rd Grade</option>
                      <option value="4th">4th Grade</option>
                      <option value="5th">5th Grade</option>
                      <option value="middle">Middle School</option>
                      <option value="high">High School</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Program Interest
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select program</option>
                    <option value="full-time">
                      Full-time Arabic & Islamic Studies
                    </option>
                    <option value="weekend">Weekend Arabic Program</option>
                    <option value="quran">Quran Memorization Program</option>
                    <option value="language">Arabic Language Only</option>
                    <option value="summer">Summer Intensive Program</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Previous Arabic/Islamic Education Experience
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Please describe any previous Arabic or Islamic education..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Learning Goals & Expectations
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="What do you hope your child will achieve through our program?"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <form onSubmit={handleSubmit}>
                  <button
                    //   onClick={handleSubmit}
                    type="submit"
                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Read More Modal */}
      <Modal
        isOpen={showReadMoreModal}
        onClose={() => setShowReadMoreModal(false)}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  About Our School
                </h2>
                <p className="text-sm text-gray-600">عن مدرستنا</p>
              </div>
            </div>
            <button
              onClick={() => setShowReadMoreModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-2xl mb-2" style={{ fontFamily: "serif" }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </div>
              <p className="text-sm text-gray-600 italic">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Our Mission - رسالتنا
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Al-Noor Arabic School, we are dedicated to providing
                authentic Arabic language education rooted in Islamic values and
                cultural heritage. Our mission is to nurture young minds,
                strengthen their connection to their faith and heritage, while
                preparing them for success in both their spiritual and academic
                journeys.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Programs - برامجنا
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Arabic Language
                    </h4>
                    <p className="text-sm text-gray-600">
                      Classical and Modern Standard Arabic reading, writing, and
                      speaking
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Heart className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Quran Studies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quran recitation, memorization, and Tajweed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Islamic Studies
                    </h4>
                    <p className="text-sm text-gray-600">
                      Islamic history, values, and character development
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Cultural Heritage
                    </h4>
                    <p className="text-sm text-gray-600">
                      Arab culture, traditions, and history
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Why Choose Al-Noor?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Qualified Teachers:</strong> Native Arabic speakers
                    with Islamic education credentials
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Small Class Sizes:</strong> Personalized attention
                    with maximum 12 students per class
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Flexible Scheduling:</strong> Weekend, after-school,
                    and summer intensive programs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Community Focus:</strong> Strong parent involvement
                    and cultural events
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Join Our Family
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We welcome students of all levels, from complete beginners to
                advanced learners. Our nurturing environment helps children
                develop a strong foundation in Arabic language and Islamic
                values while building lasting friendships within our community.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>School Hours:</strong> Weekend classes (Saturday &
                  Sunday), After-school programs (Mon-Thu), Summer intensives
                  available. Ages 4-18 welcomed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                onClick={() => {
                  setShowReadMoreModal(false);
                  setShowApplyModal(true);
                }}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowReadMoreModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArabicSchoolModals;
