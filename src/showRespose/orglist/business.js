// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Business and Marketing Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mr. Mark Tan</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Ms. Melanie Sario</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mrs. Sarah Tabien</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
