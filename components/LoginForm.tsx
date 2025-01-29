"use client"

import { useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
      redirectTo={`${window.location.origin}/auth/callback?redirectTo=${redirectTo}`}
    />
  )
}

