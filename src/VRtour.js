import React from 'react';
import './App.css';

const MyIframeComponent = () => {
  const iframeStyles = {
    width: '100%',
    height: '600px',
    border: 'none',
    maxWidth: '100%',
  };


  return (
    <div className='vr-container'>
    <iframe
      title="Embedded Content"
      width="100%"
      height="640"
      style={iframeStyles}
      allow="xr-spatial-tracking vr gyroscope accelerometer fullscreen autoplay xr"
      scrolling="no"
      allowFullScreen={true}
      frameBorder="0"
      src="https://webobook.com/public/6573274008ca526d1702cd02,en?fbclid=IwAR3bP33e8DP1q7Olhwo5yZaO94nb_1NTlvoRdTAKtQlziUlYZpCTSwC_hDM"
      allowvr="yes"
    />
        </div>

  );
};

export default MyIframeComponent;
