// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
		
import MapImg from '../pictures/3Dmap.jpg';

import voiceNantes from '../speakVoice/nantes.mp3';
import alumni from './alumni.jpg'


function AdmissionButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directCurrentButton, setDirectionCurrentButton] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const nantesAudio = useMemo(() => new Audio(voiceNantes), []);  
  const [alumniActive, setAlumniActive] = useState(false);

  // Assuming handleModalOpen and handleModalClose functions are defined here or imported from another file
const handleModalOpen = () => {
  setAlumniActive(true);
  // Logic to open the modal
};

const handleModalClose = () => {
  // Logic to close the modal
  setAlumniActive(false);
};

  useEffect(() => {
    Promise.all([
      import('../goingTo/goNantes.json'),
      import('../fileJSON/directionsBuilding.json'),
    ])
      .then(([admission, additional]) => {
        setResponses({
          ...admission.default,
          ...additional.default,
        });
      })
      .catch((error) => console.error('Error loading responses:', error));

      nantesAudio.play();


    window.scrollTo(0, 0);
  }, [nantesAudio]);

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

    if (nantesAudio) {
      nantesAudio.pause();
      nantesAudio.currentTime = 0;
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

    window.scrollTo(0, 0);

  
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
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Business and Accountancy building</p>
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
        <div className='pin-science'>
      <div className='icon-text'>
    <FontAwesomeIcon onClick={() => handleImageClick('science')} className="science" icon={faLocationDot} size='xl' />
        <p></p>
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
        <div className='p-nantes'>
      <div className='text-pin'>
    <FontAwesomeIcon className="nantes" icon={faLocationDot} size='2xl' beat />
        <p>Business & Acc Bldg.</p>
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
        <div className='pin-custom'>
          <div className='icon-text'>
            <FontAwesomeIcon onClick={handleModalOpen} className="custom" icon={faLocationDot} size='xl' />
            <p></p> {/* Add a label for the new location */}
          </div>
        </div>
        <p className='note'>NOTE: Click the Location icon above each building.</p>

    </div>
  )}

<div className='pop-alumni'>
  {alumniActive && (
      <div className="alumni-popUp">
        <img src={alumni} alt='alumni-img' />
        <h2>
          Under Construction
        </h2>
        <button onClick={handleModalClose}>Close</button>
      </div>
    )}
    </div>

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
    <button onClick={() => handleDirectionButtonClick('n4')} className="showImage-button">
Faculty Room
</button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n5')} className="showImage-button">
      Medical room 
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n10')} className="showImage-button">
      Dental Clinic
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n9')} className="showImage-button">
        Library Room
    </button>
  </li>
<li>
    <button onClick={() => handleDirectionButtonClick('n1')} className="showImage-button">
      Room 120
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n2')} className="showImage-button">
      Room 121
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n3')} className="showImage-button">
        Room 122
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n6')} className="showImage-button">
    Room 216 (Speech Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n7')} className="showImage-button">
      Room 217 (Keyboard Laboratory)
    </button>
  </li>
  <li>
    <button onClick={() => handleDirectionButtonClick('n8')} className="showImage-button">
      Room 218 (AVR or Stimulation Room)
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
                <div className='direct-image'>
                  <img 
                    src={directCurrentButton.img} alt='direct-img'
                  />
                </div>
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