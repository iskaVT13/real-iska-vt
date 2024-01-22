// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import gate from '../areaImage/gate.webp';
import admission from '../areaImage/Admin Building.webp';
import lab1 from '..//areaImage/Lab 1.webp';
import lab2 from '../areaImage/Lab 2.webp';
import yumul from '../areaImage/Yumul Building.webp';
import canteen from '../areaImage/Canteen.webp';
import nantes from '../areaImage/Nantes.webp';
import gymnasium from '../areaImage/Gym.webp';
import grandstand from '../areaImage/Grandstand.webp';
import science from '../areaImage/Health and Sciences Building.webp';
import education from '../areaImage/Educ Bldg.webp';
import hospitality from '../areaImage/HM _ Plant Lab.webp';
import ecopark from '../areaImage/eco park.webp';

import voiceEngineer from '../speakText/engineering.mp3';

function AdmissionButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const engineerAudio = useMemo(() => new Audio(voiceEngineer), []);  

  useEffect(() => {
    Promise.all([
      import('../goingTo/goEngineer.json'),
      import('../fileJSON/directionsBuilding.json'),
    ])
      .then(([admission, additional]) => {
        setResponses({
          ...admission.default,
          ...additional.default,
        });
      })
      .catch((error) => console.error('Error loading responses:', error));

      engineerAudio.play();

    window.scrollTo(0, 0);
  }, [engineerAudio]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

    if (engineerAudio) {
      engineerAudio.pause();
      engineerAudio.currentTime = 0;
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
    setCurrentButton('');
    setIsActive(false);

    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
    
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
      <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Engineering, Technology and Architecture Building</p>
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
        <img onClick={() => handleImageClick('canteen')} alt='canteen' className='canteen-image' src={canteen} />
        <p>PUP CANTEEN</p>
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
          <FontAwesomeIcon className="back-button" onClick={handleBackButtonClick} icon={faArrowLeft} size="xl" style={{color: "#FFD43B",}} />
          <div className='gif'>
          <img  src={imageURL} alt={currentButton.title} />
          </div>
          <div className='direction-container'>
          <div className='direction-title'>OFFICES AND ROOMS</div>
<ul>
<li>
    <button onClick={() => handleDirectionButtonClick('arch11')} className="showImage-button">
      Architecture Faculty 
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch12')} className="showImage-button">
      Engineering Faculty
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch1')} className="showImage-button">
      Room 109
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch2')} className="showImage-button">
Room 110
</button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch3')} className="showImage-button">
      Room 111 (Civil Engineer Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch4')} className="showImage-button">
    Room 112 (Electrical Engineer Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch5')} className="showImage-button">
      Room 113
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch6')} className="showImage-button">
      Room 114
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch7')} className="showImage-button">
        Room 115
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch8')} className="showImage-button">
      Room 116
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch9')} className="showImage-button">
      Room 207 (ICT Laboratory 3)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch10')} className="showImage-button">
      Room 208 (Draft Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch13')} className="showImage-button">
      Room 209 (CEA Functional Room)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch14')} className="showImage-button">
      Room 210
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('arch15')} className="showImage-button">
      Room 211
    </button>
  </li>
</ul>
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