import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { patients, incidents, theme, toggleTheme } = useContext(AppContext);
  const navigate = useNavigate();
  const [topPatients, setTopPatients] = useState([]);
  const [nextAppointments, setNextAppointments] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (!patients || !incidents) return;

    const appointmentCountMap = {};
    let pending = 0;
    let completed = 0;
    let revenue = 0;
    const upcomingAppointments = [];
    const today = new Date();

    incidents.forEach((incident) => {
      if (incident.patientId) {
        appointmentCountMap[incident.patientId] =
          (appointmentCountMap[incident.patientId] || 0) + 1;

        if (incident.status === "Pending") pending++;
        if (incident.status === "Completed") {
          completed++;
          revenue += parseFloat(incident.cost || 0);
        }

        const appointmentDate = new Date(incident.appointmentDate);
        if (appointmentDate >= today) {
          upcomingAppointments.push(incident);
        }
      }
    });

    const ranked = patients
      .map((p) => ({
        ...p,
        appointmentCount: appointmentCountMap[p.id] || 0,
      }))
      .sort((a, b) => b.appointmentCount - a.appointmentCount)
      .slice(0, 5);

    const sortedAppointments = upcomingAppointments
      .sort(
        (a, b) =>
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
      )
      .slice(0, 10);

    setTopPatients(ranked);
    setNextAppointments(sortedAppointments);
    setPendingCount(pending);
    setCompletedCount(completed);
    setTotalRevenue(revenue);
  }, [patients, incidents]);

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="dashboard-header">
        <h2>Welcome to the Admin Dashboard</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/admin/patients")}>🧑‍⚕️ Manage Patients</button>
        <button onClick={() => navigate("/admin/incidents")}>📝 Manage Incidents</button>
        <button onClick={() => navigate("/admin/calendar")}>📅 View Calendar</button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>📅 Next 10 Appointments</h3>
          <ul>
            {nextAppointments.map((a, i) => {
              const patient = patients.find((p) => p.id === a.patientId);
              return (
                <li key={a.id || i}>
                  📌 {new Date(a.appointmentDate).toLocaleString()} –{" "}
                  {patient ? patient.name : "Unknown"} ({a.treatment})
                </li>
              );
            })}
          </ul>
        </div>

        <div className="kpi-card">
          <h3>📌 Treatment Status</h3>
          <p className="pending">⏳ Pending: {pendingCount}</p>
          <p className="completed">✅ Completed: {completedCount}</p>
        </div>

        <div className="kpi-card">
          <h3>💰 Total Revenue</h3>
          <p className="revenue">₹{totalRevenue.toFixed(2)}</p>
        </div>

        <div className="kpi-card">
          <h3>🏆 Top 5 Patients</h3>
          <ol>
            {topPatients.map((p) => (
              <li key={p.id}>
                {p.name} – <span className="badge">{p.appointmentCount} Appointments</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;