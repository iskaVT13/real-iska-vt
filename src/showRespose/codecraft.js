import React from 'react';
import './showResponse.css';

import leader from '../pictures/placePic/pup-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CodeCraftTeam = () => {
  return (
    <div className='team-container'>
        <div className='team-logo'>
            <img src={leader} alt="Leader" />
        </div>
      <h2>Team CodeCraft</h2>
      <div className='team-contents'>
        <div className='team-desc'>
          <img src={leader} alt='leader'/>
          <p>Mc Vincent R. Paredes</p>
        </div>
          <div className='team-desc'>
            <img src={leader} alt='image2'/>
            <p>Jaybee C. Santua</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image3'/>
            <p>Christian Sagun</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image4'/>
            <p>Liza May Nonzol</p>
          </div>
          <div className='team-desc'>
            <img src={leader} alt='image5'/>
            <p>Gjellah Mae M. Mortega</p>
          </div>
          </div>
          <div className='feedback'>
            <input id='comment' type='text' placeholder='Please  enter your feedback here.'></input><br/><br/>
            <FontAwesomeIcon className='icon-send' icon={faPaperPlane} size='2x'/>
          </div>
      </div>
  );
};

export default CodeCraftTeam;
