// CandidateProfilePicture.js
import React from 'react';
import '../Stylesheets/candidateProfilePicture.css'; // Import your custom styles for the modal

function CandidateProfilePicture(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="profile-pic-container">
          <img
            src={props.profilePicUrl}
            alt="Profile Picture"
            className="profile-pic"
          />
        </div>
        <button className='btn btn-danger' onClick={() => props.setOpenModal(false)}>Close</button>
      </div>
    </div>
  );
}

export default CandidateProfilePicture;
