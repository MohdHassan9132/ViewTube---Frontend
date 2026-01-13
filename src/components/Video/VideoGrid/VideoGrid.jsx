import { useEffect, useState } from "react";
import { getAllVideosApi } from "../../../api/video/videoApi";
import { Link, useNavigate } from "react-router-dom";
import timeAgo from '../../../utils/timeago'
import "../VideoGrid/VideoGrid.css";

function VideoGrid({ videos = null }) {
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (videos) {
      setVideoList(videos);
      return;
    }
    loadVideos();
  }, [videos]);

  async function loadVideos() {
    try {
      const res = await getAllVideosApi();
      setVideoList(res.data.data.videos || []);
    } catch (err) {
      console.log("VIDEO GRID ERROR:", err);
    }
  }

  return (
    <div className="video-grid">
      {videoList.length === 0 && <p>No videos found.</p>}

      {videoList.map((v) => (
        <Link
          to={`/video/${v._id}`}
          className="video-card-yt"
          key={v._id}
        >
          {/* THUMBNAIL CONTAINER */}
          <div className="thumb-container">
            <img src={v.thumbnail} className="thumb-img" />

            <span className="thumb-duration">
              {Math.floor(v.duration / 60)}:
              {(Math.floor(v.duration % 60)).toString().padStart(2, "0")}
            </span>
          </div>

          {/* INFO ROW */}
          <div className="info-row">

            {/* FIX: avatar is NOT a Link anymore */}
            <img
              src={v.owner.avatar}
              className="info-avatar"
              onClick={(e) => {
                e.preventDefault(); // stop outer link
                e.stopPropagation();
                navigate(`/channel/${v.owner.username}`);
              }}
              style={{ cursor: "pointer" }}
            />

            <div className="info-text">
              <h3 className="info-title">{v.title}</h3>
              <p className="info-meta">{v.owner.username}</p>
             <p className="info-meta">
                {v.views} views • {timeAgo(v.createdAt)}
             </p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoGrid;
