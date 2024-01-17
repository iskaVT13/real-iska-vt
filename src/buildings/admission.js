// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import gate from '../areaImage/gate.webp';
import lab1 from '..//areaImage/Lab 1.webp';
import lab2 from '../areaImage/Lab 2.webp';
import yumul from '../areaImage/Yumul Building.webp';
import canteen from '../areaImage/Canteen.webp';
import nantes from '../areaImage/Nantes.webp';
import gymnasium from '../areaImage/Gym.webp';
import grandstand from '../areaImage/Grandstand.webp';
import science from '../areaImage/Health and Sciences Building.webp';
import education from '../areaImage/Educ Bldg.webp';
import engineer from '../areaImage/Engineering Building.webp';
import hospitality from '../areaImage/HM _ Plant Lab.webp';
import ecopark from '../areaImage/eco park.webp';

function AdmissionButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  

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

    window.scrollTo(0, 0);
  }, []);

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
  
  };

  
  const handleBackButtonClick = () => {
    setCurrentButton('');
    setIsActive(false);
    
    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });

    const showMicAndSearch = document.querySelectorAll('.bottom');
    showMicAndSearch.forEach((element) => {
      element.style.display = '';
    });
    
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
      <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Administration Building</p>
      </div>
        <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src={gate} onLoad={fetchImageURL}/>
        <p>MAIN GATE</p>
        <img  onClick={() => handleImageClick('lab1')} alt='lab1' className='lab1-image' src={lab1} onLoad={fetchImageURL}/>
        <p>ICT LABORATORY 1</p>
        <img onClick={() => handleImageClick('lab2')}alt='lab2' className='lab2-image' src={lab2} onLoad={fetchImageURL}/>
        <p>ICT LABORATORY 2</p>
        <img onClick={() => handleImageClick('yumul')} alt='yumul' className='yumul-image' src={yumul} onLoad={fetchImageURL}/>
        <p>YUMUL BUILDING</p>
        <img onClick={() => handleImageClick('canteen')} alt='canteen' className='canteen-image' src={canteen} onLoad={fetchImageURL}/>
        <p>PUP CANTEEN</p>
        <img onClick={() => handleImageClick('nantes')}  alt='nantes' className='nantes-image' src={nantes} onLoad={fetchImageURL}/>
        <p>BUSINESS and ACCOUNTACY BUILDING</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gymnasium} onLoad={fetchImageURL}/>
        <p>GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={education} onLoad={fetchImageURL}/>
        <p>EDUCATION and PUBLIC ADMINISTRATION BUILDING</p>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src={science} onLoad={fetchImageURL}/>
        <p>HEALTH and SCIENCE BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grandstand}onLoad={fetchImageURL} />
        <p>GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={engineer} onLoad={fetchImageURL}/>
        <p>ENGINEERING, TECHNOLOGY and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hospitality}onLoad={fetchImageURL} />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src={ecopark} onLoad={fetchImageURL}/>
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