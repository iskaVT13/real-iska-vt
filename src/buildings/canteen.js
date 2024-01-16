// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import gate from '../areaImage/gate.jpg';
import admission from '../areaImage/Admin Building.jpg';
import lab1 from '..//areaImage/Lab 1.jpg';
import lab2 from '../areaImage/Lab 2.jpg';
import yumul from '../areaImage/Yumul Building.jpg';
import nantes from '../areaImage/Nantes (front view).jpg';
import gymnasium from '../areaImage/Gym.jpg';
import grandstand from '../areaImage/Grandstand.jpg';
import science from '../areaImage/Health and Sciences Building.jpg';
import education from '../areaImage/Educ Bldg.jpg';
import engineer from '../areaImage/Engineering Building.jpg';
import hospitality from '../areaImage/HM _ Plant Lab (front view).jpg';
import ecopark from '../areaImage/eco park.jpg';
function CanteenButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../goingTo/goCanteen.json')
      .then((responseModule) => setResponses(responseModule.default))
      .catch((error) => console.error('Error loading responses:', error));

      window.scrollTo(0, 0);
  }, []);

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
    
    if (buttonData.speakVoice) {
      playAudio(buttonData.speakVoice);
    }

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

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
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

    
    const showMicAndSearch = document.querySelectorAll('.bottom');
    showMicAndSearch.forEach((element) => {
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
        <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src={gate} />
        <p>MAIN GATE</p>
        <img onClick={() => handleImageClick('admission')} alt='Admission' className='admission-image' src={admission} />
        <p>ADMINISTRATION OFFICE</p>
        <img  onClick={() => handleImageClick('lab1')} alt='lab1' className='lab1-image' src={lab1}/>
        <p>ICT LABORATORY 1</p>
        <img onClick={() => handleImageClick('lab2')}alt='lab2' className='lab2-image' src={lab2} />
        <p>ICT LABORATORY 2</p>
        <img onClick={() => handleImageClick('yumul')} alt='yumul' className='yumul-image' src={yumul} />
        <p>YUMUL BUILDING</p>
        <img onClick={() => handleImageClick('nantes')}  alt='nantes' className='nantes-image' src={nantes} />
        <p>BUSINESS and ACCOUNTACY BUILDING</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gymnasium} />
        <p>PUP GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={education} />
        <p>EDUCATION and PUBLIC ADMINISTRATION BUILDING</p>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src={science} />
        <p>HEALTH and SCIENCE BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grandstand} />
        <p>PUP GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={engineer} />
        <p>ENGINEERING, TECHNOLOGY and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hospitality} />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src={ecopark} />
        <p>PUP ECOPARK</p>
      
    </div>
  )}
    <div className='showImage'>

      {isActive && (
        <div className="image-container">
          <p className='text-gif'>{currentButton.responseText}</p>
          <button onClick={handleBackButtonClick} className="back-button">
            Back
          </button>
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
