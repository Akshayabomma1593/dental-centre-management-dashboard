import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminPatients from './pages/AdminPatients';
import AdminIncidentManager from './pages/AdminIncidentManager';
import AdminCalendar from './pages/AdminCalendar';
import PatientDashboard from './pages/PatientDashboard';
import PatientIncidentHistory from './pages/PatientIncidentHistory';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
  const loadData = async()=>{
    const existingPatients = JSON.parse(localStorage.getItem("patients"));
    const existingIncidents = JSON.parse(localStorage.getItem("incidents"));
    if(!existingPatients || existingPatients.length===0){
      const res = await fetch('/data/patients_data.json');
      const demoPatients = await res.json();
      localStorage.setItem("patients", JSON.stringify(demoPatients));
    }
    if(!existingIncidents || existingIncidents.length===0){
      const res = await fetch('/data/incidents_data.json');
      const demoIncidents =  await res.json();
      localStorage.setItem("incidents", JSON.stringify(demoIncidents));
    }
  };
  loadData();
}, []);
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<AdminPatients />} />
          <Route path="/admin/incidents" element={<AdminIncidentManager />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/incidents" element={<PatientIncidentHistory />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;