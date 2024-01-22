import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';

import voiceMission from '../../speakText/mission.mp3'; 

const Mission = () => {
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
    // Play voiceMission when the component mounts
    setCurrentVoice(voiceMission);
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
        <p className='title'>PUP Vision</p><br/>
        <h2 className='title'>PUP: The National Polytechnic University</h2><br/>
        <p className='title'>PUP Mission</p>
        <ul>
            <p>Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities through a re-engineered polytechnic university by committing to:</p>
            <li>Provide democratized access to educational opportunities for the holistic development of individuals with global perspective</li>
            <li>Offer industry-oriented curricula that produce highly-skilled professionals with managerial and technical capabilities and a strong sense of public service for nation building</li>
            <li>Embed a culture of research and innovation</li>
            <li>Continuously develop faculty and employees with the highest level of professionalism</li>
            <li>Engage public and private institutions and other stakeholders for the attainment of social development goal</li>
            <li>Establish a strong presence and impact in the international academic community</li>
        </ul>
        <p className='title'>PUP Misyon</p><br/>
        <p>Tinitiyak na makapaghain ng edukasyon na may kalidad para sa lahat at  magsulong ng panghabambuhay na pagkatuto sa pamamagitan nang patuloy na paglinang ng  politeknikong unibersidad na may paninidigan sa:</p>
        <ul>
          <li>pagbigay ng pantay na pang-akademikong  oportunidad para sa holistikong pag-unlad ng indibidwal na may pandaigdigang perspektiba</li>
          <li>paghain ng akademikong programa na tumutugon sa pangangailangan ng industriya na magluluwal ng mga propesyunal na may kahusayan sa pamamahala at kasanayang teknikal gayundin may matatag na kamalayang mapaglingkod para sa pagbuo ng bansa</li>
          <li>paglangkap ng kultura ng pananaliksik at inobasyon</li>
          <li>patuloy na pagpapaunlad ng kaguruan at kawani sa pinakamataas na antas ng propesyunalisasyon</li>
          <li>paghikayat  sa  pampubliko at pribadong institusyon at iba pang pinaglilingkuran para sa pagkakamit ng hangaring panlipunang pag-unlad</li>
          <li>paglikha nang matatag na pag-iral at impluwensya sa internasyunal na komunidad pang-akademiko</li>
        </ul>
        <p></p>

      </div>

    </div>
  );
};

export default Mission;
