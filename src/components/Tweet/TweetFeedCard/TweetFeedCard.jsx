import { useState } from "react";
import timeago from "../../../utils/timeago";
import { toggleTweetLikeApi } from "../../../api/like/likeApi";
import "./TweetFeedCard.css";

function TweetFeedCard({ tweet, editable = false, onDelete, onUpdate }) {
  const [liked, setLiked] = useState(tweet.liked || false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(tweet.content);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await toggleTweetLikeApi(tweet._id);
      setLiked(res.data?.data?.liked);
    } catch (err) {
      console.log("LIKE ERROR:", err);
    }

    setLoading(false);
  };

  const saveEdit = () => {
    if (!newContent.trim()) return;
    onUpdate(tweet._id, newContent);
    setIsEditing(false);
  };

  return (
    <div className="tweetfeedcard">

      {/* Header */}
      <div className="tweetfeedcard-header">
        <img src={tweet.owner.avatar} className="tweetfeedcard-avatar" />

        <div>
          <p className="tweetfeedcard-username">{tweet.owner.username}</p>
          <span className="tweetfeedcard-time">{timeago(tweet.createdAt)}</span>
        </div>
      </div>

      {/* Editing Mode */}
      {isEditing ? (
        <>
          <textarea
            className="tweetfeedcard-edit-input"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <div className="tweetfeedcard-edit-actions">
            <button className="save-btn" onClick={saveEdit}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <p className="tweetfeedcard-content">{tweet.content}</p>
      )}

      {/* Media */}
      {tweet.media && (
        <img src={tweet.media} className="tweetfeedcard-media" />
      )}

      {/* Actions */}
      <div className="tweetfeedcard-footer">

        <button
          className={`tweetfeedcard-like ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        {editable && !isEditing && (
          <>
            <button
              className="tweetfeedcard-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>

            <button
              className="tweetfeedcard-delete-btn"
              onClick={() => onDelete(tweet._id)}
            >
              🗑️ Delete
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default TweetFeedCard;
