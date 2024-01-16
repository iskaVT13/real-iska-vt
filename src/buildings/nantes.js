// CanteenButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import gate from '../areaImage/gate.webp';
import admission from '../areaImage/Admin Building.webp';
import lab1 from '..//areaImage/Lab 1.webp';
import lab2 from '../areaImage/Lab 2.webp';
import yumul from '../areaImage/Yumul Building.webp';
import canteen from '../areaImage/Canteen.webp';
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

    window.scrollTo(0, 0);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  
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
  const playAudio = (audioURL) => {
    const audio = new Audio(audioURL);
    audio.play();
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

    const showMicAndSearch = document.querySelectorAll('.bottom');
    showMicAndSearch.forEach((element) => {
      element.style.display = '';
    });
    
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
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
        <p>CANTEEN</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src={gymnasium} />
        <p>GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src={education} />
        <p>EDUCATION and PUBLIC ADMINISTRATION BUILDING</p>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src={science} />
        <p>HEALTH and SCIENCE BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src={grandstand} />
        <p>GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src={engineer} />
        <p>ENGINEERING, TECHNOLOGY and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src={hospitality} />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src={ecopark} />
        <p>ECO PARK</p>
      
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