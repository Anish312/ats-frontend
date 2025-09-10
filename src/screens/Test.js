import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const Test = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [textContent, setTextContent] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const skillsToHighlight = ["nodejs", "reactjs","Deployed" ];

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPageNumber(1);
      extractTextFromPDF(selectedFile);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const extractTextFromPDF = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + ' ';
    }
    
    setTextContent(fullText);
    highlightSkills(fullText);
  };

  const highlightSkills = (text) => {
    // Create a case-insensitive regex pattern for the skills
    const pattern = new RegExp(skillsToHighlight.join('|'), 'gi');
    
    // Replace matches with highlighted version
    const highlighted = text.replace(pattern, match => {
      return `<mark class="highlight">${match}</mark>`;
    });
    
    setHighlightedText(highlighted);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Resume Skills Highlighter</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          style={{ marginBottom: '10px' }}
        />
      </div>

      {file && (
        <div>
          <div style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                style={{ marginRight: '10px' }}
              >
                Previous
              </button>
              <span>Page {pageNumber} of {numPages}</span>
              <button 
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                style={{ marginLeft: '10px' }}
              >
                Next
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2>Extracted Text with Highlighted Skills</h2>
            <div 
              className="text-container"
              style={{ 
                border: '1px solid #ccc', 
                padding: '15px', 
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
                whiteSpace: 'pre-wrap'
              }}
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>
        </div>
      )}
      
      <style>
        {`
          .highlight {
            background-color: yellow;
            font-weight: bold;
            padding: 2px 4px;
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
};

export default Test;