import { useState } from "react";
import timeago from "../../../utils/timeago";
import { toggleTweetLikeApi } from "../../../api/like/likeApi";
import "./TweetFeedCard.css";

function TweetFeedCard({ tweet, editable = false, onDelete, onUpdate }) {
  const [liked, setLiked] = useState(tweet.isLiked);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(tweet.content);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (loading) return;

    // optimistic UI
    setLiked(prev => !prev);
    setLoading(true);

    try {
      const res = await toggleTweetLikeApi(tweet._id);
      // setLiked(res.data?.data?.liked); // Prefer optimistic or response
    } catch (err) {
      console.log("LIKE ERROR:", err);
      // rollback
      setLiked(prev => !prev);
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = (e) => {
    e.stopPropagation();
    if (!newContent.trim()) return;
    onUpdate(tweet._id, newContent);
    setIsEditing(false);
  };
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  }
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(tweet._id);
  }

  return (
    <div className="tweetfeedcard">
      
      {/* LEFT COLUMN: Avatar */}
      <div className="tweetfeedcard-left">
        <img
          src={tweet.owner.avatar}
          className="tweetfeedcard-avatar"
          alt="avatar"
        />
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="tweetfeedcard-right">
        
        {/* Header */}
        <div className="tweetfeedcard-header">
          <p className="tweetfeedcard-username">{tweet.owner.username}</p>
          <span className="tweetfeedcard-handle">@{tweet.owner.username}</span>
          <span className="tweetfeedcard-dot">·</span>
          <span className="tweetfeedcard-time">{timeago(tweet.createdAt)}</span>
        </div>

        {/* Content Body */}
        {isEditing ? (
          <div onClick={(e) => e.stopPropagation()}>
            <textarea
              className="tweetfeedcard-edit-input"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="tweetfeedcard-edit-actions">
              <button className="btn-secondary" onClick={saveEdit}>Save</button>
              <button className="btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="tweetfeedcard-content">{tweet.content}</p>
        )}

        {/* Media */}
        {tweet.media && (
          <img
            src={tweet.media}
            className="tweetfeedcard-media"
            alt="tweet media"
          />
        )}

        {/* Footer Actions */}
        <div className="tweetfeedcard-footer">
          
          {/* Like */}
          <button
            className={`tweet-action-btn action-like ${liked ? "liked" : ""}`}
            onClick={handleLike}
            disabled={loading}
          >
            <div className="tweet-action-icon">
              {liked ? "♥" : "♡"} 
            </div>
            <span>{liked ? "Liked" : ""}</span>
          </button>
          
          {/* Reply Placeholder */}
          <button className="tweet-action-btn action-reply">
             <div className="tweet-action-icon">💬</div>
          </button>

          {/* Edit/Delete if Owner */}
          {editable && !isEditing && (
            <>
              <button className="tweet-action-btn action-edit" onClick={handleEditClick}>
                <div className="tweet-action-icon">✎</div>
              </button>
              <button className="tweet-action-btn action-delete" onClick={handleDeleteClick}>
                 <div className="tweet-action-icon">🗑</div>
              </button>
            </>
          )}
          
        </div>

      </div>
    </div>
  );
}

export default TweetFeedCard;
