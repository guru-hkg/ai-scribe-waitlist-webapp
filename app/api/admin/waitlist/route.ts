import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminUser } from "@/lib/auth"

async function verifyAdminAccess() {
  const admin = await getAdminUser()
  if (!admin) {
    throw new Error("No admin session")
  }
  return admin
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    await verifyAdminAccess()

    const supabase = createClient()

    // Get all waitlist signups
    const { data: signups, error } = await supabase
      .from("waitlist_signups")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch signups" }, { status: 500 })
    }

    // Get signup statistics
    const { data: stats, error: statsError } = await supabase
      .from("waitlist_signups")
      .select("created_at, newsletter_signup")

    if (statsError) {
      console.error("Stats error:", statsError)
      return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }

    // Calculate statistics
    const totalSignups = stats?.length || 0
    const newsletterSignups = stats?.filter((s) => s.newsletter_signup).length || 0

    // Get signups from last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentSignups = stats?.filter((s) => new Date(s.created_at) > sevenDaysAgo).length || 0

    return NextResponse.json({
      signups,
      stats: {
        total: totalSignups,
        newsletter: newsletterSignups,
        recent: recentSignups,
      },
    })
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
