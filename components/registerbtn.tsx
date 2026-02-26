"use client";
import React, { useEffect, useState } from "react";
import {
  X,
  ArrowRight,
  User,
  Mail,
  Phone,
  // FileText,
  GraduationCap,
  Calendar,
  CheckCircle,
  BookOpen,
  Users,
  Award,
  Heart,
  AlertCircle,
} from "lucide-react";
import { ReactNode } from "react";



type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};


// console.log("re-render")
  
const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          {children}
        </div>
      </div>
    );
  };

  const ALL_PROGRAMS = [
  { id: "program_full_time", label: "Full-time Arabic & Islamic Studies" },
  { id: "program_weekend",   label: "Weekend Arabic Program" },
  { id: "program_quran",     label: "Quran Memorization (Hifz)" },
  { id: "program_language",  label: "Arabic Language Only" },
  { id: "program_summer",    label: "Summer Intensive Program" },
];
  
  const Registerbtn = () => {
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
    const [activePrograms, setActivePrograms] = useState(ALL_PROGRAMS);
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

    // Fetch settings every time the apply modal opens
    useEffect(() => {
      if (!showApplyModal) return;
      fetch("/api/admin/settings")
        .then(r => r.json())
        .then(data => {
          const s = data.settings || {};
          setEnrollmentOpen(s.enrollment_open !== "false");
          setActivePrograms(
            ALL_PROGRAMS.filter(p => s[p.id] === "true")
          );
        })
        .catch(() => {});
    }, [showApplyModal]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!enrollmentOpen) return;

  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong. Please try again.");
      return;
    }

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

  } catch {
    alert("Network error. Please check your connection and try again.");
  }
};

  return (
    <div>
      <button
        onClick={() => setShowApplyModal(true)}
        className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        Enroll Today
      </button>

      {/* Apply Now Modal */}
      <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)}>
        <div className="p-8">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">School Enrollment</h2>
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

          {/* Success state */}
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
            /* Form */
            <form onSubmit={handleSubmit}>
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
                      Student Full Name / اسم الطالب *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder-gray-400"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder-gray-400"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder-gray-400"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone/Whatsapp Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder-gray-400"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Student Age Group
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="studentAge"
                        value={formData.studentAge}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-700"
                      >
                        <option value="">Select age</option>
                        <option value="6-12">Children (6-12 years)</option>
                        <option value="13-18">Teens (13-18 years)</option>
                        <option value="19-30">Young Adults (19-30 years)</option>
                        <option value="31-50">Adults (31-50 years)</option>
                        <option value="51+">Elderly Women (51 years and above)</option>
                      </select>
                    </div>
                  </div>

                      {/* Desired Grade Level */}
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-700"
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

                {/* Program dropdown — only shows active programs from settings */}
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-700"
                    >
                      <option value="">Select program</option>
                      {activePrograms.map(p => (
                        <option key={p.id} value={p.label}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  {activePrograms.length === 0 && (
                    <p className="text-xs text-amber-600">
                      No programs are currently active. Please contact the school directly.
                    </p>
                  )}
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none placeholder-gray-400"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none placeholder-gray-400"
                      placeholder="What do you hope your child will achieve through our program?"
                    />
                  </div>
                </div>

                {/* Enrollment closed warning */}
                {!enrollmentOpen && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Enrollment is currently closed. Applications are not being accepted.
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!enrollmentOpen}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors
                      ${enrollmentOpen
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {enrollmentOpen ? (
                      <><span>Submit Application</span><ArrowRight className="w-5 h-5" /></>
                    ) : (
                      <><AlertCircle className="w-4 h-4" /><span>Enrollment Closed</span></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Registerbtn;
