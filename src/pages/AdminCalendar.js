import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { AppContext } from '../context/AppContext';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './AdminCalendar.css';

function AdminCalendar() {
  const { incidents, patients, theme, toggleTheme } = useContext(AppContext);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const handleDateClick = (date) => {
    const filtered = incidents.filter(i => {
      const parsed = new Date(i.appointmentDate);
      return (
        parsed.getFullYear() === date.getFullYear() &&
        parsed.getMonth() === date.getMonth() &&
        parsed.getDate() === date.getDate()
      );
    });
    setSelectedAppointments(filtered);
  };

  return (
    <div className={`admin-calendar-container ${theme}`}>
      <div className="calendar-header">
        <h2>Appointment Calendar</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <Calendar onClickDay={handleDateClick} className="custom-calendar" />

      <div className="appointments-list">
        <h3>Appointments on Selected Date</h3>
        <ul>
          {selectedAppointments.length > 0 ? (
            selectedAppointments.map((a, idx) => {
              const patient = patients.find(p => p.id === a.patientId);
              const parsedDate = new Date(a.appointmentDate);
              const displayDate = isNaN(parsedDate) ? 'Invalid Date' : format(parsedDate, 'PPpp');
              return (
                <li key={a.id || idx}>
                  {patient?.name || 'Unknown Patient'} - {displayDate} - {a.treatment}
                </li>
              );
            })
          ) : (
            <p>No appointments found for selected date.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminCalendar;