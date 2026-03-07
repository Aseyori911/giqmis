import { supabaseAdmin } from '@/lib/superbase-admin'
import { sendTeacherApplicationConfirmation } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName,
      gender,
      countryCity,
      email,
      whatsapp,
      teachingMode,
      subjects,
      yearsExperience,
      qualifications,
      hasIjazah,
      ijazahDetails,
      islamicMethodology,
      scholarsFollow,
      engagementType,
      teachingAvailability,
      weeklyAvailability,
      taughtFemalesBefore,
      whyTeachHere,
    } = body

    if (!fullName || !email || !whatsapp) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('teacher_applications')
      .insert([{
        full_name:              fullName.trim(),
        gender:                 gender || null,
        country_city:           countryCity?.trim() || null,
        email:                  email.trim().toLowerCase(),
        whatsapp:               whatsapp.trim(),
        teaching_mode:          teachingMode || null,
        subjects:               subjects?.trim() || null,
        years_experience:       yearsExperience || null,
        qualifications:         qualifications?.trim() || null,
        has_ijazah:             hasIjazah || null,
        ijazah_details:         ijazahDetails?.trim() || null,
        islamic_methodology:    islamicMethodology?.trim() || null,
        scholars_follow:        scholarsFollow?.trim() || null,
        engagement_type:        engagementType || null,
        teaching_availability:  teachingAvailability || null,
        weekly_availability:    weeklyAvailability?.trim() || null,
        taught_females_before:  taughtFemalesBefore || null,
        why_teach_here:         whyTeachHere?.trim() || null,
        status: 'pending',
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    // Send confirmation email — non-blocking
    await sendTeacherApplicationConfirmation({
      fullName:     fullName.trim(),
      email:        email.trim().toLowerCase(),
      teachingMode: teachingMode || 'Not specified',
      subjects:     subjects?.trim() || 'Not specified',
    })

    return NextResponse.json({ success: true, applicationId: data.id }, { status: 201 })

  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabaseAdmin
      .from('teacher_applications')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (status && status !== 'all') query = query.eq('status', status)
    if (search) query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%`
    )

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ applications: data || [] })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, admin_notes } = await req.json()
    const { error } = await supabaseAdmin
      .from('teacher_applications')
      .update({ status, ...(admin_notes !== undefined && { admin_notes }) })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const { error } = await supabaseAdmin
      .from('teacher_applications')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}