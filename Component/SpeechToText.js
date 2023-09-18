import React from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser Not Supported</p>;
  }

  return (
    <div>
      <p>Listening: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToText;
