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

      <div className='org-title'>Education Faculty</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.educ1} alt='it1' />
        <p>Assoc. Prof. Maria Asuncion R. Del Castillo</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ2} alt='it1' />
        <p>Asst. Prof. Christopher B. Valencia</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ3} alt='it1' />
        <p>Dr. Bernie D. Teguenos</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ4} alt='it1' />
        <p>Dr. Jenny C. Linguete</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ5} alt='it1' />
        <p>Dr. Joel C. Magtibay</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ6} alt='it1' />
        <p>Dr. Rodones S. Trimillos</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.educ7} alt='it1' />
        <p>Ms. Joscelle Joyce L. Rivera</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
