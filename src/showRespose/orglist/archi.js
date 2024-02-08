// Archi.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const Archi = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Architecture Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.archi1} alt='it1' />
        <p>Ar.Regidor_Mapanao</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.archi2} alt='it1' />
        <p>Ar. Riza Rizalina Quincina</p>
        </div>
      </div>
    
    </div>
  );
};

export default Archi;
