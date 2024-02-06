// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <div className='org-title'>Electrical Engineer Faculty</div>
      <button onClick={onBack}>Back</button>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Cesar S. Perion</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Darwin M. Capio</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Jay Lexter D. Umali</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Thadeus L. Arche</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.temp} alt='it1' />
        <p>Engr. Merlin M. Capistrano</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
