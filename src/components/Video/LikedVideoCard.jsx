import { Link } from "react-router-dom";
import timeAgo  from "../../utils/timeago";

function LikedVideoCard({ video, onUnlike }) {
  return (
    <div className="liked-card">
      <Link to={`/video/${video._id}`}>
        <img src={video.thumbnail} className="liked-thumb" />
      </Link>

      <div className="liked-info">
        <h3 className="liked-title-text">{video.title}</h3>

        <div className="liked-meta">
          <img src={video.owner.avatar} className="liked-avatar" />
          <span>{video.owner.username}</span>
          <span>• {timeAgo(video.createdAt)}</span>
        </div>

        <div className="liked-actions">
          <button className="liked-btn unlike" onClick={() => onUnlike(video._id)}>
            Unlike
          </button>
          
          <button
            className="liked-btn share"
            onClick={() => alert("Share feature coming soon")}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default LikedVideoCard;
