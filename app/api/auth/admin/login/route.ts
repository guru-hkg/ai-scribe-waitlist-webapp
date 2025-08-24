import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"
import { createAdminSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("Admin login attempt started")

    const { email, password } = await request.json()
    console.log("Login attempt for email:", email)

    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createClient()
    console.log("Supabase client created")

    try {
      // Get admin user from database
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("is_active", true)
        .single()

      console.log("Database query result:", { adminUser: adminUser ? "found" : "not found", error })

      if (error) {
        console.error("Database error details:", error)
        return NextResponse.json({ error: "Database error: " + error.message }, { status: 500 })
      }

      if (!adminUser) {
        console.log("No admin user found for email:", email)
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Verify password
      console.log("Verifying password...")
      const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)
      // const isValidPassword = password === "HikigaiAdmin2024!" && email === "krish@hikigai.ai"
      console.log("Password valid:", isValidPassword)

      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Create session
      console.log("Creating admin session...")
      await createAdminSession(adminUser.email, adminUser.id)
      console.log("Session created successfully")

      return NextResponse.json({
        success: true,
        user: {
          id: adminUser.id,
          email: adminUser.email,
        },
      })
    } catch (dbError) {
      console.error("Database operation error:", dbError)
      return NextResponse.json({ error: "Database operation failed: " + (dbError as Error).message }, { status: 500 })
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "Internal server error: " + (error as Error).message }, { status: 500 })
  }
}
