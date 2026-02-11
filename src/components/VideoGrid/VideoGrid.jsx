import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllVideosApi } from "../../api/video/videoApi";
import "./VideoGrid.css";

const VideoGrid = ({ userId, videos: externalVideos }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("views"); // Default: Popular (most views)

  useEffect(() => {
    if (externalVideos) {
      setVideos(externalVideos);
      setLoading(false);
    } else {
      fetchVideos();
    }
  }, [sortBy, userId, externalVideos]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      // Backend expects: sort = "latest" | "oldest" | undefined (defaults to popular/views)
      const params = {};
      
      if (sortBy === "latest") {
        params.sort = "latest";
      } else if (sortBy === "oldest") {
        params.sort = "oldest";
      }
      
      if (userId) {
        params.userId = userId;
      }

      const res = await getAllVideosApi(params);
      // API returns videos in res.data.data.videos
      setVideos(res.data.data.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  if (loading) {
    return (
      <div className="video-grid-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="video-grid-wrapper">
      {/* Filter Dropdown */}
      <div className="video-grid-header">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-dropdown"
        >
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {videos.length === 0 ? (
        <div className="video-grid-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
          <h3>No videos found</h3>
          <p>Be the first to upload a video!</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              className="video-card"
            >
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                {video.duration && (
                  <span className="video-duration">
                    {formatDuration(video.duration)}
                  </span>
                )}
              </div>

              <div className="video-info">
                <Link
                  to={`/channel/${video.owner?.username}`}
                  className="video-avatar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={video.owner?.avatar || "/default-avatar.png"}
                    alt={video.owner?.username}
                  />
                </Link>

                <div className="video-details">
                  <h3 className="video-title line-clamp-2">{video.title}</h3>
                  <div className="video-meta">
                    <span className="video-owner">{video.owner?.username}</span>
                    <span className="video-stats">
                      {formatViews(video.views)} views • {formatTimeAgo(video.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
