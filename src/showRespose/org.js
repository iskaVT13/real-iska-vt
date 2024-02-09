// Org.js

import React, { useState } from 'react';

import Itdep from './orglist/IT';
import Educdep from './orglist/educ';
import ArchiDep from './orglist/archi';
import Civildep from './orglist/civil';
import Biodep from './orglist/bio';
import Elec from './orglist/elec';
import Agri from './orglist/agri';
import PubAd from './orglist/publicAd';
import OffAd from './orglist/officeAd';
import Acc from './orglist/accountancy';
import Nutri from './orglist/nutri';
import Finance from './orglist/finance';
import Hospi from './orglist/hm';
import Business from './orglist/business';



import './showResponse.css';

const Org = () => {
    const [currentSubComponent, setCurrentSubComponent] = useState(null);

  const handleButtonClick = (subComponent) => {
    setCurrentSubComponent(subComponent);
    window.scroll(0, 0);

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
      case 'Agri':
        return <Agri onBack={() => setCurrentSubComponent(null)} />;
      case 'OffAd':
        return <OffAd onBack={() => setCurrentSubComponent(null)} />;
      case 'PubAd':
        return <PubAd onBack={() => setCurrentSubComponent(null)} />;
      case 'Nutri':
        return <Nutri onBack={() => setCurrentSubComponent(null)} />;
      case 'Hospi':
        return <Hospi onBack={() => setCurrentSubComponent(null)} />;
      case 'Finance':
        return <Finance onBack={() => setCurrentSubComponent(null)} />;
      case 'Acc':
          return <Acc onBack={() => setCurrentSubComponent(null)} />;
      case 'Business':
          return <Business onBack={() => setCurrentSubComponent(null)} />;
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
        <div className='title-org'>
          <h2>Academic Department</h2>
          </div>
        <div className='button-org'>
        <div className='per-course'>
          <h4>Business and Accountancy</h4>
          <button onClick={() => handleButtonClick('Acc')}>Accounting Department</button>
          <button onClick={() => handleButtonClick('Finance')}>Finance Department</button>
          <button onClick={() => handleButtonClick('Business')}>Marketing Management Department</button>
        </div>
        <div className='per-course'>
          <h4>Agriculture and Agri-business</h4>
          <button onClick={() => handleButtonClick('Agri')}>Agriculture Management Department</button>
        </div>
        <div className='per-course'>
          <h4>Architecture and Engineering</h4>
          <button onClick={() => handleButtonClick('ArchiDep')}>Architecture Department</button>
          <button onClick={() => handleButtonClick('Civildep')}>Civil Engineer Department</button>
          <button onClick={() => handleButtonClick('Elec')}>Electrical Engineer Department</button>
        </div>
        <div className='per-course'>
          <h4>Information Technology</h4>
          <button onClick={() => handleButtonClick('Itdep')}>IT Department</button>
        </div>
        <div className='per-course'>
          <h4>Education and Public Administration</h4>
          <button onClick={() => handleButtonClick('Educdep')}>Education Department</button>
          <button onClick={() => handleButtonClick('PubAd')}>Public Administration Department</button>
        </div>
        <div className='per-course'>
          <h4>Hospitality and Office Administration</h4>
          <button onClick={() => handleButtonClick('Hospi')}>Hospitality Management Department</button>
          <button onClick={() => handleButtonClick('OffAd')}>Office Administration Department</button>
        </div>
        <div className='per-course'>
          <h4>Health and Science</h4>
          <button onClick={() => handleButtonClick('Biodep')}>Biology Department</button> 
          <button onClick={() => handleButtonClick('Nutri')}>Nutritionist Department</button>
        </div>
          </div>
        </>
        
      )}
    </div>
  );
};

export default Org;
