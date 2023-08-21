import './App.css';
import CandidateRegistrationForm from './Components/RegisterationForm';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateList from './Components/candidateList';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/NodeServerfileUploadFrontend' element={<CandidateRegistrationForm/>}></Route>
          <Route path='/candidates' element={<CandidateList/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
