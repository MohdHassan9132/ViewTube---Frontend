import React, { useState, useEffect } from "react";
import { getWatchHistoryApi } from "../../api/user/userApi";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import "../LikedVideos/LikedVideos.css";

const WatchHistory = () => {
  const [videos, setVideos] = useState(null); // null initial state to differentiate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getWatchHistoryApi();

      // CORRECT PATH
      const history = res?.data?.data?.watchHistory;

      // GUARANTEE ARRAY
      setVideos(Array.isArray(history) ? history : []);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      setVideos([]);
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
    <div className="watch-history-page">
      <div className="page-header">
        <h1>Watch History</h1>
        <p>{videos?.length || 0} videos</p>
      </div>

      <VideoGrid videos={videos || []} />
    </div>
  );
};

export default WatchHistory;
