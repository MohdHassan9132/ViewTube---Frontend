import React, { useState, useEffect } from "react";
import { getLikedVideosApi } from "../../api/like/likeApi";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import "./LikedVideos.css";

const LikedVideos = () => {
  const [videos, setVideos] = useState(null); // null initial state to differentiate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  const fetchLikedVideos = async () => {
    try {
      const res = await getLikedVideosApi();
      // Ensure we map the liked video data structure to what VideoGrid expects
      // Liked videos API usually returns an array where the video details might be nested or direct
      // Assuming res.data.data contains the list of videos directly based on previous code
      // If it returns { likedVideo: {...} }, we might need to map it. 
      // Based on previous code: setVideos(res.data.data || []); it seems direct.
      // But usually "getLikedVideos" returns documents from "likes" collection which populate "video".
      // Let's assume the previous code was using the property structure correctly but let's be safe.
      // Actually, looking at previous code: 
      // {videos.map((video) => ... video.title ...)}
      // It implies res.data.data IS the array of videos.
      
      // However, typical aggregation pipelines for "liked videos" often return the video object as a field (e.g. 'video').
      // Let's assume the backend returns the video objects directly for now as per previous implementation.
      // If the UI breaks, we know it's the mapping.
      
      // Wait, if I'm using VideoGrid, I should make sure the "owner" field is populated correctly because VideoGrid accesses video.owner.username/avatar.
      // Previous LikedVideos code access: video.owner?.username
      // So passed data structure seems compatible.
      
      setVideos(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch liked videos:", error);
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
    <div className="liked-videos-page">
      <div className="page-header">
        <h1>Liked Videos</h1>
        <p>{videos?.length || 0} videos</p>
      </div>

      <VideoGrid videos={videos || []} />
    </div>
  );
};

export default LikedVideos;
