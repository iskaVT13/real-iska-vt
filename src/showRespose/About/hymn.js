import React from 'react';
import '../showResponse.css';

import pylon from '../../areaImage/pylon2022.jpg';


const Hymn = () => {

  return (
    <div>
      <div className='step'>
        <h4 className=''>IMNO NG PUP</h4>
        <p>S. Calabig, S. Roldan, and R. Amaranto</p><br/>
        <ul className='lyrics'>
          <li>Sintang Paaralan</li>
          <li>Tanglaw ka ng bayan</li>
          <li>Pandayan ng isip ng kabataan</li>
          <li>Kami ay dumating nang salat sa yaman </li>
          <li>Hanap na dunong ay iyong alay</li>
          <li>Ang layunin mong makatao </li>
          <li>Dinarangal ang Pilipino </li>
          <li>Ang iyong aral, diwa, adhikang taglay </li>
          <li>PUP, aming gabay</li>
          <li>Paaralang dakila</li>
          <li>PUP, pinagpala </li>
          <li>Gagamitin ang karunungan </li>
          <li>Mula sa iyo, para sa bayan </li>
          <li>Ang iyong aral, diwa, adhikang taglay</li>
          <li>PUP, aming gabay </li>
          <li>Paaralang dakila </li>
          <li>PUP, pinagpala</li>
        </ul>

        <img className='screenshot' src={pylon} alt='Step-image1' />
      </div>
    </div>
  );
};

export default Hymn;
