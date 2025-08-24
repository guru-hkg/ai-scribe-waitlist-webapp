import { AdminHeader } from "@/components/admin-header"
import { AdminSettings } from "@/components/admin-settings"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Settings</h1>
          <AdminSettings />
        </div>
      </main>
    </div>
  )
}
