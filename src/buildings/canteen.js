// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';


function CanteenButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../fileJSON/map.json')
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
    <div className="canteen-container">
      {!isActive && (
        <div className="buttons-container">
          {Object.keys(responses).map((button) => (
            <div key={button} onClick={() => handleImageClick(button)} className="place-image-container">
              <img
                alt={responses[button].buttonImage}
                className="canteen-image"/>
              <p>{responses[button].title}</p>
            </div>
          ))}
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
