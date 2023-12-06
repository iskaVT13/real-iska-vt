// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css'

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
    if (currentButton && currentButton.image) {
      const imageRef = ref(storage, currentButton.image);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
    }
  }, [currentButton]);

  useEffect(() => {
    fetchImageURL();
  }, [fetchImageURL]);

  const handleButtonClick = (button) => {
    setCurrentButton(responses[button]);
    setIsActive(true);
  };

  const handleBackButtonClick = () => {
    setCurrentButton('');
    setIsActive(false);
  };

  return (
    <div className="canteen-container">
      {!isActive && (
        <div className="buttons-container">
          {Object.keys(responses).map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className="canteen-button"
            >
              {responses[button].title}
            </button>
          ))}
        </div>
      )}

      {isActive && (
        <div className="image-container">
          <img src={imageURL} alt={currentButton.title} />
          <p>{currentButton.responseText}</p>
          <button onClick={handleBackButtonClick} className="back-button">
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default CanteenButton;
