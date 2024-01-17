// src/App.js
import React, { useState, useEffect, useRef } from 'react';
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

  const handleRegularButtonClick = () => {
    stopAudio();
    setShowRegular(!showRegular);
    setShowIrregular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceRegular);
    setPlayVoice(true);

    window.scrollTo(0, 0);
  };
  const handleIrregularButtonClick = () => {
    stopAudio();
    setShowIrregular(!showIrregular);
    setShowRegular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceIrregular);
    setPlayVoice(true);
  

    window.scrollTo(0, 0);

  };
  const handleFreshmenButtonClick = () => {
    stopAudio();
    setShowFreshmen(!showFreshmen);
    setShowIrregular(false);
    setShowRegular(false);
    setShowTransferee(false);
    setCurrentVoice(voiceFreshmen);
    setPlayVoice(true);


    window.scrollTo(0, 0);
  }
  const handleTransfereeButtonClick = () => {
    stopAudio();
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
