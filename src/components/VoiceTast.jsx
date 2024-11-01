import React, { useState, useEffect } from "react";

const MalayalamSpeechToText = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [autoRestart, setAutoRestart] = useState(true);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = "ml-IN";
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;
      // Set a longer silence threshold (in milliseconds)
      recognitionInstance.continuous = false;

      // Configure recognition event handlers
      recognitionInstance.onstart = () => {
        console.log("Speech recognition started.");
        setIsListening(true);
        setResult("Listening...");
      };

      recognitionInstance.onspeechend = () => {
        console.log("Speech has stopped.");
        recognitionInstance.stop();
        setIsListening(false);

        // Restart recognition after a brief pause if autoRestart is enabled
        if (autoRestart) {
          setTimeout(() => {
            try {
              recognitionInstance.start();
            } catch (error) {
              console.error("Error restarting recognition:", error);
            }
          }, 1000);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Error occurred in recognition:", event.error);
        setIsListening(false);

        // Only set error for non-"no-speech" errors
        if (event.error !== "no-speech") {
          setError(`Error: ${event.error}`);
        }

        // Restart recognition after error if autoRestart is enabled
        if (autoRestart && event.error !== "not-allowed") {
          setTimeout(() => {
            try {
              recognitionInstance.start();
            } catch (error) {
              console.error("Error restarting recognition:", error);
            }
          }, 1000);
        }
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Result received:", transcript);
        setResult((prev) => `${prev}\n${transcript}`);
      };

      setRecognition(recognitionInstance);

      // Start recognition automatically when component mounts
      recognitionInstance.start();

      // Cleanup function
      return () => {
        recognitionInstance.stop();
        setAutoRestart(false);
      };
    }
  }, []);

  const toggleListening = () => {
    setAutoRestart((prev) => !prev);
    if (!autoRestart) {
      recognition?.start();
    }
  };

  if (!("webkitSpeechRecognition" in window)) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fee2e2",
          border: "1px solid #ef4444",
          borderRadius: "4px",
          margin: "16px auto",
          maxWidth: "500px",
        }}
      >
        Sorry, your browser does not support speech recognition.
      </div>
    );
  }

  return (
    <div
    >
{/* 
      {error && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#fee2e2",
            border: "1px solid #ef4444",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )} */}

      <div
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {result || "Waiting for speech..."}
      </div>
    </div>
  );
};

export default MalayalamSpeechToText;
