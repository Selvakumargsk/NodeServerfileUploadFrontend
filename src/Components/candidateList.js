// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../Stylesheets/candidateList.css'; // Import the stylesheet
// import { useNavigate } from 'react-router-dom';
// import CandidateDetails from './resumeViewerModal';

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const Navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/candidates')
//       .then((response) => {
//         setCandidates(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching candidates:', error);
//       });
//   }, []);

//   return (
//     <div className='candidatesPage'>
//       <div className="candidate-list">
//         <h2>Candidate List</h2>
//         {candidates.length !== 0 ? (
//           <ul>
//             {candidates.map((candidate) => (
//               <li key={candidate.id} className="candidate-item">
//                 <div>
//                   {candidate.firstName} {candidate.lastName} ({candidate.email})
//                 </div>
//                 <img
//                   className='mx-2'
//                   src={`http://localhost:8080/uploads/profilePic/${candidate.profilePicture}`}
//                   alt={`Profile of ${candidate.firstName} ${candidate.lastName}`}
//                   onClick={() => {}}
//                 />
//                 <button
//                   className='mx-2'
//                   onClick={() => {
//                     setOpenModal(true);
//                     setPdfUrl(`http://localhost:8080/uploads/resume/${candidate.resume}`);
//                   }}
//                 >
//                   View Resume
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>There are no candidates available</div>
//         )}
//       </div>
//       {openModal && (
//         <CandidateDetails setOpenModal={setOpenModal} pdfUrl={pdfUrl} />
//       )}
//     </div>
//   );
// };

// export default CandidateList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylesheets/candidateList.css';
import { useNavigate } from 'react-router-dom';
import CandidateDetails from './resumeViewerModal';
import CandidateProfilePicture from './CandidateProfilePic';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [openProfilePicModal, setOpenProfilePicModal] = useState(false); // New state for the profile picture modal
  const [selectedProfilePicUrl, setSelectedProfilePicUrl] = useState(''); // New state for the selected profile picture URL
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/candidates')
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  return (
    <div className='candidatesPage'>
      <div className="candidate-list">
        <h2>Candidate List</h2>
        {candidates.length !== 0 ? (
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id} className="candidate-item">
                <div>
                  {candidate.firstName} {candidate.lastName} ({candidate.email})
                </div>
                <img
                  className='mx-2'
                  src={`http://localhost:8080/uploads/profilePic/${candidate.profilePicture}`}
                  alt={`Profile of ${candidate.firstName} ${candidate.lastName}`}
                  onClick={() => {
                    setSelectedProfilePicUrl(`http://localhost:8080/uploads/profilePic/${candidate.profilePicture}`);
                    setOpenProfilePicModal(true);
                  }}
                />
                <button
                  className='mx-2'
                  onClick={() => {
                    setOpenModal(true);
                    setPdfUrl(`http://localhost:8080/uploads/resume/${candidate.resume}`);
                    setNumPages(candidate.numPages);
                  }}
                >
                  View Resume
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>There are no candidates available</div>
        )}
      </div>
      {openModal && (
        <CandidateDetails setOpenModal={setOpenModal} pdfUrl={pdfUrl} numPages={numPages} />
      )}
      {openProfilePicModal && (
        <CandidateProfilePicture setOpenModal={setOpenProfilePicModal} profilePicUrl={selectedProfilePicUrl} />
      )}
    </div>
  );
};

export default CandidateList;
