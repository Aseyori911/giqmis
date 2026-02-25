// app/api/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentName, parentName, email, phone, studentAge, grade, program, previousExperience, goals } = body

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
        student_name: studentName.trim(),
        parent_name: parentName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        student_age: studentAge || null,
        grade: grade || null,
        program: program || null,
        previous_experience: previousExperience?.trim() || null,
        goals: goals?.trim() || null,
        status: 'pending',
      }])
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, applicationId: data.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}