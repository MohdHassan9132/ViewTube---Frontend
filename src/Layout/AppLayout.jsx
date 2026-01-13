import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Sidebar from "../components/common/Sidebar/Sidebar";
import "../components/common/Header/Header.css";
import "../components/common/Sidebar/Sidebar.css";
import { useState } from "react";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />

      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
