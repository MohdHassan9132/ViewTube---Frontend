import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllVideosApi, deleteVideoApi, togglePublishStatusApi } from "../../api/video/videoApi";
import "../LikedVideos/LikedVideos.css";

const YourVideos = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchYourVideos();
  }, [user]);

  const fetchYourVideos = async () => {
    try {
      const res = await getAllVideosApi({
        userId: user._id,
      });

      setVideos(res?.data?.data?.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (videoId) => {
    try {
      const res = await togglePublishStatusApi(videoId);
      const newStatus = res.data.data.isPublished;
      
      setVideos(prev => 
        prev.map(v => 
          v._id === videoId ? { ...v, isPublished: newStatus } : v
        )
      );
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await deleteVideoApi(videoId);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (error) {
      console.error("Failed to delete video:", error);
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
        <h1>Your Videos</h1>
        <p>{videos.length} videos</p>
      </div>

      {videos.length === 0 ? (
        <div className="empty-state">
          <h3>No videos uploaded</h3>
          <p>Upload your first video to get started</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <Link to={`/video/${video._id}`}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className={`status-badge ${video.isPublished ? 'published' : 'unpublished'}`}>
                    {video.isPublished ? 'Published' : 'Unpublished'}
                  </div>
                </div>
              </Link>

              <div className="video-info">
                <h3 className="video-title line-clamp-2">
                  {video.title}
                </h3>

                <div className="video-meta">
                  <span>{video.views} views</span>
                </div>

                <div
                  className="video-actions"
                  style={{
                    display: "flex",
                    gap: "var(--space-2)",
                    marginTop: "var(--space-2)",
                    flexWrap: "wrap"
                  }}
                >
                  <button 
                    onClick={() => handleTogglePublish(video._id)}
                    className={`btn-secondary ${video.isPublished ? 'active-status' : ''}`}
                    style={{ 
                      color: "white", 
                      borderColor: video.isPublished ? '#cfd9de' : 'transparent',
                      backgroundColor: video.isPublished ? 'rgba(0, 186, 124, 0.1)' : 'rgba(239, 243, 244, 0.1)'
                    }}
                  >
                    {video.isPublished ? "Unpublish" : "Publish"}
                  </button>

                  <Link
                    to={`/update-video/${video._id}`}
                    className="btn-secondary"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(video._id)}
                    className="btn-secondary"
                    style={{ color: "#f4212e" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourVideos;
