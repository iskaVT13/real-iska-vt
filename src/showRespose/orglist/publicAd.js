// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Public Administration Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.pa1} alt='it1' />
        <p>Mr. Rufo N. Bueza (PADS)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.pa2} alt='it1' />
        <p>Salvador Barros II (PADS)</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
