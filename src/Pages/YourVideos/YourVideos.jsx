import { useEffect, useState } from "react";
import { getAllVideosApi, togglePublishStatusApi, deleteVideoApi } from "../../api/video/videoApi";
import YourVideoCard from "../../components/Video/YourVideoCard";
import "../YourVideos/YourVideos.css";

function YourVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  async function loadVideos() {
    try {
      const res = await getAllVideosApi({ userId });
      setVideos(res.data?.data?.videos || []);
    } catch (err) {
      console.log("LOAD VIDEOS ERROR:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  // Toggle publish button
  async function handleTogglePublish(id) {
    try {
      await togglePublishStatusApi(id);
      loadVideos();
    } catch (err) {
      console.log("TOGGLE ERROR:", err);
    }
  }

  // Delete button
  async function handleDelete(id) {
    if (!confirm("Delete this video?")) return;

    try {
      await deleteVideoApi(id);
      loadVideos();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  }

  // Feature button (just UI, not functional yet)
  function handleFeature(id) {
    alert("Feature functionality will be added later.");
  }

  return (
    <div className="your-video-page">

      <h2 className="yv-title">Your Videos</h2>

      {loading && <p>Loading...</p>}

      {!loading && videos.length === 0 && (
        <p>No videos uploaded yet.</p>
      )}

      <div className="your-videos-list">
        {videos.map((v) => (
          <YourVideoCard
            key={v._id}
            video={v}
            onTogglePublish={handleTogglePublish}
            onDelete={handleDelete}
            onFeature={handleFeature}
          />
        ))}
      </div>
    </div>
  );
}

export default YourVideos;
