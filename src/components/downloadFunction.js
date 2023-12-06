// DownloadButton.js
import React from 'react';

function DownloadButton({ downloadHandler }) {
  return (
    <button className='download-button' onClick={downloadHandler}>
      Download Response
    </button>
  );
}

export default DownloadButton;
