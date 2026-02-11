import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubscribersChannelApi } from "../../api/subscription/subscriptionApi";
import "../LikedVideos/LikedVideos.css";

const SubscribersPage = () => {
  const { username } = useParams();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, [username]);

  const fetchSubscribers = async () => {
    try {
      // Note: This API might need channelId instead of username
      // Adjust based on your backend implementation
      const res = await getSubscribersChannelApi(username);
      setSubscribers(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="your-videos-page">
      <div className="page-header">
        <h1>Subscribers</h1>
        <p>{subscribers.length} subscribers</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <h3>No subscribers yet</h3>
          <p>People who subscribe will appear here</p>
        </div>
      ) : (
        <div className="subscribers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
          {subscribers.map((subscriber) => (
            <Link
              key={subscriber._id}
              to={`/channel/${subscriber.username}`}
              className="subscriber-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-4)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                textDecoration: "none",
                transition: "background-color var(--transition-fast)",
              }}
            >
              <img
                src={subscriber.avatar || "/default-avatar.png"}
                alt={subscriber.username}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3 style={{ fontSize: "var(--text-md)", fontWeight: "var(--font-semibold)", color: "var(--text-primary)", margin: 0 }}>
                  {subscriber.fullName || subscriber.username}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0 }}>
                  @{subscriber.username}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscribersPage;
