import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/patient-form');
  };

  return (
    <header className="hero">
      <div className="hero-content">
        <h1>Welcome to Smart Prescription</h1>
        <p>Your digital gateway to smarter healthcare</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </header>
  );
}

export default HomePage;
