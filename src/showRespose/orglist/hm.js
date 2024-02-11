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

      <div className='org-title'>Hospitality Management Department</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.hm1} alt='it1' />
        <p>Lesley Ann-Chan Magtibay</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.hm2} alt='it1' />
        <p>Mildred M. Mondragon</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
