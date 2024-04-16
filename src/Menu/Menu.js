
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faArrowLeft, faMapLocationDot, faBell, faCircleQuestion, faBook, faCircleInfo, faPeopleGroup, faVrCardboard, faFilePdf, faStar, faComment, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Menu.css';
import pupMap from '../pictures/map.jpg';
import iskalogo from '../pictures/iska-logo.png';
import contentMapping from '../fileJSON/directionsBuilding.json';
import MyVirtualTour from '../VRtour'; 
import pdfData from './handbook.json';
import OrgComponent from '../showRespose/codecraft';

import RateV2 from '../rateNreview/rateV2';
import ReviewV2 from '../rateNreview/reviewV2';

Modal.setAppElement('#root');

const customModalStyles = {
  overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',},
  content: {border: 'none', padding: '0', position: 'relative',},
};

const customMapModalStyles = {
  overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',},
  content: {border: 'none', padding: '0', position: 'relative',},
};

function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [mapPopupOpen, setMapPopupOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStartDistance, setTouchStartDistance] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const audioRef = useRef(null); 
  const maxZoomLevel = 2;
  const mapRef = useRef(null);
  const [iframeComponentOpen, setIframeComponentOpen] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [secondPdfLink, setSecondPdfLink] = useState(null);
  const [openOrg, setOrgOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleReload = () => {
    if (window.confirm("Are you sure you want to leave ISKA ?")) {
      window.location.reload();    
    }
    else{
      setMenuIsOpen(false);
    }
  };

  const openSecondPdfModal = () => {
    setSecondPdfLink(pdfData.secondPdfLink);
    setPdfModalOpen(true);
    playAudio("UserManual");
  };

  const openOrgComponent = () => {
    setOrgOpen(true);
  }

  const closeOrgComponent = () => {
    setOrgOpen(false);
  }

  const openPdfModal = () => {
    setPdfLink(pdfData.pdfLink);
    setPdfModalOpen(true);
    playAudio("handbook");
  };

  const closePdfModal = () => {
    setPdfLink(null);
    setPdfModalOpen(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const openIframeComponent = () => {
    setIframeComponentOpen(true);
  };

  const closeIframeComponent = () => {
    setIframeComponentOpen(false);
  };

  const playAudio = (content) => {
    const audio = new Audio(contentMapping[content]); 
    audioRef.current = audio;
    audio.play();
  };

  const openRatingPopup = () => {
    setRatingOpen(true);
    setMenuIsOpen(false);
  };

  const openReview = () => {
    setShowReview(true);
    setPopupContent(null); 
    setMenuIsOpen(false);
    setMapPopupOpen(false);
  };

  const closeReview = () => {
    setShowReview(false);
  };

  const submitRating = ({ rating, comment }) => {
    console.log("Submitted Rating:", rating);
    console.log("Submitted Comment:", comment);
  };
  
  const openPopup = (content) => {
    if (content === "Map") {
      setMapPopupOpen(true);
      setZoomLevel(1);
      playAudio(content);
    } else {
      setPopupContent(content);
      playAudio(content);
    }
  };

  const closePopup = () => {
    setPopupContent(null);
    setMapPopupOpen(false);
    setRatingOpen(false);

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
    <div>
      <div className="menu" onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? null : <FontAwesomeIcon icon={faBars} size="2x" style={{ color: '#ffc800' }} />}
      </div>

      <div className={`sidebar ${menuIsOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={() => setMenuIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </div>

        <div className="iconlogo">
          <img className="imglogo" src={iskalogo} alt="logo"/>
        </div>

        <div className="option-buttons">
          <button onClick={openPdfModal}>
            <div className="handbook">
              <div className="icon">
                <FontAwesomeIcon icon={faBook} size="2x" />
              </div>
              <div className="name">PUP Student Handbook</div>
            </div>
          </button>

          <button onClick={() => openPopup("Map")}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faMapLocationDot} size="2x" />
              </div>
              <div className="name">PUP Lopez Map</div>
            </div>
          </button>

          <button onClick={openIframeComponent}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faVrCardboard} size="2x" />
              </div>
              <div className="name">Campus Tour</div>
            </div>
          </button>

          <button onClick={openSecondPdfModal}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faFilePdf} size="2x" />
              </div>
              <div className="name">User Manual</div>
            </div>
          </button>

          <button onClick={() => openPopup("Reminders")}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faBell} size="2x" />
              </div>
              <div className="name">Reminders</div>
            </div>
          </button>

          <button onClick={() => openPopup("Information")}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faCircleInfo} size="2x" />
              </div>
              <div className="name">Information</div>
            </div>
          </button>

          <button onClick={openOrgComponent}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faPeopleGroup} size="2x" />
              </div>
              <div className="name">About Us</div>
            </div>
          </button>

          <button onClick={() => openPopup("Help")}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faCircleQuestion} size="2x" />
              </div>
              <div className="name">Help</div>
            </div>
          </button>

          <button onClick={openRatingPopup}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faStar} size="2x" />
              </div>
              <div className="name">Rate Us!</div>
            </div>
          </button>

          <button onClick={openReview}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faComment} size="2x" />
              </div>
              <div className="name">Reviews</div>
            </div>
          </button>

          <button onClick={handleReload}>
            <div className="option-item">
              <div className="icon">
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
              </div>
              <div className="name">Exit</div>
            </div>
          </button>

        </div>
      </div>
      <div className="overlay" onClick={() => setMenuIsOpen(false)}></div>

      {popupContent && !mapPopupOpen && (
        <PopupFrame content={popupContent} onClose={closePopup} />
      )}

      {mapPopupOpen && (
        <Modal
          className="common-frame"
          isOpen={true}
          onRequestClose={closePopup}
          contentLabel="Map Modal"
          style={customMapModalStyles}>
          <div className="popup-title">
            <span>PUP LOPEZ MAP</span>
          </div>
          <FontAwesomeIcon className="close" onClick={closePopup} icon={faArrowLeft} size="xl" />
          <div
            className="popup-content"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handlePinch}>
            <div className="map-popup-content">
              <div className="image-container">
                <img ref={mapRef} src={pupMap} alt="PUP Map" className="map-image"
                  style={{transform: `scale(${zoomLevel})`, objectFit: 'scale-down',}}
                />
              </div>
            </div>
          </div>
          <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
        </Modal>
      )}

      {iframeComponentOpen && (
        <Modal
          className="common-frame"
          isOpen={true}
          onRequestClose={closeIframeComponent}
          contentLabel="Virtual Tour Modal"
          style={customModalStyles}>
          <div className="popup-title">
            <span>PUP LOPEZ CAMPUS TOUR</span>
          </div>
          <div className='virtual-container'>
            <MyVirtualTour  closeIframeComponent={closeIframeComponent} />
          </div>
        </Modal>
      )}

      {openOrg && (
        <Modal
          className="common-frame"
          isOpen={true}
          onRequestClose={closeOrgComponent}
          contentLabel="Virtual Tour Modal"
          style={customModalStyles}>
          <div className="popup-title">
            <FontAwesomeIcon className="close" onClick={closeOrgComponent} icon={faArrowLeft} size="l" />
          </div>
          <div className='org-container'>
            <OrgComponent  closeOrgComponent={closeOrgComponent} />
          </div>
        </Modal>
      )}

      {pdfModalOpen && (
        <Modal
          className="common-frame"
          isOpen={true}
          onRequestClose={closePdfModal}
          contentLabel="PDF Modal"
          style={customModalStyles}>
          <div className="popup-title">
            <span>{pdfLink ? 'PUP Student Handbook' : '"ISKA" User Manual'}</span>
          </div>
          <FontAwesomeIcon className="close" onClick={closePdfModal} icon={faArrowLeft} size="2xl" />
          <div className="popup-content">
            <div className="pdf-content-container">
              <iframe title="PDF Viewer" src={pdfLink || secondPdfLink} width="100%" height="100%" frameBorder="0"></iframe>
            </div>
          </div>
          <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
        </Modal>
      )}
      
      <Modal
        className="rate-frame"
        isOpen={ratingOpen}
        onRequestClose={closePopup}
        contentLabel="Rating Modal"
        style={customModalStyles}>
        <RateV2 onClose={closePopup} onSubmit={submitRating} />
      </Modal>

      {showReview && <ReviewV2 onClose={closeReview} />}
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
      style={customModalStyles}>
      <div className="popup-title">{content}</div>
      <FontAwesomeIcon className="close" onClick={onClose} icon={faArrowLeft} size="xl" />
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

          {content === "Building Information" && (
            <div>
              {}
              <p>“ISKA” is a web-based application that aims to serve as PUPLQ virtual tour and voice assistant that attends to the queries people commonly asked about the institutions.</p><br></br>
              <p>There are two ways to give command.</p><br></br>
              <p>First, by typing a command even just by using a keyword in the provided textbox, click the keyboard button and then ISKA will answer the queries of the user.</p><br></br>
              <p>Second, is by tapping the button to enable the microphone and give a voice command. You can just also click the suggested buttons for easy navigation.</p><br></br>
              <p>For accessing the Virtual tour, press the virtual tour button on the upper right corner. click the full screen for better experience. then you can enjoy your tour virtually</p><br></br>
            </div>
          )}  

          {content === "Faculty" && (
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

export default Menu; //459
