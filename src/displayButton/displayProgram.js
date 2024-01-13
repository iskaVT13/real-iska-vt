// src/App.js
import React, { useState, useEffect } from 'react';
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

useEffect(() => {
  if (playVoice) {
    const audioPlayer = new Audio(currentVoice);

    audioPlayer.play();

    audioPlayer.addEventListener('ended', () => {
      setPlayVoice(false);
    });
  }
}, [playVoice, currentVoice]);


  const handleBachelorButtonClick = () => {
    setShowBachelor(!showBachelor);
    setShowDiploma(false);
    setCurrentVoice(voiceBachelor);
    setPlayVoice(true);

    window.scrollTo(0, 0);
    
  };
  const handleDiplomaButtonClick = () => {
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
