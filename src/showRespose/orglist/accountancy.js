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
      <div className='org-title'>Accounting Management</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.acc1} alt='acc1' />
        <p>Prof. Joanne Michelle Lee,CPA</p>
        </div>
      </div>

      <div className='org-title'>Business Management</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.mark1} alt='it1' />
        <p>Mr. Mark Tan</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.mark2} alt='it1' />
        <p>Ms. Melanie Sario</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.mark3} alt='it1' />
        <p>Mrs. Sarah Tabien</p>
        </div>
      </div>

      <div className='org-title'>Finance Management</div>

      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.finance1} alt='finance1' />
        <p>Jayson C. Jucom</p>
        </div>
      </div>
        
    
    </div>
  );
};

export default SubComponent;
