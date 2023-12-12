import React from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';

import pylon from '../../areaImage/pylon2022.jpg';
import iapply from '../Enroll/enrollPicture/pup iapply.png';
import applyNow from '../Enroll/enrollPicture/applyNow.png';
import applyNow2 from '../Enroll/enrollPicture/applyNow2.png';
import register from '../Enroll/enrollPicture/register.png';
import agreement from '../Enroll/enrollPicture/agreement.png';
import agreement2 from '../Enroll/enrollPicture/agreement2.png';
import agreement3 from '../Enroll/enrollPicture/agreement3.png';
import qualification from '../Enroll/enrollPicture/qualification.png';
import registration from '../Enroll/enrollPicture/registration.png';



const Freshmen = () => {
  const handleDownloadPDF = () => {
    const element = document.querySelector('.step');

    if (element) {
      const pdf = new jsPDF();
      const lineHeight = 12;
      const margin = 20; // Adjust the margin as needed
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      pdf.setFontSize(18);
      const headerText = 'Freshmen Student Enrollment Steps';
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
 

      pdf.save('Freshmen-Student.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='step'>
        <h4 className=''>STEPS TO FOLLOW:</h4><br></br>
        <p>Step 1: Go to the PUP iApply for PUPCET page (https://www.pup.edu.ph/iapply/pupcet) and read the information provided</p>
        <img className='screenshot' src={iapply} alt='Step-image1' />
        <p>Step 2: Scroll Down and Click "Apply Now". This will take you to PUP iApply</p>
        <img className='screenshot' src={applyNow} alt='Step-image2' />
        <img className='screenshot' src={applyNow2} alt='Step-image2' />
        <p>Step 3: Click "Register Here" to create your account</p>
        <img className='screenshot' src={register} alt='Step-image3' />
        <p>Step 4: Read the service agreement then scroll down and click the I have read... button then, on the next page, select PUPCET to begin creating an account</p>
        <img className='screenshot' src={agreement} alt='Step-image4' />
        <img className='screenshot' src={agreement2} alt='Step-image4' />
        <img className='screenshot' src={agreement3} alt='Step-image4' />
        <p>Step 5:  Answer the prequalification questions to determine if you qualify for PUPCET, then click Next</p>
        <img className='screenshot' src={qualification} alt='Step-image5' />
        <p>Step 6: Fill up the registration form. Type or select the required information in the form: </p>
        <img className='screenshot' src={registration} alt='Step-image6' />
        <p>Step 7: Click Submit to create your account and sign in again</p>
        <img className='screenshot' src={pylon} alt='Step-image7' />
        <p>Step 8: Upon successful signing in, you will be taken to the PUP iApply Applicant's page where you can have the following options:</p>
        <img className='screenshot' src={pylon} alt='Step-image8' />
        <p>Step 9: Application Form:</p>
        <p>Here you fill up, update, or complete your application form, Complete your online application by typing and selecting the required information in the form</p>
        <img className='screenshot' src={pylon} alt='Step-image9' />
        <p>Step 10:  Print ePermit. If your online application form is finalized, click this option to download your system-generated ePermit and print. This printed ePermit shall be presented on your scheduled examination date. Please allow six to twenty (6-20) working days after finalizing your application to download and print your ePermit.</p>
        <img className='screenshot' src={pylon} alt='Step-image10' />
        <p>Step 11: Due to large number of applications, again, please allow six to twenty (6-20) working days for photo/document validation. Then sign-in to your account to check whether your application is approved.Once approved, proceed to downloading and printing of ePermit.</p>
        <img className='screenshot' src={pylon} alt='Step-image11' />
        <p>Step 12: Check PUPCET Results. This link will appear only during official release of test results. Please regularly check announcement in PUP website on PUPCET results.</p>
        <img className='screenshot' src={pylon} alt='Step-image12' />
        <p>Step 13: Sign out. Always sign out from the PUP iApply after using it for security purpose. Use your email address and password to sign in to your account again.</p>
        <img className='screenshot' src={pylon} alt='Step-image13' />
      </div>

    <div className='download-button'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default Freshmen;
