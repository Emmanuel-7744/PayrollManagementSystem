import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Salary from "./pages/salary";
import Payslip from "./pages/Payslip";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
  !!localStorage.getItem("token")
);

  const login = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.access_token);

      setLoggedIn(true);

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
  <>
    {loggedIn ? (
      <>
        

        <BrowserRouter>
  <Navbar />

  <div style={{ display: "flex" }}>
    <Sidebar />

    <div style={{ flex: 1, padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/payslip" element={<Payslip />} />
      </Routes>
    </div>
  </div>
</BrowserRouter>
      </>
    ) : (
      <div className="container">
        <div className="login-card">
          <h1>Payroll Management System</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>
            Login
          </button>
        </div>
      </div>
    )}
  </>
);  
}
export default App;