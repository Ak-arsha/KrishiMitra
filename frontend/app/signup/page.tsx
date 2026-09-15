"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  Leaf,
  AlertCircle,
  MapPin,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Navigation,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Building2,
  PieChart,
} from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    role: "farmer",
    location: "Jaipur, Rajasthan",
    latitude: 26.9124,
    longitude: 75.7873,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Google OAuth Account Chooser Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const presetGoogleAccounts = [
    {
      name: "Akarsha Agarwal",
      email: "akarshaagarwal25@gmail.com",
      avatarBg: "bg-blue-600",
      initials: "AA",
      role: "Verified Google Profile",
    },
    {
      name: "Farmer Demo User",
      email: "farmer.krishimitra@gmail.com",
      avatarBg: "bg-emerald-600",
      initials: "FD",
      role: "Sample Agri Account",
    },
  ];

  const detectLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(4));
          const lng = parseFloat(position.coords.longitude.toFixed(4));
          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            location: `GPS: ${lat}° N, ${lng}° E (Detected)`,
          }));
          setIsLocating(false);
          setLocationSuccess(true);
          setTimeout(() => setLocationSuccess(false), 3000);
        },
        (err) => {
          console.log("Geolocation info:", err);
          setIsLocating(false);
        }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-type your password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      await register(
        formData.email,
        formData.password,
        formData.full_name,
        formData.role,
        formData.location,
        formData.latitude,
        formData.longitude
      );
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstantGoogleSignup = async (accountEmail: string, accountName: string) => {
    setError("");
    setIsLoading(true);
    setShowGoogleModal(false);

    try {
      await loginWithGoogle(accountEmail, accountName);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google Sign-Up failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const name = customGoogleName.trim() || customGoogleEmail.split("@")[0];
    await handleInstantGoogleSignup(customGoogleEmail, name);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Agriculture Photo Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 my-8">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl text-slate-950 shadow-xl shadow-emerald-500/20 mb-3 border border-emerald-400/30">
            <Leaf className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            Krishi<span className="text-emerald-400">Mitra</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1.5 font-medium">
            Multi-Role Agricultural Ecosystem for Farmers, Buyers & Investors
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create your account</h2>
            <p className="text-gray-500 text-sm mt-0.5">Select your primary role to access dedicated tools</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-red-700 text-sm animate-fade-in shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="font-medium">{error}</div>
            </div>
          )}

          {/* 1-Click Google Sign Up Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            disabled={isLoading}
            className="w-full mb-6 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-gray-800 font-semibold py-3.5 px-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3 group active:scale-[0.99] disabled:opacity-50 text-sm"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
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
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 bg-white text-gray-400 font-semibold tracking-wider">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  placeholder="Akarsha Agarwal"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white text-sm text-gray-900 font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="akarsha@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white text-sm text-gray-900 font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Role Selector Pills */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Select Your Primary Platform Role
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { value: "farmer", label: "Farmer", icon: Leaf },
                  { value: "buyer", label: "Buyer", icon: Building2 },
                  { value: "investor", label: "Investor", icon: PieChart },
                  { value: "trader", label: "Trader", icon: ShieldCheck },
                ].map((r) => {
                  const Icon = r.icon;
                  const active = formData.role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, role: r.value }))}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        active
                          ? "bg-slate-900 text-white border-slate-900 shadow"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={14} className={active ? "text-emerald-400" : "text-gray-500"} />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location & Mandi Region */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Mandi Region / City
                </label>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isLocating}
                  className="text-xs text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1 transition"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
                  <span>{isLocating ? "Detecting..." : "Detect Location"}</span>
                </button>
              </div>
              <div className="relative">
                <MapPin className="w-5 h-5 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Jaipur, Rajasthan"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white text-sm text-gray-900 font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white text-sm text-gray-900 font-medium placeholder-gray-400"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50/50 focus:bg-white text-sm text-gray-900 font-medium placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Redirect */}
          <p className="text-center text-gray-500 text-sm mt-6 font-medium">
            Already registered?{" "}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>

      {/* Modern 1-Click Google Account Chooser Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
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
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Choose a Google Account</h3>
                  <p className="text-xs text-gray-500">to register with <span className="font-semibold text-emerald-600">KrishiMitra</span></p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowGoogleModal(false);
                  setShowCustomGoogleInput(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Preset Accounts */}
            <div className="p-6 space-y-3">
              {!showCustomGoogleInput ? (
                <>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Select active Google profile (1-Click Instant Register)
                  </p>

                  {presetGoogleAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInstantGoogleSignup(acc.email, acc.name)}
                      className="w-full text-left p-3.5 rounded-2xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/60 transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-full ${acc.avatarBg} text-white font-black flex items-center justify-center text-sm shadow-md`}
                        >
                          {acc.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                            {acc.name}
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="text-xs text-gray-500">{acc.email}</div>
                        </div>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition">
                        Sign Up
                      </span>
                    </button>
                  ))}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCustomGoogleInput(true)}
                      className="w-full py-3 px-4 rounded-2xl border border-dashed border-gray-300 hover:border-gray-400 text-xs font-semibold text-gray-600 hover:text-gray-800 transition text-center"
                    >
                      + Register with custom Google account
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-800">Enter custom Google details</h4>
                    <button
                      type="button"
                      onClick={() => setShowCustomGoogleInput(false)}
                      className="text-xs text-emerald-600 hover:underline font-semibold"
                    >
                      ← Back to preset profiles
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Google Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Akarsha Agarwal"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow transition text-sm"
                  >
                    Create Account with Google
                  </button>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Secure Google OAuth Simulator</span>
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-emerald-500" /> Instant Auth</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
