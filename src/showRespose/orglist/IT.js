// SubComponent.js

import React from 'react';
import orgImage from './org.json';
import '../showResponse.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const SubComponent = ({ onBack }) => {
  window.scroll(0, 0);

  return (
    <div className='org-chart'>
      <FontAwesomeIcon className='back-org' icon={faArrowLeft} size='xl' onClick={onBack} />
      <div className='org-title'>IT Department</div>

      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.it2} alt='it1' />
        <p>Ms. Marie Andrea E. Zurbano (IT Professor)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it1} alt='it1' />
        <p>Mr. Lynel P. Tabien (IT Coordinator)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it3} alt='it1' />
        <p>Mrs. Icon C. Obmerga (DIT Professor)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it4} alt='it1' />
        <p>Mr. Mark Vence V. Dunca (IT Professor)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.it5} alt='it1' />
        <p>Mrs. Rosario De Asis Anulao (IT Professor)</p>
        </div>
      </div>

      <div className='org-title'>Computer Engineer Department</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.com1} alt='it1' />
        <p>Engr. Edelyn Pamilaran </p>
        </div>
        <div className='image-name'>
        <img src={orgImage.com2} alt='it1' />
        <p>Engr. Maria Luisa N. Francisco (ICEPT)</p>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
