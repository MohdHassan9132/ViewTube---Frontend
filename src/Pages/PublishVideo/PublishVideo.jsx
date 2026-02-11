import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publishVideoApi } from "../../api/video/videoApi";
import "./PublishVideo.css";

const PublishVideo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });
  const [preview, setPreview] = useState({
    video: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      
      // Create preview
      const fileURL = URL.createObjectURL(files[0]);
      setPreview({ ...preview, [name === "videoFile" ? "video" : "thumbnail"]: fileURL });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("videoFile", formData.videoFile);
      form.append("thumbnail", formData.thumbnail);

      await publishVideoApi(form);
      navigate("/your-videos");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-video-page">
      <div className="publish-container">
        <h1>Upload Video</h1>

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
                placeholder="Enter video title"
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
                placeholder="Tell viewers about your video"
              />
            </div>

            <div className="form-group">
              <label htmlFor="videoFile">Video File *</label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail *</label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </div>

          <div className="preview-section">
            <h3>Preview</h3>
            
            {preview.video && (
              <div className="preview-video">
                <video src={preview.video} controls />
              </div>
            )}

            {preview.thumbnail && (
              <div className="preview-thumbnail">
                <img src={preview.thumbnail} alt="Thumbnail preview" />
              </div>
            )}

            {formData.title && (
              <div className="preview-info">
                <h4>{formData.title}</h4>
                {formData.description && <p>{formData.description}</p>}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishVideo;
