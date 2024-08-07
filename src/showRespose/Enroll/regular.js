import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';

import step1 from '../Enroll/enrollPicture/Regular/log in.png';
import step2 from '../Enroll/enrollPicture/Regular/s2.jpg';
import step3 from '../Enroll/enrollPicture/Regular/s3.jpg';
import step4 from '../Enroll/enrollPicture/Regular/s4.jpg';
import step5 from '../Enroll/enrollPicture/Regular/s5.jpg';
import step8 from '../Enroll/enrollPicture/Regular/s8.jpg';

import voiceRegular from '../../speakVoice/regular.mp3'; 

const Regular = () => {
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
    // Play voiceRegular when the component mounts
    setCurrentVoice(voiceRegular);
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
      const headerText = 'Regular Student Enrollment Steps';
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

      pdf.save('regular-student.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='step'>
        <h4 className=''>STEPS TO FOLLOW:</h4><br></br>
        <p>Step 1: Log in to your SIS Account. (<a href='https://sis1.pup.edu.ph/' target='_blank' rel='noopener noreferrer'>https://sis1.pup.edu.ph/</a>) </p>
          <img className='screenshot' src={step1} alt='Step-image1' />
        <p>Step 2. Check if your grades is complete (Grades Section )</p>
          <img className='screenshot' src={step2} alt='Step-image2' />
        <p>Step 3. Go to enrollment section </p>
          <img className='screenshot' src={step3} alt='Step-image1' />
        <p>Step 4. Check all the subjects and the schedule to enroll</p>
          <img className='screenshot' src={step4} alt='Step-image1' />
        <p>Step 5 : Click Save and Assess </p>
          <img className='screenshot' src={step5} alt='Step-image1' />
        <p>Step 6 : Review and Click okay to confirm </p>
        <p>Step 7 : Review the Assessment </p>
        <p>Step 8 : Print the Confirmation Slip </p>
          <img className='screenshot' src={step8} alt='Step-image1' />
      </div>

    <div className='download-button'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default Regular;
