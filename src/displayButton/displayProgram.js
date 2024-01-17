// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './displayDesign.css';

import Bachelor from '../showRespose/Programs/bachelor';
import Diploma from '../showRespose/Programs/diploma';

import voiceBachelor from '../speakText/bachelor.mp3';
import voiceDiploma from '../speakText/diploma.mp3';

function App() {
  const [showBachelor, setShowBachelor] = useState(false);
  const [showDiploma, setShowDiploma] = useState(false);
  const [playVoice, setPlayVoice] = useState(false);
  const [currentVoice, setCurrentVoice] = useState('');
  const audioRef = useRef(null); // Add a reference to the audio element

useEffect(() => {
  if (playVoice) {
    const audioPlayer = new Audio(currentVoice);
    audioRef.current = audioPlayer; // Store the reference to the audio element

    audioPlayer.play();

    audioPlayer.addEventListener('ended', () => {
      setPlayVoice(false);
    });
  }
}, [playVoice, currentVoice]);

const stopAudio = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset the audio to the beginning
  }
};

  const handleBachelorButtonClick = () => {
    stopAudio();
    setShowBachelor(!showBachelor);
    setShowDiploma(false);
    setCurrentVoice(voiceBachelor);
    setPlayVoice(true);

    window.scrollTo(0, 0);
    
  };
  const handleDiplomaButtonClick = () => {
    stopAudio();
    setShowDiploma(!showDiploma);
    setShowBachelor(false);
    setCurrentVoice(voiceDiploma);
    setPlayVoice(true);

    window.scrollTo(0, 0);
  };
  

  return (
    <div>
      <div className='choices-button' >
      <div>
        <p>The PUP Lopez offers a lots of programs. Please select below which category do you want to see.</p>
      </div>
      <button className={showBachelor ? 'active-button' : ''} onClick={handleBachelorButtonClick}> BACHELOR COURSES </button>
      <button className={showDiploma ? 'active-button' : ''} onClick={handleDiplomaButtonClick}> DIPLOMA COURSES </button>
      </div>
      <div>
      {showBachelor && <Bachelor />}
      {showDiploma && <Diploma />}
      </div>
    </div>
  );
}

export default App;
