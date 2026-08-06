"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, X, Send } from "lucide-react";

interface CropInputProps {
  onCropSelected: (crop: string) => void;
}

const COMMON_CROPS = [
  "Rice", "Wheat", "Maize", "Cotton", "Sugarcane",
  "Tomato", "Onion", "Potato", "Chilli", "Turmeric",
  "Soybean", "Groundnut", "Sunflower", "Mustard", "Linseed"
];

export default function CropInput({ onCropSelected }: CropInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize Web Speech API
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-IN"; // Indian English

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);

        recognitionRef.current.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (event.results[event.results.length - 1].isFinal) {
            setInputValue(transcript.trim());
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setInputValue("");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onCropSelected(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (crop: string) => {
    setInputValue(crop);
    onCropSelected(crop);
    setShowSuggestions(false);
  };

  const filteredSuggestions = inputValue
    ? COMMON_CROPS.filter(crop =>
        crop.toLowerCase().includes(inputValue.toLowerCase())
      )
    : COMMON_CROPS;

  return (
    <div className="space-y-4">
      {/* Input Area */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter your crop name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {inputValue && (
            <Button
              onClick={() => {
                setInputValue("");
                setShowSuggestions(false);
              }}
              variant="ghost"
              size="sm"
            >
              <X size={18} />
            </Button>
          )}
        </div>

        {/* Voice Input & Submit */}
        <div className="flex gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "outline"}
            className="flex-1 gap-2"
          >
            <Mic size={18} />
            {isListening ? "Stop Listening..." : "Speak"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
          >
            <Send size={18} />
            Submit
          </Button>
        </div>

        {isListening && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg flex items-center gap-2">
            <div className="animate-pulse">🎤</div>
            Listening... Speak your crop name
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-white">
          <div className="text-xs text-gray-500 px-3 py-2 font-semibold">Common Crops</div>
          <div className="grid grid-cols-2 gap-2 p-2">
            {filteredSuggestions.map(crop => (
              <button
                key={crop}
                onClick={() => handleSuggestionClick(crop)}
                className="px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded border border-green-200 transition"
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
