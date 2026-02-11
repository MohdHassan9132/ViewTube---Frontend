import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getUserTweetsApi,
  deleteTweetApi,
  updateTweetApi,
  createTweetApi,
} from "../../api/tweet/tweetApi";
import { toggleTweetLikeApi } from "../../api/like/likeApi";
import "./TweetFeed.css";

const TweetFeed = ({ userId, isEditable = false, allowCreate = true }) => {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest"); // Default: Latest
  
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Create Tweet State
  const [newTweetContent, setNewTweetContent] = useState("");
  const [newTweetMedia, setNewTweetMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTweets();
  }, [userId, sortBy]);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const params = {
        sortBy: "createdAt",
        sortType: sortBy === "latest" ? "desc" : "asc",
      };

      if (userId) {
        params.userId = userId;
      }

      const res = await getUserTweetsApi(params);
      // API returns tweets directly in res.data.data array
      setTweets(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
      setTweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const res = await toggleTweetLikeApi(tweetId);
      const liked = res.data.data.liked;

      setTweets((prev) =>
        prev.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                isLiked: liked,
                likes: liked ? tweet.likes + 1 : Math.max(tweet.likes - 1, 0),
              }
            : tweet
        )
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleDelete = async (tweetId) => {
    if (!window.confirm("Are you sure you want to delete this tweet?")) return;

    try {
      await deleteTweetApi(tweetId);
      setTweets((prev) => prev.filter((t) => t._id !== tweetId));
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  };

  const startEdit = (tweet) => {
    setEditingTweetId(tweet._id);
    setEditContent(tweet.content);
  };

  const cancelEdit = () => {
    setEditingTweetId(null);
    setEditContent("");
  };


  const saveEdit = async (tweetId) => {
    try {
      await updateTweetApi(tweetId, { content: editContent });

      setTweets((prev) =>
        prev.map((tweet) =>
          tweet._id === tweetId ? { ...tweet, content: editContent } : tweet
        )
      );

      setEditingTweetId(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update tweet:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTweetMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const removeMedia = () => {
    setNewTweetMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreateTweet = async () => {
    if (!newTweetContent.trim() && !newTweetMedia) return;

    try {
      const formData = new FormData();
      formData.append("content", newTweetContent);
      if (newTweetMedia) {
        formData.append("media", newTweetMedia);
      }

      const res = await createTweetApi(formData);
      const newTweet = res.data.data;

      setTweets((prev) => [newTweet, ...prev]);
      
      // Reset form
      setNewTweetContent("");
      setNewTweetMedia(null);
      setMediaPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) return `${interval}${unit[0]}`;
    }

    return "now";
  };

  if (loading) {
    return (
      <div className="tweet-feed-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="tweet-feed">
      {/* Sort Dropdown */}
      <div className="tweet-feed-header">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-dropdown"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Create Tweet Box */}
      {allowCreate && user && (
        <div className="create-tweet-container">
          <div className="create-tweet-avatar">
            <img 
              src={user.avatar || "/default-avatar.png"} 
              alt={user.username} 
            />
          </div>
          <div className="create-tweet-content">
            <textarea
              className="create-tweet-input"
              placeholder="What is happening?!"
              value={newTweetContent}
              onChange={(e) => setNewTweetContent(e.target.value)}
              rows="2"
            />
            
            {mediaPreview && (
              <div className="media-preview">
                <img src={mediaPreview} alt="Preview" />
                <button className="remove-media-btn" onClick={removeMedia}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="create-tweet-actions">
              <div className="media-upload-btn" onClick={() => fileInputRef.current?.click()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              
              <button 
                className="tweet-submit-btn"
                onClick={handleCreateTweet}
                disabled={!newTweetContent.trim() && !newTweetMedia}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}

      {tweets.length === 0 ? (
        <div className="tweet-feed-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.86 4.86 0 0 0 15.11 4c-2.7 0-4.89 2.19-4.89 4.89 0 .38.04.75.13 1.1-4.06-.2-7.67-2.15-10.08-5.11a4.86 4.86 0 0 0 1.51 6.52 4.84 4.84 0 0 1-2.21-.61v.06c0 2.37 1.68 4.34 3.92 4.79-.41.11-.84.17-1.29.17-.31 0-.62-.03-.92-.08.62 1.94 2.43 3.35 4.57 3.39a9.76 9.76 0 0 1-6.04 2.08c-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/>
          </svg>
          <h3>No tweets yet</h3>
          <p>Start sharing your thoughts!</p>
        </div>
      ) : (
        <div className="tweet-feed-container">
          {tweets.map((tweet) => (
            <div key={tweet._id} className="tweet-card">
              <Link
                to={`/channel/${tweet.owner?.username}`}
                className="tweet-avatar"
              >
                <img
                  src={tweet.owner?.avatar || "/default-avatar.png"}
                  alt={tweet.owner?.username}
                />
              </Link>

              <div className="tweet-content-wrapper">
                <div className="tweet-header">
                  <Link
                    to={`/channel/${tweet.owner?.username}`}
                    className="tweet-author"
                  >
                    <span className="author-name">
                      {tweet.owner?.username}
                    </span>
                    <span className="author-username">
                      @{tweet.owner?.username}
                    </span>
                  </Link>
                  <span className="tweet-time">
                    · {formatTimeAgo(tweet.createdAt)}
                  </span>
                </div>

                {editingTweetId === tweet._id ? (
                  <div className="tweet-edit">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="tweet-edit-input"
                      rows="3"
                    />
                    <div className="tweet-edit-actions">
                      <button onClick={cancelEdit} className="btn-secondary">
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(tweet._id)}
                        className="btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="tweet-text">{tweet.content}</p>

                    {tweet.media && (
                      <div className="tweet-image">
                        <img src={tweet.media} alt="Tweet media" />
                      </div>
                    )}

                    <div className="tweet-actions">
                      <button
                        onClick={() => handleLike(tweet._id)}
                        className={`action-btn ${
                          tweet.isLiked ? "liked" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill={tweet.isLiked ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        <span>{tweet.likes || 0}</span>
                      </button>

                      {isEditable && tweet.owner?._id === user?._id && (
                        <>
                          <button
                            onClick={() => startEdit(tweet)}
                            className="action-btn"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                            </svg>
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(tweet._id)}
                            className="action-btn delete"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                            <span>Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetFeed;

