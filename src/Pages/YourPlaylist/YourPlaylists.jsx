import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PlaylistFeed from "../../components/PlaylistFeed/PlaylistFeed";
import { getUserPlaylistsApi } from "../../api/playlist/playlistApi";

const YourPlaylists = () => {
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    fetchPlaylists();
  }, [user?._id]);

  const fetchPlaylists = async () => {
    try {
      const res = await getUserPlaylistsApi(user._id);

      // 🔥 backend structure safe parsing
      const playlistsData = res?.data?.data ?? [];

      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        Please login to view your playlists.
      </div>
    );
  }

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
        <h1>Your Playlists</h1>
        <p>{playlists.length} playlists</p>
      </div>

      <PlaylistFeed playlists={playlists} />
    </div>
  );
};

export default YourPlaylists;
