import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "KrishiMitra — AI Farm Advisory & Multi-Role Mandi Ecosystem",
  description: "AI Sell Advisor, Buyer Recommendations, Market Intelligence, and Storage Advice for farmers, buyers, investors, and traders.",
  metadataBase: new URL("https://krishi-mitra-git-main-akarshas-projects-0572edd8.vercel.app"),
  openGraph: {
    title: "KrishiMitra — AI Farm Advisory & Multi-Role Mandi Ecosystem",
    description: "Multi-role Mandi platform providing real-time APMC price forecasts, direct procurement RFQs, yield ROI models, and voice AI.",
    url: "https://krishi-mitra-git-main-akarshas-projects-0572edd8.vercel.app",
    siteName: "KrishiMitra AI Platform",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "KrishiMitra Agricultural Advisory Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KrishiMitra — AI Farm Advisory & Multi-Role Mandi Ecosystem",
    description: "Multi-role Mandi platform providing real-time APMC price forecasts, direct procurement RFQs, yield ROI models, and voice AI.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
            <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
              <p>© 2026 KrishiMitra 🌾 — AI Farm Advisory & Multi-Role Mandi Ecosystem. Built with Next.js & KrishiMitra AI Engine.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
