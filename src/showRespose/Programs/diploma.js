import React, { useEffect, useState, useRef } from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';

import diploma from './diploma.webp';

import voiceDiploma from '../../speakVoice/diploma.mp3'; 

const Diploma = () => {
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
    // Play voiceDiploma when the component mounts
    setCurrentVoice(voiceDiploma);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  window.scrollTo(0, 0);
  
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
      const headerText = 'Diploma Courses';
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

      pdf.save('diploma-courses.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div className='diploma-container'>
      <div className='step'>
        <h4 className=''>DIPLOMA</h4><br/>
        <div className='course-img'>
          <img src={diploma} alt='diploma-img' />
        </div>
        <p>
        Diploma in Computer Engineering Technology (DCEPET)<br/>
        Diploma in Civil Engineering Technology (DCVET)<br/>
        Dimploma in Electrical Engineering Technology (DEET)<br/>
        Diploma in Information Technology (DIT)<br/>
        Diploma in Office Management Technology - Legal Office Management (DOMT-LOM)<br/>
        Diploma in Office Management Technology - Medical Office Management (DOMT-MOM)<br/>
        </p>
      </div>

    <div className='download-button'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default Diploma;
