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

      <div className='org-title'>Office Administration Faculty</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.oa1} alt='oa1' />
        <p>Mr. Hiro Sen T. Mera (PASOA)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.oa2} alt='oa1' />
        <p>Elenita R. Portez</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
