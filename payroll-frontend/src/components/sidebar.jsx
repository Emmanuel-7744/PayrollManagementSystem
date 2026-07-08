import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#2c3e50",
        color: "white",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={linkStyle}>Dashboard</Link></li>
        <li><Link to="/employees" style={linkStyle}>Employees</Link></li>
        <li><Link to="/attendance" style={linkStyle}>Attendance</Link></li>
        <li><Link to="/leave" style={linkStyle}>Leave</Link></li>
        <li><Link to="/salary" style={linkStyle}>Salary</Link></li>
        <li><Link to="/payslip" style={linkStyle}>Payslip</Link></li>
      </ul>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "15px 20px",
};

export default Sidebar;