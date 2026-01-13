import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getSubscribedChannelsApi } from "../../../api/subscription/subscriptionApi";

function Sidebar({ isOpen, closeSidebar }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadSubs();
  }, []);

  async function loadSubs() {
    try {
      const res = await getSubscribedChannelsApi();
      setSubs(res.data.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  }

  function handleLikedPlaylistsClick(e) {
    e.preventDefault();
    alert("Liked Playlists feature coming soon!");
    closeSidebar();
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <NavLink to="/" className="side-btn" onClick={closeSidebar}>
        🏠 Home
      </NavLink>

      <p className="side-label">Subscriptions</p>

      {subs.map((sub) => (
        <Link
          to={`/channel/${sub.channel.username}`}
          key={sub._id}
          className="sub-item"
          onClick={closeSidebar}
        >
          <img className="sub-avatar" src={sub.channel.avatar} />
          <span>{sub.channel.username}</span>
        </Link>
      ))}

      <hr className="side-divider" />

      <NavLink to="/history" className="side-btn" onClick={closeSidebar}>
        🕒 History
      </NavLink>

      <button
        className="side-btn"
        onClick={handleLikedPlaylistsClick}
        style={{ background: "transparent", border: "none", textAlign: "left" }}
      >
        📁 Liked Playlists
      </button>

      <NavLink to="/liked-videos" className="side-btn" onClick={closeSidebar}>
        👍 Liked Videos
      </NavLink>

      <NavLink to="/your-videos" className="side-btn" onClick={closeSidebar}>
        🎥 Your Videos
      </NavLink>
    </aside>
  );
}

export default Sidebar;
