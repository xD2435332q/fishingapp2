"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Auth() {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      disabled={loading}
    >
      {loading ? "Cargando..." : "Iniciar sesión con Google"}
    </button>
  )
}

