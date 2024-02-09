import React, { useState } from 'react';
import './showResponse.css';

import leader from '../pictures/placePic/pup-logo.png';
import FeedBackForm  from './sendEmail';

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
          <div>
          <button onClick={handleButtonClick}>Give us Feedback</button>

          <div className='pop-form'>
          {isModalOpen && <FeedBackForm onClose={handleCloseModal} />}
          </div>
          </div>
          
      </div>
  );
};

export default CodeCraftTeam;
