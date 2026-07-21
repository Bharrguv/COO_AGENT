import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(onResult) {
  const recognitionRef = useRef(null);

  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const supported = !!SpeechRecognition;

  useEffect(() => {
    if (!supported) return;

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎤 Listening...");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Stopped");
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      console.log("Transcript:", transcript);

      onResult(transcript);
    };

    recognitionRef.current = recognition;
  }, [SpeechRecognition, supported, onResult]);

  function startListening() {
    console.log("startListening() called");

    if (!recognitionRef.current) {
      console.log("Recognition is null");
      return;
    }

    recognitionRef.current.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
  }

  return {
    listening,
    supported,
    startListening,
    stopListening,
  };
}
