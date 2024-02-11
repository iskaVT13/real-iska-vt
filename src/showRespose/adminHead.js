// AdminHead.js

import React from 'react';
import orgImage from './orglist/org.json';
import './showResponse.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const AdminHead = ({onBack}) => {

  return (
    <div className='admin-head' >
        <div className='director'>
        <img src={orgImage.staff1} alt='director'/>
        <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Branch Director)</p>
        </div>
        <div className='director'>
        <img src={orgImage.staff2} alt='director'/>
        <p>Engr. Antonio P. Curva (Administrative Officer and QMS Head)</p>
        </div>
        <div className='head-list' >
            <div className='admin-img'>
            <img src={orgImage.staff3} alt='officer1' />
            <p> Judith M. Marjalino (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff4} alt='officer1' />
            <p>Ruperto I. Almase (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff5} alt='officer1' />
            <p>Wilfredo B. Malabanan (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff6} alt='officer1' />
            <p>Oscar M. Rioflarido Jr. (Administrative Staff)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.staff7} alt='officer1' />
            <p>Alvin A. Argosino (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff8} alt='officer1' />
            <p>Marite P. Imperio (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff9} alt='officer1' />
            <p>Marian B. Reynales (Guidance Councilor)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff10} alt='officer1' />
            <p>Cherry D. Landicho (librarian II)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff11} alt='officer1' />
            <p>Mary Ann D. Padua</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff12} alt='officer1' />
            <p>Victoria Alma V. Conti,DMD (Dentist)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff13} alt='officer1' />
            <p>Rowena M. Yumul,RN (Public Health Nurse I)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff14} alt='officer1' />
            <p>Wilbor B. De Asis (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.staff15} alt='officer1' />
            <p>Themistocles S. Yumul Jr. (Security Officer)</p>
            </div>
            
            <div className='admin-img' >
            <img src={orgImage.staff16} alt='officer1' />
            <p>Garito E. Fabi (Security Officer)</p>
            </div>

            </div>
        <div className='back-go'>
        <FontAwesomeIcon className='go-back' onClick={onBack} icon={faArrowLeft} size='xl'/>
        </div>
      </div>
  );
};

export default AdminHead;
