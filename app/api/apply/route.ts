import { supabaseAdmin } from '@/lib/superbase-admin'
import { NextRequest, NextResponse } from 'next/server'
import { sendApplicationConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      studentName,
      parentName,
      email,
      phone,
      studentAge,
      westernEducationLevel,
      lastSchoolAttended,
      nationality,
      parentGuardianContact,
      nextOfKinContact,
      studiedQuranBefore,
      previousQuranLevel,
      needsQuranReadingHelp,
      levelOfStudyInterested,
      selectedCourses,
      preferredLearningStyle,
      goals,
      whyInterestedInSchool,
      classTime,
      agreeToTerms,
      attendanceMode,
    } = body

    if (!studentName || !parentName || !email || !phone) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert([{
        student_name:               studentName.trim(),
        parent_name:                parentName.trim(),
        email:                      email.trim().toLowerCase(),
        phone:                      phone.trim(),
        student_age:                studentAge || null,
        program:                    selectedCourses || null,
        goals:                      goals?.trim() || null,
        grade:                      westernEducationLevel || null,
        western_education_level:    westernEducationLevel || null,
        last_school_attended:       lastSchoolAttended?.trim() || null,
        nationality:                nationality?.trim() || null,
        parent_guardian_contact:    parentGuardianContact?.trim() || null,
        next_of_kin_contact:        nextOfKinContact?.trim() || null,
        studied_quran_before:       studiedQuranBefore || null,
        previous_quran_level:       previousQuranLevel || null,
        needs_quran_reading_help:   needsQuranReadingHelp || null,
        level_of_study_interested:  levelOfStudyInterested || null,
        selected_courses:           selectedCourses || null,
        preferred_learning_style:   preferredLearningStyle || null,
        why_interested:             whyInterestedInSchool?.trim() || null,
        class_time:                 classTime || null,
        agree_to_terms:             agreeToTerms || null,
        attendance_mode:            attendanceMode || null,
        status: 'pending',
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    // Send confirmation email — runs after successful DB insert, won't block response if it fails
    await sendApplicationConfirmation({
      studentName: studentName.trim(),
      parentName:  parentName.trim(),
      email:       email.trim().toLowerCase(),
      selectedCourses: Array.isArray(selectedCourses)
        ? selectedCourses.join(', ')
        : selectedCourses || 'Not specified',
    })

    return NextResponse.json({ success: true, applicationId: data.id }, { status: 201 })

  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}