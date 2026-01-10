import { useState } from "react";
import timeago from "../../utils/timeago";
import { toggleTweetLikeApi } from "../../api/like/likeApi";

function TweetCard({ tweet }) {
  const [liked, setLiked] = useState(tweet.liked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    try {
      const res = await toggleTweetLikeApi(tweet._id);
      setLiked(res.data.data.liked);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }

    setLikeLoading(false);
  };

  // Convert media to array if it's a string
  const mediaArray = Array.isArray(tweet.media)
    ? tweet.media
    : tweet.media
    ? [tweet.media]
    : [];

  const mediaCount = mediaArray.length;

  return (
    <div className="tweet-card">

      {/* HEADER */}
      <div className="tweet-header">
        <img src={tweet.owner.avatar} className="tweet-avatar" alt="avatar" />
        <div className="tweet-userinfo">
          <p className="tweet-username">{tweet.owner.username}</p>
          <span className="tweet-time">{timeago(tweet.createdAt)}</span>
        </div>
      </div>

      {/* CONTENT */}
      <p className="tweet-content">{tweet.content}</p>

      {/* MEDIA */}
      {mediaCount > 0 && (
        <div className={`tweet-media-grid count-${mediaCount}`}>
          {mediaArray.slice(0, 5).map((item, index) => (
            <div className="tweet-media-item" key={index}>
              <img
                src={item.url || item}
                className="tweet-media"
                alt="media"
              />
            </div>
          ))}
        </div>
      )}

      {/* LIKE BUTTON */}
      <button
        className={`tweet-like-btn ${liked ? "liked" : ""}`}
        onClick={handleLike}
        disabled={likeLoading}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default TweetCard;
