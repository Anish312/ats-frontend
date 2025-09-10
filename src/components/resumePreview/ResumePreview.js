import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./ResumePreview.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function ResumePreview({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="resumePreview-content-card">
      <h3>📄 Resume Preview</h3>
      {file ? (
        <>
          <Document
            className="resumePreview-react-pdf__Document"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page className="resumePreview-react-pdf__Page" pageNumber={pageNumber} />
          </Document>
          <div className="resumePreview-controls">
            <button
                className="resumePreview-button"
                onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                disabled={pageNumber <= 1}
            >
                Previous
            </button>
            <span className="resumePreview-span">
                Page {pageNumber} of {numPages}
            </span>
            <button
                className="resumePreview-button"
                onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                disabled={pageNumber >= numPages}
            >
                Next
            </button>
        </div>

        </>
      ) : (
        <p>No resume uploaded</p>
      )}
    </div>
  );
}

export default ResumePreview;
