import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "KrishiMitra — AI Farm Advisory & Market Intelligence",
  description: "AI Sell Advisor, Buyer Recommendations, Market Intelligence, and Storage Advice for farmers.",
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
              <p>© 2026 KrishiMitra 🌾 — AI Farm Advisory & Market Intelligence. Built with Next.js, FastAPI & Supabase.</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
