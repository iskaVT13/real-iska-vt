// SubComponent.js

import React, { useEffect } from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  useEffect (()=>{
  window.scroll(0,0);
  });

  return (
    <div className='org-chart'>
      <div className='org-title'>Nutritionist Department</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.nutri1} alt='nutri1' />
        <p>Asst.Prof.Marvi Anne M. Mañago RMT PAN-YC</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
