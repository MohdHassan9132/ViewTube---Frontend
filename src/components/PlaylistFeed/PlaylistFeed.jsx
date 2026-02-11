import React from "react";
import { Link } from "react-router-dom";
import "./PlaylistFeed.css";

const PlaylistFeed = ({ playlists = [] }) => {

  const formatTimeAgo = (date) => {
    if (!date) return "";

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) return `${interval}${unit[0]}`;
    }

    return "now";
  };

  return (
    <div className="playlist-feed">
      {playlists.length === 0 ? (
        <div className="playlist-feed-empty">
          <h3>No playlists yet</h3>
          <p>Create one to organize your favorite videos!</p>
        </div>
      ) : (
        <div className="playlist-feed-container">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="playlist-card">
              <Link
                to={`/playlist/${playlist._id}`}
                className="playlist-cover-wrapper"
              >
                <img
                  src={
                    playlist.playlistCoverImage
                  }
                  alt={playlist.name}
                />
              </Link>

              <div className="playlist-content-wrapper">
                <Link
                  to={`/playlist/${playlist._id}`}
                  className="playlist-name"
                >
                  {playlist.name}
                </Link>

                {playlist.description && (
                  <p className="playlist-description">
                    {playlist.description}
                  </p>
                )}

                <div className="playlist-meta">
                  <span>{playlist.videos || 0} videos</span>
                  {playlist.createdAt && (
                    <>
                      <span>•</span>
                      <span>{formatTimeAgo(playlist.createdAt)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistFeed;
