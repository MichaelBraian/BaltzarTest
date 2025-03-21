import "./globals.css"
import { Providers } from "../components/providers"

export const metadata = {
  title: "Baltzar Tandvård",
  description: "Baltzar Tandvård - Modern tandvård i Halmstad",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Baltzar Tandvård"
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false
  }
}

// Mobile-first viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased scroll-fixed overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
