import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "KrishiMitra — AI Farm Advisory",
  description: "AI Sell Advisor, Buyer Recommendations, Market Intelligence, and more for farmers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen">
            <Sidebar />
            <div className="md:pl-64">
              <Topbar />
              <main className="p-4 md:p-8 max-w-6xl mx-auto">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
