// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
		
import MapImg from '../pictures/3Dmap.jpg';


import voiceScience from '../speakVoice/science.mp3';

function ScienceButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const scienceAudio = useMemo(() => new Audio(voiceScience), []);  

  useEffect(() => {
    Promise.all([
      import('../goingTo/goScience.json'),
      import('../fileJSON/directionsBuilding.json'),
    ])
      .then(([admission, additional]) => {
        setResponses({
          ...admission.default,
          ...additional.default,
        });
      })
      .catch((error) => console.error('Error loading responses:', error));

      scienceAudio.play();

    window.scrollTo(0, 0);
  }, [scienceAudio]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  };

  const playAudio = (audioURL) => {
    // Stop the current audio if it's playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create and play the new audio
    const audio = new Audio(audioURL);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleDirectionButtonClick = (buttonName) => {
    setDirectionCurrentButton(responses[buttonName]);
    openModal();

     // Play audio if available
  if (responses[buttonName]?.speakDirections) {
    playAudio(responses[buttonName].speakDirections);
  }
    };
  

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

    if (scienceAudio) {
      scienceAudio.pause();
      scienceAudio.currentTime = 0;
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
  
  };

  const handleBackButtonClick = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setCurrentButton('');
    setIsActive(false);

    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });

    window.scrollTo(0, 0);
    
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
            <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Health and Science Building</p>
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
        <div className='pin-lab2'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('lab2')} className="lab2" icon={faLocationDot} size='xl' />
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
        <div className='p-science'>
      <div className='text-pin'>
    <FontAwesomeIcon className="science" icon={faLocationDot} size='2xl' beat />
        <p>Health & Science Bldg.</p>
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
        <p className='note'>NOTE: Click the Location icon above each building.</p>

    </div>
  )}

<div className='showImage'>

      {isActive && (
        <div className="image-container">
          <p className='text-gif'>{currentButton.responseText}</p>
          <FontAwesomeIcon className="back-button" onClick={handleBackButtonClick} icon={faArrowLeft} size="xl" style={{color: "#FFD43B",}} />
          <div className='image-button-grid'>
          <div className='gif'>
          <img  src={imageURL} alt={currentButton.title} />
          </div>
          <div className='direction-container'>
          <div className='direction-title'>OFFICES AND ROOMS</div>
<ul>
<li>
    <button onClick={() => handleDirectionButtonClick('hs1')} className="showImage-button">
Room 105 (Food Laboratory)
</button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs2')} className="showImage-button">
      Room 106
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs3')} className="showImage-button">
      Room 107
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs4')} className="showImage-button">
        Room 108
    </button>
  </li>
<li>
    <button onClick={() => handleDirectionButtonClick('hs5')} className="showImage-button">
      Room 203
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs6')} className="showImage-button">
        Room 204
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs7')} className="showImage-button">
    Room 205 (Physical Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('hs8')} className="showImage-button">
      Room 206 (Chemical Laboratory)
    </button>
  </li>
</ul>
</div>
</div>
            {/* Modal for displaying text */}
            <div className='pop-up' >
            {isModalOpen && (
              <div className="direction-modal">
                <div className="modal-content">
                  <p>{directCurrentButton.directionsText}</p>
                  <button className='modal-close' onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
            </div>
           
          </div>
        )}
          </div>
    </div>
  );
}

export default ScienceButton;