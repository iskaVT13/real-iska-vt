import React, { useEffect } from 'react';

const MyIframeComponent = () => {
  const iframeStyles = {
    width: '100%',
    height: '640px',
    border: 'none',
    maxWidth: '100%',
  };

  useEffect(() => {
    // Function to speak the text
    const speakText = (text) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    };

    // Text to be spoken
    const textToSpeak = "Explore the P U P Lopez Branch virtually to discover its modern facilities and vibrant campus life. Perfect for prospective students and alumni, this immersive tour offers a glimpse into the dynamic academic environment of Polytechnic University of the Philippines Lopez Branch. Start your virtual exploration now!";

    // Speak the text when the component mounts
    speakText(textToSpeak);

    // Cleanup function
    return () => {
      // Stop speaking when the component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

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
