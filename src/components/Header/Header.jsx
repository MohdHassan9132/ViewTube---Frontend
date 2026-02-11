import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUserApi } from "../../api/user/userApi";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      setUser(null);
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="header glass">
      <div className="header-left">
        <button className="icon-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        
        <Link to="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="url(#gradient)"/>
            <path d="M12 10l8 6-8 6V10z" fill="white"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#ff0000"/>
                <stop offset="100%" stopColor="#1d9bf0"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">TweeTube</span>
        </Link>
      </div>

      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos, tweets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
          </svg>
        </button>
      </form>

      <div className="header-right">
        <Link to="/studio/upload" className="icon-btn" aria-label="Upload">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </Link>

        <div className="profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Profile menu"
          >
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt={user?.username}
              className="profile-avatar"
            />
          </button>

          {showProfileMenu && (
            <div className="dropdown-menu">
              <Link to={`/channel/${user?.username}`} className="dropdown-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
                </svg>
                <span>Your Channel</span>
              </Link>
              
              <Link to="/update-profile" className="dropdown-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
                <span>Settings</span>
              </Link>

              <div className="dropdown-divider"></div>

              <button onClick={handleLogout} className="dropdown-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L6 9.414l1.414-1.414L9 9.586 12.586 6 14 7.414z"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
