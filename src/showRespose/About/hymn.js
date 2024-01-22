import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';
import ReactPlayer from 'react-player';

import hymnAudio from './Imno.mp4';

import voiceHymn from '../../speakText/hymn.mp3'; 

const Hymn = () => {

  const [playVoice, setPlayVoice] = useState(false);
  const [currentVoice, setCurrentVoice] = useState('');
  const audioRef = useRef(null); // Add a reference to the audio element

  useEffect(() => {
    if (playVoice) {
      const audioPlayer = new Audio(currentVoice);
      audioRef.current = audioPlayer;
  
      audioPlayer.play();
  
      audioPlayer.addEventListener('ended', () => {
        setPlayVoice(false);
      });
    }
  }, [playVoice, currentVoice]);
  
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
  };

  useEffect(() => {
    // Play voiceHymn when the component mounts
    setCurrentVoice(voiceHymn);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  window.scrollTo(0, 0);

  return (
    <div>
      <div className='step'>
        <h4 className=''>IMNO NG PUP</h4>
        <p>S. Calabig, S. Roldan, and R. Amaranto</p>
        <br />
        <p className='imno'>
          Sintang Paaralan<br />
          Tanglaw ka ng bayan<br />
          Pandayan ng isip ng kabataan<br />
          Kami ay dumating nang salat sa yaman<br />
          Hanap na dunong ay iyong alay<br />
          Ang layunin mong makatao<br />
          Dinarangal ang Pilipino<br />
          Ang iyong aral, diwa, adhikang taglay<br />
          PUP, aming gabay<br />
          Paaralang dakila<br />
          PUP, pinagpala<br />
          Gagamitin ang karunungan<br />
          Mula sa iyo, para sa bayan<br />
          Ang iyong aral, diwa, adhikang taglay<br />
          PUP, aming gabay<br />
          Paaralang dakila<br />
          PUP, pinagpala<br />
        </p>

        {/* Replace the img tag with the ReactPlayer component */}
        <ReactPlayer
          className='video'
          url={hymnAudio}
          controls={true}
          width='100%'
          height='100%'
        />

      </div>
    </div>
  );
};

export default Hymn;
