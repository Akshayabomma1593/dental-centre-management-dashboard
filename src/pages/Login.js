import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // 'Admin' or 'Patient'
  const [darkMode, setDarkMode] = useState(false); // Theme toggle
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("/data/users.json");
      const users = await res.json();
      const user = users.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (role === "Admin") {
          alert("✅ Logged in as Admin");
          navigate("/admin/dashboard");
        } else if (role === "Patient") {
          localStorage.setItem("loggedInPatientId", user.patientId);
          localStorage.setItem("loggedInPatientName", user.name);
          alert("✅ Logged in as Patient");
          navigate("/patient/dashboard");
        }
      } else {
        alert("❌ Invalid credentials or role mismatch");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const theme = {
    background: darkMode ? "#121212" : "#f5f5f5",
    cardBg: darkMode ? "#1e1e1e" : "#ffffff",
    text: darkMode ? "#ffffff" : "#000000",
    inputBg: darkMode ? "#2c2c2c" : "#ffffff",
    inputBorder: darkMode ? "#444" : "#ccc",
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.background, color: theme.text }}>
      <div style={{ ...styles.card, backgroundColor: theme.cardBg, color: theme.text }}>
        <h2 style={styles.title}>Welcome to ENTNT Dental Center</h2>

        {/* Theme Toggle */}
        <div style={styles.themeToggle}>
          <label style={{ marginRight: "10px" }}>🌗 Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        {!role && (
          <div style={styles.buttonGroup}>
            <button style={styles.roleButton} onClick={() => setRole("Admin")}>
              👨‍⚕️Login as Admin
            </button>
            <button style={styles.roleButton} onClick={() => setRole("Patient")}>
              🧑‍💼Login as Patient
            </button>
          </div>
        )}

        {role && (
          <div style={styles.form}>
            <h3 style={{ marginBottom: "10px" }}>{role} Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              style={{ ...styles.input, backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              style={{ ...styles.input, backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.loginButton} onClick={handleLogin}>
              🔐 Login
            </button>
            <button style={styles.backButton} onClick={() => setRole("")}>
              🔙 Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease-in-out",
  },
  card: {
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "400px",
    transition: "all 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  themeToggle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  roleButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#2E86C1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid",
    borderRadius: "5px",
    outline: "none",
  },
  loginButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  backButton: {
    padding: "8px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Login;