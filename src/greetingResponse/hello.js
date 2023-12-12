import React from 'react';
import './greet.css';

import avatar from '../pictures/avatar.gif';


const Hymn = () => {
  return (
    <div>
      <div className='avatar-container'>
        <h3 className='hello'>Hi, I'm ISKA, a PUP Lopez Virtual Assistant developed by the team Code Craft a 4th year BSIT students.</h3>
        <img className='avatar' src={avatar} alt='avatar' />
      </div>
    </div>
  );
};

export default Hymn;
