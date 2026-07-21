import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { ArrowUp, Sparkles, Paperclip, Mic, MicOff } from "lucide-react";

import { usePlan } from "../../contexts/PlanContext";
import { planService } from "../../services/plan.service";

import AiLoadingOverlay from "../loading/AiLoadingOverlay";
import ReportReady from "../loading/ReportReady";

import useSpeechRecognition from "../../hooks/useSpeechRecognition";

const MAX_CHARACTERS = 1000;

export default function PromptBox() {
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  const { isSignedIn, getToken } = useAuth();
  const { openSignIn } = useClerk();

  const { prompt, setPrompt, setPlan, loading, setLoading, setError } =
    usePlan();

  const [showReady, setShowReady] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  
  // Speech Recognition
  

  const { listening, supported, startListening, stopListening } =
    useSpeechRecognition((transcript) => {
      setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
    });

  function handleMic() {
    if (!supported) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  }

  
  // Auto resize
  

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [prompt]);

  
  // Autofocus
  

  useEffect(() => {
    textareaRef.current?.focus();

    if (textareaRef.current) {
      const length = textareaRef.current.value.length;

      textareaRef.current.setSelectionRange(length, length);
    }
  }, [prompt]);

  
  // Generate
  

  const handleGenerate = async () => {
    if (!isSignedIn) {
      openSignIn({
        afterSignInUrl: "/",
        afterSignUpUrl: "/",
      });

      return;
    }

    if (!prompt.trim()) return;

    if (listening) stopListening();

    try {
      setLoading(true);
      setError(null);

      const token = await getToken();

      const response = await planService.generatePlan(prompt, token);

      setGeneratedPlan(response);

      setPlan(response);

      setPrompt("");

      setShowReady(true);

      setTimeout(() => {
        setShowReady(false);
        navigate("/dashboard");
      }, 2200);
    } catch (err) {
      console.error(err);

      setError("Failed to generate startup plan.");

      alert(err?.response?.data?.detail ?? "Failed to generate startup plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleGenerate();
    }
  };

  return (
    <>
      <AiLoadingOverlay loading={loading} />

      <ReportReady plan={showReady ? generatedPlan : null} />

      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-white
            shadow-xl
            shadow-slate-200/70
            transition-all
            duration-300
            focus-within:border-indigo-300
            focus-within:shadow-indigo-200
          "
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARACTERS}
            placeholder={
              listening ? "🎤 Listening..." : "Describe your startup goal..."
            }
            className="
              min-h-[180px]
              w-full
              resize-none
              overflow-hidden
              bg-transparent
              px-8
              pt-8
              text-lg
              leading-8
              text-slate-800
              outline-none
              placeholder:text-slate-400
            "
          />

          {listening && (
            <div className="border-t border-red-100 bg-red-50 px-6 py-3">
              <div className="flex items-center gap-3 text-red-600">
                <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                <span className="font-medium">
                  Listening... Speak naturally.
                </span>
              </div>
            </div>
          )}

          <div className="border-t border-slate-100">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl p-3 transition hover:bg-slate-100"
                >
                  <Paperclip size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleMic}
                  className={`
                    rounded-xl
                    p-3
                    transition-all
                    duration-300

                    ${
                      listening
                        ? "animate-pulse bg-red-500 text-white shadow-lg shadow-red-300"
                        : "hover:bg-slate-100"
                    }
                  `}
                >
                  {listening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <div className="hidden items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700 md:flex">
                  <Sparkles size={16} />
                  AI Executive Planning
                </div>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-sm text-slate-400">
                  {prompt.length}/{MAX_CHARACTERS}
                </span>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || loading}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-slate-900
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-indigo-600
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? "Generating..." : "Generate"}

                  <ArrowUp size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-end px-6 pb-4">
              <p className="text-xs text-slate-400">
                Press <b>Ctrl + Enter</b> to generate
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
