import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
      from: (table: string) => ({
        insert: (data: any) => ({
          select: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
        select: (columns?: string) => ({
          eq: (column: string, value: any) => ({
            single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            limit: (count: number) => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
          }),
          limit: (count: number) => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
          order: (column: string, options?: any) =>
            Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
        }),
        update: (data: any) => ({
          eq: (column: string, value: any) =>
            Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
        delete: () => ({
          eq: (column: string, value: any) =>
            Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
    }
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
})

export const createServerClient = createClient
