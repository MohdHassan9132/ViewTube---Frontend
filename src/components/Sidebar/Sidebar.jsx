import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSubscribedChannelsApi } from "../../api/subscription/subscriptionApi";
import "./Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getSubscribedChannelsApi();

        // API RETURNS SUBSCRIPTIONS → EXTRACT CHANNELS
        const channels = res?.data?.data?.map(
          (subscription) => subscription.channel
        );

        setSubscriptions(Array.isArray(channels) ? channels : []);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        setSubscriptions([]);
      }
    };

    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/history", icon: "history", label: "History" },
    { path: "/liked-videos", icon: "like", label: "Liked Videos" },
    { path: "/your-videos", icon: "video", label: "Your Videos" },
    { path: "/your-tweets", icon: "tweet", label: "Your Tweets" },
    { path: "/your-playlists", icon: "playlist", label: "Your Playlists" },
  ];

  const getIcon = (iconName) => {
    const icons = {
      home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
      history: <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />,
      like: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
      video: <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />,
      tweet: <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.86 4.86 0 0 0 15.11 4c-2.7 0-4.89 2.19-4.89 4.89 0 .38.04.75.13 1.1-4.06-.2-7.67-2.15-10.08-5.11a4.86 4.86 0 0 0 1.51 6.52 4.84 4.84 0 0 1-2.21-.61v.06c0 2.37 1.68 4.34 3.92 4.79-.41.11-.84.17-1.29.17-.31 0-.62-.03-.92-.08.62 1.94 2.43 3.35 4.57 3.39a9.76 9.76 0 0 1-6.04 2.08c-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z" />,
      playlist: <path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"/>,
    };
    return icons[iconName] || null;
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {getIcon(item.icon)}
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {subscriptions.length > 0 && (
          <div className="sidebar-section">
            <h3 className="section-title">Subscriptions</h3>

            <div className="subscriptions-list">
              {subscriptions.map((channel) => (
                <Link
                  key={channel._id}
                  to={`/channel/${channel.username}`}
                  className="subscription-item"
                  onClick={closeSidebar}
                >
                  <img
                    src={channel.avatar || "/default-avatar.png"}
                    alt={channel.username}
                    className="subscription-avatar"
                  />
                  <span className="subscription-name truncate">
                    {channel.username}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
