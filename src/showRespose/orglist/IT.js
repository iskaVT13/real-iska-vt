// SubComponent.js

import React from 'react';


const SubComponent = ({ onBack }) => {

  return (
    <div className='org-chart'>
      <button onClick={onBack}>Back</button>
      
      <div className='employee'>
        <img src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/Orgchart%2FIT%20Department%2Fiska-iconn.ico?alt=media&token=bf6a6a44-d91a-4c75-84b6-0a52f3d64c90" alt='CEO' />
        <p>CEO</p>
        <div className='subordinates'>
          <img src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/Orgchart%2FIT%20Department%2Fiska-iconn.ico?alt=media&token=bf6a6a44-d91a-4c75-84b6-0a52f3d64c90" alt='IT Director' />
          <p>IT Director</p>
          <div className='subordinates'>
            <img src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/Orgchart%2FIT%20Department%2Fiska-iconn.ico?alt=media&token=bf6a6a44-d91a-4c75-84b6-0a52f3d64c90" alt='IT Coordinator' />
            <p>IT Coordinator</p>
            {/* Add more components for IT Coordinator's subordinates if any */}
          </div>
          <div className='subordinates'>
            <img src="https://firebasestorage.googleapis.com/v0/b/iskavt-26f75.appspot.com/o/Orgchart%2FIT%20Department%2Fiska-iconn.ico?alt=media&token=bf6a6a44-d91a-4c75-84b6-0a52f3d64c90" alt='IT Manager' />
            <p>IT Manager</p>
            {/* Add more components for IT Manager's subordinates if any */}
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default SubComponent;
