// DisplayComponent.js
import React from 'react';
import './App.css';
import Iskaimg from './pictures/iska-iconn.ico';
import PupLogo from './pictures/placePic/pup-logo.png';

const DisplayComponent = ( { onClose } ) => {
  const handleStudentClick = () => {
    alert('Hello! Welcome to ISKA Student!');
    // You can add more logic here for handling student button click
    onClose(); // Close the component

    const showHandbook = document.querySelectorAll('.handbook');
  showHandbook.forEach((element) => {
    element.style.display = '';});
  };

  const handleVisitorClick = () => {
    alert('Hello! Welcome to ISKA Visitor');
    // You can add more logic here for handling visitor button click
    onClose(); // Close the component

    const hideHandbook = document.querySelectorAll('.handbook');
  hideHandbook.forEach((element) => {
    element.style.display = 'none';});
  };

  return (
    <div className="display-component">
      <div className='welcome-logo'>
        <img src={Iskaimg} alt='iska-img' />
        <img src={PupLogo} alt='pup-logo' />
        </div>
      <div className="button-container">
      <h2>Welcome! I'm IS<span>KA</span></h2>
      <p>Please choose what you are?</p>
      <div className='btn'>
        <button onClick={handleStudentClick}>
          Student
        </button>
        <button onClick={handleVisitorClick}>
          Visitor
        </button>
        </div>
        <div className='bottom-text'>
          <p>
          2023 | ISKA | PUP Lopez Quezon
          </p>

        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
