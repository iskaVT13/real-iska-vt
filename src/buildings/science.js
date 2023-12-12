// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import pylon from '../areaImage/pylon2022.jpg';
import admission from '../areaImage/Admin Building.jpg';
import lab1 from '..//areaImage/Lab 1.jpg';
import lab2 from '../areaImage/Lab 2.jpg';
import yumul from '../areaImage/Yumul Building.jpg';
import nantes from '../areaImage/Nantes (front view).jpg';
import gymnasium from '../areaImage/Gym.jpg';
import grandstand from '../areaImage/Grandstand.jpg';
import education from '../areaImage/Educ Bldg.jpg';
import engineer from '../areaImage/Engineering Building.jpg';
import hospitality from '../areaImage/HM _ Plant Lab (front view).jpg';
import ecopark from '../areaImage/eco park.jpg';
import canteen from '../areaImage/Canteen.jpg';

function NantesButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../goingTo/goScience.json')
      .then((responseModule) => setResponses(responseModule.default))
      .catch((error) => console.error('Error loading responses:', error));
  }, []);

  const fetchImageURL = useCallback(async () => {
    if (currentButton && currentButton.clickedImage) {
      const imageRef = ref(storage, currentButton.clickedImage);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
    }
  }, [currentButton]);

  useEffect(() => {
    fetchImageURL();
  }, [fetchImageURL]);

  const handleImageClick = (button) => {
    setCurrentButton(responses[button]);
    setIsActive(true);
     // Hide elements with the textOther classname
     const hideTextOther = document.querySelectorAll('.textOther');
    hideTextOther.forEach((element) => {
      element.style.display = 'none';
    });

    const hideReset = document.querySelectorAll('.reset-button');
    hideReset.forEach((element) => {
      element.style.display = 'none';
    });
    const hideAvatar = document.querySelectorAll('.avatar-container');
    hideAvatar.forEach((element) => {
      element.style.display = 'none';
    });
  };

  const handleBackButtonClick = () => {
    setCurrentButton('');
    setIsActive(false);
    // Show elements with the textOther classname
    const showTextOther = document.querySelectorAll('.textOther');
    showTextOther.forEach((element) => {
      element.style.display = ''; // Set to an empty string to use the default display value
    });
    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
  };
   // Function to handle text-to-speech synthesis
   const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    synth.speak(utterance);
  };

  useEffect(() => {
    // Ensure that the SpeechSynthesis API is supported
    if ('speechSynthesis' in window) {
      // Use speakText function to speak the responseText
      speakText(currentButton.responseText);
    }
  }, [currentButton]);


  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
        <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src={pylon} />
        <p>MAIN GATE</p>
        <img onClick={() => handleImageClick('admission')} alt='Admission' className='admission-image' src={admission} />
        <p>ADMISSION OFFICE</p>
        <img  onClick={() => handleImageClick('lab1')} alt='lab1' className='lab1-image' src={lab1}/>
        <p>COMPUTER LABORATORY 1</p>
        <img onClick={() => handleImageClick('lab2')}alt='lab2' className='lab2-image' src={lab2} />
        <p>COMPUTER LABORATORY 2</p>
        <img onClick={() => handleImageClick('yumul')} alt='yumul' className='yumul-image' src={yumul} />
        <p>YUMUL BUILDING</p>
        <img onClick={() => handleImageClick('canteen')} alt='canteen' className='canteen-image' src={canteen} />
        <p>CANTEEN</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gymnasium} />
        <p>GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={education} />
        <p>EDUCATION BUILDING</p>
        <img onClick={() => handleImageClick('nantes')}  alt='science' className='nantes-image' src={nantes} />
        <p>ACCOUNTANCY and MARKETING BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grandstand} />
        <p>GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={engineer} />
        <p>ENGINEERING and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hospitality} />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src={ecopark} />
        <p>Eco Park</p>
      
    </div>
  )}

      {isActive && (
        <div className="image-container">
          <button onClick={handleBackButtonClick} className="back-button">
            Back
          </button>
          <div className='gif'>
          <p className='text-gif'>{currentButton.responseText}</p>
          <img  src={imageURL} alt={currentButton.title} />
          </div>
          
        </div>
      )}
    </div>
  );
}

export default NantesButton;
