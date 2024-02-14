import React, { useState, useRef, useEffect } from 'react';
import './showResponse.css';

import Applogo from '../pictures/iska-iconn.ico';

import leader from '../pictures/placePic/pup-logo.png';
import FeedBackForm  from './sendEmail';

import teamLogo from '../pictures/team-logo.jpg';

import voiceTeam from '../speakVoice/team.mp3';

const CodeCraftTeam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
      setCurrentVoice(voiceTeam);
      setPlayVoice(true);
    
      // Cleanup function to stop audio when the component unmounts
      return () => {
        stopAudio();
      };
    }, []);

    const handleButtonClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className='team-container'>
        <div className='team-logo'>
            <img src={teamLogo} alt="Leader" />
        </div>
      <h2>Team CodeCraft</h2>
      <div className='team-contents'>
        <div className='team-desc'>
          <img src={leader} alt='leader'/>
          <p>Mc Vincent R. Paredes</p>
        </div>
          <div className='team-desc'>
            <img src={leader} alt='image2'/>
            <p>Jaybee C. Santua</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image3'/>
            <p>Christian Sagun</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image4'/>
            <p>Liza May Nonzol</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image5'/>
            <p>Gjellah Mae M. Mortega</p>
          </div>
          </div>
          <div className='about-app'>
        <img src={Applogo} alt='logo-app'/>
      <p>
        A Capstone Project of BSIT 4 student of Polytechnic University of the Philippines Lopez, Quezon Branch. 
      </p>
      </div>
          <div>
            <div className='button-feedback'>
            <button onClick={handleButtonClick}>Give us a Feedback</button>
            <div>
              <p>Contact us: </p>
              <ul>
                <li>pupiska13@gmail.com</li>
              </ul>
            </div>
            <div className='modal-footer'>
              <p>2023 | ISKA | PUP Lopez Quezon</p>
            </div>
            </div>

          <div className='pop-form'>
          {isModalOpen && <FeedBackForm onClose={handleCloseModal} />}
          </div>
          </div>
          
      </div>
  );
};

export default CodeCraftTeam;
