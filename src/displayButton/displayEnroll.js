// src/App.js
import React, { useState, useEffect } from 'react';
import './displayDesign.css';
import DisplayComponent from '../showRespose/Enroll/regular';
import Irregular from '../showRespose/Enroll/irregular';
import Freshmen from '../showRespose/Enroll/freshmen';
import Transferee from '../showRespose/Enroll/transferee';
import voiceRegular from '../speakText/regular.mp3';
import voiceIrregular from '../speakText/irregular.mp3';
import voiceFreshmen from '../speakText/freshmen.mp3';
import voiceTransferee from '../speakText/transferee.mp3';

function App() {
  const [showRegular, setShowRegular] = useState(false);
  const [showIrregular, setShowIrregular] = useState(false);
  const [showFreshmen, setShowFreshmen] = useState(false);
  const [showTransferee, setShowTransferee] = useState(false);
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

  const handleRegularButtonClick = () => {
    setShowRegular(!showRegular);
    setShowIrregular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceRegular);
    setPlayVoice(true);

    window.scrollTo(0, 0);
  };
  const handleIrregularButtonClick = () => {
    setShowIrregular(!showIrregular);
    setShowRegular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceIrregular);
    setPlayVoice(true);
  

    window.scrollTo(0, 0);

  };
  const handleFreshmenButtonClick = () => {
    setShowFreshmen(!showFreshmen);
    setShowIrregular(false);
    setShowRegular(false);
    setShowTransferee(false);
    setCurrentVoice(voiceFreshmen);
    setPlayVoice(true);


    window.scrollTo(0, 0);
  }
  const handleTransfereeButtonClick = () => {
    setShowTransferee(!showTransferee);
    setShowFreshmen(false);
    setShowIrregular(false);
    setShowRegular(false);
    setCurrentVoice(voiceTransferee);
    setPlayVoice(true);

    window.scrollTo(0, 0);

  }

  return (
    <div>

      <div className='choices-button' >
      <div>
        <p> Please choose from the options below to indicate the enrollment category you prefer.
</p>
      </div>
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
