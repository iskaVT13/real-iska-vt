// YearButtons.js
import React, { useState, useEffect, useCallback } from 'react';
import './displayDesign.css';
import { storage, ref, getDownloadURL } from '../firebase.js';  // Import the storage, ref, and getDownloadURL functions


function YearButtons({ onYearButtonClick, jsonData }) {
  const [isActive, setIsActive] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [currentYear, setCurrentYear] = useState('regular');
  const [currentSpeech, setCurrentSpeech] = useState(null);

  const fetchImageURLs = useCallback(async () => {
    const urls = await Promise.all(
      jsonData[currentYear].slice(1).map(async (step) => {
        if (step.image) {
          const imageRef = ref(storage, step.image);
          const url = await getDownloadURL(imageRef);
          return { step, url };
        }
        return null;
      })
    );
    setImageURLs(urls.filter((item) => item !== null));
  }, [currentYear, jsonData]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchImageURLs();
    };

    fetchData();
  }, [fetchImageURLs]);

  const speakText = (text) => {
    // Cancel the current speech if there is one
    if (currentSpeech) {
      currentSpeech.onend = null;
      speechSynthesis.cancel();
    }

    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      setCurrentSpeech(speech);

      // Set an event listener to handle the end of speech
      speech.onend = () => {
        // Do nothing or handle end of speech if needed
      };

      speechSynthesis.speak(speech);

      // Set the response text only if a new speech is started
      setIsActive(true);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  const handleButtonClick = (year) => {
    setCurrentYear(year);

    // Speak the speechText when the button is clicked
    speakText(jsonData[currentYear][3].speechText);

    onYearButtonClick();
  };

  return (
    <div className='choices-button'>
      <div className='e-button'>

      <button onClick={() => handleButtonClick('regular')} className={isActive && currentYear === 'regular' ? 'active' : ''}>
        {jsonData.regular.map((item, index) => (
          <span key={index}>{item.title}</span>
        ))}
        {/* Add any additional text or styling here */}
      </button>

      <button onClick={() => handleButtonClick('irregular')} className={isActive && currentYear === 'irregular' ? 'active' : ''}>
        {jsonData.irregular.map((item, index) => (
          <span key={index}>{item.title}</span>
        ))}
        {/* Add any additional text or styling here */}
      </button>

      <button onClick={() => handleButtonClick('transferee')} className={isActive && currentYear === 'transferee' ? 'active' : ''}>
        {jsonData.transferee.map((item, index) => (
          <span key={index}>{item.title}</span>
        ))}
        {/* Add any additional text or styling here */}
      </button>

      <button onClick={() => handleButtonClick('freshmen')} className={isActive && currentYear === 'freshmen' ? 'active' : ''}>
        {jsonData.freshmen.map((item, index) => (
          <span key={index}>{item.title}</span>
        ))}
        {/* Add any additional text or styling here */}
      </button>
      </div>


      {isActive && (
        <div className="response-container">
          <div className="response-paragraph">
            {imageURLs.map(({ step, url }, index) => (
              <div key={index} className="step">
                <p>{step.steps}</p>
                {url && <img className='firebase-image' src={url} alt={`Step ${index + 1}`} />}
              </div>

            ))}

          </div>
        </div>
      )}
    </div>
  );
}

export default YearButtons;
