import React, { useState } from 'react';
import './welcome.css';
import Iskaimg from '../pictures/iska-iconn.ico';
import PupLogo from '../pictures/placePic/pup-logo.png';

const DisplayComponent = ( { onClose } ) => {
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleStudentClick = () => {
    if (!userName.trim()) {
      setNameError('Please enter your name or nickname!');
      return;
    }
    alert('Hello! Welcome to ISKA Student!');
    onClose();

    const showHandbook = document.querySelectorAll('.handbook');
    showHandbook.forEach((element) => {
      element.style.display = '';
    });
  };

  const handleVisitorClick = () => {
    if (!userName.trim()) {
      setNameError('Please enter your name or nickname!');
      return;
    }
    alert('Hello! Welcome to ISKA Visitor');
    onClose();

    const hideHandbook = document.querySelectorAll('.handbook');
    hideHandbook.forEach((element) => {
      element.style.display = 'none';
    });
  };

  const handleInputChange = (event) => {
    setUserName(event.target.value);
    if (event.target.value.trim()) {
      setNameError('');
    }
  };

  return (
    <div className="display-component">
      <div className='welcome-logo'>
        <img src={Iskaimg} alt='iska-img' />
        <img src={PupLogo} alt='pup-logo' />
      </div>
      <div className="welcome-container">
        <div className="welcome-text">
          <h2>Welcome! I'm IS<span>KA</span></h2>
        </div>
        <div className='name-input'>
          <input
            type="text"
            placeholder="Please enter your name or nickname"
            value={userName}
            onChange={handleInputChange}
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="choose-text">
          <p>Please choose what you are?</p>
        </div>        
        <div className='btn'>
          <button onClick={handleStudentClick}>
            Student
          </button>
          <button onClick={handleVisitorClick}>
            Visitor
          </button>
        </div>
        <div className='bottom-text'>
          <p>2023 | ISKA | PUP Lopez Quezon</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
