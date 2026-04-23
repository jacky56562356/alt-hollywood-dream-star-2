
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the official AI assistant for ALT HOLLYWOOD DREAM STAR, a premier Los Angeles-based professional youth film institution. 
Your goal is to answer questions from parents and aspiring young actors (ages 6-18).
Key facts to mention:
- Located in Los Angeles, CA.
- We bridge the gap between acting training and real film production.
- Students work on real sets with professional crews and earn official film credits (IMDb).
- Our curriculum covers Acting Fundamentals, Camera Performance, Emotional Delivery, and On-Set Professionalism.
- We have a network of 100+ partner agencies and 15+ production companies.
- Programs include training, filming, and distribution on streaming platforms/festivals.
Be professional, encouraging, and cinematic in your tone.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Welcome to ALT HOLLYWOOD DREAM STAR. How can I help you start your cinematic journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const botText = response.text || "I'm sorry, I encountered an issue. Please try again or contact our office.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "The spotlight is temporarily dim. Please check your connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-brandBlack border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 brand-bg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-white" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">Dream Star AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-brandBlack/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'brand-bg text-white rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-brandGray rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-brandCyan" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-brandBlack">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our programs..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brandCyan transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="w-10 h-10 brand-bg rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 brand-bg rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform group relative"
        >
          <div className="absolute inset-0 brand-bg rounded-full animate-ping opacity-20"></div>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}
