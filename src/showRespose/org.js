// App.js

import React, { useState } from 'react';
import Itdep from './orglist/IT';
import Educdep from './orglist/educ';
import ArchiDep from './orglist/archi';
import Civildep from './orglist/civil';
import Biodep from './orglist/bio';

import './showResponse.css';

const App = () => {
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
      default:
        return null;
    }
  };


  return (
    <div>
      {currentSubComponent ? (
        renderSubComponent()
      ) : (
        <>
          <button onClick={() => handleButtonClick('Itdep')}>IT Coordinator</button>
          <button onClick={() => handleButtonClick('Educdep')}>Education Coordinator</button>
          <button onClick={() => handleButtonClick('ArchiDep')}>Architecture Coordinator</button>
          <button onClick={() => handleButtonClick('Civildep')}>Civil Engineer Coordinator</button>
          <button onClick={() => handleButtonClick('Biodep')}>Biology Coordinator</button>
        </>
      )}
    </div>
  );
};

export default App;
