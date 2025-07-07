import React, { useContext, useState } from 'react';
import PatientIncidentHistory from './PatientIncidentHistory';
import { AppContext } from '../context/AppContext';
import './PatientDashboard.css';

function PatientDashboard() {
  const { theme, toggleTheme } = useContext(AppContext);
  const [patientName, setPatientName] = useState('');
  const loggedInPatientId = localStorage.getItem("loggedInPatientId");

  return (
    <div className={`patient-dashboard-container ${theme}`}>
      <div className="dashboard-header">
        <h1>
          Welcome to the Patient Dashboard,<br />
          <span>Dear {patientName ? `${patientName}` : ''}</span>
        </h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <PatientIncidentHistory
        patientId={loggedInPatientId}
        setPatientName={setPatientName}
      />
    </div>
  );
}

export default PatientDashboard;


