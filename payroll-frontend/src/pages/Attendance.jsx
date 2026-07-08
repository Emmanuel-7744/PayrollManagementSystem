import { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Attendance() {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "Brendan",
      department: "HR",
      date: "2026-07-08",
      status: "Present",
    },
    {
      id: 2,
      name: "Emmanuel J",
      department: "Finance",
      date: "2026-07-08",
      status: "Leave",
    },
    {
      id: 3,
      name: "Karthik",
      department: "IT",
      date: "2026-07-08",
      status: "Absent",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredAttendance = attendance.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteAttendance = (id) => {
    setAttendance(attendance.filter((emp) => emp.id !== id));
  };

  const badgeStyle = (status) => ({
    background:
      status === "Present"
        ? "#10b981"
        : status === "Leave"
        ? "#f59e0b"
        : "#ef4444",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    display: "inline-block",
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <h1>Attendance Management</h1>

        <div style={{ position: "relative", width: "320px" }}>
          <FaSearch
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#777",
            }}
          />

          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 12px 12px 40px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button style={primaryBtn}>
          <FaCalendarAlt style={{ marginRight: "8px" }} />
          Mark Attendance
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ background: "#334155", color: "white" }}>
          <tr>
            <th style={cell}>ID</th>
            <th style={cell}>Employee</th>
            <th style={cell}>Department</th>
            <th style={cell}>Date</th>
            <th style={cell}>Status</th>
            <th style={cell}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendance.map((emp) => (
            <tr key={emp.id}>
              <td style={cell}>{emp.id}</td>
              <td style={cell}>{emp.name}</td>
              <td style={cell}>{emp.department}</td>
              <td style={cell}>{emp.date}</td>
              <td style={cell}>
                <span style={badgeStyle(emp.status)}>{emp.status}</span>
              </td>
              <td style={cell}>
                <button style={editBtn}>
                  <FaEdit /> Edit
                </button>
                <button
                  style={deleteBtn}
                  onClick={() => deleteAttendance(emp.id)}
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const editBtn = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "8px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Attendance;