# 🦷 Dental Centre Management Dashboard

An intuitive and role-based dental clinic management dashboard built with React, enabling both **Admins** and **Patients** to manage appointments, treatment history, and invoices effectively.

### 🚀 Live Demo
👉 [Click here to view the live app](https://dental-dashboard-git-main-akshayabomma1593s-projects.vercel.app)

---
🔐 Demo Login Credentials

Admin Login

email: admin@entnt.in

Password: admin@123


Patient Login

email: akshita@gmail.com

Password: patient@123

---

## 📌 Features

### 👩‍⚕️ Admin Dashboard
- View and manage  registered patients
- Add, edit, and delete patient incidents (appointments)
- Upload/view PDF invoices (base64 support)
- Dashboard KPIs: revenue, top patients, appointment stats
- Calendar view for appointments (monthly/weekly)

### 👨‍⚕️ Patient Dashboard
- View personal treatment history and upcoming appointments
- Download/view attached invoices files

### 🌗 Extras
- Dark/light mode toggle
- Responsive UI
- Context API-based state management
- LocalStorage-based persistent data (no backend)

---

## 🛠 Tech Stack

- **Frontend**: React.js (Functional Components, Hooks)
- **State Management**: Context API
- **Styling**: CSS Modules
- **Routing**: React Router
- **File Handling**: Base64 + Blob for PDF preview
- **Deployment**: Vercel

---

## 📦 Installation (for local dev)
git clone https://github.com/Akshayabomma1593/dental-dashboard.git
cd dental-dashboard
npm install
npm start

📁 Folder Structure
public/
  └── data/
      ├── patients_data.json
      └── incidents_data.json
      |___users.json

src/
├── context/
│   └── AppContext.js
├── pages/
│   ├── AdminDashboard.js
│   ├── PatientDashboard.js
│   ├── AdminIncidentManager.js
│   ├── PatientIncidentHistory.js
│   └── Login.js
├── utils/
│   └── pdfUtils.js

---

🧑‍💻 Author

Akshaya Bomm
🔗 GitHub:(https://github.com/Akshayabomma1593)
📧 Email: bommaakshaya@gmail.com

----

📜 License

This project is open source and free to use for learning and academic purposes
