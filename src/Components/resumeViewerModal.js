import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import '../Stylesheets/candidateDetails.css'; // Import your custom styles for the modal

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CandidateDetails(props) {
  const [numPages, setNumPages] = useState(null); // Add numPages state

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="pdf-container">
          {props.pdfUrl && (
            <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} className="pdf-page" renderTextLayer={false} />
              ))}
            </Document>
          )}
        </div>
        <div>
        <a href={props.pdfUrl} download>
          <button className='btn btn-success'>Download</button>
        </a>
        <button className='btn btn-danger' onClick={() => props.setOpenModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
