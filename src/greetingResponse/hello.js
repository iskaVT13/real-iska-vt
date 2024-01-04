import React from 'react';
import './greet.css';

import avatar from '../pictures/avatar.gif';



const Hello = () => {

  window.scrollTo(0, 0);

  return (
    <div>
      <div className='avatar-container'>
        <h3 className='hello'>Hi, I'm ISKA, a PUP Lopez Virtual Assistant. How can I assist you today?</h3>
        <img className='avatar' src={avatar} alt='avatar' />
      </div>


    </div>
  );
};

export default Hello;
