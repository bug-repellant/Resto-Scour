import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, MapPin, ExternalLink, RefreshCw, HelpCircle, Beer } from 'lucide-react';
import { Restaurant, GroundingCitation } from '../types';

interface DeepInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  currentPlaces: Restaurant[];
}

const SAMPLE_QUESTIONS = [
  "Where is the cheapest pint of fresh craft beer within 1 km?",
  "Which microbrewery has the best Hefeweizen or IPA on Reddit?",
  "Find pubs with 1+1 Happy Hour or Zomato Gold deals near me.",
  "Compare Ghee Roast and Pizza prices across all scoured spots.",
];

export const DeepInquiryDrawer: React.FC<DeepInquiryDrawerProps> = ({
  isOpen,
  onClose,
  locationName,
  currentPlaces,
}) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    citations?: GroundingCitation[];
  }>>([
    {
      role: 'assistant',
      content: `Namaste! I am your AI Pub, Brewery & Dining Scout for India. Ask me anything about menu prices in ₹ (INR), craft beer taps, Reddit chatter from r/bangalore, r/mumbai or r/delhi, happy hour 1+1 deals, or distance comparisons near **${locationName}**!`,
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (qToSend?: string) => {
    const queryToUse = qToSend || question;
    if (!queryToUse.trim() || isLoading) return;

    const userMsg = queryToUse.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    if (!qToSend) setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/scour/deep-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg,
          location: locationName,
          currentPlaces,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.answer || "No response received.",
            citations: data.citations || [],
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Error: ${data.error || "Failed to analyze inquiry."}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Connection error: ${err.message || "Failed to reach backend."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">AI Indian Food & Deal Scout</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Context: {locationName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] space-y-2 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Citations if available */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Verified Indian Web & Reddit Sources:
                    </div>
                    {msg.citations.map((c, idx) => (
                      <a
                        key={idx}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[11px] text-slate-400 hover:text-amber-300 font-mono truncate transition"
                      >
                        🔗 {c.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-amber-400 font-medium p-3 bg-slate-950 border border-slate-800 rounded-2xl w-fit animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Scouring Indian subreddits, Zomato & menus...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Question Chips */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto no-scrollbar shrink-0">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span>Suggested Inquiries (India)</span>
          </div>
          <div className="flex gap-1.5">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 whitespace-nowrap transition text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about craft beer prices (₹), happy hours, or Reddit tips..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !question.trim()}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
