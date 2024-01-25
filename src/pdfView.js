import React, { useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { searchPlugin } from '@react-pdf-viewer/search';

function PdfViewer({ file, onClose }) {
  useEffect(() => {
    // Dynamically load pdfjs library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/pdfjs-dist/build/pdf.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize the pdfjs library
      window.pdfjs = window.pdfjsLib;
    };
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      delete window.pdfjs;
    };
  }, []);

  const handleScroll = (e) => {
    // Handle scroll events for the PDF viewer
    console.log('Scroll event:', e);
  };

  return (
    <div onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
 <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={file} plugins={[zoomPlugin(), searchPlugin()]} />
      </Worker>
      <button onClick={onClose}>Close PDF Viewer</button>
    </div>
  );
}

export default PdfViewer;
