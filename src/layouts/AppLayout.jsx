import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./AppLayout.css";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
