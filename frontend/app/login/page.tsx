"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Leaf, AlertCircle, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, UserCheck, ExternalLink, Building2, PieChart, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Authentic Google OAuth Window Popup Simulation State
  const [showGoogleWindow, setShowGoogleWindow] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const presetGoogleAccounts = [
    {
      name: "Akarsha Agarwal",
      email: "akarshaagarwal25@gmail.com",
      avatarBg: "bg-blue-600",
      initials: "AA",
    },
    {
      name: "Farmer Demo User",
      email: "farmer.krishimitra@gmail.com",
      avatarBg: "bg-emerald-600",
      initials: "FD",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      console.warn("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstantGoogleLogin = async (accountEmail: string, accountName: string) => {
    setError("");
    setIsLoading(true);
    setShowGoogleWindow(false);

    try {
      await loginWithGoogle(accountEmail, accountName);
    } catch (err: any) {
      console.warn("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const name = customGoogleName.trim() || customGoogleEmail.split("@")[0];
    await handleInstantGoogleLogin(customGoogleEmail, name);
  };

  const handleRoleDemoLogin = async (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("password123");
    setError("");
    setIsLoading(true);
    try {
      await login(roleEmail, "password123");
    } catch (err: any) {
      console.warn("Demo login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Photography */}
      <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl text-slate-950 shadow-xl shadow-emerald-500/20 mb-3 border border-emerald-400/30">
            <Leaf className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            Krishi<span className="text-emerald-400">Mitra</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1.5 font-medium">
            Agri Advisory & Multi-Role Mandi Ecosystem
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-gray-500 text-sm mt-0.5">Access your customized role dashboard</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-red-700 text-sm animate-fade-in shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="font-medium">{error}</div>
            </div>
          )}

          {/* Google Sign In Trigger Button */}
          <button
            type="button"
            onClick={() => setShowGoogleWindow(true)}
            disabled={isLoading}
            className="w-full mb-6 bg-white border border-gray-200 hover:border-emerald-400 hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 text-sm active:scale-[0.99] disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 bg-white text-gray-400 font-semibold tracking-wider">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="farmer@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow transition text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 4 Role Demo Logins Box */}
          <div className="mt-6 bg-slate-50 border border-gray-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">1-Click Role Demo Logins</h4>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Click any role below to test its isolated workspace:</p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleDemoLogin("farmer@example.com")}
                className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Leaf size={14} /> Farmer Demo
              </button>

              <button
                type="button"
                onClick={() => handleRoleDemoLogin("buyer@example.com")}
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Building2 size={14} /> Buyer Demo
              </button>

              <button
                type="button"
                onClick={() => handleRoleDemoLogin("investor@example.com")}
                className="p-2 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <PieChart size={14} /> Investor Demo
              </button>

              <button
                type="button"
                onClick={() => handleRoleDemoLogin("trader@example.com")}
                className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <TrendingUp size={14} /> Trader Demo
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6 font-medium">
            Don't have an account yet?{" "}
            <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>

      {/* Authentic Google OAuth Popup Window Simulation */}
      {showGoogleWindow && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-300 overflow-hidden font-sans border-t-8 border-t-blue-500">
            <div className="bg-slate-100 px-5 py-3 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2 font-mono text-[11px] text-gray-500 truncate">
                <ExternalLink size={13} className="text-blue-600" />
                <span>https://accounts.google.com/gsi/select</span>
              </div>
              <button
                onClick={() => {
                  setShowGoogleWindow(false);
                  setShowCustomInput(false);
                }}
                className="font-bold text-gray-400 hover:text-gray-700 text-base"
              >
                ✕
              </button>
            </div>

            <div className="p-6 text-center space-y-2 border-b border-gray-100">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900">Sign in with Google</h3>
              <p className="text-xs text-gray-500">to continue to <strong className="text-gray-800">KrishiMitra Platform</strong></p>
            </div>

            <div className="p-6 space-y-3">
              {!showCustomInput ? (
                <>
                  <p className="text-xs font-semibold text-gray-500 mb-3">Choose an account</p>
                  {presetGoogleAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInstantGoogleLogin(acc.email, acc.name)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition flex items-center justify-between group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${acc.avatarBg} text-white font-black flex items-center justify-center text-xs`}>
                          {acc.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                            {acc.name}
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div className="text-xs text-gray-500">{acc.email}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 group-hover:underline">
                        Select
                      </span>
                    </button>
                  ))}

                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="w-full mt-2 py-3 border border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 transition"
                  >
                    + Use another Google account
                  </button>
                </>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-gray-800">Enter custom account details</h4>
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      ← Back
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Google Email</label>
                    <input
                      type="email"
                      required
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      placeholder="your.google@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                  >
                    Continue
                  </button>
                </form>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
              <span>Google Identity Services</span>
              <span>Privacy • Terms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
