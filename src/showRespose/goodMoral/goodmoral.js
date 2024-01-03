import React from 'react';
import '../showResponse.css';
import { jsPDF } from 'jspdf';



const goodmoral = () => {

  window.scrollTo(0, 0);

  const handleDownloadPDF = () => {
    const element = document.querySelector('.step');

    if (element) {
      const pdf = new jsPDF();
      const lineHeight = 12;
      const margin = 20; // Adjust the margin as needed
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      pdf.setFontSize(18);
      const headerText = 'Regular Student Enrollment Steps';
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
 

      pdf.save('RegularStudent.pdf');
    } else {
      console.error('Element with class "step" not found');
    }
  };
  return (
    <div>
      <div className='step'>
        <p className=''>HOW TO REQUEST FOR GOOD MORAL CERTIFICATE</p>
        <p>1.Secure a form from Office of the Student Services accordingly (Form PUP-ACGM-5-OFSS-0007).<br/>
           2.Present Registration card or ID for currently enrolled student and Alumni ID or TOR with picture for graduate.<br/>
           3.Pay appropriate fee at the Cashier Office. <br/>
           4.Proceed to the Head of Student Affairs and Services for the processing and issuance of the certificate.<br/>
        </p>
      </div>

    <div className='download-button'>
        <button onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
    </div>
  );
};

export default goodmoral;
