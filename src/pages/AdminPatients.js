import React, { useState, useEffect, useContext } from 'react';
import './AdminPatients.css';
import { AppContext } from '../context/AppContext';

function AdminPatients() {
  const { theme, toggleTheme } = useContext(AppContext);

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: '',
  });

  const [editPatientId, setEditPatientId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.dob) {
      alert('Name and DOB are required');
      return;
    }

    const newEntry = {
      id: `p${patients.length + 1}`,
      ...newPatient,
    };

    const updatedPatients = [...patients, newEntry];
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
    setNewPatient({ name: '', dob: '', contact: '', healthInfo: '' });
  };

  const handleEditPatient = (patient) => {
    setNewPatient({
      name: patient.name,
      dob: patient.dob,
      contact: patient.contact,
      healthInfo: patient.healthInfo,
    });
    setEditPatientId(patient.id);
    setEditMode(true);
  };

  const handleUpdatePatient = () => {
    const updatedPatients = patients.map((p) =>
      p.id === editPatientId ? { ...p, ...newPatient } : p
    );
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
    setNewPatient({ name: '', dob: '', contact: '', healthInfo: '' });
    setEditMode(false);
    setEditPatientId(null);
  };

  const handleDelete = (id) => {
    const updatedPatients = patients.filter((p) => p.id !== id);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
  };

  return (
    <div className={`admin-patients-container ${theme}`}>
      <div className="header">
        <h2>Manage Patients</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="form-section">
        <h3>{editMode ? 'Edit Patient' : 'Add New Patient'}</h3>
        <input name="name" placeholder="Name" value={newPatient.name} onChange={handleChange} />
        <input name="dob" type="date" value={newPatient.dob} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={newPatient.contact} onChange={handleChange} />
        <input name="healthInfo" placeholder="Health Info" value={newPatient.healthInfo} onChange={handleChange} />
        <button onClick={editMode ? handleUpdatePatient : handleAddPatient}>
          {editMode ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>

      <h3>Existing Patients</h3>
      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id}>
            <strong>{patient.name}</strong> (DOB: {patient.dob} - {patient.contact})<br />
            Health Info: {patient.healthInfo}
            <br />
            <button onClick={() => handleEditPatient(patient)}>Edit</button>
            <button onClick={() => handleDelete(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPatients;