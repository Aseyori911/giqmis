"use client"
import React, { useState, useEffect } from "react"

const ApplyNow = () => {
  const [showApplyModal, setShowApplyModal] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [enrollmentOpen, setEnrollmentOpen] = useState(true)
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
  })

  const activePrograms = [
    { id: 1, label: "Full-time" },
    { id: 2, label: "Part-time" },
  ]

  // Fetch enrollment status from settings
  useEffect(() => {
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(data => {
        const s = data.settings || {}
        setEnrollmentOpen(s.enrollment_open !== "false")
      })
      .catch(() => {})
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enrollmentOpen) return

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Something went wrong. Please try again.")
        return
      }

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setShowApplyModal(false)
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
        })
      }, 3000)
    } catch {
      alert("Network error. Please check your connection and try again.")
    }
  }

  if (!showApplyModal) return null

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">School Enrollment</h2>

      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 text-sm">Our admissions team will contact you within 2-3 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="studentName"
            placeholder="Student Name *"
            value={formData.studentName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

          <input
            type="text"
            name="parentName"
            placeholder="Parent / Guardian Name *"
            value={formData.parentName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />

          <select
            name="studentAge"
            value={formData.studentAge}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select Age</option>
            <option value="4-5">4-5 years</option>
            <option value="6-7">6-7 years</option>
            <option value="8-9">8-9 years</option>
            <option value="10-11">10-11 years</option>
            <option value="12-13">12-13 years</option>
            <option value="14-15">14-15 years</option>
            <option value="16+">16+ years</option>
          </select>

          <select
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Grade Level</option>
            <option value="Pre-Kindergarten">Pre-Kindergarten</option>
            <option value="Kindergarten">Kindergarten</option>
            <option value="1st Grade">1st Grade</option>
            <option value="2nd Grade">2nd Grade</option>
            <option value="3rd Grade">3rd Grade</option>
            <option value="4th Grade">4th Grade</option>
            <option value="5th Grade">5th Grade</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
          </select>

          <select
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select Program</option>
            {activePrograms.map(p => (
              <option key={p.id} value={p.label}>{p.label}</option>
            ))}
          </select>

          <textarea
            name="previousExperience"
            placeholder="Previous Arabic / Islamic Education Experience"
            value={formData.previousExperience}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />

          <textarea
            name="goals"
            placeholder="Learning Goals & Expectations"
            value={formData.goals}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />

          {/* Enrollment closed warning */}
          {!enrollmentOpen && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg text-sm font-semibold">
              ⚠ Enrollment is currently closed. Applications are not being accepted.
            </div>
          )}

          <button
            type="submit"
            disabled={!enrollmentOpen}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors
              ${enrollmentOpen
                ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }`}
          >
            {enrollmentOpen ? "Submit Application" : "⚠ Enrollment Closed"}
          </button>

        </form>
      )}
    </div>
  )
}

export default ApplyNow