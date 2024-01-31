// CanteenButton.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ref, getDownloadURL } from '../firebase.js'; // Import the storage, ref, and getDownloadURL functions
import './building.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import voiceCr from '../speakText/cr.mp3';

function ComfortRoomButton() {
  const [isActive, setIsActive] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [currentButton, setCurrentButton] = useState('');
  const [responses, setResponses] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);
  const crAudio = useMemo(() => new Audio(voiceCr), []);  

  useEffect(() => {
    // Import the responses JSON file dynamically
    import('../goingTo/goCr.json')
      .then((responseModule) => setResponses(responseModule.default))
      .catch((error) => console.error('Error loading responses:', error));

      crAudio.play();

      window.scrollTo(0, 0);
  }, [crAudio]);

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

  const handleImageClick = (button) => {
    const buttonData = responses[button];
    setCurrentButton(responses[button]);
    setIsActive(true);
    if (crAudio) {
      crAudio.pause();
      crAudio.currentTime = 0;
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
     // Scroll to the top
     window.scrollTo(0, 0);
  
  };

  const handleBackButtonClick = () => {
    setCurrentButton('');
    setIsActive(false);

    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });

    
     // Scroll to the top
     window.scrollTo(0, 0);
  };

  return (
    <div className="areaImage-container">
    {!isActive && (
    <div className="buttons-container">
      <div className='title-area'>
        <p>Please select your nearest area in campus, so that I can assist you to show the way to Comfort Room</p>
      </div>
        <img onClick={() => handleImageClick('gate')} className="gate" alt="Main Gate" src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2Fgate%20(1).webp?alt=media&token=44f62453-fc85-4040-99d4-a7654baff62d" />
        <p>MAIN GATE</p>
        <img onClick={() => handleImageClick('admission')} className="gate" alt="Main Gate" src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FAdmin%20Building.webp?alt=media&token=0596943a-1f48-4f0b-87f8-91ca7324df12" />
        <p>ADMINISTRATION OFFICE</p>
        <img  onClick={() => handleImageClick('lab1')} alt='lab1' className='lab1-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FLab%201.webp?alt=media&token=c06d273a-56fd-406c-9568-f01e5ccca21d"/>
        <p>ICT LABORATORY 1</p>
        <img onClick={() => handleImageClick('lab2')}alt='lab2' className='lab2-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FLab%202.webp?alt=media&token=a289350c-ccc9-457e-a37b-be966f2741b1" />
        <p>ICT LABORATORY 2</p>
        <img onClick={() => handleImageClick('yumul')} alt='yumul' className='yumul-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FYumul%20Building.webp?alt=media&token=53b6c99c-008a-4eb6-95d1-8d9a55f1f4de" />
        <p>YUMUL BUILDING</p>
        <img onClick={() => handleImageClick('canteen')} alt='canteen' className='canteen-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FCanteen.webp?alt=media&token=23f3d145-1044-4b1c-8da5-acebc85204ff" />
        <p>PUP CANTEEN</p>
        <img onClick={() => handleImageClick('nantes')}  alt='nantes' className='nantes-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FNantes.webp?alt=media&token=d63de311-d4da-419d-b811-7e053abf976f" />
        <p>BUSINESS and ACCOUNTACY BUILDING</p>
        <img onClick={() => handleImageClick('gymnasium')} alt='gymnasium' className='gymnasium-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FGym.webp?alt=media&token=c675c3fc-5f1c-445b-9e3d-ad88cc83d8a3" />
        <p>PUP GYMNASIUM</p>
        <img onClick={() => handleImageClick('education')} alt='education' className='education-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FEduc%20Bldg.webp?alt=media&token=0c781476-49a0-43f7-a8b0-197f5df85c69"/>
        <p>EDUCATION and PUBLIC ADMINISTRATION BUILDING</p>
        <img onClick={() => handleImageClick('science')}  alt='science' className='science-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FHealth%20and%20Sciences%20Building.webp?alt=media&token=206a95ea-231c-47a7-8334-e05fcd34bec0" />
        <p>HEALTH and SCIENCE BUILDING</p>
        <img onClick={() => handleImageClick('grandstand')} alt='grandstand' className='grandstand-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FGrandstand.webp?alt=media&token=a57cdef3-ec6b-4110-9a89-595bb0405f44" />
        <p>PUP GRANDSTAND</p>
        <img onClick={() => handleImageClick('engineer')}  alt='engineer' className='engineer-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FEngineering%20Building.webp?alt=media&token=c8ce836e-5a78-49d2-a86d-89f377b6151a" />
        <p>ENGINEERING, TECHNOLOGY and ARCHTECTURE BUILDING</p>
        <img onClick={() => handleImageClick('hospitality')}  alt='hospitality' className='jm-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2FHM%20_%20Plant%20Lab%20(front%20view).webp?alt=media&token=ad01d055-7379-4fbe-b6f6-bc63d307fc70" />
        <p>HOSPITALITY MANAGEMENT BUILDING</p>
        <img onClick={() => handleImageClick('ecopark')}  alt='EcoPark' className='ecopark-image' src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/BuildingImage%2Feco%20park.webp?alt=media&token=de565eda-0f08-4b6e-a01a-1fb31c64a705" />
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
</div>
  </div>
)}
    </div>
    </div>
  );
}

export default ComfortRoomButton;
