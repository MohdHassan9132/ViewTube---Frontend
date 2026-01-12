import { Link } from "react-router-dom";
import "../../styles/yourVideos.css";
import timeAgo from "../../utils/timeago";

function YourVideoCard({ video, onTogglePublish, onDelete, onFeature }) {
  return (
    <div className="your-video-card">

      {/* Thumbnail */}
      <div className="your-video-thumb">
        <img src={video.thumbnail} alt={video.title} />
      </div>

      {/* Info */}
      <div className="your-video-info">
        <h3 className="your-video-title">{video.title}</h3>
        <p className="your-video-meta">
          {video.views} views • {timeAgo(video.createdAt)}
        </p>
      </div>

      {/* Buttons */}
      <div className="your-video-actions">
        <button
          className="yv-btn yv-publish"
          onClick={() => onTogglePublish(video._id)}
        >
          {video.isPublished ? "Unpublish" : "Publish"}
        </button>

        <Link
          to={`/update-video/${video._id}`}
          className="yv-btn yv-update"
        >
          Edit
        </Link>

        <button
          className="yv-btn yv-delete"
          onClick={() => onDelete(video._id)}
        >
          Delete
        </button>

        <button
          className="yv-btn yv-feature"
          onClick={() => onFeature(video._id)}
        >
          Feature
        </button>
      </div>
    </div>
  );
}

export default YourVideoCard;
