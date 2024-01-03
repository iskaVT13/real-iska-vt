// src/App.js
import React, { useState } from 'react';
import './displayDesign.css';
import DisplayComponent from '../showRespose/Enroll/regular';
import Irregular from '../showRespose/Enroll/irregular';
import Freshmen from '../showRespose/Enroll/freshmen';
import Transferee from '../showRespose/Enroll/transferee';

function App() {
  const [showRegular, setShowRegular] = useState(false);
  const [showIrregular, setShowIrregular] = useState(false);
  const [showFreshmen, setShowFreshmen] = useState(false);
  const [showTransferee, setShowTransferee] = useState(false);

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechText);
  };

  const handleRegularButtonClick = () => {
    speakText("Here is the process on how to enroll as regular student here at P U P Lopez.")
    setShowRegular(!showRegular);
    setShowIrregular(false);
    setShowFreshmen(false);
    setShowTransferee(false);

    window.scrollTo(0, 0);
  };
  const handleIrregularButtonClick = () => {
    speakText("Here is the process on how to enroll a irregular student at P U P Lopez.")
    setShowIrregular(!showIrregular);
    setShowRegular(false);
    setShowFreshmen(false);
    setShowTransferee(false);

    window.scrollTo(0, 0);

  };
  const handleFreshmenButtonClick = () => {
    speakText("Here is the process on how to enroll as fresmen student at P U P Lopez. Follow this steps and you can definitely one of us")
    setShowFreshmen(!showFreshmen);
    setShowIrregular(false);
    setShowRegular(false);
    setShowTransferee(false);

    window.scrollTo(0, 0);
  }
  const handleTransfereeButtonClick = () => {
    speakText("Here is the process on how to enroll a transferee student at P U P Lopez.")
    setShowTransferee(!showTransferee);
    setShowFreshmen(false);
    setShowIrregular(false);
    setShowRegular(false);

    window.scrollTo(0, 0);

  }

  return (
    <div>
      <div className='choices-button' >
      <button className={showRegular ? 'active-button' : ''} onClick={handleRegularButtonClick}> REGULAR </button>
      <button className={showIrregular ? 'active-button' : ''} onClick={handleIrregularButtonClick}> IRREGULAR</button>
      <button className={showFreshmen ? 'active-button' : ''} onClick={handleFreshmenButtonClick}> FRESHMEN </button>
      <button className={showTransferee? 'active-button' : ''} onClick={handleTransfereeButtonClick}> TRANSFEREE </button>
      </div>
      <div>
      {showRegular && <DisplayComponent />}
      {showIrregular && <Irregular />}
      {showFreshmen && <Freshmen />}
      {showTransferee && <Transferee />}
      </div>
    </div>
  );
}

export default App;
