import { AdminLoginForm } from "@/components/admin-login-form"
import Image from "next/image"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image src="/hikigai-logo.png" alt="Hikigai Inc." width={60} height={60} className="mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hikigai Inc.</h1>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Access the waitlist management dashboard</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  )
}
