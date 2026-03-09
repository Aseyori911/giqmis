"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GraduationCap, BellRing, CheckCircle, X, ArrowLeft, ArrowRight,
} from "lucide-react";
import Modal from "@/components/herobtn/modal";
import ProgressBar from "@/components/herobtn/progressBar";
import WaitlistForm from "@/components/herobtn/waitlistForm";
import StepOne from "@/components/herobtn/stepOne";
import StepTwo from "@/components/herobtn/stepTwo";
import StepThree from "@/components/herobtn/stepThree";
import StepFour from "@/components/herobtn/stepFour";
import { FormData, WaitlistData } from "@/components/herobtn/types";
import { INITIAL_FORM_DATA } from "@/components/herobtn/data";

const TOTAL_STEPS = 4;

export default function SpecialCourse() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);
  const [activeCourses, setActiveCourses] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [waitlistData, setWaitlistData] = useState<WaitlistData>({
    name: "", phone: "", email: "",
  });

  useEffect(() => {
    if (!showApplyModal) return;
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const s = data.settings || {};
        setEnrollmentOpen(s.enrollment_open !== "false");

        // ✅ Fetch special courses (not regular programs)
        if (s.custom_special_courses) {
          try {
            const saved: { id: string; label: string; active: boolean }[] = JSON.parse(s.custom_special_courses);
            setActiveCourses(saved.filter((p) => p.active).map((p) => p.label));
          } catch {
            setActiveCourses([]);
          }
        } else {
          setActiveCourses([]);
        }
      })
      .catch(() => {});
  }, [showApplyModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (formData.selectedCourses.length < 1) { toast.error("Please select at least 1 course"); return false; }
    }
    if (step === 4) {
      if (!formData.preferredLearningStyle) { toast.error("Preferred learning style is required"); return false; }
      if (!formData.goals) { toast.error("Goals are required"); return false; }
      if (!formData.classType) { toast.error("Please select a class preference"); return false; }
      if (formData.classType === "private" && formData.privateClassSlots.length < 2) {
        toast.error("Please add at least 2 slots for your private class"); return false;
      }
      if (!formData.agreeToTerms) { toast.error("Please respond to the terms and conditions"); return false; }
      if (formData.agreeToTerms === "No") { toast.error("You must agree to the terms to enroll"); return false; }
    }
    return true;
  };

  const resetForm = () => { setFormData(INITIAL_FORM_DATA); setStep(1); };
  const handleNext = () => { if (validateStep()) setStep((s) => s + 1); };
  const handleBack = () => setStep((s) => s - 1);

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
          classTime: formData.classType === "general"
            ? "General Class (Wed, Fri, Sun)"
            : `Private Class — ${formData.privateClassSlots.map((s) => `${s.day} @ ${s.time}`).join(" | ")}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Something went wrong."); return; }
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

  return (
    <div>
      <button
        onClick={() => setShowApplyModal(true)}
        className="flex items-center gap-2 text-white bg-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
      >
        Enroll Today <ArrowRight size={15} />
      </button>

      <Modal isOpen={showApplyModal} onClose={closeModal}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${enrollmentOpen ? "bg-orange-100" : "bg-amber-100"}`}>
                {enrollmentOpen
                  ? <GraduationCap className="w-6 h-6 text-orange-600" />
                  : <BellRing className="w-6 h-6 text-amber-600" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {enrollmentOpen ? "School Enrollment" : "Join the Waitlist"}
                </h2>
                <p className="text-sm text-gray-500">
                  {enrollmentOpen
                    ? "تسجيل في المدرسة"
                    : "Be the first to know when enrollment opens"}
                </p>
              </div>
            </div>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Enrollment Closed */}
          {!enrollmentOpen && (
            <WaitlistForm
              waitlistData={waitlistData}
              onChange={setWaitlistData}
              onSubmit={handleWaitlistSubmit}
              onCancel={closeModal}
              isSubmitted={isWaitlistSubmitted}
              onClose={closeModal}
            />
          )}

          {/* Enrollment Open */}
          {enrollmentOpen && (
            <>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-2">شكراً لتسجيلكم — Thank you for registering</p>
                  <p className="text-sm text-gray-500">
                    Our admissions team will contact you within 2-3 business days
                  </p>
                </div>
              ) : (
                <>
                  <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
                  <form onSubmit={handleSubmit}>
                    {step === 1 && <StepOne formData={formData} onChange={handleInputChange} />}
                    {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
                    {step === 3 && (
                      <StepThree
                        formData={formData}
                        setFormData={setFormData}
                        activeCourses={activeCourses}
                        min={1}
                        max={Infinity}
                      />
                    )}
                    {step === 4 && (
                      <StepFour
                        formData={formData}
                        onChange={handleInputChange}
                        setFormData={setFormData}
                      />
                    )}

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
                      {step < TOTAL_STEPS ? (
                        <button type="button" onClick={handleNext}
                          className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                          Next <ArrowRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button type="submit"
                          className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
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
}