import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Payslip() {
  const [payslips, setPayslips] = useState([
    { id: 1, name: "Brendan", month: "July 2026", salary: "₹55,000", status: "Generated" },
    { id: 2, name: "Emmanuel J", month: "July 2026", salary: "₹48,000", status: "Generated" },
    { id: 3, name: "Karthik", month: "July 2026", salary: "₹80,000", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");

  const filteredPayslips = payslips.filter((ps) =>
    ps.name.toLowerCase().includes(search.toLowerCase())
  );

  const generatePayslip = () => {
    alert("Payslip Generated Successfully!");
  };

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
          <h1>Payslip Management</h1>

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
              <th style={cell}>Month</th>
              <th style={cell}>Net Salary</th>
              <th style={cell}>Status</th>
              <th style={cell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayslips.map((ps) => (
              <tr key={ps.id}>
                <td style={cell}>{ps.id}</td>
                <td style={cell}>{ps.name}</td>
                <td style={cell}>{ps.month}</td>
                <td style={cell}>{ps.salary}</td>
                <td style={cell}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      color: "white",
                      backgroundColor:
                        ps.status === "Generated" ? "#10b981" : "#f97316",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    {ps.status}
                  </span>
                </td>
                <td style={cell}>
                  <button
                    style={generateBtn}
                    onClick={generatePayslip}
                  >
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const cell = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const generateBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Payslip;