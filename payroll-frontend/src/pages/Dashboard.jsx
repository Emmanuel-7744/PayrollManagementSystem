import {
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
} from "react-icons/fa";

function Dashboard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const cards = [
    {
      title: "Employees",
      value: 18,
      icon: <FaUsers size={35} />,
      color: "#2563eb",
    },
    {
      title: "Attendance",
      value: "16 / 18",
      icon: <FaCalendarCheck size={35} />,
      color: "#10b981",
    },
    {
      title: "Payroll",
      value: "₹8,75,000",
      icon: <FaMoneyBillWave size={35} />,
      color: "#f59e0b",
    },
    {
      title: "Payslips",
      value: 18,
      icon: <FaFileInvoiceDollar size={35} />,
      color: "#ef4444",
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "5px" }}>
        👋 {greeting}, Emmanuel
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "35px",
        }}
      >
        Welcome back to your Payroll Management Dashboard
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
              borderTop: `6px solid ${card.color}`,
            }}
          >
            <div
              style={{
                color: card.color,
                marginBottom: "15px",
              }}
            >
              {card.icon}
            </div>

            <h3
              style={{
                margin: 0,
                color: "#444",
              }}
            >
              {card.title}
            </h3>

            <h1
              style={{
                marginTop: "15px",
                color: "#111",
              }}
            >
              {card.value}
            </h1>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          marginTop: "40px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2>📋 Recent Activity</h2>

        <ul
          style={{
            lineHeight: "2",
            color: "#555",
          }}
        >
          <li>✅ Brendan added as HR Manager</li>
          <li>✅ Attendance marked for today</li>
          <li>✅ Payroll generated successfully</li>
          <li>✅ Payslips generated for July</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;