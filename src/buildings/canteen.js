// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import gate from '../areaImage/gate.webp';
import admin from '../areaImage/admin.webp';
import lab1 from '../areaImage/lab1.webp';
import lab2 from '../areaImage/lab2.webp';
import yumul from '../areaImage/yumul.webp';
import science from '../areaImage/science.webp';
import archi from '../areaImage/archi.webp';
import eco from '../areaImage/eco.webp';
import educ from '../areaImage/educ.webp';
import nantes from '../areaImage/nantes.webp';
import hm from '../areaImage/hm.webp';
import gym from '../areaImage/gym.webp';
import grand from '../areaImage/grand.webp';

import voiceCanteen from '../speakText/canteen.mp3';

function CanteenButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const canteenAudio = useMemo(() => new Audio(voiceCanteen), []);  

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../goingTo/goCanteen.json')
      .then((responseModule) => setResponses(responseModule.default))
      .catch((error) => console.error('Error loading responses:', error));

      canteenAudio.play();

      window.scrollTo(0, 0);
  }, [canteenAudio]);

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

    if (canteenAudio) {
      canteenAudio.pause();
      canteenAudio.currentTime = 0;
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
    if (canteenAudio) {
      canteenAudio.pause();
      canteenAudio.currentTime = 0;
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
    <div className="areaImagecontainer">
    {!isActive && (
    <div className="buttons-container">
            <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Canteen</p>
      </div>
      <div className='image-grid'>
    <div className='image-text'>
    <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src={gate} />
        <p>Main Gate</p>
    </div>
    <div className='image-text'>
    <img onClick={() => handleImageClick('admin')} className="gate" alt="Main Gate" src={admin} />
        <p>Administration Building</p>
    </div>
    <div className='image-text'>
    <img  onClick={() => handleImageClick('lab1')} alt='lab1' className='lab1-image' src={lab1} />
        <p>ICT Laboratory 1</p>
    </div>
    <div className='image-text'>
    <img onClick={() => handleImageClick('lab2')}alt='lab2' className='lab2-image' src={lab2} />
        <p>ICT Laboratory 2</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('yumul')} alt='yumul' className='yumul-image' src={yumul} />
        <p>Yumul Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('nantes')}  alt='nantes' className='nantes-image' src={nantes} />
        <p>Business and Accountancy Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gym} />
        <p>PUP Gymnasium</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={educ} />
        <p>Education and Public Administration Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src={science} />
        <p>Health and Science Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grand} />
        <p>PUP Grandstand</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={archi} />
        <p>Enigineering, Technology and Architecture Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hm} />
        <p>Hospitality Management Building</p>
    </div>
    <div className='image-text'>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src={eco} />
        <p>PUP Ecopark</p>
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

export default CanteenButton;
