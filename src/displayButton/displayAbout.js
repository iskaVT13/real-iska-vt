// src/App.js
import React, { useState } from 'react';
import './displayDesign.css';

import History from '../showRespose/About/history';
import Mission from '../showRespose/About/mission';
import Vision from '../showRespose/About/vision';
import Hymn from '../showRespose/About/hymn';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showHymn, setShowHymn] = useState(false);

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechText);
  };

  const handleHistoryButtonClick = () => {
    speakText("This is the history of Polytechnic University of the Philippines")
    setShowHistory(!showHistory);
    setShowMission(false);
    setShowVision(false);
    setShowHymn(false);
  };
  const handleMissionButtonClick = () => {
    speakText("This is the Mission of P U P")
    setShowMission(!showMission);
    setShowHistory(false);
    setShowVision(false);
    setShowHymn(false);

  };
  const handleVisionButtonClick = () => {
    speakText("The Vision of P U P")
    setShowVision(!showVision);
    setShowMission(false);
    setShowHistory(false);
    setShowHymn(false);
  }
  const handleHymnButtonClick = () => {
    speakText("This is the Hymn of P U P")
    setShowHymn(!showHymn);
    setShowHistory(false);
    setShowMission(false);
    setShowVision(false);

  }

  return (
    <div>
      <div className='choices-button' >
      <button className={showHistory ? 'active-button' : ''} onClick={handleHistoryButtonClick}> HISTORY</button>
      <button className={showMission ? 'active-button' : ''} onClick={handleMissionButtonClick}> PUP MISSION</button>
      <button className={showVision ? 'active-button' : ''} onClick={handleVisionButtonClick}> PUP VISION</button>
      <button className={showHymn ? 'active-button' : ''} onClick={handleHymnButtonClick}> PUP HYMN </button>
      </div>
      <br></br>
      <div>
      {showHistory && <History />}
      {showMission && <Mission />}
      {showVision && <Vision />}
      {showHymn && <Hymn />}
      </div>
    </div>
  );
}

export default App;
