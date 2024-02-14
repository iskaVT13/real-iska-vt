import React, { useState, useEffect, useRef } from 'react';
import './displayDesign.css';
import DisplayComponent from '../showRespose/Enroll/regular';
import Irregular from '../showRespose/Enroll/irregular';
import Freshmen from '../showRespose/Enroll/freshmen';
import Transferee from '../showRespose/Enroll/transferee';
import voiceRegular from '../speakVoice/regular.mp3';
import voiceIrregular from '../speakVoice/irregular.mp3';
import voiceFreshmen from '../speakVoice/freshmen.mp3';
import voiceTransferee from '../speakVoice/transferee.mp3';
import voiceEnrollment from '../speakVoice/enrollment.mp3'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Iska from '../pictures/avatar.gif';


function App() {
  const [showRegular, setShowRegular] = useState(false);
  const [showIrregular, setShowIrregular] = useState(false);
  const [showFreshmen, setShowFreshmen] = useState(false);
  const [showTransferee, setShowTransferee] = useState(false);
  const [showChoices, setShowChoices] = useState(true); // Added state for choices visibility
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

  useEffect(() => {
    // Play voiceEnrollment when the component mounts
    setCurrentVoice(voiceEnrollment);
    setPlayVoice(true);

    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  const handleRegularButtonClick = () => {
    stopAudio();
    setShowRegular(!showRegular);
    setShowIrregular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceRegular);
    setPlayVoice(true);
    setShowChoices(false); // Hide choices when event is displayed
    window.scrollTo(0, 0);

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleIrregularButtonClick = () => {
    stopAudio();
    setShowIrregular(!showIrregular);
    setShowRegular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    setCurrentVoice(voiceIrregular);
    setPlayVoice(true);
    setShowChoices(false);
    window.scrollTo(0, 0);

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleFreshmenButtonClick = () => {
    stopAudio();
    setShowFreshmen(!showFreshmen);
    setShowIrregular(false);
    setShowRegular(false);
    setShowTransferee(false);
    setCurrentVoice(voiceFreshmen);
    setPlayVoice(true);
    setShowChoices(false);
    window.scrollTo(0, 0);

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleTransfereeButtonClick = () => {
    stopAudio();
    setShowTransferee(!showTransferee);
    setShowFreshmen(false);
    setShowIrregular(false);
    setShowRegular(false);
    setCurrentVoice(voiceTransferee);
    setPlayVoice(true);
    setShowChoices(false);
    window.scrollTo(0, 0);

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleBackButtonClick = () => {
    // Show choices buttons and hide the event display
    setShowChoices(true);
    setShowRegular(false);
    setShowIrregular(false);
    setShowFreshmen(false);
    setShowTransferee(false);
    window.scrollTo(0, 0);


    const showMicandSearch = document.querySelectorAll('.bottom');
    showMicandSearch.forEach((element) => {
      element.style.display = '';});
  };

  return (
    <div className='choices-container'>
      {showChoices && (
        <div className='choices-content'>
          <p>Please choose from the options below to indicate the enrollment category you prefer.</p>
          <div className='choices-button'>
            <button className={showRegular ? 'active-button' : ''} onClick={handleRegularButtonClick}>REGULAR</button>
            <button className={showIrregular ? 'active-button' : ''} onClick={handleIrregularButtonClick}>IRREGULAR</button>
            <button className={showFreshmen ? 'active-button' : ''} onClick={handleFreshmenButtonClick}>FRESHMEN</button>
            <button className={showTransferee ? 'active-button' : ''} onClick={handleTransfereeButtonClick}>TRANSFEREE</button>
            <img src={Iska} alt='iska-img' />

          </div>
        </div>
      )}

      {!showChoices && (
        <div className='show-event'>
          <div className='show-content'>
          {showRegular && <DisplayComponent />}
          {showIrregular && <Irregular />}
          {showFreshmen && <Freshmen />}
          {showTransferee && <Transferee />}
          </div>
          <FontAwesomeIcon onClick={handleBackButtonClick} icon={faArrowLeft}  size="xl" color="#ffbd00" id='back' className='back-choices'/>
        </div>
      )}
    </div>
  );
}

export default App;
