import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';

import voicePillars from '../../speakVoice/pillars.mp3';

const Pillars = () => {
  const [playVoice, setPlayVoice] = useState(false);
  const [currentVoice, setCurrentVoice] = useState('');
  const audioRef = useRef(null);

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
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    setCurrentVoice(voicePillars);
    setPlayVoice(true);

    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    // Set the height of the step div to its scrollHeight
    const stepDiv = document.querySelector('.step');
    if (stepDiv) {
      stepDiv.style.height = `${stepDiv.scrollHeight}px`;
    }
  }, []); // Run only once on component mount

  return (
    <div>
      <div className='step'>
        <p className='title'>Ten Pillars</p>
        <ul>
          <li>Pillar 1:  Dynamic, Transformational, and Responsible Leadership</li>
          <li>Pillar 2: Responsive and Innovative Curricula and Instruction</li>          
          <li>Pillar 3:  Enabling and Productive Learning Environment</li>          
          <li>Pillar 4:  Holistic Student Development and Engagement</li>          
          <li>Pillar 5:  Empowered Faculty Members and Employees</li>          
          <li>Pillar 6: Vigorous Research Production and Utilization</li>          
          <li>Pillar 7:  Global Academic Standards and Excellence</li>          
          <li>Pillar 8: Synergistic, Productive, Strategic Networks and Partnerships</li>          
          <li>Pillar 9: Active and Sustained Stakeholdersâ€™ Engagement</li>          
          <li>Pillar 10: Sustainable Social Development Programs and Projects</li>          

        </ul>
        <p className='title'>Sampung Haligi</p>
        <ul>
          <li>Haligi 1: Dinamiko, Mapagbago at Responsableng Pamumuno</li>
          <li>Haligi 2: Tumutugon at Makabagong  Kurikula at Pagtuturo</li>
          <li>Haligi 3: Nakatutulong at Produktibong Kapaligirang Pampagkatuto</li>
          <li>Haligi 4: Holistiko at Nakahihikayat na  Pagpapaunlad Pang-mag-aaral</li>
          <li>Haligi 5: Pinahusay na Dalubguro at Kawani</li>
          <li>Haligi 6: Masikhay na Produksyon at Pakikinabang ng Pananaliksik</li>
          <li>Haligi 7: Pandaigdigang Pamantayang Akademiko at Kahusayan</li>
          <li>Haligi 8: Kolaborasyon, Produktibo, Estratehikong Ugnayan at Pagtutuwang</li>
          <li>Haligi 9: Aktibo at Napapanatiling Ugnayan sa Pinaglilingkuran</li>
          <li>Haligi 10: Patuluyang Programa at Proyektong Pagpapaunlad Panlipunan</li>
        </ul>
        <p></p>

      </div>

    </div>
  );
};

export default Pillars;
