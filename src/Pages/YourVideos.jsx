import { useEffect, useState } from "react";
import { getAllVideosApi } from "../api/video/videoApi";
import VideoGrid from "../components/Video/VideoGrid";

function YourVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  async function loadVideos() {
    try {
      const res = await getAllVideosApi({ userId });
      const list = res.data?.data?.videos || [];
      setVideos(list);
    } catch (err) {
      console.log("YOUR VIDEOS ERROR:", err);
      setVideos([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="home-main">
      <h2 style={{ marginBottom: 20 }}>Your Videos</h2>

      {loading && <p>Loading...</p>}

      {!loading && videos.length === 0 && (
        <p>You haven't uploaded any videos yet.</p>
      )}

      {!loading && videos.length > 0 && (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}

export default YourVideos;
