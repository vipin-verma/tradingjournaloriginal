import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { TradeProvider } from "@/components/trade-context";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Trading Journal",
  description: "Advanced Trading Journal Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <TradeProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </div>
            <main className="md:pl-64 flex-1 h-full overflow-y-auto">
              {children}
            </main>
          </div>
        </TradeProvider>
      </body>
    </html>
  )
}
