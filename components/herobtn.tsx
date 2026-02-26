"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  CheckCircle,
  BookOpen,
  Users,
  Award,
  Heart,
  AlertCircle,
  BellRing,
} from "lucide-react";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

const ArabicSchoolModals = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [activePrograms, setActivePrograms] = useState(ALL_PROGRAMS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);

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

  const [waitlistData, setWaitlistData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Fetch settings every time the apply modal opens
  useEffect(() => {
    if (!showApplyModal) return;
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(data => {
        const s = data.settings || {};
        setEnrollmentOpen(s.enrollment_open !== "false");
        setActivePrograms(ALL_PROGRAMS.filter(p => s[p.id] === "true"));
      })
      .catch(() => {});
  }, [showApplyModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }
      toast.success("Application submitted successfully 🎉");
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
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waitlistData),
      });
      if (!res.ok) {
        toast.error("Failed to save. Please try again.");
        return;
      }
      setIsWaitlistSubmitted(true);
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setIsWaitlistSubmitted(false);
    setWaitlistData({ name: "", phone: "", email: "" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[url('/api/placeholder/1200/600')] bg-cover bg-center bg-black/60 bg-blend-overlay text-white py-[100px] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[42px] mb-5">Nurturing Knowledge and Faith</h2>
          <p className="text-lg max-w-[700px] mx-auto mb-[30px] leading-relaxed">
            GLADTIDINGS INSTITUTE provides quality Qur&apos;an memorization and
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

      {/* ── APPLY NOW MODAL ── */}
      <Modal isOpen={showApplyModal} onClose={closeApplyModal}>
        <div className="p-8">

          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${enrollmentOpen ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                {enrollmentOpen
                  ? <GraduationCap className="w-6 h-6 text-emerald-600" />
                  : <BellRing className="w-6 h-6 text-amber-600" />
                }
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {enrollmentOpen ? 'School Enrollment' : 'Join the Waitlist'}
                </h2>
                <p className="text-sm text-gray-500">
                  {enrollmentOpen ? 'تسجيل في المدرسة' : 'Be the first to know when enrollment opens'}
                </p>
              </div>
            </div>
            <button
              onClick={closeApplyModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* ── ENROLLMENT CLOSED — WAITLIST ── */}
          {!enrollmentOpen && (
            <>
              {isWaitlistSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    We have saved your details. We will contact you on WhatsApp
                    or email as soon as enrollment opens again.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-6 px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Closed banner */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-amber-800 mb-1">
                          Enrollment is Currently Closed
                        </p>
                        <p className="text-sm text-amber-700 leading-relaxed">
                          We are not accepting new applications at this time.
                          Leave your contact details below and we will reach out
                          to you on WhatsApp as soon as enrollment opens again.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Waitlist form */}
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={waitlistData.name}
                          onChange={e => setWaitlistData({ ...waitlistData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+234 xxx xxx xxxx"
                          value={waitlistData.phone}
                          onChange={e => setWaitlistData({ ...waitlistData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Email Address{" "}
                        <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={waitlistData.email}
                          onChange={e => setWaitlistData({ ...waitlistData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={closeApplyModal}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <BellRing className="w-4 h-4" />
                        Notify Me When Open
                      </button>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                      We will only contact you when enrollment is open. No spam.
                    </p>
                  </form>
                </>
              )}
            </>
          )}

          {/* ── ENROLLMENT OPEN — APPLICATION FORM ── */}
          {enrollmentOpen && (
            <>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 mb-2">
                    شكراً لتسجيلكم — Thank you for registering
                  </p>
                  <p className="text-sm text-gray-500">
                    Our admissions team will contact you within 2-3 business days
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                      <p className="text-sm text-emerald-800">
                        <strong>Academic Year 2025-2026</strong> — Now accepting
                        applications for all grade levels
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Student Full Name / اسم الطالب *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="studentAge"
                            value={formData.studentAge}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                            required
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

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Desired Grade Level
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                            required
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
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                          placeholder="What do you hope your child will achieve through our program?"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={closeApplyModal}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <span>Submit Application</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </Modal>

      {/* ── READ MORE MODAL ── */}
      <Modal isOpen={showReadMoreModal} onClose={() => setShowReadMoreModal(false)}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">About Our School</h2>
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

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Our Mission - رسالتنا
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At GIQMIS, we are dedicated to providing authentic Arabic
                language education rooted in Islamic values and cultural
                heritage. Our mission is to nurture young minds, strengthen
                their connection to their faith and heritage, while preparing
                them for success in both their spiritual and academic journeys.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Programs - برامجنا
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-100", title: "Arabic Language", desc: "Classical and Modern Standard Arabic reading, writing, and speaking" },
                  { icon: Heart, color: "text-emerald-600", bg: "bg-emerald-100", title: "Quran Studies", desc: "Quran recitation, memorization, and Tajweed" },
                  { icon: Users, color: "text-emerald-600", bg: "bg-emerald-100", title: "Islamic Studies", desc: "Islamic history, values, and character development" },
                  { icon: Award, color: "text-emerald-600", bg: "bg-emerald-100", title: "Cultural Heritage", desc: "Arab culture, traditions, and history" },
                ].map(({ icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className={`${bg} p-2 rounded-lg mt-1`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{title}</h4>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Why Choose GIQMIS?
              </h3>
              <div className="space-y-3">
                {[
                  { bold: "Qualified Teachers:", text: "Native Arabic speakers with Islamic education credentials" },
                  { bold: "Small Class Sizes:", text: "Personalized attention with maximum 12 students per class" },
                  { bold: "Flexible Scheduling:", text: "Weekend, after-school, and summer intensive programs" },
                  { bold: "Community Focus:", text: "Strong parent involvement and cultural events" },
                ].map(({ bold, text }) => (
                  <div key={bold} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700"><strong>{bold}</strong> {text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Our Family</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We welcome students of all levels, from complete beginners to
                advanced learners. Our nurturing environment helps children
                develop a strong foundation in Arabic language and Islamic
                values while building lasting friendships within our community.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>School Hours:</strong> Weekend classes (Saturday & Sunday),
                  After-school programs (Mon-Thu), Summer intensives available. Ages 4-18 welcomed.
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
                Enroll Now <ArrowRight className="w-5 h-5" />
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