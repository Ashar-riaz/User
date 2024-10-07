// src/component/VoiceProcessor.tsx
import React, { useEffect, useState } from 'react';

const VoiceProcessor: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]); // Array to store all transcriptions
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const initMediaRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          await processAudio(event.data);
        }
      };

      setMediaRecorder(recorder);
    };

    initMediaRecorder().catch(console.error);
  }, []);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window['webkitSpeechRecognition'] as typeof window.SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const spokenText = event.results[0][0].transcript;
        setTranscriptions((prevTranscriptions) => [...prevTranscriptions, spokenText]); // Add new transcription to the array
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      if (isRecording) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'voice.wav');

    try {
      const response = await fetch('http://0.0.0.0:8000/process_voice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the audio');
      }

      const audioResponseBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioResponseBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      mediaRecorder?.start();
    } else {
      mediaRecorder?.stop();
    }
  };

  return (
    <div className="voice-processor">
      <h2>Voice Processor</h2>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      
      {/* Display all transcriptions */}
      {transcriptions.length > 0 && (
        <div>
          <h3>Transcribed Texts:</h3>
          <ul>
            {transcriptions.map((text, index) => (
              <li key={index}>{text}</li> // List all transcribed texts
            ))}
          </ul>
        </div>
      )}
      
      {audioUrl && (
        <div>
          <h3>Processed Audio</h3>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default VoiceProcessor;
