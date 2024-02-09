// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Finance Management</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.finance1} alt='finance1' />
        <p>Jayson C. Jucom</p>
        </div>
        
      </div>
    
    </div>
  );
};

export default SubComponent;
