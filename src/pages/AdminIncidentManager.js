import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { openBase64PDF } from '../utils/pdfUtils';
import './AdminIncidentManager.css';

function AdminIncidentManager() {
  const {
    incidents,
    patients,
    updateIncident,
    deleteIncident,
    addIncident,
    theme,
    toggleTheme
  } = useContext(AppContext);

  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Pending',
    file: ''
  });

  useEffect(() => {
    if (selectedPatientId) {
      const filtered = incidents.filter(incident => incident.patientId === selectedPatientId);
      setFilteredIncidents(filtered);
    } else {
      setFilteredIncidents([]);
    }
  }, [selectedPatientId, incidents]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setNewIncident(prev => ({ ...prev, file: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddIncident = () => {
    const id = `i${Date.now()}`;
    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) return;

    const incidentToAdd = {
      ...newIncident,
      id,
      patientId: selectedPatientId,
      name: patient.name
    };

    addIncident(incidentToAdd);
    setNewIncident({
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: 'Pending',
      file: ''
    });
  };

  return (
    <div className={`incident-manager-container ${theme}`}>
      <div className="header">
        <h2>Admin Incident Manager</h2>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          Toggle {theme === 'light' ? '🌙 Dark Mode' : '☀️Light Mode'}
        </button>
      </div>

      <select onChange={(e) => setSelectedPatientId(e.target.value)} value={selectedPatientId}>
        <option value="">-- Select Patient --</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      {selectedPatientId && (
        <div className="add-incident-form">
          <h3>Add New Incident</h3>
          <input
            type="text"
            placeholder="Title"
            value={newIncident.title}
            onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newIncident.description}
            onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comments"
            value={newIncident.comments}
            onChange={(e) => setNewIncident({ ...newIncident, comments: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newIncident.appointmentDate}
            onChange={(e) => setNewIncident({ ...newIncident, appointmentDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cost"
            value={newIncident.cost}
            onChange={(e) => setNewIncident({ ...newIncident, cost: e.target.value })}
          />
          <input
            type="text"
            placeholder="Treatment"
            value={newIncident.treatment}
            onChange={(e) => setNewIncident({ ...newIncident, treatment: e.target.value })}
          />
          <select
            value={newIncident.status}
            onChange={(e) => setNewIncident({ ...newIncident, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button onClick={handleAddIncident}>Add Incident</button>
        </div>
      )}

      {filteredIncidents.map((incident) => (
        <div key={incident.id} className="incident-card">
          <h4>{incident.title} - {incident.treatment}</h4>
          <p><strong>Cost:</strong> ₹{incident.cost} | <strong>Comments:</strong> {incident.comments}</p>
          <p><strong>Date:</strong> {incident.appointmentDate}</p>
          <p><strong>Status:</strong> {incident.status}</p>
          <p><strong>Next Appointment:</strong> {incident.nextAppointmentDate}</p>

          {incident.file && (
            <button className="incident-file-link" onClick={() => openBase64PDF(incident.file)}>
              View File
            </button>
          )}

          <div className="incident-actions">
            <button onClick={() => updateIncident(incident.id)}>Edit</button>
            <button onClick={() => deleteIncident(incident.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminIncidentManager; 