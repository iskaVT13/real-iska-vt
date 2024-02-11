// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
            <FontAwesomeIcon className='back-org' icon={faArrowLeft} size='xl' onClick={onBack} />
      <div className='org-title'>Public Administration Faculty</div>
      
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
