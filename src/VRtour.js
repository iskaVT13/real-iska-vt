import React from 'react';

const MyIframeComponent = () => {
  const iframeStyles = {
    width: '100%',
    height: '640px',
    border: 'none',
    maxWidth: '100%',
  };

  return (
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
  );
};

export default MyIframeComponent;
