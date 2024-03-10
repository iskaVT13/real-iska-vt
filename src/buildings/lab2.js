// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import MapImg from '../pictures/3Dmap.jpg';

import voicelab2 from '../speakVoice/lab2.mp3';

function Lab2Button() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const lab2Audio = useMemo(() => new Audio(voicelab2), []);  

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../goingTo/goLab2.json')
      .then((responseModule) => setResponses(responseModule.default))
      .catch((error) => console.error('Error loading responses:', error));

      lab2Audio.play();

      window.scrollTo(0, 0);
  }, [lab2Audio]);

  const fetchImageURL = useCallback(async () => {
    if (currentButton && currentButton.clickedImage) {
      const imageRef = ref(storage, currentButton.clickedImage);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
    }

    window.scrollTo(0, 0);
  }, [currentButton]);

  useEffect(() => {
    fetchImageURL();
  }, [fetchImageURL]);

  const handleImageClick = (button) => {
    const buttonData = responses[button];
    setCurrentButton(responses[button]);
    setIsActive(true);

    if (lab2Audio) {
      lab2Audio.pause();
      lab2Audio.currentTime = 0;
    }
    if (buttonData.speakVoice) {
      playAudio(buttonData.speakVoice);
    }

    const hideReset = document.querySelectorAll('.reset-button');
    hideReset.forEach((element) => {
      element.style.display = 'none';
    });
    const hideAvatar = document.querySelectorAll('.avatar-container');
    hideAvatar.forEach((element) => {
      element.style.display = 'none';
    });
     // Scroll to the top
     window.scrollTo(0, 0);
  };

  const playAudio = (audioURL) => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  const handleBackButtonClick = () => {
    if (lab2Audio) {
      lab2Audio.pause();
      lab2Audio.currentTime = 0;
    }
    setCurrentButton('');
    setIsActive(false);

    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
     // Scroll to the top
     window.scrollTo(0, 0);
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
            <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to ICT laboratory 2</p>
      </div>
      <div className='map-img'>
      <img src={MapImg} alt='map-img'/>
      </div>
      <div className='pin-admin'>
      <div className='icon-text'>
    <FontAwesomeIcon  onClick={() => handleImageClick('admin')} icon={faLocationDot} size='xl'/>
        <p></p>
    </div>
        </div>
      <div className='pin-gate'>
    <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('gate')} className="gate" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>

      <div className='pin-lab1'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('lab1')} className="lab1" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='p-lab2'>
      <div className='icon-text'>
    <FontAwesomeIcon className="lab2" icon={faLocationDot} size='2xl' beat />
        <p></p>
    </div>
        </div>
        <div className='pin-yumul'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('yumul')} className="lab2" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-canteen'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('canteen')} className="canteen" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-science'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('science')} className="science" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-archi'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('engineer')} className="engineer" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-educ'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('education')} className="educ" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-gym'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('gym')} className="gym" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-hm'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('hospitality')} className="hm" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-nantes'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('nantes')} className="nantes" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-grandstand'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('grandstand')} className="grandstand" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
        <div className='pin-eco'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('ecopark')} className="ecopark" icon={faLocationDot} size='xl' />
        <p></p>
    </div>
        </div>
      
    </div>
  )}

<div className='showImage'>

{isActive && (
  <div className="image-container">
    <p className='text-gif'>{currentButton.responseText}</p>
    <FontAwesomeIcon className="back-button" onClick={handleBackButtonClick} icon={faArrowLeft} size="xl" style={{color: "#FFD43B",}} />
    <div className='gif'>
    <img  src={imageURL} alt={currentButton.title} />
    </div>
    <div className='direction-container'>
</div>
  </div>
)}
    </div>
    </div>
  );
}

export default Lab2Button;
