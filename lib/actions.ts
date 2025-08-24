"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitWaitlistForm(prevState: any, formData: FormData) {
  const supabase = createServerClient()

  if (!supabase) {
    return { error: "Database connection not available" }
  }

  const fullName = formData.get("fullName")?.toString()
  const clinicName = formData.get("clinicName")?.toString()
  const workEmail = formData.get("workEmail")?.toString()
  const mobileNumber = formData.get("mobileNumber")?.toString()
  const newsletterSignup = formData.get("newsletterSignup") === "on"

  // Validate required fields
  if (!fullName || !clinicName || !workEmail || !mobileNumber) {
    return { error: "All fields are required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(workEmail)) {
    return { error: "Please enter a valid email address" }
  }

  // Basic mobile number validation (10+ digits)
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  if (!phoneRegex.test(mobileNumber)) {
    return { error: "Please enter a valid mobile number" }
  }

  try {
    const { error } = await supabase.from("waitlist_signups").insert({
      full_name: fullName,
      clinic_name: clinicName,
      work_email: workEmail,
      mobile_number: mobileNumber,
      newsletter_signup: newsletterSignup,
    })

    if (error) {
      console.error("Database error:", error)
      return { error: "Failed to submit form. Please try again." }
    }

    revalidatePath("/")
    return { success: "Thank you for joining our waitlist! We'll be in touch soon." }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function adminSignIn(prevState: any, formData: FormData) {
  const supabase = createServerClient()

  if (!supabase) {
    return { error: "Database connection not available" }
  }

  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // Check admin credentials against our admin_users table
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single()

    if (error || !adminUser) {
      return { error: "Invalid credentials" }
    }

    // In a real app, you'd hash and compare passwords properly
    // For now, we'll use a simple comparison (NOT recommended for production)
    if (adminUser.password_hash !== password) {
      return { error: "Invalid credentials" }
    }

    return { success: true, adminId: adminUser.id }
  } catch (error) {
    console.error("Admin sign in error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
