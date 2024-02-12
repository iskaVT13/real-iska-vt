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
        <img src={orgImage.director} alt='director'/>
        <p>Assoc. Prof. Ronaldo G. Bulfa, MBA (Branch Director)</p>
        </div>
        <div className='second-container'>
        <div className='second-head'>
        <img src={orgImage.head1} alt='director'/>
        <p>Dr. Lourdes B. Avila (Head, Academic Programs)</p>
        </div>
        <div className='second-head'>
        <img src={orgImage.head2} alt='director'/>
        <p>Dr. Leilidyn Y. Zurbano(Head, Student Affairs & Services)</p>
        </div>
        <div className='second-head'>
        <img src={orgImage.head3} alt='director'/>
        <p>Engr. Antonio P. Curva (Administrative Officer and QMS Head)</p>
        </div>
        <div className='second-head'>
        <img src={orgImage.head3} alt='director'/>
        <p>Asst. Prof. Altagracia A. Silaya (Collecting and Disbursing Officer)</p>
        </div>
        </div>
        <div className='head-list' >

            <div className='admin-img'>
            <img src={orgImage.list1} alt='officer1' />
            <p> Judith M. Marjalino (Administrative Staff)</p>
            </div>

            <div className='admin-img'>
            <img src={orgImage.list2} alt='officer1' />
            <p> Assoc. Prof. Maria Asuncion R. Del Castillo (QA Coordinator)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.temp} alt='officer1' />
            <p>Devimar V. Marcaida (OJT Coordinator)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list4} alt='officer1' />
            <p>Lynel P. Tabien (Head, Laboratory, ICT Coordinator)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list5} alt='officer1' />
            <p>Dr. Joel C. Magtibay (Faculty Extensionist)</p>
            </div>
            
            <div className='admin-img' >
            <img src={orgImage.list6} alt='officer1' />
            <p>Cherry D. Landicho (Librarian II)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list7} alt='officer1' />
            <p>Marian B. Reynales (Guidance Councilor)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list8} alt='officer1' />
            <p>Assoc. Prof. Josefina P. Babiera (Registrar)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list88} alt='officer1' />
            <p>Tito Ernesto Z. Loreto</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list9} alt='officer1' />
            <p>Asst. Prof. Gilberto A. Villanueva (Chief, Cultural Affairs)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list10} alt='officer1' />
            <p>Asst. Prof. Dionysus A. Velasquez (Sports Coordinator)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list11} alt='officer1' />
            <p>Wilfredo B. Malabanan (FAMO & Property Custodian)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list12} alt='officer1' />
            <p>Rowena M. Yumul,RN (Public Health Nurse I)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list13} alt='officer1' />
            <p>Victoria Alma V. Conti,DMD (Dentist)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list14} alt='officer1' />
            <p>Themistocles S. Yumul Jr. (Security Officer)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list15} alt='officer1' />
            <p>Ruperto I. Almase (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list16} alt='officer1' />
            <p>Oscar M. Rioflarido Jr. (Administrative Staff)</p>
            </div>
            <div className='admin-img' >
            <img src={orgImage.list17} alt='officer1' />
            <p>Alvin A. Argosino (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list18} alt='officer1' />
            <p>Marite P. Imperio (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list19} alt='officer1' />
            <p>Mary Ann D. Padua (Librarian I)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list20} alt='officer1' />
            <p>Wilbor B. De Asis (Administrative Staff)</p>
            </div>

            <div className='admin-img' >
            <img src={orgImage.list21} alt='officer1' />
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
