import React, { useState, useEffect, useRef } from 'react';
import './displayDesign.css';

import Iska from '../pictures/avatar.gif';

import Bachelor from '../showRespose/Programs/bachelor';
import Diploma from '../showRespose/Programs/diploma';

import voiceBachelor from '../speakVoice/bachelor.mp3';
import voiceDiploma from '../speakVoice/diploma.mp3';
import voicePrograms from '../speakVoice/courses.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showBachelor, setShowBachelor] = useState(false);
  const [showDiploma, setShowDiploma] = useState(false);
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
    // Play voicePrograms when the component mounts
    setCurrentVoice(voicePrograms);
    setPlayVoice(true);

    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  const handleBachelorButtonClick = () => {
    stopAudio();
    setShowBachelor(!showBachelor);
    setShowDiploma(false);
    setCurrentVoice(voiceBachelor);
    setPlayVoice(true);
    setShowChoices(false);
    window.scrollTo(0, 0);
  
    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleDiplomaButtonClick = () => {
    stopAudio();
    setShowDiploma(!showDiploma);
    setShowBachelor(false);
    setCurrentVoice(voiceDiploma);
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
    setShowBachelor(false);
    setShowDiploma(false);
    window.scrollTo(0, 0);

    const showMicandSearch = document.querySelectorAll('.bottom');
    showMicandSearch.forEach((element) => {
      element.style.display = '';});
  };
  

  return (
    <div className='choices-container'>
      {showChoices && (
        <div className='choices-content'>
          <p>The PUP Lopez offers a lot of programs. Please select below which category do you want to see.</p>
          <div className='choices-button'>
            <button className={showBachelor ? 'active-button' : ''} onClick={handleBachelorButtonClick}>
              BACHELOR COURSES
            </button>
            <button className={showDiploma ? 'active-button' : ''} onClick={handleDiplomaButtonClick}>
              DIPLOMA COURSES
            </button>
            <img src={Iska} alt='iska-img' />
          </div>
        </div>
      )}

      {!showChoices && (
        <div className='show-event'>
          <div className='show-content'>
          {showBachelor && <Bachelor />}
          {showDiploma && <Diploma />}
          </div>
          <FontAwesomeIcon onClick={handleBackButtonClick} icon={faArrowLeft}  size="xl" color="#ffbd00" id='back' className='back-choices'/>
        </div>
      )}
    </div>
  );
}

export default App;
