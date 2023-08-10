import React, { } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../Stylesheets/CandidateRegistrationForm.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(3),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  profilePicture: yup.mixed().required('Profile picture is required'),
  resume: yup.mixed().required('Resume is required'),
});

const CandidateRegistrationForm = () => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: null,
      resume: null,
    },
    validationSchema,
    onSubmit: async(values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('profilePicture', values.profilePicture);
        formData.append('resume', values.resume);

        console.log(formData);
    
        const response = await axios.post('http://localhost:8080/candidateRegister', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response.data); // Response data from the server
        Navigate('/candidates')
      } catch (error) {
        console.error('Error occurred:', error);
      }
    },
  });
  

  return (
    <div className='regForm'>
      <h1>Candidate Registration Form</h1>
      <form encType="multipart/form-data" autoComplete='off' onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange}  />
        {formik.touched.firstName && formik.errors.firstName ? <div className='text-danger text-center'>{formik.errors.firstName}</div> : null}

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange}  />
        {formik.touched.lastName && formik.errors.lastName ? <div className='text-danger text-center'>{formik.errors.lastName}</div> : null}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}  />
        {formik.touched.email && formik.errors.email ? <div className='text-danger text-center'>{formik.errors.email}</div> : null}

        {/* ... similar for other fields ... */}

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={(event) => formik.setFieldValue('profilePicture', event.currentTarget.files[0])}  />
        {formik.touched.profilePicture && formik.errors.profilePicture ? <div className='text-danger text-center'>{formik.errors.profilePicture}</div> : null}

        <label htmlFor="resume">Resume:</label>
        <input type="file" id="resume" name="resume"  accept=".pdf,.doc,.docx" onChange={(event) => formik.setFieldValue('resume', event.currentTarget.files[0])}  />
        {formik.touched.resume && formik.errors.resume ? <div className='text-danger text-center'>{formik.errors.resume}</div> : null}
        <button className='submitButton' type='submit'>Submit here</button>
</form>
    </div>
  );
};

export default CandidateRegistrationForm;
