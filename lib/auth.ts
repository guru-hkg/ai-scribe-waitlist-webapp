import { cookies } from "next/headers"

export interface AdminUser {
  adminId: string
  email: string
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = cookies()
    const adminSession = cookieStore.get("admin-session")?.value

    if (!adminSession) {
      return null
    }

    // Simple session validation - in production you'd want more security
    const sessionData = JSON.parse(adminSession)

    // Verify the session is still valid (you could add timestamp checks here)
    if (sessionData.email && sessionData.adminId) {
      return sessionData as AdminUser
    }

    return null
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export async function createAdminSession(email: string, adminId: string) {
  const cookieStore = cookies()
  const sessionData = JSON.stringify({ email, adminId })

  cookieStore.set("admin-session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAdminSession() {
  const cookieStore = cookies()
  cookieStore.delete("admin-session")
}

export function requireAdmin() {
  return async function middleware() {
    const admin = await getAdminUser()
    if (!admin) {
      throw new Error("Unauthorized")
    }
    return admin
  }
}
