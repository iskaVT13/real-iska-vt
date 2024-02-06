// Org.js

import React, { useState } from 'react';
import Itdep from './orglist/IT';
import Educdep from './orglist/educ';
import ArchiDep from './orglist/archi';
import Civildep from './orglist/civil';
import Biodep from './orglist/bio';
import Elec from './orglist/elec';

import './showResponse.css';

const Org = () => {
    const [currentSubComponent, setCurrentSubComponent] = useState(null);

  const handleButtonClick = (subComponent) => {
    setCurrentSubComponent(subComponent);
  };

  const renderSubComponent = () => {
    
    switch (currentSubComponent) {
      case 'Itdep':
        return <Itdep onBack={() => setCurrentSubComponent(null)} />;
      case 'Educdep':
        return <Educdep onBack={() => setCurrentSubComponent(null)} />;
      case 'ArchiDep':
        return <ArchiDep onBack={() => setCurrentSubComponent(null)} />;
      case 'Civildep':
        return <Civildep onBack={() => setCurrentSubComponent(null)} />;
      case 'Biodep':
        return <Biodep onBack={() => setCurrentSubComponent(null)} />;
        case 'Elec':
        return <Elec onBack={() => setCurrentSubComponent(null)} />;
      default:
        return null;
    }
  };


  return (
    <div className='org-button'>
      {currentSubComponent ? (
        renderSubComponent()
      ) : (
        <>
        <div className='title-org'>Academic Organization</div>
        <div className='button-org'>
          <button onClick={() => handleButtonClick('Itdep')}>IT Department</button>
          <button onClick={() => handleButtonClick('Educdep')}>Education Department</button>
          <button onClick={() => handleButtonClick('ArchiDep')}>Architecture Department</button>
          <button onClick={() => handleButtonClick('Civildep')}>Civil Engineer Department</button>
          <button onClick={() => handleButtonClick('Elec')}>Electrical Engineer Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Biology Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Accounting Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Agriculture Management Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Hospitality Management Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Office Administration Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Public Administration Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Marketing Management Department</button>
          <button onClick={() => handleButtonClick('Biodep')}>Nutritionist Department</button>
          </div>
        </>
        
      )}
    </div>
  );
};

export default Org;
