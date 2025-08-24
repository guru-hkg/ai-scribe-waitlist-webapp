"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin/logout", { method: "POST" })
      router.push("/auth/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin" className="flex items-center">
            <Image src="/hikigai-logo.png" alt="Hikigai Inc." width={40} height={40} className="mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hikigai Admin</h1>
              <p className="text-sm text-gray-500">Waitlist Dashboard</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
