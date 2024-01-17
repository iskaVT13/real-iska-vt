// src/App.js
import React, { useState, useEffect, useRef} from 'react';
import './displayDesign.css';

import History from '../showRespose/About/history';
import Mission from '../showRespose/About/mission';
import Hymn from '../showRespose/About/hymn';

import voiceHymn from '../speakText/hymn.mp3';
import voiceMission from '../speakText/mission.mp3';
import voiceHistory from '../speakText/history.mp3';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showHymn, setShowHymn] = useState(false);
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

  const handleHistoryButtonClick = () => {
    stopAudio();
    setShowHistory(!showHistory);
    setShowMission(false);
    setShowHymn(false);
    setCurrentVoice(voiceHistory);
    setPlayVoice(true);
    
    window.scrollTo(0, 0);
  };
  const handleMissionButtonClick = () => {
    stopAudio();
    setShowMission(!showMission);
    setShowHistory(false);
    setShowHymn(false);
    setCurrentVoice(voiceMission);
    setPlayVoice(true);

    window.scrollTo(0, 0);

  };

  const handleHymnButtonClick = () => {
    stopAudio();
    setShowHymn(!showHymn);
    setShowHistory(false);
    setShowMission(false);
    setCurrentVoice(voiceHymn);
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
      <button className={showHistory ? 'active-button' : ''} onClick={handleHistoryButtonClick}>HISTORY</button>
      <button className={showMission ? 'active-button' : ''} onClick={handleMissionButtonClick}>MISSION and VISION</button>
      <button className={showHymn ? 'active-button' : ''} onClick={handleHymnButtonClick}> PUP HYMN</button>
      </div>
      <br></br>
      <div>
      {showHistory && <History />}
      {showMission && <Mission />}
      {showHymn && <Hymn />}
      </div>
    </div>
  );
}

export default App;
