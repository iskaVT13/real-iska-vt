// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Biology Department</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.bio1} alt='it1' />
        <p>Benedick Labaco (ILS)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.bio2} alt='it1' />
        <p>Francis M. Jimenez (ILS)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.bio3} alt='it1' />
        <p>Mr.Vince Czar S.Abel (ILS)</p>
        </div>
      </div>

      <div className='org-title'>Nutritionist Department</div>

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
