import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { logoutUserApi } from "../../../api/user/userApi";
import "../Header/Header.css";

function Header({ toggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false);
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
  <>
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
        <button
          className="header-icon mobile-search-icon"
          onClick={() => setShowSearch(!showSearch)}
        >
          🔍
        </button>

        <Link to="/studio/upload" className="header-btn">Upload</Link>
        <button className="header-icon">🔔</button>

        <div className="header-profile" onClick={() => setOpenMenu(!openMenu)}>
          <img src={user?.avatar || "/default-avatar.png"} className="header-avatar" />
          {openMenu && (
            <div className="profile-dropdown">
  <p
  className="dropdown-item"
  onClick={() => navigate(`/channel/${user?.username}`)}
  style={{ cursor: "pointer" }}
>
  {user?.username}
</p>


  <button
    className="dropdown-item"
    onClick={() => navigate("/update-profile")}
  >
    Update Profile
  </button>

  <button
    className="dropdown-item"
    onClick={() => navigate("/change-password")}
  >
    Change Password
  </button>

  <button className="dropdown-item" onClick={handleLogout}>
    Logout
  </button>
</div>

          )}
        </div>
      </div>
    </header>
    {/* Mobile search dropdown OUTSIDE header */}
    {showSearch && (
      <div className="mobile-search-dropdown">
        <input
          type="text"
          className="mobile-search-input"
          placeholder="Search..."
        />
      </div>
    )}
  </>
);

}

export default Header;
