"use client";

import { useState, useRef, useEffect } from "react";
import type { SiteConfig } from "@/config/types";

interface Message {
  role: "user" | "assistant";
  text: string;
}

function buildKnowledgeBase(config: SiteConfig) {
  const digits = config.phone.replace(/\D/g, "");
  const hours = config.hours.map((h) => `${h.day}: ${h.hours}`).join(". ");
  const serviceList = config.services.map((s) => s.name).join(", ");
  const serviceDetails = config.services
    .map((s) => `${s.name}: ${s.description}`)
    .join("\n");
  const addr = `${config.address.street}, ${config.address.city}, ${config.address.state} ${config.address.zip}`;
  const faq = config.faq
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");
  const reviews = config.reviews.staticReviews
    .map((r) => `"${r.text}" — ${r.name}`)
    .join("\n");

  return { digits, hours, serviceList, serviceDetails, addr, faq, reviews };
}

function getResponse(input: string, config: SiteConfig): string {
  const q = input.toLowerCase().trim();
  const kb = buildKnowledgeBase(config);

  // Greetings
  if (/^(hi|hello|hey|hola|good\s*(morning|afternoon|evening))/.test(q)) {
    return `Hi there! Welcome to ${config.businessName}. How can I help you today? I can answer questions about our services, hours, location, and more.`;
  }

  // Hours
  if (/hour|open|close|when|schedule|time/.test(q)) {
    return `Our hours are:\n${config.hours.map((h) => `${h.day}: ${h.hours}`).join("\n")}\n\nFeel free to call us at ${config.phone} if you need to confirm!`;
  }

  // Location / address / directions
  if (/where|location|address|direction|find\s*you|map|located/.test(q)) {
    return `We're located at ${kb.addr}. You can find us on Google Maps or call ${config.phone} for directions!`;
  }

  // Phone / contact
  if (/phone|call|number|contact|reach|talk/.test(q)) {
    return `You can reach us at ${config.phone}. Or use the contact form on our Contact page — we'll get back to you quickly!`;
  }

  // Services
  if (/service|offer|do\s*you|what.*do|speciali|provide|menu/.test(q)) {
    return `We offer: ${kb.serviceList}.\n\nWant to know more about any specific service? Just ask!`;
  }

  // Specific service matching
  for (const svc of config.services) {
    const svcLower = svc.name.toLowerCase();
    if (q.includes(svcLower) || svcLower.split(" ").some((w) => w.length > 3 && q.includes(w))) {
      return `**${svc.name}**: ${svc.description}\n\nWant to schedule or learn more? Call us at ${config.phone}!`;
    }
  }

  // Reviews / ratings
  if (/review|rating|star|recommend|good|reputation/.test(q)) {
    const best = config.reviews.staticReviews[0];
    return `We're proud of our ${config.reviews.averageRating}-star rating from ${config.reviews.totalReviews} reviews!\n\nHere's what one customer said: "${best.text}" — ${best.name}\n\nCheck out more reviews on our homepage!`;
  }

  // Pricing / cost
  if (/price|cost|how\s*much|rate|fee|estimate|quote|cheap|afford/.test(q)) {
    return `For pricing, the best thing to do is give us a call at ${config.phone} or fill out our contact form. We're happy to provide a free estimate!`;
  }

  // Booking / appointment
  if (/book|appointment|reserv|schedule|sign\s*up/.test(q)) {
    return `To book with us, call ${config.phone} or fill out the form on our Contact page. We'll get you set up right away!`;
  }

  // About the business
  if (/about|story|history|who|tell\s*me|background/.test(q)) {
    return `${config.about.paragraphs[0]}\n\nVisit our About page to learn more!`;
  }

  // FAQ matching
  for (const faqItem of config.faq) {
    const faqWords = faqItem.question.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const matchCount = faqWords.filter((w) => q.includes(w)).length;
    if (matchCount >= 2) {
      return faqItem.answer;
    }
  }

  // Thank you
  if (/thank|thanks|thx|appreciate/.test(q)) {
    return `You're welcome! If you need anything else, don't hesitate to ask. We'd love to see you at ${config.businessName}!`;
  }

  // Goodbye
  if (/bye|goodbye|see\s*you|later|gotta\s*go/.test(q)) {
    return `Thanks for chatting! We hope to see you soon at ${config.businessName}. Have a great day!`;
  }

  // Fallback
  return `Great question! For the best answer, I'd recommend calling us directly at ${config.phone} or visiting our Contact page. Our team will be happy to help!`;
}

export default function ChatWidget({ config }: { config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          text: `Hi! I'm the AI assistant for ${config.businessName}. Ask me about our services, hours, location, or anything else!`,
        },
      ]);
    }
  }, [isOpen, messages.length, config.businessName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(text, config);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-primary text-text-on-primary shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all duration-300"
        style={{
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-36 right-4 z-50 w-[340px] max-h-[480px] bg-white shadow-2xl flex flex-col overflow-hidden chat-enter"
          style={{ borderRadius: "var(--site-radius, 16px)" }}
        >
          {/* Header */}
          <div className="bg-primary text-text-on-primary px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <div>
              <div className="font-semibold text-sm">{config.businessName}</div>
              <div className="text-xs opacity-80">AI Assistant • Online</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[280px] max-h-[320px] bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-text-on-primary rounded-2xl rounded-br-sm"
                      : "bg-white text-text border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Powered by badge */}
          <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-center">
            <a
              href="https://sagemindai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              Powered by <span className="font-semibold">Sagemind AI</span>
            </a>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-2 flex gap-2 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-primary text-text bg-gray-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 bg-primary text-text-on-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
