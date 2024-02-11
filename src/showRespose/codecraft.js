import React, { useState } from 'react';
import './showResponse.css';

import leader from '../pictures/placePic/pup-logo.png';
import FeedBackForm  from './sendEmail';

import teamLogo from '../pictures/team-logo.jpg'

const CodeCraftTeam = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className='team-container'>
        <div className='team-logo'>
            <img src={teamLogo} alt="Leader" />
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
          <div>
            <div className='button-feedback'>
            <button onClick={handleButtonClick}>Give us a Feedback</button>
            <div>
              <p>Contact us: </p>
              <ul>
                <li>pupiska13@gmail.com</li>
              </ul>
            </div>
            <div className='modal-footer'>
              <p>2023 | ISKA | PUP Lopez Quezon</p>
            </div>
            </div>

          <div className='pop-form'>
          {isModalOpen && <FeedBackForm onClose={handleCloseModal} />}
          </div>
          </div>
          
      </div>
  );
};

export default CodeCraftTeam;
