"use client"
import 'regenerator-runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useState } from 'react';
import dynamic from "next/dynamic";



const Page = () => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const handleCopyClick = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript).then(() => {
        alert('Transcript copied to clipboard!');
      });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div>
        <p className='text-black text-2xl'>Browser Not Supported</p>
      </div>
    );
  }

  return (
    <>
    <div className='bg-white h-screen text-center space-y-4 py-6 px-6'>
      <h1 className='text-2xl font-semibold text-green-500'>Speech to Text</h1>
      <p className='text-lg text-gray-700'>Speech to Text is a web application that allows users to convert their speech to text.</p>
      <p className='text-xl font-semibold text-green-500'>Microphone: {listening ? 'on' : 'off'}</p>
      <div className='bg-black/5 h-80 w-full rounded-xl border border-solid border-gray-200 text-start py-2 px-2'>
        <p className='text-black text-lg'>{transcript}</p>
      </div>
      <div className='w-full space-x-4'>
        <button
          className={`w-3/12 h-10 bg-green-500 text-black rounded-xl hover:bg-black hover:text-white duration-100 ${isListening ? 'bg-red-500' : ''}`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          className='w-3/12 h-10 bg-green-500 text-black rounded-xl hover:bg-black hover:text-white duration-100'
          onClick={handleCopyClick}
        >
          Copy
        </button>
        <button
          className='w-3/12 h-10 bg-green-500 text-black rounded-xl hover:bg-black hover:text-white duration-100'
          onClick={resetTranscript}>
          CLear
        </button>
      </div>
    </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Page), { ssr: false });

