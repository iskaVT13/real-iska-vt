import React from 'react';
import '../showResponse.css';
import ReactPlayer from 'react-player';

import hymnAudio from './Imno.mp4';

const Hymn = () => {

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
