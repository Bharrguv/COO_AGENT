import { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, Activity } from "lucide-react";

import DashboardCard from "../common/DashboardCard";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { chatWithCOO } from "../../services/chat.service";

export default function COOChat({ plan, chatRef, className = "" }) {
  const quickActions = [
    "Summarize my execution plan",
    "What is my biggest risk?",
    "Show my KPI status",
    "What should I work on next?",
  ];

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 **Welcome Founder!**\n\nI'm your AI COO.\n\nI can help you prioritize execution, analyze risks, review KPIs, suggest strategies and answer anything about your startup.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(question) {
    if (!question.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setLoading(true);

    try {
      const answer = await chatWithCOO(plan, question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while contacting the AI COO.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div ref={chatRef} className="h-full">
      <DashboardCard className={`h-full ${className}`}>
        <div className="flex h-[720px] flex-col">
          {/* ================= HEADER ================= */}

          <div className="sticky top-0 z-20 bg-white pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-indigo-100 p-3">
                  <Bot size={22} className="text-indigo-600" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    AI COO Assistant
                  </h2>

                  <p className="text-sm text-slate-500">
                    Online • Ready to help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>

                <span className="text-sm text-slate-500">Active</span>
              </div>
            </div>

            {/* Welcome */}

            <div className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50 p-5">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                <Sparkles size={18} />
                Welcome back Founder
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ask me about execution strategy, fundraising, hiring, KPIs,
                product roadmap or operational risks.
              </p>
            </div>

            {/* Quick Buttons */}

            <div className="mt-5 flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <button
                  key={action}
                  disabled={loading}
                  onClick={() => handleSend(action)}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    hover:border-indigo-300
                    hover:bg-indigo-50
                    hover:shadow-sm
                  "
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* ================= CHAT ================= */}

          <div
            className="
              mt-6
              flex-1
              overflow-y-auto
              space-y-6
              pr-2
            "
          >
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Activity
                      className="animate-pulse text-indigo-600"
                      size={18}
                    />

                    <span className="text-sm text-slate-500">
                      AI COO is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ================= INPUT ================= */}

          <div className="mt-6 border-t border-slate-200 pt-6">
            <ChatInput onSend={handleSend} loading={loading} />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
