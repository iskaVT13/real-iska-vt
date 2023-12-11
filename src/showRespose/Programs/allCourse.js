import React from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';


const Bachelor = () => {
  const handleDownloadPDF = () => {
    const element = document.querySelector('.step');

    if (element) {
      const pdf = new jsPDF();
      const lineHeight = 12;
      const margin = 20; // Adjust the margin as needed
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      pdf.setFontSize(18);
      const headerText = 'Bachelor of Science Courses';
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
 

      pdf.save('BS Courses.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='step'>
        <h4 className=''>COURSES OFFER AT PUP LOPEZ</h4><br/>
        <h5>BACHELOR COURSES</h5>
        <p>
        Bachelor of Elementery Education (BEED)<br/>
        Bachelor in Public Administration (BPA)<br/>
        Bachelor in Public Adminsitration Major in Fiscal Adminstration (BPA -FA)<br/>
        Bachelor of Science in Accountancy (BSA)<br/>
        Bachelor of Science in Agri-Business Management (BSAM)<br/>
        Bachelor of Science in Business Administration Major in Financial Management (BSBS-FM)<br/>
        Bachelor of Science in Business Administration Major in Marketing Management (BSBA-MM)<br/>
        Bachelor of Science in Biology (BSBIO)<br/>
        Bachelor of Science in Civil Engineering (BSCE)<br/>
        Bachelor of Science in Electrical Engineering (BSEE)<br/>
        Bachelor of Secondary Education (BSEDMT)<br/>
        Bachelor of Science in Hospitality Management (BSHM)<br/>
        Bachelor of Science in Information Technology (BSIT)<br/>
        Bachelor of Science in Nutrition and Dietics (BSND)<br/>
        Bachelor of Science in Office Administration Major in Legal Office Administration (BSOA- LOA)<br/>
        </p>
        <h5>DIPLOMA COURSES</h5>
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

export default Bachelor;
