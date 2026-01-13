// src/Pages/UpdateVideo.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVideoByIdApi, updateVideoApi, togglePublishStatusApi } from "../../api/video/videoApi";

import "../PublishStudio/Publish.css"; // reuse same styling used for upload

function UpdateVideo() {
  const { videoId } = useParams();

  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [newThumbnail, setNewThumbnail] = useState(null);

  // 🔥 Load video data from backend
  async function loadVideo() {
    try {
      const res = await getVideoByIdApi(videoId);
      const data = res.data.data;

      setVideoData(data);
      setTitle(data.title);
      setDescription(data.description);
      setThumbnailPreview(data.thumbnail);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load video data");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadVideo();
  }, []);

  // 🔥 Handle thumbnail upload
  function handleThumbnail(e) {
    const file = e.target.files[0];
    if (file) {
      setNewThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  // 🔥 Submit update
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (newThumbnail) formData.append("thumbnail", newThumbnail);

    try {
      await updateVideoApi(videoId, formData);
      setMessage("Video updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  }

  // 🔥 Publish toggle
  async function handleTogglePublish() {
    try {
      const res = await togglePublishStatusApi(videoId);
      setVideoData(prev => ({
        ...prev,
        isPublished: res.data.data.isPublished
      }));
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) return <p>Loading video...</p>;

  return (
    <div className="studio-page">

      <h2 className="studio-title">Update Video</h2>

      <div className="studio-content">

        {/* LEFT SIDE: FORM */}
        <form className="upload-form" onSubmit={handleSubmit}>

          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter video title"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          <label>Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleThumbnail} />

          <button className="upload-btn" type="submit">
            Save Changes
          </button>

          <button
            type="button"
            className="upload-btn"
            style={{
              background: videoData.isPublished ? "#ff4d4d" : "#10b981"
            }}
            onClick={handleTogglePublish}
          >
            {videoData.isPublished ? "Unpublish Video" : "Publish Video"}
          </button>

          {message && <p className="message">{message}</p>}
        </form>

        {/* RIGHT SIDE: PREVIEW */}
        <div className="preview-box">
          <h3>Preview</h3>

          <img src={thumbnailPreview} className="preview-thumb" />

          <video src={videoData.videoFile} controls className="preview-video" />
        </div>

      </div>
    </div>
  );
}

export default UpdateVideo;
