import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import "../styles/header.css";
import "../styles/sidebar.css";
import { useState } from "react";

function AppLayout() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Only show sidebar on HOME page or when toggled manually
  const isHome = location.pathname === "/";

  return (
    <div className="app-container">

      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="app-body">
        {(isHome || sidebarOpen) && <Sidebar />}

        <div className="app-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default AppLayout;
