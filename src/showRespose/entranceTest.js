import React, { useEffect, useState, useRef } from 'react';
import './showResponse.css';
import voiceEntranceTest from '../speakVoice/entranceTest.mp3'; 

const EntranceTest = () => {
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
    // Play voiceHistory when the component mounts
    setCurrentVoice(voiceEntranceTest);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);


  return (
    <div className='step'>
      <h3>The PUP Lopez Branch has a PUP College Entrance Test. Press the link below and it will redirect you to Online Application for the PUP College Entrance Test.</h3>
      <br></br>
      <p>PUPCET - PUP College Entrance Exam -  (<a href='https://www.pup.edu.ph/iapply/PUPCET' target='_blank' rel='noopener noreferrer'>https://www.pup.edu.ph/iapply/PUPCET</a>) </p>
    </div>
  );
};
export default EntranceTest;
