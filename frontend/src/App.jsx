import React, { useContext, useEffect } from "react";
import Login from "./components/Login";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/employee/EmployeeDashboard";
import { AppContext } from "./context/AppContext";

function App() {
  const { user } = useContext(AppContext);
  const role = user?.role;

  useEffect(() => {
    const fvIco = document.getElementById("favicon");
    if (!fvIco) return;

    if (!role) {
      document.title = "Login Page";
      fvIco.href = "/public/favIcon/login-box-fill.png";
    } else if (role === "admin") {
      document.title = "Admin Dashboard";
      fvIco.href = "/public/favIcon/admin-favicon.png";
    } else if (role === "employee") {
      document.title = "Employee Dashboard";
      fvIco.href = "/public/favIcon/service-fill.png";
    }
  }, [role]);

  if (!role) {
    return <Login />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "employee") {
    return <EmployeeDashboard />;
  }

  return <Login />;
}

export default App;