// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import PatientFormPage from './PatientFormPage';
import LiveTranscription from './LiveTranscription';
import DrugExtractor from './DrugExtractor';
import TableView from './TableView'; // ✅ Newly added TableView

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">Smart Prescription</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/records">Records</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-form" element={<PatientFormPage />} />
          <Route path="/record" element={<LiveTranscription />} />
          <Route path="/drug-extractor" element={<DrugExtractor />} />
          <Route path="/table-view" element={<TableView />} /> {/* ✅ New route added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
