import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Import Space Mono font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bufferlo CTF Team",
  description: "Elite cybersecurity capture the flag team",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
