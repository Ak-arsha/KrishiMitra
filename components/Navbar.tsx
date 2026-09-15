"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  Leaf,
  LayoutDashboard,
  TrendingUp,
  ShoppingBag,
  PieChart,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  LogOut,
  MapPin,
  Menu,
  X,
  Sparkles,
  Building2,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (user?.role || "farmer").toLowerCase();

  // Role-Isolated Navigation Items
  const getNavItems = () => {
    if (role === "buyer") {
      return [
        { href: "/dashboard", label: "Procurement Hub", icon: LayoutDashboard },
        { href: "/buyer-portal", label: "Harvest Inventory", icon: ShoppingBag },
        { href: "/market-intelligence", label: "Market Rates", icon: Newspaper },
        { href: "/voice-assistant", label: "Voice AI", icon: Mic },
      ];
    }
    if (role === "investor") {
      return [
        { href: "/dashboard", label: "Investor Portal", icon: LayoutDashboard },
        { href: "/investor-analytics", label: "Commodity Analytics", icon: PieChart },
        { href: "/market-intelligence", label: "Market Rates", icon: Newspaper },
        { href: "/explainable-ai", label: "Market Signals", icon: Brain },
        { href: "/voice-assistant", label: "Voice AI", icon: Mic },
      ];
    }
    if (role === "trader") {
      return [
        { href: "/dashboard", label: "Trading Desk", icon: LayoutDashboard },
        { href: "/market-intelligence", label: "Market Rates", icon: Newspaper },
        { href: "/explainable-ai", label: "Price Spreads", icon: Brain },
        { href: "/voice-assistant", label: "Voice AI", icon: Mic },
      ];
    }
    // Default: Farmer
    return [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/sell-advisor", label: "Sell Advisor", icon: TrendingUp },
      { href: "/buyer-recommendations", label: "Buyer Matches", icon: ShoppingBag },
      { href: "/storage-advisor", label: "Storage Advisor", icon: Warehouse },
      { href: "/market-intelligence", label: "Market Feed", icon: Newspaper },
      { href: "/explainable-ai", label: "AI Insights", icon: Brain },
      { href: "/voice-assistant", label: "Voice AI", icon: Mic },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-900/40 shadow-xl text-white">
      {/* Top Live Mandi Ticker Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-800/30 text-xs font-semibold py-1.5 px-4 overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
            <Sparkles size={12} className="animate-spin text-emerald-400" /> LIVE APMC RATES
          </span>
        </div>

        <div className="truncate text-slate-300 font-medium px-4 text-center text-[11px] sm:text-xs">
          <span className="text-emerald-400 font-bold">Wheat:</span> ₹2,450/qtl (+₹45) &nbsp;|&nbsp;{" "}
          <span className="text-emerald-400 font-bold">Paddy:</span> ₹2,183/qtl (MSP) &nbsp;|&nbsp;{" "}
          <span className="text-emerald-400 font-bold">Mustard:</span> ₹5,720/qtl (+₹80) &nbsp;|&nbsp;{" "}
          <span className="text-emerald-400 font-bold">Soybean:</span> ₹4,650/qtl &nbsp;|&nbsp;{" "}
          <span className="text-emerald-400 font-bold">Tomato:</span> ₹3,400/qtl (+₹150)
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-emerald-400">
          <Building2 size={13} /> {role.toUpperCase()} WORKSPACE
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition duration-200">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight leading-none block text-white">
                Krishi<span className="text-emerald-400">Mitra</span>
              </span>
              <span className="text-[10px] font-extrabold text-emerald-400 tracking-widest uppercase block">
                Agri Advisory & Multi-Role Ecosystem
              </span>
            </div>
          </Link>

          {/* Role-Filtered Desktop Navigation Links */}
          {user && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                      active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-emerald-400" : "text-slate-400"}`} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-700">
                <Link
                  href="/voice-assistant"
                  className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/80 px-3.5 py-2 rounded-xl border border-purple-500/30 shadow-sm transition active:scale-95"
                >
                  <Mic className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span>Voice AI</span>
                </Link>

                <div className="flex items-center gap-2.5 bg-slate-800/80 px-3.5 py-1.5 rounded-2xl border border-slate-700">
                  <div className="w-8 h-8 bg-emerald-500 text-slate-950 rounded-xl flex items-center justify-center text-xs font-black shadow">
                    {user.full_name?.charAt(0).toUpperCase() || "K"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-white leading-tight">
                      {user.full_name || "Agri User"}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-bold leading-tight flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5 inline" />
                      {role.toUpperCase()} • {user.location_name || "India"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-3 py-2 rounded-xl border border-rose-800/40 transition active:scale-95"
                  title="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 transition active:scale-95"
                >
                  Create Free Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link
                href="/voice-assistant"
                className="p-2 text-purple-300 bg-purple-950/60 rounded-xl border border-purple-500/30"
              >
                <Mic className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          {user ? (
            <>
              <div className="p-3 bg-slate-800 rounded-2xl mb-3 border border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl flex items-center justify-center text-sm font-black shadow">
                  {user.full_name?.charAt(0).toUpperCase() || "K"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.full_name || "Agri User"}</p>
                  <p className="text-xs text-emerald-400 font-semibold">{role.toUpperCase()} • {user.location_name || "India"}</p>
                </div>
              </div>

              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                      active ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"
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
                className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 py-3 rounded-xl border border-rose-800/40 transition"
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
                className="block text-center text-sm font-bold text-slate-200 bg-slate-800 py-3 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-bold text-slate-950 bg-emerald-400 py-3 rounded-xl"
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
