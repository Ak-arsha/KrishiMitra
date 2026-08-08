"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  Leaf,
  LayoutDashboard,
  TrendingUp,
  Users,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  LogOut,
  MapPin,
  Menu,
  X,
  Sparkles,
  Volume2,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "डैशबोर्ड / Dashboard", icon: LayoutDashboard },
  { href: "/sell-advisor", label: "कब बेचें? / Sell Advisor", icon: TrendingUp },
  { href: "/buyer-recommendations", label: "खरीदार / Buyers", icon: Users },
  { href: "/market-intelligence", label: "मंडी भाव / Market Feed", icon: Newspaper },
  { href: "/explainable-ai", label: "कारण समझें / AI Insights", icon: Brain },
  { href: "/voice-assistant", label: "आवाज़ सहायक / Voice", icon: Mic },
  { href: "/storage-advisor", label: "भंडारण / Storage", icon: Warehouse },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-md">
      {/* Top Ticker Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-green-950 text-white text-xs font-semibold py-1.5 px-4 overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-emerald-400/30 flex items-center gap-1">
            <Sparkles size={12} className="animate-spin" /> LIVE MANDI RATES
          </span>
        </div>

        <div className="truncate text-emerald-100/90 font-medium px-4 text-center">
          🌾 गेहूँ (Wheat): ₹2,450 (+₹45) | 🌾 धान (Paddy): ₹2,183 (MSP) | 🌼 सरसों (Mustard): ₹5,720 (+₹80) | 🫘 सोयाबीन (Soybean): ₹4,650
        </div>

        <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-amber-300">
          🇮🇳 kisan.mitra@ai
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-600 via-green-600 to-teal-500 rounded-2xl text-white shadow-lg shadow-emerald-200 group-hover:scale-105 transition duration-200">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900 tracking-tight leading-none block">
                Krishi<span className="text-emerald-600">Mitra</span>
              </span>
              <span className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase block">
                किसान मित्र एआई
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {user && (
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-emerald-100 text-emerald-900 shadow-sm border border-emerald-200"
                        : "text-gray-700 hover:text-emerald-800 hover:bg-emerald-50/60"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-emerald-700" : "text-gray-500"}`} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <Link
                  href="/voice-assistant"
                  className="flex items-center gap-1.5 text-xs font-black text-purple-700 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 shadow-sm transition active:scale-95 animate-pulse"
                >
                  <Mic className="h-4 w-4 text-purple-600" />
                  <span>आवाज़ सहायक</span>
                </Link>

                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200">
                  <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow">
                    {user.full_name?.charAt(0).toUpperCase() || "K"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-gray-900 leading-tight">
                      {user.full_name || "Kisan User"}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold leading-tight flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5 inline" />
                      {user.location_name || "Rajasthan, India"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl border border-red-200 transition active:scale-95"
                  title="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-teal-700 px-4 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition active:scale-95"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link
                href="/voice-assistant"
                className="p-2 text-purple-700 bg-purple-50 rounded-xl border border-purple-200"
              >
                <Mic className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2">
          {user ? (
            <>
              <div className="p-3 bg-emerald-50 rounded-2xl mb-3 border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow">
                  {user.full_name?.charAt(0).toUpperCase() || "K"}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.full_name || "Kisan User"}</p>
                  <p className="text-xs text-emerald-700 font-semibold">{user.location_name || "India"}</p>
                </div>
              </div>

              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                      active ? "bg-emerald-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 py-3 rounded-xl border border-red-200 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-bold text-gray-700 bg-gray-100 py-3 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-bold text-white bg-emerald-600 py-3 rounded-xl"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
