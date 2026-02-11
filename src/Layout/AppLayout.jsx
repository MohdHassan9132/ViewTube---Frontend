import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Sidebar from "../components/common/Sidebar/Sidebar";
import "./AppLayout.css"; // Import the new layout styles
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
      {/* Header is sticky/fixed usually, but in this layout it's part of the flex column 
          OR we make it absolute/fixed. X has sidebar nav, YouTube has top header. 
          We'll keep the Top Header for now but make it floaty. */}
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
