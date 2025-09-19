import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { Sparkles, Send } from "lucide-react";

// Helper function for API calls with full chat history
async function getAIResponse(messages) {
  try {
    const endpoint = "https://openrouter.ai/api/v1/chat/completions";
    const payload = {
      model: "meta-llama/llama-3-70b-instruct",
      messages,
    };
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    console.log("Loaded API Key:", apiKey);

    if (!apiKey) {
      return "API Error: OpenRouter API key is not set. Please contact the site admin.";
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      return `API Error: ${errorText}`;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response from AI model.";
  } catch (e) {
    return `Error: ${e.message}`;
  }
}

export default function MathAnalysis() {
  const defaultWelcome = {
    role: "assistant",
    content: "Hi! Ask me anything about Kolam mathematical patterns, symmetry, or regeneration.",
  };
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("kolam_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [defaultWelcome];
      }
    }
    return [defaultWelcome];
  });

  const [chatOpen, setChatOpen] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const handleRestart = () => {
    const welcome = {
      role: "assistant",
      content: "Hi! Ask me anything about Kolam mathematical patterns, symmetry, or regeneration.",
    };
    setMessages([welcome]);
    sessionStorage.setItem("kolam_chat_history", JSON.stringify([welcome]));
  };

  const handleClose = () => {
    setChatOpen(false);
  };

  const handleOpen = () => {
    setChatOpen(true);
  };

  React.useEffect(() => {
    sessionStorage.setItem("kolam_chat_history", JSON.stringify(messages));
    if (chatOpen && chatContainerRef.current && messages.length > 1) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setInput("");
    const aiContent = await getAIResponse(newMessages);
    setMessages((msgs) => [...msgs, { role: "assistant", content: aiContent }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      {/* Background Decorations */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2 }} className="absolute top-0 left-0 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 2 }} className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></motion.div>

      {/* Title */}
      <motion.h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center flex items-center justify-center gap-3" initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <Sparkles className="text-orange-500 animate-pulse w-8 h-8" />
        Mathematical Analysis
        <Sparkles className="text-orange-500 animate-pulse w-8 h-8" />
      </motion.h2>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Coordinate Breakdown */}
        <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Card title="Coordinate Breakdown">
            <p className="text-base leading-relaxed text-gray-700">
              Kolam dots are mapped on a grid.  
              Formula: <code>(x, y) = (i·d, j·d)</code>, where <code>d</code> is spacing.  
              These form the base for curves & loops.
            </p>
          </Card>
        </motion.div>

        {/* Symmetry Analysis */}
        <motion.div whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          <Card title="Symmetry Analysis">
            <p className="text-base leading-relaxed text-gray-700">
              Kolams display rotational & reflection symmetry.  
              Example: Dihedral group <code>D<sub>n</sub></code>.  
              Many patterns repeat at 90°, 180°, or 360°.
            </p>
          </Card>
        </motion.div>

        {/* Pattern Regeneration */}
        <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          <Card title="Pattern Regeneration">
            <p className="text-base leading-relaxed text-gray-700">
              Using algorithms & recursion:  
              <code>K<sub>n+1</sub> = f(K<sub>n</sub>)</code>.  
              Kolams can be regenerated infinitely using rules.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* AI Chat Bot Section */}
      {chatOpen ? (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative mt-20 z-10 flex flex-col items-center">
          <motion.div className="rounded-2xl shadow-2xl bg-gradient-to-br from-orange-100 via-white to-yellow-50 w-full max-w-3xl mx-auto p-7 border-2 border-orange-200" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-5 justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-500 animate-pulse" />
                <span className="font-bold text-2xl md:text-3xl text-orange-800 font-serif">AI Kolam Math Chat</span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleRestart} className="px-3 py-1 rounded-lg bg-orange-200 text-orange-900 font-semibold hover:bg-orange-300 transition-all text-sm" title="Restart chat">
                  Restart
                </button>
                <button onClick={handleClose} className="px-3 py-1 rounded-lg bg-yellow-200 text-yellow-900 font-semibold hover:bg-yellow-300 transition-all text-sm" title="Close chat">
                  Close
                </button>
              </div>
            </div>
            <div ref={chatContainerRef} className="overflow-y-auto max-h-80 mb-3 px-1 hide-scrollbar transition-all">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 + idx * 0.05 }}
                  className={`my-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`py-2 px-4 rounded-2xl text-base font-mono font-semibold ${msg.role === "user" ? "bg-orange-200 text-gray-900" : "bg-yellow-100 text-orange-800 shadow-md"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {/* Chat End placeholder removed as we scroll container */}
            </div>
            <div className="flex items-center gap-2">
              <input
                className="grow px-4 py-2 border rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-800"
                type="text"
                value={input}
                placeholder="Ask about Kolam geometry, symmetry, or rules..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{ fontFamily: "Fira Mono, monospace" }}
              />
              <button onClick={handleSend} disabled={loading} className="rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 p-3 hover:scale-105 hover:from-orange-500 transition-all">
                <Send size={23} className="text-white" />
              </button>
              {loading && (
                <motion.span className="ml-2 text-orange-700 animate-pulse font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                  Thinking…
                </motion.span>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex justify-center mt-20">
          <button onClick={handleOpen} className="px-6 py-2 rounded-xl bg-orange-300 text-orange-900 font-bold text-lg shadow hover:bg-orange-400 transition-all">
            Open AI Chat
          </button>
        </div>
      )}
    </section>
  );
}
