import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcryptjs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function debugAdminUsers() {
  console.log("🔍 Debugging admin users table...")

  try {
    // Check if admin_users table exists and get all records
    const { data: adminUsers, error } = await supabase.from("admin_users").select("*")

    if (error) {
      console.error("❌ Error querying admin_users table:", error)
      return
    }

    console.log(`📊 Found ${adminUsers.length} admin user(s):`)

    if (adminUsers.length === 0) {
      console.log("⚠️  No admin users found in database!")
      console.log("💡 You may need to run the admin user setup scripts")
      return
    }

    // Check each admin user
    for (const user of adminUsers) {
      console.log(`\n👤 Admin User:`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Active: ${user.is_active}`)
      console.log(`   Created: ${user.created_at}`)
      console.log(`   Password Hash: ${user.password_hash.substring(0, 20)}...`)

      // Test password verification
      const testPassword = "HikigaiAdmin2024!"
      try {
        const isValid = await bcrypt.compare(testPassword, user.password_hash)
        console.log(`   Password Test (${testPassword}): ${isValid ? "✅ VALID" : "❌ INVALID"}`)
      } catch (bcryptError) {
        console.log(`   Password Test Error: ${bcryptError.message}`)
      }
    }

    // Test creating a fresh hash for comparison
    console.log("\n🔐 Testing fresh password hash generation:")
    const freshHash = await bcrypt.hash("HikigaiAdmin2024!", 12)
    console.log(`   Fresh hash: ${freshHash.substring(0, 20)}...`)

    const freshTest = await bcrypt.compare("HikigaiAdmin2024!", freshHash)
    console.log(`   Fresh hash test: ${freshTest ? "✅ VALID" : "❌ INVALID"}`)
  } catch (error) {
    console.error("❌ Unexpected error:", error)
  }
}

// Run the debug function
debugAdminUsers()
