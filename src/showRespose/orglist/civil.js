// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Civil Engineer Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Jer Anthony Palo (PICE)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Cesar Bermundo</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Jomar Alcantara</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
