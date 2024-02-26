// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationDot} from '@fortawesome/free-solid-svg-icons';

import MapImg from '../pictures/map.jpg';

import voiceAdmin from '../speakVoice/admin.mp3';

function AdmissionButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const adminAudio = useMemo(() => new Audio(voiceAdmin), []);  

  useEffect(() => {
    Promise.all([
      import('../goingTo/goAdmission.json'),
      import('../fileJSON/directionsBuilding.json'),
    ])
      .then(([admission, additional]) => {
        setResponses({
          ...admission.default,
          ...additional.default,
        });
      })
      .catch((error) => console.error('Error loading responses:', error));

      adminAudio.play();

    window.scrollTo(0, 0);
  }, [adminAudio]);

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

    if (adminAudio) {
      adminAudio.pause();
      adminAudio.currentTime = 0;
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

    const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
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
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Administration Building</p>
      </div>
      <div className='map-img'>
      <img src={MapImg} alt='map-img'/>
      </div>
      <div className='icon-container'>
    <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('gate')} className="gate" icon={faLocationDot} size='xl' />
        <p>Main Gate</p>
    </div>
        </div>

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
          <div className='direction-title'>OFFICES</div>
<ul>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin1')} className="showImage-button">
      Office of the Registrar
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin2')} className="showImage-button">
Accounting Office    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin3')} className="showImage-button">
      Cashier Office
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin4')} className="showImage-button">
      Admission Office
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin5')} className="showImage-button">
      OSAS
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin6')} className="showImage-button">
      Director's Office
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('admin7')} className="showImage-button">
      Academic and OJT Office
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

export default AdmissionButton;