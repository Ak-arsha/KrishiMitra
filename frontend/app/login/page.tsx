"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Leaf, AlertCircle, CheckCircle, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("farmer.google@gmail.com");
  const [googleName, setGoogleName] = useState("Akarsha (Google User)");

  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setShowGoogleModal(false);

    try {
      await loginWithGoogle(googleEmail, googleName);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-3 bg-green-600 rounded-2xl text-white shadow-lg shadow-green-200">
              <Leaf className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">KrishiMitra 🌾</h1>
          <p className="text-gray-600 mt-1">AI-powered farm advisory & market intelligence platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In to Your Account</h2>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 animate-fade-in">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            disabled={isLoading}
            className="w-full mb-6 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 text-gray-700 font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50"
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
              <span className="px-3 bg-white text-gray-500 font-medium">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="farmer@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition duration-200 disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo Account Box */}
          <div 
            onClick={() => { setEmail("farmer@example.com"); setPassword("password123"); }}
            className="mt-6 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl p-4 cursor-pointer transition flex items-center justify-between"
          >
            <div className="text-xs space-y-1 text-emerald-900">
              <p className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <span>⚡ Instant Demo Access</span>
              </p>
              <p><strong>Email:</strong> farmer@example.com</p>
              <p><strong>Password:</strong> password123</p>
            </div>
            <button 
              type="button" 
              className="text-xs bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-800 transition"
            >
              Auto-Fill
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-bold underline underline-offset-2">
              Create free account
            </Link>
          </p>
        </div>
      </div>

      {/* Google OAuth Modal Dialog */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <h3 className="text-lg font-bold text-gray-900">Google Sign-In</h3>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Select or enter your Google Account email to authenticate with KrishiMitra.
            </p>

            <form onSubmit={handleExecuteGoogleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Google Email</label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
