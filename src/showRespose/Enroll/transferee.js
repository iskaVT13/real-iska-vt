import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';

import step1 from '../Enroll/enrollPicture/Transferee/step1.png';
import step8 from '../Enroll/enrollPicture/Transferee/step8.jpg';

import voiceTransferee from '../../speakVoice/transferee.mp3'; 

const Transferee = () => {
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
    // Play voiceTransferee when the component mounts
    setCurrentVoice(voiceTransferee);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);
  const justifyText = (text, x, y, maxWidth, lineHeight, pdf) => {
    if (typeof text !== 'string') {
      return;
    }

    const words = text.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const testWidth = pdf.getStringUnitWidth(testLine) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      if (testWidth > maxWidth && i > 0) {
        pdf.text(line.trim(), x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    pdf.text(line.trim(), x, y);
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.step');

    if (element) {
      const pdf = new jsPDF();
      const lineHeight = 12;
      const margin = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      let verticalPosition = margin;

      const addPageIfNeeded = () => {
        if (verticalPosition + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          verticalPosition = margin;
        }
      };

      pdf.setFontSize(18);
      const headerText = 'Transferee Student Enrollment Steps';
      const headerWidth = pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const centerPosition = (pageWidth - headerWidth) / 2;

      pdf.text(headerText, centerPosition, verticalPosition);
      verticalPosition += lineHeight;

      Array.from(element.children).forEach((child) => {
        addPageIfNeeded();

        if (child.tagName === 'IMG') {
          const imgData = child.src;
          const imgWidth = 80;
          const imgHeight = 50;
          const centerImgPosition = (pageWidth - imgWidth) / 2;

          pdf.addImage(imgData, 'JPEG' || 'PNG', centerImgPosition, verticalPosition, imgWidth, imgHeight);
          verticalPosition += imgHeight + 10;
        } else {
          pdf.setFontSize(9);
          const textContent = child.textContent;
          justifyText(textContent, margin, verticalPosition, pageWidth - 2 * margin, lineHeight, pdf);
          verticalPosition += lineHeight * 2;
        }
      });

      pdf.setFontSize(10);
      const footerText = 'DEVELOPED BY "TEAM CODECRAFT", BSIT 4 STUDENT OF PUP LOPEZ BRANCH';
      const footerWidth = pdf.getStringUnitWidth(footerText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const centerFooterPosition = (pageWidth - footerWidth) / 2;

      pdf.text(footerText, centerFooterPosition, pdf.internal.pageSize.getHeight() - margin);

      pdf.save('transferee-student.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='step'>
        <h4 className=''>STEPS TO FOLLOW:</h4><br></br>
        <p>Step 1: Submit transfer credentials for evaluation </p><br></br>
        <img className='screenshot' src={step1} alt='Step-image1' />
        <p>Step 2: Upon approval of Office of evaluated credentials, proceed to Office of the Student Affairs and Services for schedule of Psychological Examination.</p><br></br>
        <p>Step 3: Proceed to the Cashier Office for Payment of Psychological Exam.</p><br></br>
        <p>Step 4: Take the Psychological Exam </p><br></br>
        <p>Step 5: Proceed to Registrar Office and submit admission credentials for evaluation.</p><br></br>
        <img className='screenshot' src={step1} alt='Step-image1' />
        <ul className='transferee-bullet'>
          <p>Requirements:</p>
          <li>Honorable Dismissal</li>
          <li>Transcript of Records</li>
        <li> Certificate of Good Moral Character </li>
        <li>Course/Subject Description taken from other school</li>
        <li>PSA (NSO) Copy of Birth Certificate </li>
        <li>Medical Clearance from the University Clinic</li>
        <li>Two (2) pcs. 2x2 picture with name tag</li>
        <li>Receipt Admission fee</li>
        <li>Curriculum Sheet</li>
        <p>Example:</p>
        <img className='screenshot' src={step1} alt='Step-image1' />
        <img className='screenshot' src={step1} alt='Step-image1' />
        </ul>
        <p>Step 6: Proceed to the Office of the Academic Programs/College of choice and copy the subjects</p>
        <p>Step 7: Send R-zero to OVPBC for tagging of subjects.</p>
        <p>Step 8: Proceed to Cashier’s Office for Payment of tuition fee </p>
        <img className='screenshot' src={step8} alt='Step-image1' />
        <p>Step 9: Proceed to the Admission Office for printing of Registration Certificate and ID processing.</p>
        


      </div>

    <div className='download-button'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default Transferee;
