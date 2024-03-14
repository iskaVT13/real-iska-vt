import React, { useState, useEffect, useRef } from 'react';
import './displayDesign.css';

import History from '../showRespose/About/history';
import Mission from '../showRespose/About/mission';
import Hymn from '../showRespose/About/hymn';
import Pillars from '../showRespose/About/pillars';
import Philo from '../showRespose/About/philo';

import voiceHymn from '../speakVoice/hymn.mp3';
import voiceMission from '../speakVoice/mission.mp3';
import voiceHistory from '../speakVoice/history.mp3';
import voiceAbout from '../speakVoice/aboutPUP.mp3';
import voicePillars from '../speakVoice/pillars.mp3';
import voicePhilo from '../speakVoice/philo.mp3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showHymn, setShowHymn] = useState(false);
  const [showPillars, setShowPillars] = useState(false);
  const [showPhilo, setShowPhilo] = useState(false);
  const [showChoices, setShowChoices] = useState(true); // Added state for choices visibility
  const [playVoice, setPlayVoice] = useState(false);
  const [currentVoice, setCurrentVoice] = useState('');
  const audioRef = useRef(null); // Add a reference to the audio element

  useEffect(() => {
    if (playVoice) {
      const audioPlayer = new Audio(currentVoice);
      audioRef.current = audioPlayer;

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
    // Play voiceAbout when the component mounts
    setCurrentVoice(voiceAbout);
    setPlayVoice(true);

    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  const handleHistoryButtonClick = () => {
    stopAudio();
    setShowHistory(!showHistory);
    setShowMission(false);
    setShowHymn(false);
    setCurrentVoice(voiceHistory);
    setPlayVoice(true);
    setShowPhilo(false);
    setShowPillars(false);
    setShowChoices(false);
    window.scrollTo(0, 0);
    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleMissionButtonClick = () => {
    stopAudio();
    setShowMission(!showMission);
    setShowHistory(false);
    setShowHymn(false);
    setCurrentVoice(voiceMission);
    setPlayVoice(true);
    setShowPhilo(false);
    setShowPillars(false);
    setShowChoices(false);
    window.scrollTo(0, 0);
    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handleHymnButtonClick = () => {
    stopAudio();
    setShowHymn(!showHymn);
    setShowHistory(false);
    setShowMission(false);
    setCurrentVoice(voiceHymn);
    setPlayVoice(true);
    setShowPhilo(false);
    setShowPillars(false);
    setShowChoices(false);
    window.scrollTo(0, 0);
    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handlePillarButtonClick = () => {
    stopAudio();
    setShowPillars(!showPillars);
    setShowHistory(false);
    setShowMission(false);
    setShowPhilo(false);
    setCurrentVoice(voicePillars);
    setPlayVoice(true);
    setShowChoices(false);
    window.scrollTo(0, 0);
    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';});
  };

  const handlePhiloButtonClick = () => {
    stopAudio();
    setShowPhilo(!showPhilo);
    setShowHistory(false);
    setShowMission(false);
    setShowPhilo(true);
    setShowPillars(false);
    setCurrentVoice(voicePhilo);
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
    setShowHistory(false);
    setShowMission(false);
    setShowHymn(false);
    setShowPillars(false);
    setShowPhilo(false);
    window.scrollTo(0, 0);
    const showMicandSearch = document.querySelectorAll('.bottom');
    showMicandSearch.forEach((element) => {
      element.style.display = '';});
  };

  return (
    <div className='choices-container'>
      {showChoices && (
        <div className='choices-content'>
          <p>Here are some information about PUP Lopez. Please select below which one do you want to see.</p>
          <div className='choices-button'>
            <button className={showHistory ? 'active-button' : ''} onClick={handleHistoryButtonClick}>HISTORY</button>
            <button className={showMission ? 'active-button' : ''} onClick={handleMissionButtonClick}>MISSION and VISION</button>
            <button className={showHymn ? 'active-button' : ''} onClick={handleHymnButtonClick}>PUP HYMN</button>
            <button className={showPillars ? 'active-button' : ''} onClick={handlePillarButtonClick}>10 PILLARS</button>
            <button className={showPhilo ? 'active-button' : ''} onClick={handlePhiloButtonClick}>PUP PHILOSOPHY</button>
          </div>
        </div>
      )}

      {!showChoices && (
        <div className='show-event'>
          <div className='show-content'>
            <div className='content'>
          {showHistory && <History />}
          </div>
          <div className='content'>
          {showMission && <Mission />}
          </div>
          <div className='content'>
          {showHymn && <Hymn />}
          </div>
          <div className='content'>
          {showPillars && <Pillars />}
          </div>
          <div className='content'>
          {showPhilo && <Philo />}
          </div>
          </div>
          <FontAwesomeIcon onClick={handleBackButtonClick} icon={faArrowLeft}  size="xl" color="#ffbd00" id='back' className='back-choices'/>
        </div>
      )}
    </div>
  );
}

export default App;
