// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo} from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import gate from '../areaImage/gate.webp';
import admin from '../areaImage/admin.webp';
import lab1 from '../areaImage/lab1.webp';
import lab2 from '../areaImage/lab2.webp';
import yumul from '../areaImage/yumul.webp';
import canteen from '../areaImage/canteen.webp';
import science from '../areaImage/science.webp';
import archi from '../areaImage/archi.webp';
import eco from '../areaImage/eco.webp';
import nantes from '../areaImage/nantes.webp';
import hm from '../areaImage/hm.webp';
import gym from '../areaImage/gym.webp';
import grand from '../areaImage/grand.webp';

import voiceEduc from '../speakVoice/educ.mp3';

function EducationButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const educAudio = useMemo(() => new Audio(voiceEduc), []);  

  useEffect(() => {
    Promise.all([
      import('../goingTo/goEduc.json'),
      import('../fileJSON/directionsBuilding.json'),
    ])
      .then(([admission, additional]) => {
        setResponses({
          ...admission.default,
          ...additional.default,
        });
      })
      .catch((error) => console.error('Error loading responses:', error));

      educAudio.play();

    window.scrollTo(0, 0);
  }, [educAudio]);

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

    if (educAudio) {
      educAudio.pause();
      educAudio.currentTime = 0;
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
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Education and Public Administration Building</p>
      </div>
      <div className='image-grid'>
    <div className='image-text'>
    <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src={gate} />
        <p>Main Gate</p>
    </div>
    <div className='image-text'>
    <img onClick={() => handleImageClick('admin')} className="gate" alt="Admin" src={admin} />
        <p>Administration Building</p>
    </div>
    <div className='image-text'>
    <img onClick={() => handleImageClick('canteen')} className="gate" alt="Canteen" src={canteen} />
        <p>PUP Canteen</p>
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
          <div className='image-button-grid'>
          <div className='gif'>
          <img  src={imageURL} alt={currentButton.title} />
          </div>
          <div className='direction-container'>
          <div className='direction-title'>OFFICES AND ROOMS</div>
<ul>
<li>
    <button onClick={() => handleDirectionButtonClick('pb3')} className="showImage-button">
      CSC Office
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb8')} className="showImage-button">
    Office of Counseling and Psychological Services
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb5')} className="showImage-button">
      QAO
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb1')} className="showImage-button">
        Room 117
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb2')} className="showImage-button">
Room 118    
  </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb4')} className="showImage-button">
      Room 119
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb6')} className="showImage-button">
      Room 212
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb7')} className="showImage-button">
      Room 213
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb9')} className="showImage-button">
      Room 214
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('pb10')} className="showImage-button">
      Room 215
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

export default EducationButton;