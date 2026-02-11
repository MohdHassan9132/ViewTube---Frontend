import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserPlaylistByIdApi } from "../../api/playlist/playlistApi";
import "./PlaylistView.css";

const PlaylistView = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistDetails();
    }
  }, [playlistId]);

  const fetchPlaylistDetails = async () => {
    setLoading(true);
    try {
      const res = await getUserPlaylistByIdApi(playlistId);
      // Based on provided API response structure:
      // res.data.data is an array containing the playlist object
      const playlistData = res.data.data?.[0];
      setPlaylist(playlistData);
    } catch (error) {
      console.error("Failed to fetch playlist details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration); // Assuming duration is in minutes or needs converting? 
    // The example showed "duration": 18.833333. If this is minutes:
    // 18 min, 0.833 * 60 = 50 sec.
    // If it's seconds, it's very short. Let's assume minutes based on typical video lengths, 
    // or checks standard format. Actually, usually it's seconds. 18s is short.
    // Let's assume standard format is seconds. 
    // Wait, typical movie duration in API responses often seconds.
    // Let's try standard M:SS from seconds.
    
    // If input 18.83 is seconds:
    const totalSeconds = Math.floor(duration);
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Playlist not found.
      </div>
    );
  }

  return (
    <div className="playlist-view-page">
      <div className="playlist-info-sidebar">

        {/* 1️⃣ COVER IMAGE (top 1/3) */}
        <div className="playlist-view-cover">
          <img
            src={
              playlist.playlistCoverImage ||
              playlist.playlistVideos?.[0]?.thumbnail ||
              "/default-playlist-cover.png"
            }
            alt={playlist.name}
          />
        </div>

      {/* 2️⃣ TEXT CONTENT */}
      <div className="playlist-info-content">

        {/* TITLE */}
        <h1 className="playlist-view-title">{playlist.name}</h1>

        {/* CHANNEL NAME */}
        <Link
          to={`/channel/${playlist.owner?.username}`}
          className="playlist-channel-name"
        >
          {playlist.owner?.username}
        </Link>

        {/* DESCRIPTION */}
        {playlist.description && (
          <p className="playlist-view-description">
            {playlist.description}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="playlist-actions">
          <button className="action-btn-circle" title="Like">
            ❤️
          </button>

          <button className="action-btn-circle" title="Share">
            🔗
          </button>
        </div>

      </div>
    </div>


      {/* Right Side - Video List */}
      <div className="playlist-videos-list">
        {playlist.playlistVideos?.map((video, index) => (
          <Link to={`/video/${video._id}`} key={video._id} className="playlist-video-card">
            <div className="playlist-video-index">{index + 1}</div>
            
            <div className="playlist-video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <span className="video-duration-badge">{formatDuration(video.duration)}</span>
            </div>

            <div className="playlist-video-info">
              <h3 className="playlist-video-title">{video.title}</h3>
              <div className="playlist-video-meta">
                <span>{video.owner?.username}</span>
                <span>•</span>
                <span>{video.views} views</span>
                 {/* Format duration properly if needed, usually passed as seconds */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistView;
