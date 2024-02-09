// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Accounting Management</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.acc1} alt='acc1' />
        <p>Prof. Joanne Michelle Lee,CPA</p>
        </div>
        
      </div>
    
    </div>
  );
};

export default SubComponent;
