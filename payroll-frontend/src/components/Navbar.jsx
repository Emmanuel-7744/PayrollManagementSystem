function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
      }}
    >
      <h2>Payroll Management System</h2>

      <div>
        <span style={{ marginRight: "20px" }}>Welcome, Admin</span>

        <button
          onClick={logout}
          style={{
            padding: "8px 15px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;