"use client";
import React, { useEffect, useState } from "react";
import {
  X, ArrowRight, ArrowLeft, User, Mail, Phone, GraduationCap,
  Calendar, CheckCircle, BookOpen, Users, Heart, AlertCircle,
  BellRing, Globe, School, Clock, CheckSquare,
} from "lucide-react";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";

type ModalProps = { isOpen: boolean; onClose: () => void; children: ReactNode };

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

const ALL_COURSES = [
  { id: "Arabic_Beginner",          label: "Arabic (Beginner)" },
  { id: "Arabic_Intermediate",      label: "Arabic (Intermediate)" },
  { id: "Arabic_Revision",          label: "Arabic Revision" },
  { id: "Quran_Recitation",         label: "Quran Recitation" },
  { id: "Beginner_Tajweed",         label: "Beginner Tajweed" },
  { id: "Advanced_Tajweed",         label: "Advanced Tajweed" },
  { id: "Adkar",                    label: "Adkar" },
  { id: "Hafdh",                    label: "Hafdh" },
  { id: "Hadith",                   label: "Hadith" },
  { id: "Lessons from the Quran",   label: "Lessons from the Quran" },
  { id: "Islamic_Studies",          label: "Islamic Studies" },
];

const Registerbtn = () => {
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [activeCourses, setActiveCourses] = useState<string[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    studentName: "", parentName: "", email: "", phone: "",
    studentAge: "", westernEducationLevel: "", lastSchoolAttended: "",
    nationality: "", parentGuardianContact: "", nextOfKinContact: "",
    studiedQuranBefore: "", previousQuranLevel: "", needsQuranReadingHelp: "",
    levelOfStudyInterested: "", selectedCourses: [] as string[],
    preferredLearningStyle: "", goals: "", whyInterestedInSchool: "",
    classTime: "", otherClassTime: "", agreeToTerms: "",
  });

  const [waitlistData, setWaitlistData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    if (!showApplyModal) return;
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(data => {
        const s = data.settings || {};
        setEnrollmentOpen(s.enrollment_open !== "false");
        const active = ALL_COURSES
          .filter(c => s[c.id] === "true")
          .map(c => c.label);
        setActiveCourses(active);
      })
      .catch(() => {});
  }, [showApplyModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseToggle = (course: string) => {
    setFormData(prev => {
      const already = prev.selectedCourses.includes(course);
      if (already) return { ...prev, selectedCourses: prev.selectedCourses.filter(c => c !== course) };
      if (prev.selectedCourses.length >= 3) { toast.error("You can select a maximum of 3 courses."); return prev; }
      return { ...prev, selectedCourses: [...prev.selectedCourses, course] };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.studentName) { toast.error("Student name is required"); return false; }
      if (!formData.parentName) { toast.error("Parent/Guardian name is required"); return false; }
      if (!formData.email) { toast.error("Email is required"); return false; }
      if (!formData.phone) { toast.error("Phone number is required"); return false; }
      if (!formData.studentAge) { toast.error("Age group is required"); return false; }
      if (!formData.westernEducationLevel) { toast.error("Western Education Level is required"); return false; }
      if (!formData.lastSchoolAttended) { toast.error("Last school attended is required"); return false; }
      if (!formData.nationality) { toast.error("Nationality is required"); return false; }
    }
    if (step === 2) {
      if (!formData.studiedQuranBefore) { toast.error("Please answer the Quran question"); return false; }
      if (!formData.levelOfStudyInterested) { toast.error("Level of study is required"); return false; }
    }
    if (step === 3) {
      if (formData.selectedCourses.length < 2) { toast.error("Please select at least 2 courses"); return false; }
    }
    if (step === 4) {
      if (!formData.preferredLearningStyle) { toast.error("Preferred learning style is required"); return false; }
      if (!formData.goals) { toast.error("Goals are required"); return false; }
      if (!formData.classTime) { toast.error("Please select a class time"); return false; }
      if (formData.classTime === "Other" && !formData.otherClassTime) { toast.error("Please specify your preferred class time"); return false; }
      if (!formData.agreeToTerms) { toast.error("Please respond to the terms and conditions"); return false; }
      if (formData.agreeToTerms === "No") { toast.error("You must agree to the terms to enroll"); return false; }
    }
    return true;
  };

  const handleNext = () => { if (validateStep()) setStep(s => s + 1); };
  const handleBack = () => setStep(s => s - 1);

  const resetForm = () => {
    setFormData({
      studentName: "", parentName: "", email: "", phone: "",
      studentAge: "", westernEducationLevel: "", lastSchoolAttended: "",
      nationality: "", parentGuardianContact: "", nextOfKinContact: "",
      studiedQuranBefore: "", previousQuranLevel: "", needsQuranReadingHelp: "",
      levelOfStudyInterested: "", selectedCourses: [], preferredLearningStyle: "",
      goals: "", whyInterestedInSchool: "", classTime: "", otherClassTime: "", agreeToTerms: "",
    });
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep() || !enrollmentOpen) return;
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedCourses: formData.selectedCourses.join(", "),
          program: formData.selectedCourses.join(", "),
          grade: formData.westernEducationLevel,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Something went wrong. Please try again."); return; }
      toast.success("Application submitted successfully 🎉");
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setShowApplyModal(false); resetForm(); }, 3000);
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
      if (!res.ok) { toast.error("Failed to save. Please try again."); return; }
      setIsWaitlistSubmitted(true);
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  const closeModal = () => {
    setShowApplyModal(false);
    setIsWaitlistSubmitted(false);
    setWaitlistData({ name: "", phone: "", email: "" });
    resetForm();
  };

  const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400";
  const selectClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-700";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  const ProgressBar = () => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        {["Personal Info", "Quran Background", "Course Selection", "Preferences"].map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors
              ${i + 1 < step ? 'bg-emerald-600 text-white' :
                i + 1 === step ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' :
                'bg-gray-100 text-gray-400'}`}>
              {i + 1 < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[10px] text-center hidden sm:block ${i + 1 === step ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={() => setShowApplyModal(true)}
        className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Enroll Today
      </button>

      <Modal isOpen={showApplyModal} onClose={closeModal}>
        <div className="p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${enrollmentOpen ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                {enrollmentOpen
                  ? <GraduationCap className="w-6 h-6 text-emerald-600" />
                  : <BellRing className="w-6 h-6 text-amber-600" />}
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
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* ── ENROLLMENT CLOSED ── */}
          {!enrollmentOpen && (
            <>
              {isWaitlistSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    We have saved your details. We will contact you on WhatsApp or email as soon as enrollment opens again.
                  </p>
                  <button onClick={closeModal}
                    className="mt-6 px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-amber-800 mb-1">Enrollment is Currently Closed</p>
                        <p className="text-sm text-amber-700 leading-relaxed">
                          We are not accepting new applications at this time. Leave your contact details below and we will reach out to you on WhatsApp as soon as enrollment opens again.
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Your full name" value={waitlistData.name}
                          onChange={e => setWaitlistData({ ...waitlistData, name: e.target.value })}
                          className={inputClass} required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>WhatsApp Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="tel" placeholder="+234 xxx xxx xxxx" value={waitlistData.phone}
                          onChange={e => setWaitlistData({ ...waitlistData, phone: e.target.value })}
                          className={inputClass} required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="email" placeholder="your@email.com" value={waitlistData.email}
                          onChange={e => setWaitlistData({ ...waitlistData, email: e.target.value })}
                          className={inputClass} />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <button type="button" onClick={closeModal}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                        Cancel
                      </button>
                      <button type="submit"
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                        <BellRing className="w-4 h-4" /> Notify Me When Open
                      </button>
                    </div>
                    <p className="text-xs text-center text-gray-400">We will only contact you when enrollment is open. No spam.</p>
                  </form>
                </>
              )}
            </>
          )}

          {/* ── ENROLLMENT OPEN ── */}
          {enrollmentOpen && (
            <>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-2">شكراً لتسجيلكم — Thank you for registering</p>
                  <p className="text-sm text-gray-500">Our admissions team will contact you within 2-3 business days</p>
                </div>
              ) : (
                <>
                  <ProgressBar />
                  <form onSubmit={handleSubmit}>

                    {/* ── STEP 1 ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                          <p className="text-sm text-emerald-800"><strong>Step 1 of 4 — Personal Information</strong></p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className={labelClass}>Student Full Name / اسم الطالب *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input type="text" name="studentName" value={formData.studentName}
                                onChange={handleInputChange} placeholder="Enter student's full name"
                                className={inputClass} required />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Parent/Guardian Name *</label>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input type="text" name="parentName" value={formData.parentName}
                                onChange={handleInputChange} placeholder="Parent or guardian full name"
                                className={inputClass} required />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Email Address *</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input type="email" name="email" value={formData.email}
                                onChange={handleInputChange} placeholder="your.email@example.com"
                                className={inputClass} required />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Phone/WhatsApp Number *</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input type="tel" name="phone" value={formData.phone}
                                onChange={handleInputChange} placeholder="+234 xxx xxx xxxx"
                                className={inputClass} required />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Student Age Group *</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <select name="studentAge" value={formData.studentAge}
                                onChange={handleInputChange} className={selectClass} required>
                                <option value="">Select age</option>
                                <option value="6-12">Children (6-12 years)</option>
                                <option value="13-18">Teens (13-18 years)</option>
                                <option value="19-30">Young Adults (19-30 years)</option>
                                <option value="31-50">Adults (31-50 years)</option>
                                <option value="51+">Elderly Women (51 years and above)</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>Western Education Level *</label>
                            <div className="relative">
                              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <select name="westernEducationLevel" value={formData.westernEducationLevel}
                                onChange={handleInputChange} className={selectClass} required>
                                <option value="">Select level</option>
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Tertiary">Tertiary</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Last School Attended *</label>
                          <div className="relative">
                            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" name="lastSchoolAttended" value={formData.lastSchoolAttended}
                              onChange={handleInputChange} placeholder="Enter your last school name"
                              className={inputClass} required />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Nationality *</label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" name="nationality" value={formData.nationality}
                              onChange={handleInputChange} placeholder="e.g. Nigerian"
                              className={inputClass} required />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>
                            Parent/Guardian Contact
                            <span className="text-gray-400 font-normal ml-1">(Required for children & teens)</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="tel" name="parentGuardianContact" value={formData.parentGuardianContact}
                              onChange={handleInputChange} placeholder="+234 xxx xxx xxxx" className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>
                            Next of Kin Contact
                            <span className="text-gray-400 font-normal ml-1">(Required for young adults/adults/elderly women)</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="tel" name="nextOfKinContact" value={formData.nextOfKinContact}
                              onChange={handleInputChange} placeholder="+234 xxx xxx xxxx" className={inputClass} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                          <p className="text-sm text-emerald-800"><strong>Step 2 of 4 — Quran & Study Background</strong></p>
                        </div>
                        <div>
                          <label className={labelClass}>Have you studied Quran before? *</label>
                          <div className="flex gap-3">
                            {["Yes", "No"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, studiedQuranBefore: opt }))}
                                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                                  ${formData.studiedQuranBefore === opt
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        {formData.studiedQuranBefore === "Yes" && (
                          <div>
                            <label className={labelClass}>If yes, what was your previous level of study?</label>
                            <div className="flex gap-3">
                              {["Beginner", "Intermediate", "Advanced"].map(opt => (
                                <button key={opt} type="button"
                                  onClick={() => setFormData(p => ({ ...p, previousQuranLevel: opt }))}
                                  className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                                    ${formData.previousQuranLevel === opt
                                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                      : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <label className={labelClass}>Do you need help with Quran reading?</label>
                          <div className="flex gap-3">
                            {["Yes", "No"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, needsQuranReadingHelp: opt }))}
                                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                                  ${formData.needsQuranReadingHelp === opt
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>What level of study are you interested in? *</label>
                          <div className="flex gap-3">
                            {["Beginner", "Intermediate", "Advanced"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, levelOfStudyInterested: opt }))}
                                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                                  ${formData.levelOfStudyInterested === opt
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3 ── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                          <p className="text-sm text-emerald-800"><strong>Step 3 of 4 — Course Selection</strong></p>
                        </div>
                        <div>
                          <label className={labelClass}>Which course(s) would you like to enroll in? *</label>
                          {activeCourses.length === 0 ? (
                            <div className="text-center py-8 bg-amber-50 rounded-xl border border-amber-200">
                              <p className="text-sm font-semibold text-amber-700">No courses are currently active.</p>
                              <p className="text-xs text-amber-600 mt-1">Please contact the school directly to enroll.</p>
                            </div>
                          ) : (
                            <>
                              <div className={`text-xs font-semibold mb-3 px-3 py-2 rounded-lg
                                ${formData.selectedCourses.length < 2 ? 'bg-amber-50 text-amber-700' :
                                  formData.selectedCourses.length === 3 ? 'bg-blue-50 text-blue-700' :
                                  'bg-emerald-50 text-emerald-700'}`}>
                                {formData.selectedCourses.length === 0 && "Select minimum 2 and maximum 3 courses"}
                                {formData.selectedCourses.length === 1 && "Select 1 more course (minimum 2 required)"}
                                {formData.selectedCourses.length === 2 && `${formData.selectedCourses.length} courses selected ✓ (you may select 1 more)`}
                                {formData.selectedCourses.length === 3 && `${formData.selectedCourses.length} courses selected — maximum reached`}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {activeCourses.map(course => {
                                  const selected = formData.selectedCourses.includes(course);
                                  const maxReached = formData.selectedCourses.length >= 3 && !selected;
                                  return (
                                    <button key={course} type="button"
                                      onClick={() => handleCourseToggle(course)}
                                      disabled={maxReached}
                                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-medium text-left transition-colors
                                        ${selected ? 'border-emerald-500 bg-emerald-50 text-emerald-700' :
                                          maxReached ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' :
                                          'border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50'}`}>
                                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors
                                        ${selected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                                        {selected && <CheckSquare className="w-3 h-3 text-white" />}
                                      </div>
                                      {course}
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── STEP 4 ── */}
                    {step === 4 && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                          <p className="text-sm text-emerald-800"><strong>Step 4 of 4 — Preferences & Agreement</strong></p>
                        </div>
                        <div>
                          <label className={labelClass}>What is your preferred learning style? *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Group Learning", "One-on-One Sessions", "Flexible", "Self-Paced Learning"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, preferredLearningStyle: opt }))}
                                className={`py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-colors text-left
                                  ${formData.preferredLearningStyle === opt
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>What are your goals for this course? *</label>
                          <div className="relative">
                            <Heart className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea name="goals" value={formData.goals} onChange={handleInputChange}
                              rows={3} placeholder="Describe your learning goals..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-gray-700 placeholder-gray-400"
                              required />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Why are you interested in joining this online Quran school?</label>
                          <div className="relative">
                            <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea name="whyInterestedInSchool" value={formData.whyInterestedInSchool}
                              onChange={handleInputChange} rows={3} placeholder="Tell us why you want to join..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none text-gray-700 placeholder-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>General Class Time *</label>
                          <div className="space-y-2">
                            {["Wednesdays (5:00 PM - 5:30 PM) NGT", "Fridays (5:00 PM - 5:30 PM) NGT", "Sundays (5:30 PM - 6:00 PM) NGT", "Other"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, classTime: opt }))}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-medium text-left transition-colors
                                  ${formData.classTime === opt
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    : 'border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formData.classTime === "Other" && (
                            <div className="mt-3">
                              <input type="text" name="otherClassTime" value={formData.otherClassTime}
                                onChange={handleInputChange}
                                placeholder="Please specify your preferred time (for private students)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
                                required />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Do you agree to the school&apos;s terms and conditions? *</label>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              📢 <strong>Please note:</strong> The primary communication platform for announcements will be <strong>Telegram</strong>, in shaa Allaah.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            {["Yes", "No"].map(opt => (
                              <button key={opt} type="button"
                                onClick={() => setFormData(p => ({ ...p, agreeToTerms: opt }))}
                                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-colors
                                  ${formData.agreeToTerms === opt
                                    ? opt === "Yes"
                                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                      : 'border-red-400 bg-red-50 text-red-600'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formData.agreeToTerms === "No" && (
                            <p className="text-xs text-red-500 mt-2">
                              You must agree to the terms and conditions to complete your enrollment.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6 mt-2 border-t border-gray-100">
                      {step > 1 ? (
                        <button type="button" onClick={handleBack}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
                          <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                      ) : (
                        <button type="button" onClick={closeModal}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                          Cancel
                        </button>
                      )}
                      {step < totalSteps ? (
                        <button type="button" onClick={handleNext}
                          className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                          Next <ArrowRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button type="submit"
                          className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                          Submit Application <ArrowRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Registerbtn;