import { getAdminUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminDashboardPage() {
  const admin = await getAdminUser()

  if (!admin) {
    redirect("/admin/login")
  }

  return <AdminDashboard admin={admin} />
}
