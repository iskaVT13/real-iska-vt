// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import pylon from '../areaImage/pylon2022.jpg';
import admission from '../areaImage/Admin Building.jpg';
import lab1 from '../areaImage/pylon2022.jpg';
import lab2 from '../areaImage/pylon2022.jpg';
import yumul from '../areaImage/Yumul Building.jpg';
import nantes from '../areaImage/pylon2022.jpg';
import gymnasium from '../areaImage/pylon2022.jpg';
import grandstand from '../areaImage/pylon2022.jpg';
import science from '../areaImage/Health and Sciences Building.jpg';
import education from '../areaImage/pylon2022.jpg';
import engineer from '../areaImage/Engineering Building.jpg';
import hospitality from '../areaImage/pylon2022.jpg';

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
        <img onClick={() => handleImageClick('nantes')}  alt='nantes' className='nantes-image' src={nantes} />
        <p>ACCOUNTACY and MARKETING BUILDING</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gymnasium} />
        <p>GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={education} />
        <p>EDUCATION BUILDING</p>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src={science} />
        <p>HEALTH and SCIENCE BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grandstand} />
        <p>GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={engineer} />
        <p>ENGINEERING and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hospitality} />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
      
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

export default CanteenButton;
