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
  User as UserIcon,
  Menu,
  X,
  MapPin,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sell-advisor", label: "Sell Advisor", icon: TrendingUp },
  { href: "/buyer-recommendations", label: "Buyer Matches", icon: Users },
  { href: "/market-intelligence", label: "Market Feed", icon: Newspaper },
  { href: "/explainable-ai", label: "Explainable AI", icon: Brain },
  { href: "/voice-assistant", label: "Voice Assistant", icon: Mic },
  { href: "/storage-advisor", label: "Storage Advisor", icon: Warehouse },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide navbar on auth pages if desired, or keep everywhere
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-xl text-white shadow-md shadow-green-200 group-hover:scale-105 transition duration-200">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Krishi<span className="text-green-600">Mitra</span>
            </span>
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
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      active
                        ? "bg-green-100/80 text-green-800 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-green-700" : "text-gray-500"}`} />
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
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {user.full_name?.charAt(0).toUpperCase() || "F"}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {user.full_name || "Farmer"}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-medium leading-tight flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5 inline" />
                      {user.location_name || "India"}
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
                  className="text-sm font-semibold text-gray-700 hover:text-green-700 px-4 py-2 rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-4 py-2 rounded-xl shadow-md shadow-green-100 transition active:scale-95"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <button
                onClick={logout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
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
              <div className="p-3 bg-emerald-50 rounded-xl mb-3 border border-emerald-100 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                  {user.full_name?.charAt(0).toUpperCase() || "F"}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.full_name || "Farmer"}</p>
                  <p className="text-xs text-emerald-700">{user.email}</p>
                </div>
              </div>

              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                      active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl border border-red-200 transition"
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
                className="block text-center text-sm font-semibold text-gray-700 bg-gray-100 py-2.5 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-bold text-white bg-green-600 py-2.5 rounded-xl"
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
