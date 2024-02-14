// Org.js

import React, { useState, useEffect, useRef } from 'react';

import AdminHead from './adminHead';
import Itdep from './orglist/IT';
import Educdep from './orglist/educ';
import Civildep from './orglist/civil';
import Biodep from './orglist/bio';
import Agri from './orglist/agri';
import PubAd from './orglist/publicAd';
import OffAd from './orglist/officeAd';
import Acc from './orglist/accountancy';
import Hospi from './orglist/hm';

import voiceOrg from '../speakVoice/org.mp3'


import './showResponse.css';

const Org = () => {
    const [currentSubComponent, setCurrentSubComponent] = useState(null);
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
      setCurrentVoice(voiceOrg);
      setPlayVoice(true);
    
      // Cleanup function to stop audio when the component unmounts
      return () => {
        stopAudio();
      };
    }, []);


  const handleButtonClick = (subComponent) => {
    setCurrentSubComponent(subComponent);
    window.scroll(0, 0);

  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentSubComponent]);

  const renderSubComponent = () => {

    
    switch (currentSubComponent) {
      case 'AdminHead':
        return <AdminHead onBack={() => setCurrentSubComponent(null)}/>

      case 'Itdep':
        return <Itdep onBack={() => setCurrentSubComponent(null)} />;

      case 'Educdep':
        return <Educdep onBack={() => setCurrentSubComponent(null)} />;

      case 'Civildep':
        return <Civildep onBack={() => setCurrentSubComponent(null)} />;

      case 'Biodep':
        return <Biodep onBack={() => setCurrentSubComponent(null)} />;

      case 'Agri':
        return <Agri onBack={() => setCurrentSubComponent(null)} />;

      case 'OffAd':
        return <OffAd onBack={() => setCurrentSubComponent(null)} />;

      case 'PubAd':
        return <PubAd onBack={() => setCurrentSubComponent(null)} />;

      case 'Hospi':
        return <Hospi onBack={() => setCurrentSubComponent(null)} />;

      case 'Acc':
          return <Acc onBack={() => setCurrentSubComponent(null)} />;

      default:
        return null;
    }
  };


  return (
    <div className='org-button'>
      {currentSubComponent ? (
        renderSubComponent()
      ) : (
        <>
        <div className='title-org'>
          <h2>Organizational Chart</h2>
          <div className='button-org'>
        <button onClick={() => handleButtonClick('AdminHead')}>Administration Officers</button>
          </div>
          <h3>PUP Lopez Department</h3>
          </div>
        <div className='button-org'>
        <div className='per-course'>
          <h4>Business and Accountancy</h4>
          <button onClick={() => handleButtonClick('Acc')}>Business and Accountancy</button>
        </div>
        <div className='per-course'>
          <h4>Agriculture and Agri-business</h4>
          <button onClick={() => handleButtonClick('Agri')}>Agriculture Management Department</button>
        </div>
        <div className='per-course'>
          <h4>Architecture and Engineering</h4>
          <button onClick={() => handleButtonClick('Civildep')}>Architecture and Engineering Department</button>
        </div>
        <div className='per-course'>
          <h4>Information Technology & Computer Engineering</h4>
          <button onClick={() => handleButtonClick('Itdep')}>Information Technology & Computer Engineering</button>
        </div>
        <div className='per-course'>
          <h4>Education and Public Administration</h4>
          <button onClick={() => handleButtonClick('Educdep')}>Education Department</button>
          <button onClick={() => handleButtonClick('PubAd')}>Public Administration Department</button>
        </div>
        <div className='per-course'>
          <h4>Health and Science</h4>
          <button onClick={() => handleButtonClick('Biodep')}>Biology & Nutritionist Department</button> 
        </div>
        <div className='per-course'>
          <h4>Hospitality and Office Administration</h4>
          <button onClick={() => handleButtonClick('Hospi')}>Hospitality Management Department</button>
          <button onClick={() => handleButtonClick('OffAd')}>Office Administration Department</button>
        </div>
        
          </div>
        </>
        
      )}
    </div>
  );
};

export default Org;
