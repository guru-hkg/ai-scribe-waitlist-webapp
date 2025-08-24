import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const ADMIN_EMAIL = "krish@hikigai.ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, clinicName, workEmail, mobileNumber, newsletterSignup } = body

    // Validate required fields
    if (!fullName || !clinicName || !workEmail || !mobileNumber) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create server-side Supabase client
    const supabase = createClient()

    // Insert into Supabase
    const { data, error } = await supabase
      .from("waitlist_signups")
      .insert([
        {
          full_name: fullName,
          clinic_name: clinicName,
          work_email: workEmail,
          mobile_number: mobileNumber,
          newsletter_signup: newsletterSignup,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
    }

    console.log(`[v0] New waitlist signup: ${fullName} from ${clinicName}`)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
