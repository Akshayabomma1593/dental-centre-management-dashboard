import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { openBase64PDF } from "../utils/pdfUtils"; // 👈 Import the utility
import "./PatientIncidentHistory.css";

function PatientIncidentHistory({ patientId, setPatientName }) {
  const [incidents, setIncidents] = useState([]);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    fetch("/data/incidents_data.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((incident) => incident.patientId === patientId);
        setIncidents(filtered);
        if (filtered.length > 0) {
          setPatientName(filtered[0].name);
        }
      })
      .catch((err) => console.error("🚨 Error loading patient incidents:", err));
  }, [patientId, setPatientName]);

  return (
    <div className={`incident-history-container ${theme}`}>
      <h2>Your Appointment History</h2>
      {incidents.length === 0 ? (
        <p className="no-records">No records found.</p>
      ) : (
        <div className="incident-card-list">
          {incidents.map((incident) => (
            <div className="incident-card" key={incident.id}>
              <h3>{incident.title}</h3>
              <p><strong>Date & Time:</strong> {incident.appointmentDate}</p>
              <p><strong>Treatment:</strong> {incident.treatment}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              <p><strong>Cost:</strong> ₹{incident.cost}</p>
              <p><strong>File:</strong> 
                {incident.file ? (
                  <button
                    className="file-link"
                    onClick={() => openBase64PDF(incident.file)}
                  >
                    View File
                  </button>
                ) : (
                  <span> No file attached</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientIncidentHistory;