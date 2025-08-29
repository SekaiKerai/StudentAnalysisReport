// MultipleFiles/TextToSpeechButton.jsx
import React, { useState, useEffect, useRef } from 'react';
import './TextToSpeechButton.css';

const TextToSpeechButton = ({ textToRead, onToggle }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  const speakText = (text) => {
    if (!text || !window.speechSynthesis) {
      console.warn("SpeechSynthesis not supported or no text provided.");
      return;
    }

    // Stop any ongoing speech before starting new one
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      onToggle(false); // Notify parent that speaking has ended
    };

    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      setIsSpeaking(false);
      setIsPaused(false);
      onToggle(false); // Notify parent of error
    };

    // Optional: Set voice, pitch, rate
    // const voices = window.speechSynthesis.getVoices();
    // utterance.voice = voices[0]; // You can let user choose or pick a default
    // utterance.pitch = 1; // 0 to 2
    // utterance.rate = 1; // 0.1 to 10

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      onToggle(false); // Notify parent that speaking has stopped
    }
  };

  // Effect to handle textToRead prop changes
  useEffect(() => {
    if (textToRead && !isSpeaking) { // Only speak if new text is provided and not already speaking
      speakText(textToRead);
    } else if (!textToRead && isSpeaking) { // If textToRead becomes null/empty while speaking, stop
      stopSpeech();
    }
  }, [textToRead]); // Dependency on textToRead

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech(); // Ensure speech is stopped when component unmounts
    };
  }, []);

  const handleButtonClick = () => {
    if (isSpeaking && !isPaused) {
      pauseSpeech();
    } else if (isSpeaking && isPaused) {
      resumeSpeech();
    } else {
      // This button will primarily be a toggle. The actual speaking is triggered by `textToRead` prop.
      // However, if it's not speaking, this button can initiate it.
      onToggle(true); // Request parent to provide text
    }
  };

  return (
    <button
      className={`tts-button ${isSpeaking ? 'speaking' : ''} ${isPaused ? 'paused' : ''}`}
      onClick={handleButtonClick}
      title={isSpeaking ? (isPaused ? 'Resume Reading' : 'Pause Reading') : 'Start Reading Page'}
    >
      {isSpeaking ? (isPaused ? '▶️ Resume' : '⏸️ Pause') : '🔊 Read Page'}
    </button>
  );
};

export default TextToSpeechButton;
