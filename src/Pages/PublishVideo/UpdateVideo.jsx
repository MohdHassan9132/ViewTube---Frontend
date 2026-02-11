import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoByIdApi, updateVideoApi } from "../../api/video/videoApi";
import "./PublishVideo.css";

const UpdateVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });
  const [currentThumbnail, setCurrentThumbnail] = useState("");

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  const fetchVideo = async () => {
    try {
      const res = await getVideoByIdApi(videoId);
      const video = res.data.data;
      setFormData({
        title: video.title,
        description: video.description || "",
        thumbnail: null,
      });
      setCurrentThumbnail(video.thumbnail);
    } catch (error) {
      console.error("Failed to fetch video:", error);
      setError("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      if (formData.thumbnail) {
        form.append("thumbnail", formData.thumbnail);
      }

      await updateVideoApi(videoId, form);
      navigate("/your-videos");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update video");
    } finally {
      setSubmitting(false);
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
    <div className="publish-video-page">
      <div className="publish-container">
        <h1>Update Video</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="publish-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnail">Update Thumbnail (optional)</label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Updating..." : "Update Video"}
            </button>
          </div>

          <div className="preview-section">
            <h3>Current Thumbnail</h3>
            <div className="preview-thumbnail">
              <img src={currentThumbnail} alt="Current thumbnail" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVideo;
