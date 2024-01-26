import React, { useEffect, useState, useRef } from 'react';
import './showResponse.css';
import voiceDirector from '../speakText/Director.mp3'; 

import tempPic from '../pictures/placePic/pup-logo.png';

const Director = () => {
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
    setCurrentVoice(voiceDirector);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);


  return (
    <div className='step'>
      <h2>The PUP Lopez Branch Director</h2>
      <img className='screenshot' src={tempPic} alt='pup-logo' />
      <h3>Assoc. Prof. Ronaldo G. Bulfa, MBA</h3>
    </div>
  );
};
export default Director;
