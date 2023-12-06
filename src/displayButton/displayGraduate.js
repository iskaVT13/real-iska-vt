import React, { useState } from 'react';
import './displayDesign.css';

function GraduateButton({ onGraduateButtonClick }) {
  const [activeYear, setActiveYear] = useState(null);

  const speakText = (text, year) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
    
    setActiveYear(year); // Set the active year when a button is clicked
  };

  return (
    <div className='choices-button'>
      <button
        onClick={() => { onGraduateButtonClick('graduate'); speakText('Here is the process to enroll for regular student. Please take your time to be guided with the steps. Good Luck', 'regular'); }}
        className={activeYear === 'graduate' ? 'active' : ''}
      >
        GRADUATE
      </button>

      
     
    </div>
  );
}

export default GraduateButton;
