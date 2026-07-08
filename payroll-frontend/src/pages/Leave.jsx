import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import { useState } from "react";

function Leave() {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: "Brendan",
      department: "HR",
      from: "2026-07-10",
      to: "2026-07-12",
      status: "Pending",
    },
    {
      id: 2,
      name: "Emmanuel J",
      department: "Finance",
      from: "2026-07-15",
      to: "2026-07-16",
      status: "Approved",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newLeave, setNewLeave] = useState({
    name: "",
    department: "",
    from: "",
    to: "",
    status: "Pending",
  });
  const [editingId, setEditingId] = useState(null);

  const [editLeave, setEditLeave] = useState({
    name: "",
    department: "",
    from: "",
    to: "",
    status: "Pending",
  });

  const filteredLeaves = leaves.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const addLeave = () => {
    const leave = {
      name: newLeave.name.trim(),
      department: newLeave.department.trim(),
      from: newLeave.from.trim(),
      to: newLeave.to.trim(),
      status: newLeave.status,
    };

    if (Object.values(leave).some((value) => value === "")) {
      console.log("Leave state:", newLeave);
      alert("Please fill all fields.");
      return;
    }

    setLeaves([
      ...leaves,
      {
        id: Date.now(),
        ...leave,
      },
    ]);

    setNewLeave({
      name: "",
      department: "",
      from: "",
      to: "",
      status: "Pending",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (leave) => {
    setEditingId(leave.id);
    setEditLeave({
      name: leave.name,
      department: leave.department,
      from: leave.from,
      to: leave.to,
      status: leave.status,
    });
    setShowForm(true);
  };

  const updateLeave = () => {
    setLeaves(
      leaves.map((emp) =>
        emp.id === editingId ? { ...emp, ...editLeave } : emp
      )
    );

    setEditingId(null);
    setEditLeave({
      name: "",
      department: "",
      from: "",
      to: "",
      status: "Pending",
    });

    setShowForm(false);
  };

  const deleteLeave = (id) => {
    setLeaves(leaves.filter((emp) => emp.id !== id));
  };

  console.log("Render state:", { newLeave, editingId, showForm });
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "15px",
          }}
        >
          <h1>Leave Management</h1>

          <div
            style={{
              position: "relative",
              width: "350px",
            }}
          >
            <FaSearch
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
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
                fontSize: "15px",
              }}
            />
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setNewLeave({
                name: "",
                department: "",
                from: "",
                to: "",
                status: "Pending",
              });
              setShowForm(true);
            }}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            <FaUserPlus style={{ marginRight: "8px" }} />
            Apply Leave
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
          <thead
            style={{
              background: "#334155",
              color: "white",
            }}
          >
            <tr>
              <th style={cell}>ID</th>
              <th style={cell}>Employee</th>
              <th style={cell}>Department</th>
              <th style={cell}>From</th>
              <th style={cell}>To</th>
              <th style={cell}>Status</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((emp) => (
              <tr key={emp.id}>
                <td style={cell}>{emp.id}</td>
                <td style={cell}>{emp.name}</td>
                <td style={cell}>{emp.department}</td>
                <td style={cell}>{emp.from}</td>
                <td style={cell}>{emp.to}</td>
                <td style={cell}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor:
                        emp.status === "Pending"
                          ? "#f59e0b"
                          : emp.status === "Approved"
                          ? "#10b981"
                          : "#ef4444",
                      display: "inline-block",
                      minWidth: "70px",
                      textAlign: "center",
                    }}
                  >
                    {emp.status}
                  </span>
                </td>

                <td style={cell}>
                  <button
                    style={editBtn}
                    onClick={() => startEdit(emp)}
                  >
                    <FaEdit style={{ marginRight: "6px" }} />
                    Edit
                  </button>

                  <button
                    style={deleteBtn}
                    onClick={() => deleteLeave(emp.id)}
                  >
                    <FaTrash style={{ marginRight: "6px" }} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "420px",
            }}
          >
            <h2>{editingId ? "Edit Leave" : "Apply Leave"}</h2>

            <input
              style={inputStyle}
              placeholder="Employee Name"
              value={editingId ? editLeave.name : newLeave.name}
              onChange={(e) =>
                editingId
                  ? setEditLeave({
                      ...editLeave,
                      name: e.target.value,
                    })
                  : setNewLeave({
                      ...newLeave,
                      name: e.target.value,
                    })
              }
            />

            <input
              style={inputStyle}
              placeholder="Department"
              value={editingId ? editLeave.department : newLeave.department}
              onChange={(e) =>
                editingId
                  ? setEditLeave({ ...editLeave, department: e.target.value })
                  : setNewLeave({ ...newLeave, department: e.target.value })
              }
            />

            <label style={{ marginTop: "12px", display: "block", fontWeight: "bold" }}>
              From Date
            </label>
            <input
              type="date"
              style={inputStyle}
              value={editingId ? editLeave.from : newLeave.from}
              onChange={(e) =>
                editingId
                  ? setEditLeave({ ...editLeave, from: e.target.value })
                  : setNewLeave({ ...newLeave, from: e.target.value })
              }
            />

            <label style={{ marginTop: "12px", display: "block", fontWeight: "bold" }}>
              To Date
            </label>
            <input
              type="date"
              style={inputStyle}
              value={editingId ? editLeave.to : newLeave.to}
              onChange={(e) =>
                editingId
                  ? setEditLeave({ ...editLeave, to: e.target.value })
                  : setNewLeave({ ...newLeave, to: e.target.value })
              }
            />

            <label style={{ marginTop: "12px", display: "block", fontWeight: "bold" }}>
              Status
            </label>
            <select
              style={{ ...inputStyle, padding: "10px" }}
              value={editingId ? editLeave.status : newLeave.status}
              onChange={(e) =>
                editingId
                  ? setEditLeave({ ...editLeave, status: e.target.value })
                  : setNewLeave({ ...newLeave, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                style={deleteBtn}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setNewLeave({
                    name: "",
                    department: "",
                    from: "",
                    to: "",
                    status: "Pending",
                  });
                }}
              >
                Cancel
              </button>

              <button
                style={editBtn}
                onClick={() => {
                  if (editingId) {
                    updateLeave();
                  } else {
                    addLeave();
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const cell = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const editBtn = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "8px 14px",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default Leave;