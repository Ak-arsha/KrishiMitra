"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Leaf, TrendingUp, Users, Newspaper, Brain, Mic, Warehouse, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is logged in but we're redirecting, show dashboard modules
  if (user) {
    const MODULES = [
      {
        href: "/sell-advisor",
        icon: TrendingUp,
        title: "AI Sell Advisor",
        description: "Get a price prediction and a sell now / wait recommendation, backed by XGBoost & LightGBM.",
      },
      {
        href: "/buyer-recommendations",
        icon: Users,
        title: "Buyer Recommendation Engine",
        description: "Find nearby buyers for your crop, ranked by distance and price fit.",
      },
      {
        href: "/market-intelligence",
        icon: Newspaper,
        title: "Market Intelligence Feed",
        description: "Track price trends, volatility, and stability across your crops.",
      },
      {
        href: "/explainable-ai",
        icon: Brain,
        title: "Explainable AI Panel",
        description: "See exactly which factors are driving a price prediction, in plain language.",
      },
      {
        href: "/voice-assistant",
        icon: Mic,
        title: "Voice Assistant",
        description: "Ask farming and market questions out loud, powered by Gemini.",
      },
      {
        href: "/storage-advisor",
        icon: Warehouse,
        title: "Storage Advisor",
        description: "Decide whether to store your harvest or sell immediately.",
      },
    ];

    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="gradient-hero rounded-2xl p-8 border border-border"
        >
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.full_name}! 🌾</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Your AI-powered farm advisory platform — price predictions, buyer matching,
            market intelligence, and storage guidance, all in one place.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link href={m.href}>
                <Card className="h-full transition-shadow hover:shadow-md cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg bg-primary/10 p-2.5 w-fit">
                        <m.icon className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <CardTitle className="mt-2">{m.title}</CardTitle>
                    <CardDescription>{m.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Landing page for non-logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">KrishiMitra</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 text-gray-700 hover:text-green-600 font-medium">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Maximize Your Harvest Value 🌾
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          AI-powered farm advisory platform that helps farmers make better selling decisions with real-time market insights and price forecasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-xl transition text-lg font-semibold"
          >
            Start Free Today
            <ArrowRight size={20} />
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-600 transition text-lg font-semibold">
            Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-1 mb-20">
          <div className="bg-white rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-gray-800">Real-time Prices</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800">Voice Input</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <p className="font-semibold text-gray-800">AI Recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Powerful Features for Smart Farming
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Market Price Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Real-time market prices for over 15 major crops in your region. Track price trends and volatility at a glance.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Live price updates every hour
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Regional price comparison
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Historical trend analysis
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Voice-Activated Input</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Simply speak to tell us about your crop. No typing needed. Works in multiple Indian languages.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600" />
                Support for 8+ Indian languages
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600" />
                Fast and accurate recognition
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600" />
                Works offline
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">AI Sell Recommendations</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get instant recommendations: Sell now, wait, or hold. Based on ML models analyzing market patterns.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-purple-600" />
                XGBoost & LightGBM powered
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-purple-600" />
                85%+ prediction accuracy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-purple-600" />
                Explainable factors
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">5-Day Price Forecast</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Beautiful forecast cards showing predicted prices for the next 5 days, just like weather forecasts.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-600" />
                5-day predictions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-600" />
                Confidence scores
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-amber-600" />
                Trend indicators
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Sign Up", desc: "Create your farmer account in 2 minutes" },
              { num: "2", title: "Enter Crop", desc: "Tell us about your crop (type or speak)" },
              { num: "3", title: "Get Insights", desc: "View market prices, forecasts, and trends" },
              { num: "4", title: "Make Decision", desc: "Get AI recommendation: Sell, Wait, or Hold" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute right-0 top-8 transform translate-x-1/2">
                    <ArrowRight className="text-green-300" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ready to maximize your harvest value?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of farmers already using KrishiMitra
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-xl transition text-lg font-semibold"
        >
          Get Started for Free
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-500" />
                <span className="text-xl font-bold text-white">KrishiMitra</span>
              </div>
              <p className="text-sm">Empowering farmers with AI-driven market insights</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-500">Features</a></li>
                <li><a href="#" className="hover:text-green-500">Pricing</a></li>
                <li><a href="#" className="hover:text-green-500">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-500">About</a></li>
                <li><a href="#" className="hover:text-green-500">Blog</a></li>
                <li><a href="#" className="hover:text-green-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-500">Privacy</a></li>
                <li><a href="#" className="hover:text-green-500">Terms</a></li>
                <li><a href="#" className="hover:text-green-500">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 KrishiMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Calendar icon placeholder
function Calendar(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M16 2v4M8 2v4M3 10h18"></path>
    </svg>
  );
}
