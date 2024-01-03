// src/App.js
import React, { useState } from 'react';
import './displayDesign.css';

import Bachelor from '../showRespose/Programs/bachelor';
import Diploma from '../showRespose/Programs/diploma';

function App() {
  const [showBachelor, setShowBachelor] = useState(false);
  const [showDiploma, setShowDiploma] = useState(false);

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechText);
  };

  const handleBachelorButtonClick = () => {
    speakText("Here is the Bachelor of Science courses at P U P Lopez.")
    setShowBachelor(!showBachelor);
    setShowDiploma(false);

    window.scrollTo(0, 0);
    
  };
  const handleDiplomaButtonClick = () => {
    speakText("Here is the Diploma courses at P U P Lopez.")
    setShowDiploma(!showDiploma);
    setShowBachelor(false);

    window.scrollTo(0, 0);
  };
  

  return (
    <div>
      <div className='choices-button' >
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
