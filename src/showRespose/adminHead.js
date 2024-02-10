// AdminHead.js

import React from 'react';
import orgImage from './orglist/org.json';
import './showResponse.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const AdminHead = ({onBack}) => {

  return (
    <div className='admin-head' >
        <FontAwesomeIcon className='go-back' onClick={onBack} icon={faArrowLeft}/>
        <div className='director'>
        <img src={orgImage.temp} alt='director'/>
        <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
        </div>
        <div className='head-list' >
            <div className='admin-img'>
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Campus Director)</p>
            </div>

        </div>
      </div>
  );
};

export default AdminHead;
