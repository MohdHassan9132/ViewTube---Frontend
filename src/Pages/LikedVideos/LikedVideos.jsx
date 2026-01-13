import { useEffect, useState } from "react";
import { getLikedVideosApi, toggleVideoLikeApi } from "../../api/like/likeApi";
import LikedVideoCard from "../../components/Video/LikedVideoCard";
import "../LikedVideos/LikedVideos.css";

function LikedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLikedVideos() {
    try {
      const res = await getLikedVideosApi();
      setVideos(res.data?.data || []); // <-- FIXED
    } catch (err) {
      console.log("LIKED VIDEOS ERROR:", err);
    }
    setLoading(false);
  }

  async function handleUnlike(videoId) {
    try {
      await toggleVideoLikeApi(videoId);

      // remove unliked video from UI
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      console.log("UNLIKE ERROR:", err);
    }
  }

  useEffect(() => {
    loadLikedVideos();
  }, []);

  return (
    <div className="liked-videos-page">
      <h2 className="liked-title">Liked Videos</h2>

      {loading && <p>Loading...</p>}

      {!loading && videos.length === 0 && (
        <p>You haven't liked any videos yet.</p>
      )}

      <div className="liked-list">
        {videos.map((v) => (
          <LikedVideoCard
            key={v._id}
            video={v}
            onUnlike={handleUnlike}
          />
        ))}
      </div>
    </div>
  );
}

export default LikedVideos;
