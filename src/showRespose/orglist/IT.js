// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>IT Coordinator</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.it1} alt='it1' />
        <p>Mr. Lynel P. Tabien</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it2} alt='it1' />
        <p>Ms. Marie Andrea E. Zurbano </p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it3} alt='it1' />
        <p>Mrs. Icon C. Obmerga</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it4} alt='it1' />
        <p>Mr. Mark Vence V. Dunca</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it5} alt='it1' />
        <p>Mrs. Rosario De Asis Anulao</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
