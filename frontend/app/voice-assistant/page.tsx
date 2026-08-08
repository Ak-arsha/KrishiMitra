"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { askVoiceAssistant } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Send,
  Loader2,
  Sparkles,
  Bot,
  User,
  Volume2,
  Globe,
  MessageSquare,
  Sparkle,
} from "lucide-react";

type Message = { role: "user" | "assistant"; text: string; time?: string };

export default function VoiceAssistantPage() {
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [market, setMarket] = useState("Jaipur");
  const [language, setLanguage] = useState("en-IN");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste! I am your AI KrishiMitra Assistant powered by Gemini. Ask me anything about crop prices, selling timing, or storage techniques!",
      time: "Just now",
    },
  ]);
  const recognitionRef = useRef<any>(null);

  const SUGGESTED_QUERIES = [
    "What is the best time to sell Wheat in Rajasthan?",
    "Should I store Mustard for 30 days?",
    "Compare Wheat MSP price with current Mandi rates",
    "How to protect stored Paddy from insects?",
  ];

  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input isn't supported in this browser window. Please type your question or use Chrome."
      );
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || query;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((m) => [...m, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await askVoiceAssistant({
        query: textToSend,
        crop,
        market,
        state,
      });

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: res.data.answer,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I couldn't process that query right now — please check your backend server.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="animate-spin" /> Gemini AI LLM Assistant
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Multilingual Voice Assistant 🎙️
          </h1>
          <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
            Ask any farming or Mandi price question out loud or in text. Powered by Google Gemini AI with context-aware agricultural data.
          </p>
        </div>
      </motion.div>

      {/* Context Selection Bar */}
      <Card className="border border-purple-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Context Crop
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            >
              {CROPS.map((c) => (
                <option key={c} value={c}>
                  🌾 {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Context Mandi
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            >
              {Object.keys(MARKETS).map((m) => (
                <option key={m} value={m}>
                  📍 {m} ({MARKETS[m]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Voice Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            >
              <option value="en-IN">🌐 English (India)</option>
              <option value="hi-IN">🇮🇳 Hindi (हिंदी)</option>
              <option value="pa-IN">🌾 Punjabi (ਪੰਜਾਬੀ)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Chat Container */}
      <Card className="border border-purple-100 shadow-xl bg-white rounded-2xl overflow-hidden flex flex-col h-[520px]">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="text-purple-700" size={20} />
            <CardTitle className="text-base font-bold text-gray-800">
              Live Advisory Chat Conversation
            </CardTitle>
          </div>
          <span className="text-xs font-bold text-purple-700 px-2.5 py-1 bg-purple-100 rounded-full">
            Gemini Flash 2.0
          </span>
        </CardHeader>

        {/* Message Feed */}
        <CardContent className="p-6 flex-1 overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-purple-600 text-white font-medium rounded-tr-none"
                      : "bg-gray-50 border border-gray-100 text-gray-800 font-normal rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  {m.time && (
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        m.role === "user" ? "text-purple-200" : "text-gray-400"
                      }`}
                    >
                      {m.time}
                    </div>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex items-center gap-3 text-purple-700 text-sm font-semibold">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Loader2 className="animate-spin" size={18} />
              </div>
              Gemini AI is analyzing Mandi data & generating response...
            </div>
          )}
        </CardContent>

        {/* Input Bar */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
          {/* Quick Query Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUGGESTED_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sq)}
                className="whitespace-nowrap px-3 py-1 bg-white border border-purple-200 text-purple-900 rounded-full text-xs font-semibold hover:bg-purple-50 transition shrink-0"
              >
                💡 {sq}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`p-3.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 ${
                listening
                  ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-200"
                  : "bg-white border border-gray-300 text-purple-700 hover:bg-purple-50 shadow-sm"
              }`}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                listening
                  ? "Listening... Speak your question now"
                  : "Type or speak your crop / Mandi question..."
              }
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
            />

            <button
              onClick={() => handleSend()}
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
