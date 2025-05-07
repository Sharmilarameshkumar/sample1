import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientFormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRecord = () => {
    navigate('/record', {
      state: {
        name,
        email
      }
    });
  };

  return (
    <header className="hero">
      <div className="form-box">
        <h2>Enter Details</h2>

        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="record-btn" onClick={handleRecord}>
          Record
        </button>
      </div>
    </header>
  );
}

export default PatientFormPage;
