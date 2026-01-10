import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { logoutUserApi } from "../../api/user/userApi";
import "../../styles/header.css";

function Header({ toggleSidebar }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  async function handleLogout() {
    try {
      await logoutUserApi();

      // clear user from context
      setUser(null);

      // redirect
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  }

  return (
    <header className="app-header">

      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>

        <Link to="/" className="header-logo">V</Link>

        <input
          type="text"
          className="header-search"
          placeholder="Search videos..."
        />
      </div>

      <div className="header-right">
        <Link to="/studio/upload" className="header-btn">Upload</Link>
        <button className="header-icon">🔔</button>

        <div
          className="header-profile"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img
            src={user?.avatar || "/default-avatar.png"}
            className="header-avatar"
            alt="profile"
          />

          {openMenu && (
            <div className="profile-dropdown">
              <p className="profile-name">{user?.username}</p>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}

export default Header;
