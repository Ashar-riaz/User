// src/components/VoiceInput.tsx
"use client"; // Add this directive to ensure this is a Client Component

import React, { useState, useEffect } from 'react';

const VoiceInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.abort();
    };
  }, [isListening]);

  const handleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleListening}
        className={`px-4 py-2 text-white ${
          isListening ? 'bg-red-500' : 'bg-green-500'
        } rounded-md`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p className="text-lg text-gray-700">{transcript || 'Voice input will appear here.'}</p>
    </div>
  );
};

export default VoiceInput;
