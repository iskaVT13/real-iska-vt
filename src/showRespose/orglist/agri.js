// SubComponent.js

import React, { useEffect } from 'react';
import orgImage from './org.json';
import '../showResponse.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SubComponent = ({ onBack }) => {

  useEffect (()=>{
  window.scroll(0,0);
  });

  return (
    <div className='org-chart'>
            <FontAwesomeIcon className='back-org' icon={faArrowLeft} size='xl' onClick={onBack} />
      <div className='org-title'>Agriculture Department</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.agri1} alt='agri1' />
        <p>Kent_B._Pitero (ABS)</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
