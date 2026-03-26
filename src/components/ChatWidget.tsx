"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function generateSessionToken() {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem("apollo-chat-session");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("apollo-chat-session", token);
  }
  return token;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Apollo, your ApolloSRM assistant. I can answer questions about our platform, features, pricing, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionToken(generateSessionToken());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionToken,
        }),
      });

      if (!response.ok) throw new Error("Chat failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const assistantId = (Date.now() + 1).toString();
      let assistantContent = "";

      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        assistantContent += text;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          )
        );
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again or contact us directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const processContent = (content: string) => {
    return content
      .replace(/\[CONTACT_REQUEST\]/g, "")
      .replace(/\[CONTACT_DATA\][\s\S]*?\[\/CONTACT_DATA\]/g, "")
      .trim();
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-apollo-500 text-white shadow-lg shadow-apollo-500/25 transition hover:bg-apollo-400 hover:shadow-xl hover:shadow-apollo-500/30"
            style={{ cursor: "auto" }}
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-950/95 shadow-2xl backdrop-blur-xl sm:h-[520px] h-[70vh]"
            style={{ cursor: "auto" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/logos/apollo-rocket-white.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <div>
                  <p className="text-sm font-semibold">Apollo Assistant</p>
                  <p className="text-[10px] text-emerald-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-apollo-500/10 px-3 py-1 text-xs font-medium text-apollo-400 transition hover:bg-apollo-500/20"
                >
                  Talk to Us
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 transition hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-apollo-500 text-white rounded-br-md"
                        : "bg-white/5 text-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{processContent(msg.content)}</p>
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-white/5 px-4 py-3 rounded-bl-md">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ApolloSRM..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-apollo-500 text-white transition hover:bg-apollo-400 disabled:opacity-40"
              >
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
