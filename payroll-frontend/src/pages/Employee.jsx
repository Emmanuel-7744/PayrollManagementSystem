import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import { useState } from "react";

function Employee() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Brendan",
      department: "HR",
      position: "Manager",
      salary: "₹50,000",
    },
    {
      id: 2,
      name: "Emmanuel J",
      department: "Finance",
      position: "Accountant",
      salary: "₹459,000",
    },
    {
      id: 3,
      name: "Karthik",
      department: "IT",
      position: "Developer",
      salary: "₹700,000",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    position: "",
    salary: "",
  });
  const [editingId, setEditingId] = useState(null);

const [editEmployee, setEditEmployee] = useState({
  name: "",
  department: "",
  position: "",
  salary: "",
});

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const addEmployee = () => {
    const employee = {
      name: newEmployee.name.trim(),
      department: newEmployee.department.trim(),
      position: newEmployee.position.trim(),
      salary: newEmployee.salary.trim(),
    };

    if (Object.values(employee).some((value) => value === "")) {
      console.log("Employee state:", newEmployee);
      alert("Please fill all fields.");
      return;
    }

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        ...employee,
      },
    ]);

    setNewEmployee({
      name: "",
      department: "",
      position: "",
      salary: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

const startEdit = (employee) => {
  setEditingId(employee.id);
  setEditEmployee({
    name: employee.name,
    department: employee.department,
    position: employee.position,
    salary: employee.salary,
  });
  setShowForm(true);
};

const updateEmployee = () => {
  setEmployees(
    employees.map((emp) =>
      emp.id === editingId ? { ...emp, ...editEmployee } : emp
    )
  );

  setEditingId(null);
  setEditEmployee({
    name: "",
    department: "",
    position: "",
    salary: "",
  });

  setShowForm(false);
};

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  console.log("Render state:", { newEmployee, editingId, showForm });
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
          <h1>Employee Management</h1>

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
              setNewEmployee({
                name: "",
                department: "",
                position: "",
                salary: "",
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
            Add Employee
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
              <th style={cell}>Name</th>
              <th style={cell}>Department</th>
              <th style={cell}>Position</th>
              <th style={cell}>Salary</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td style={cell}>{emp.id}</td>
                <td style={cell}>{emp.name}</td>
                <td style={cell}>{emp.department}</td>
                <td style={cell}>{emp.position}</td>
                <td style={cell}>{emp.salary}</td>

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
                    onClick={() => deleteEmployee(emp.id)}
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
            <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

            <input
  style={inputStyle}
  placeholder="Employee Name"
  value={editingId ? editEmployee.name : newEmployee.name}
  onChange={(e) =>
    editingId
      ? setEditEmployee({
          ...editEmployee,
          name: e.target.value,
        })
      : setNewEmployee({
          ...newEmployee,
          name: e.target.value,
        })
  }
/>

            <input
  style={inputStyle}
  placeholder="Department"
  value={editingId ? editEmployee.department : newEmployee.department}
  onChange={(e) =>
    editingId
      ? setEditEmployee({ ...editEmployee, department: e.target.value })
      : setNewEmployee({ ...newEmployee, department: e.target.value })
  }
/>

            <input
  style={inputStyle}
  placeholder="Position"
  value={editingId ? editEmployee.position : newEmployee.position}
  onChange={(e) =>
    editingId
      ? setEditEmployee({ ...editEmployee, position: e.target.value })
      : setNewEmployee({ ...newEmployee, position: e.target.value })
  }
/>

            <input
  style={inputStyle}
  placeholder="Salary"
  value={editingId ? editEmployee.salary : newEmployee.salary}
  onChange={(e) =>
    editingId
      ? setEditEmployee({ ...editEmployee, salary: e.target.value })
      : setNewEmployee({ ...newEmployee, salary: e.target.value })
  }
/>

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
                  setNewEmployee({
                    name: "",
                    department: "",
                    position: "",
                    salary: "",
                  });
                }}
              >
                Cancel
              </button>

              <button
                style={editBtn}
                onClick={() => {
                  if (editingId) {
                    updateEmployee();
                  } else {
                    addEmployee();
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

export default Employee;