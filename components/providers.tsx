"use client"

import type React from "react"

import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

/**
 * Global client-side providers.
 * Extend this if you add more React Context providers later.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      {/* Toast notifications available everywhere */}
      <Toaster />
    </AuthProvider>
  )
}
