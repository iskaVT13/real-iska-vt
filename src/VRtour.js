import React, {useState, useEffect} from 'react';
import './App.css';
import jsonData from './fileJSON/directionsBuilding.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const MyIframeComponent = ({ closeIframeComponent }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const handleClose = () => {
    // Add any additional logic to handle closing the virtual tour modal
    // This function will be called when the close button is clicked
    closeIframeComponent(); // Assuming closeIframeComponent is defined in Menu.js
  };

  useEffect(() => {
    // Extract the MP3 URL from the imported JSON
    const mp3Url = jsonData.virtualTour;
    setAudioSrc(mp3Url);
  }, []); // Ensure the effect runs only once when the component mounts

  const iframeStyles = {
    width: '100%',
    height: '600px',  
    border: 'none',
    maxWidth: '100%',
  };

  const audioContainerStyles = {
    display: 'none', // Hide the audio container
  };


  return (
    <div className='vr-container'>
{closeIframeComponent && (
        <div className="close-vt" onClick={handleClose}>
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </div>
      )}
    <iframe
      title="Embedded Content"
      width="100%"
      height="640"
      style={iframeStyles}
      allow="xr-spatial-tracking vr gyroscope accelerometer fullscreen autoplay xr"
      scrolling="no"
      allowFullScreen={true}
      frameBorder="0"
      src="https://webobook.com/public/6573274008ca526d1702cd02,en?fbclid=IwAR3bP33e8DP1q7Olhwo5yZaO94nb_1NTlvoRdTAKtQlziUlYZpCTSwC_hDM"
      allowvr="yes"
    />
    <div style={audioContainerStyles}>
        {audioSrc && <audio autoPlay><source src={audioSrc} type="audio/mp3" /></audio>}
      </div>
        </div>
        

  );
};

export default MyIframeComponent;
