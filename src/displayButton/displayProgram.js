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
    speakText("Here is the process on how to enroll as regular student here at P U P Lopez.")
    setShowBachelor(!showBachelor);
    setShowDiploma(false);
    
  };
  const handleDiplomaButtonClick = () => {
    speakText("Here is the process on how to enroll a irregular student at P U P Lopez.")
    setShowDiploma(!showDiploma);
    setShowBachelor(false);

  };
  

  return (
    <div>
      <div className='choices-button' >
      <button className={showBachelor ? 'active-button' : ''} onClick={handleBachelorButtonClick}> BACHELOR </button>
      <button className={showDiploma ? 'active-button' : ''} onClick={handleDiplomaButtonClick}> DIPLOMA </button>
      </div>
      <div>
      {showBachelor && <Bachelor />}
      {showDiploma && <Diploma />}
      </div>
    </div>
  );
}

export default App;
