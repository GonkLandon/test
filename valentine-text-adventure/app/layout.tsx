import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const vt323 = VT323({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "A Special Quest",
  description: "An adventure awaits...",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
