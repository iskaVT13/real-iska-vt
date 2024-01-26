import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';
import voiceFounded from '../../speakText/Founded.mp3'; 

const Founded = () => {
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
    setCurrentVoice(voiceFounded);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);


  return (
    <div className='step'>
      <h2>History of PUP Lopez Branch</h2>
      <p>The PUP Lopez Branch was established in February 13, 1979 during the Presidency of Dr. Pablo T. Mateo Jr.</p>
    </div>
  );
};
export default Founded;
