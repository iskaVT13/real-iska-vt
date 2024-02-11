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
      <div className='org-title'>Civil Engineer Department</div>
      
      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.ce1} alt='it1' />
        <p>Engr. Jer Anthony Palo (PICE)</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ce2} alt='it1' />
        <p>Engr. Cesar Bermundo</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ce3} alt='it1' />
        <p>Engr. Jomar Alcantara</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ce4} alt='it1' />
        <p>Engr. Nelson N. Entienza</p>
        </div>
      </div>

      <div className='org-title'>Electrical Engineer Department</div>

      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.ee1} alt='it1' />
        <p>Engr. Cesar S. Perion</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ee2} alt='it1' />
        <p>Engr. Darwin M. Capio</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ee3} alt='it1' />
        <p>Engr. Jay Lexter D. Umali</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ee4} alt='it1' />
        <p>Engr. Thadeus L. Arche</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.ee5} alt='it1' />
        <p>Engr. Merlin M. Capistrano</p>
        </div>
      </div>

      <div className='org-title'>Architecture Department</div>

      <div className='image-pic'>
        <div className='image-name'>
        <img src={orgImage.archi1} alt='it1' />
        <p>Ar.Regidor_Mapanao</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.archi2} alt='it1' />
        <p>Ar. Riza Rizalina Quincina</p>
        </div>
        <div className='image-name'>
        <img src={orgImage.archi3} alt='it1' />
        <p>Ar. Maria Villa A. Sarmiento </p>
        </div>
      </div>


    
    </div>
  );
};

export default SubComponent;
