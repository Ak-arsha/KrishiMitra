"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form-elements";
import { askVoiceAssistant } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import { Mic, MicOff, Send, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

export default function VoiceAssistantPage() {
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [market, setMarket] = useState("Jaipur");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Ask me anything about your crop's price, timing to sell, or market trends." },
  ]);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser. Try Chrome, or type your question instead.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
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

  const send = async () => {
    if (!query.trim()) return;
    const userMsg: Message = { role: "user", text: query };
    setMessages((m) => [...m, userMsg]);
    setQuery("");
    setLoading(true);
    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await askVoiceAssistant({ query: userMsg.text, crop, market, state });
      setMessages((m) => [...m, { role: "assistant", text: res.data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, I couldn't reach the assistant service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Voice Assistant</h1>
        <p className="text-muted-foreground">Ask farming and market questions by voice or text.</p>
      </div>

      <Card>
        <CardContent className="pt-6 flex flex-wrap gap-4 items-end">
          <div className="w-40">
            <label className="text-sm font-medium mb-1 block">Context crop</label>
            <Select value={crop} onChange={(e) => setCrop(e.target.value)}>
              {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="w-40">
            <label className="text-sm font-medium mb-1 block">Context market</label>
            <Select value={market} onChange={(e) => setMarket(e.target.value)}>
              {Object.keys(MARKETS).map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Conversation</CardTitle></CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...</div>}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant={listening ? "accent" : "outline"} size="default" onClick={toggleListening}>
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type or speak your question..."
        />
        <Button onClick={send} disabled={loading}><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
