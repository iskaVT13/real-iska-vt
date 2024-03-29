import React, { useEffect, useState, useRef } from 'react';
import './showResponse.css';
import { jsPDF } from 'jspdf';

import voiceGrad from '../speakVoice/grad.mp3'; 

const Graduation = () => {
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
    // Play voiceGrad when the component mounts
    setCurrentVoice(voiceGrad);
    setPlayVoice(true);
  
    // Cleanup function to stop audio when the component unmounts
    return () => {
      stopAudio();
    };
  }, []);

  window.scrollTo(0, 0);
  
  const handleDownloadPDF = () => {
    const element = document.querySelector('.step');

    if (element) {
      const pdf = new jsPDF();
      const lineHeight = 12;
      const margin = 20; // Adjust the margin as needed
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      pdf.setFontSize(18);
      const headerText = 'Irregular Student Enrollment Steps';
      const headerWidth = pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const centerPosition = (pageWidth - headerWidth) / 2;

      pdf.text(headerText, centerPosition, margin);
      let verticalPosition = margin + lineHeight;

      Array.from(element.children).forEach((child) => {
        if (child.tagName === 'IMG') {
          const imgData = child.src;
          const imgWidth = 80; // Adjust the width as needed
          const imgHeight = 50; // Adjust the height as needed
          const centerImgPosition = (pageWidth - imgWidth) / 2;

          pdf.addImage(imgData, 'JPEG' || 'PNG', centerImgPosition, verticalPosition, imgWidth, imgHeight);
          verticalPosition += imgHeight + 10; // Adjust the vertical position after adding an image
        }else {
          pdf.setFontSize(9); // Adjust the font size for text
          const textContent = child.textContent;
        

         // Function to justify text
    const justifyText = (text, x, y, maxWidth, lineHeight) => {
        if (typeof text !== 'string') {
          // Check if text is a string before splitting
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
  
          justifyText(textContent, margin, verticalPosition, pageWidth - 2 * margin, lineHeight);
          verticalPosition += lineHeight * 2; // Adjust the vertical position after adding text
        }
    });

       // Add footer with margin and center alignment
       pdf.setFontSize(10);
       const footerText = 'DEVELOPED BY "TEAM CODECRAFT", BSIT 4 STUDENT OF PUP LOPEZ BRANCH';
       const footerWidth = pdf.getStringUnitWidth(footerText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
       const centerFooterPosition = (pageWidth - footerWidth) / 2;
 
       pdf.text(footerText, centerFooterPosition, pdf.internal.pageSize.getHeight() - margin);
 

      pdf.save('Irregular-Student.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='moral'>
        <h4 className='grad-title'>Graduation Requirements</h4><br></br>
        <ul className='list'>
            <li>1. A candidate for graduation should file their application for graduation with the University Registrar's Office at the start of their last semester.</li>
            <li>2. A student shall be recommended for graduation when they have satisfied all academic and other requirements prescribed by the University.</li>
            <li>3. No student shall be allowed to graduate from the University unless they have earned therein more than fifty percent (50%) of the academic units required in their curriculum.</li>
            <li>4. A candidate for graduation should have their deficiencies made up and their record cleared not later than two weeks before the end of their semester.</li>
            <li>5. No student will be issued a diploma and a transcript of records unless they have been cleared of all accountabilities.</li>
        </ul>
      </div>

    <div className='download-container'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default Graduation;
