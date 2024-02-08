import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';

import voicePhilo from '../../speakVoice/philo.mp3'; 

const Philosophy = () => {
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
    // Play voicePhilo when the component mounts
    setCurrentVoice(voicePhilo);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  window.scrollTo(0, 0);

  return (
    <div>
      <div className='step'>
        <p className='title'>The PUP Philosophy</p><br/>
        <ul>
            <p>As a state university, the Polytechnic University of the Philippines believes that:</p>
            <li>Education is an instrument for the development of the citizenry and for the enhancement of nation building; and</li>
            <li>That meaningful growth and transformation of the country are best achieved in an atmosphere of brotherhood, peace, freedom, justice and nationalist-oriented education imbued with the spirit of humanist internationalism.</li>
        </ul>
        <p className='title'>Pilosopiya ng PUP</p><br/>
        <p>Bilang pambansang unibersidad, naniniwala ang Politeknikong Unibersidad ng Pilipinas na:</p>
        <ul>
          <li>Ang edukasyon ay instrumento para sa pagpapaunlad ng mamamayan at pagpapahusay ng pagbuo ng bansa at</li>
          <li>Ang makabuluhang pag-unlad at pagbabago sa bansa ay matagumpay na makakamtan sa esensya ng kapatiran, kapayapaan, kalayaan, katarungan at makabayang oryentasyon ng edukasyon na may pagbuo ng diwa ng pagkamakatao at internasyunalismo.</li>
        </ul>
        <p></p>

      </div>

    </div>
  );
};

export default Philosophy;
