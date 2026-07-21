import { useState } from "react";
import { SendHorizontal, Mic, MicOff } from "lucide-react";

import useSpeechRecognition from "../../hooks/useSpeechRecognition";

export default function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const { listening, startListening, stopListening, supported } =
    useSpeechRecognition((transcript) => {
      setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
    });

  function handleSubmit() {
    if (!message.trim() || loading) return;

    onSend(message);
    setMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleMic() {
    console.log("🎤 Mic Clicked");
    console.log("supported =", supported);
    console.log("listening =", listening);

    if (!supported) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      console.log("Stopping recognition...");
      stopListening();
    } else {
      console.log("Starting recognition...");
      startListening();
    }
  }

  return (
    <div className="flex items-end gap-3">
      {/* Input */}

      <textarea
        rows={2}
        value={message}
        disabled={loading}
        placeholder={
          listening ? "🎤 Listening..." : "Ask your AI COO anything..."
        }
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          flex-1
          resize-none
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-5
          py-3
          outline-none
          transition-all
          duration-300
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-100
          disabled:bg-slate-100
        "
      />

      {/* Microphone */}

      <button
        type="button"
        onClick={handleMic}
        disabled={loading}
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          transition-all
          duration-300
          ${
            listening
              ? "animate-pulse bg-red-500 text-white shadow-lg shadow-red-300"
              : "border border-slate-300 bg-white text-slate-600 hover:border-indigo-400 hover:bg-indigo-50"
          }
        `}
      >
        {listening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Send */}

      <button
        onClick={handleSubmit}
        disabled={loading || !message.trim()}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-indigo-600
          text-white
          transition-all
          duration-300
          hover:scale-105
          hover:bg-indigo-700
          disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
      >
        <SendHorizontal size={20} />
      </button>
    </div>
  );
}
