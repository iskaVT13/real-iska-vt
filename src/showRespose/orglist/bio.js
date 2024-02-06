// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Biology Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Ms. Marie Andrea E. Zurbano (BSIT Professor)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mr. Lynel P. Tabien (IT Coordinator)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mrs. Icon C. Obmerga (DIT Professor)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mr. Mark Vence V. Dunca</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Mrs. Rosario De Asis Anulao</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
