import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMapLocationDot, faBell, faCircleQuestion, faCircleInfo, faBuilding, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import './Menu.css';
import pupMap from '../pictures/map.jpg';
import contentMapping from '../fileJSON/directionsBuilding.json';

Modal.setAppElement('#root');

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    border: 'none',
    padding: '0',
    position: 'relative',
  },
};

const customMapModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    border: 'none',
    padding: '0',
    position: 'relative',
  },
};

function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [mapPopupOpen, setMapPopupOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStartDistance, setTouchStartDistance] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const audioRef = useRef(null); // Add a reference to the audio element
  
  const maxZoomLevel = 2;

  const mapRef = useRef(null);

  const playAudio = (content) => {
    const audio = new Audio(contentMapping[content]); // Adjust the path
    audioRef.current = audio; // Store the reference to the audio element
    audio.play();
  };

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  const closeMenu = () => {
    setMenuIsOpen(false);
    setPopupContent(null);
  };

  const openPopup = (content) => {
    if (content === "Map") {
      setMapPopupOpen(true);
      setZoomLevel(1);
      playAudio(content); // Call the playAudio function
    } else {
      setPopupContent(content);
      playAudio(content); // Call the playAudio function
    }
  };


  const closePopup = () => {
    setPopupContent(null);
    setMapPopupOpen(false);

    // Pause the audio when closing the popup
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handlePinch = (e) => {
    if (e.ctrlKey && e.deltaY) {
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoomLevel = Math.min(Math.max(zoomLevel * zoomFactor, 1), maxZoomLevel);
      setZoomLevel(newZoomLevel);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      setTouchStartDistance(distance);
      setIsZooming(true);
    }
  };
  
  const handleTouchMove = (e) => {
    if (isZooming && e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      const zoomFactor = distance / touchStartDistance;
      const newZoomLevel = Math.min(Math.max(zoomLevel * zoomFactor, 1), maxZoomLevel);
      setZoomLevel(newZoomLevel);
    }
  };
  
  const handleTouchEnd = () => {
    setIsZooming(false);
  };

  return (
    <div className="menu">
      <FontAwesomeIcon onClick={openMenu} icon={faBars} size="2x" style={{ color: '#ffc800' }} />
      <Modal
        className="common-frame"
        isOpen={menuIsOpen}
        onRequestClose={closeMenu}
        contentLabel="Menu Modal"
        style={customModalStyles}
      >
        <div className="title-menu">MENU</div>
        <FontAwesomeIcon className="close" onClick={closeMenu} icon={faXmark} size="2x" />
        <div className="grid-buttons">
          <div className="button-container">
            <button onClick={() => openPopup("Map")}>
              <FontAwesomeIcon icon={faMapLocationDot} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>MAP</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Reminders")}>
              <FontAwesomeIcon icon={faBell} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>REMINDERS</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Help")}>
              <FontAwesomeIcon icon={faCircleQuestion} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>HELP</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Information")}>
              <FontAwesomeIcon icon={faCircleInfo} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>INFORMATION</span>
            </button>
          </div>
          <div className='button-container'>
          <button onClick={() => openPopup("Information")}>
              <FontAwesomeIcon icon={faBuilding} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>BUILDING INFORMATION</span>
            </button>
          </div>
          <div className='button-container'>
          <button onClick={() => openPopup("Information")}>
              <FontAwesomeIcon icon={faPeopleGroup} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>FACULTY TEACHERS</span>
            </button>
          </div>
        </div>
        <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
      </Modal>

      {popupContent && !mapPopupOpen && (
        <PopupFrame content={popupContent} onClose={closePopup} />
      )}

      {mapPopupOpen && (
        <Modal
          className="common-frame"
          isOpen={true}
          onRequestClose={closePopup}
          contentLabel="Map Modal"
          style={customMapModalStyles}
        >
          <div className="popup-title">
            <span>PUP LOPEZ MAP</span>
          </div>
          <FontAwesomeIcon className="close" onClick={closePopup} icon={faXmark} size="2x" />
          <div
            className="popup-content"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handlePinch}
          >
            <div className="map-popup-content">
              <div className="image-container">
                <img
                  ref={mapRef}
                  src={pupMap}
                  alt="PUP Map"
                  className="map-image"
                  style={{
                    width: '100%',
                    height: 'auto',
                    transform: `scale(${zoomLevel})`,
                    objectFit: 'scale-down',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
        </Modal>
      )}
    </div>
  );
}

function PopupFrame({ content, onClose }) {
  const contentClass = `${content.toLowerCase()}-content`;

  return (
    <Modal
      className="common-frame"
      isOpen={true}
      onRequestClose={onClose}
      contentLabel={`${content} Modal`}
      style={customModalStyles}
    >
      <div className="popup-title">{content}</div>
      <FontAwesomeIcon className="close" onClick={onClose} icon={faXmark} size="2x" />
      <div className="popup-content">
        <div className={`popup-content-container ${contentClass}`}>
          {content === "Map" && (
            <div>
              {}
              <p>This is the Map pop-up frame content.</p>
            </div>
          )}

          {content === "Reminders" && (
            <div>
              {}
              <p>
              "In using the voice command, clear voice is required to ensure that Iska will respond accurately with the request. Keywords can be used in the text command for more efficient usage. Iska’s voice may vary among different devices. Iska will only respond to limited commands, a phrase “Sorry, I currently do not have information about that.” is displayed if questions or queries asked are not available in the application. Please note that Iska is not compatible with other devices and requires a stable internet connection for the best experience."
              </p>
            </div>
          )}

          {content === "Help" && (
            <div>
              {}
              <p>In using voice command:</p><br></br>
              <p>PRESS first the microphone ans speak out the command. Try saying the suggested commands found in the help button at the upper right corner of the home page.</p> <br></br>
              <p>In using the type command:</p><br></br>
              <p>PRESS the keyboard button located at the bottom right corner of the home page. A keyword can be typed on for easy searching. Additionally, some suggestion words for queries are available to be clicked on.</p><br></br>
              <p>All the information and things ISKA can show.</p><br></br>
              <p>Tap the Write button from the homepage, click the “What can you do” button. You can choose from the selection of the icon tiles the information you want to view.</p><br></br>
              <p>To locate a place, office and building:</p><br></br>
              <p>Tap the Map button in the Main Menu, click the search icon, then type the location or place that you want to locate and hit the send button.</p>
            </div>
          )}

          {content === "Information" && (
            <div>
              {}
              <p>“ISKA” is a web-based application that aims to serve as PUPLQ virtual tour and voice assistant that attends to the queries people commonly asked about the institutions.</p><br></br>
              <p>There are two ways to give command.</p><br></br>
              <p>First, by typing a command even just by using a keyword in the provided textbox, click the keyboard button and then ISKA will answer the queries of the user.</p><br></br>
              <p>Second, is by tapping the button to enable the microphone and give a voice command. You can just also click the suggested buttons for easy navigation.</p><br></br>
              <p>For accessing the Virtual tour, press the virtual tour button on the upper right corner. click the full screen for better experience. then you can enjoy your tour virtually</p><br></br>
            </div>
          )}
        </div>
      </div>
      <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
    </Modal>
  );
}

export default Menu; //262