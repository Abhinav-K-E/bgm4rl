import React, { useState, useEffect } from "react";
import BTN from "../assets/btn.png";
import { motion } from "framer-motion";

const MalayalamSpeechToText = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = "ml-IN";
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

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
      };

      recognitionInstance.onerror = (event) => {
        console.error("Error occurred in recognition:", event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Result received:", transcript);
        setResult(`${transcript}`);

        //call for api
        const fetchVoice = async () => {
          try {
            const response = await fetch("YOUR_API_ENDPOINT", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Add any additional headers your API requires
                // 'Authorization': 'Bearer YOUR_TOKEN'
              },
              body: JSON.stringify({}),
            });

            const data = await response.json();
            console.log("API Response:", data);

            // Handle the API response as needed
            // For example, you might want to update the UI with some confirmation
            // setResult(prev => `${prev}\nAPI Response: Success`);
          } catch (err) {
            console.error("API Error:", err);
            setError(`API Error: ${err.message}`);
          }
        };
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
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
    <div>
      <p>{result || "Click the button and start speaking in Malayalam"}</p>
      <motion.img
        initial={{ scale: 0, rotate: "20deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        transition={{ duration: 0.8, type: "spring", delay: 0.8 }}
        src={BTN}
        alt=""
        className="btn"
        onClick={startListening}
        disabled={isListening}
      />
      {/* <audio controls>
        <source src="https://soundcloud.com/bgm/woman-boatman-song?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
      </audio> */}
    </div>
  );
};

export default MalayalamSpeechToText;
