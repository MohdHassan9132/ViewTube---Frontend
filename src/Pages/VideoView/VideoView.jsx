import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getVideoByIdApi, recordVideoViewApi } from "../../api/video/videoApi";
import { toggleVideoLikeApi, toggleCommentLikeApi } from "../../api/like/likeApi";
import { toggleSubscriptionApi } from "../../api/subscription/subscriptionApi";
import {
  fetchCommentsApi,
  addCommentApi,
  deleteCommentApi,
  updateCommentApi
} from "../../api/comment/commentApi";
import "./VideoView.css";

const VideoView = () => {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  /* ===================== FETCH VIDEO ===================== */
  const fetchVideo = async () => {
    try {
      const res = await getVideoByIdApi(videoId);
      const v = res.data.data;

      setVideo({
  ...v,
  likes: Number(v.likes) || 0,
  isLiked: Boolean(v.isLiked),
  owner: {
    ...v.owner,
    subscribersCount: Number(v.owner.subscribers) || 0, // FIX
    isSubscribed: Boolean(v.owner.isSubscribed)
  }
});

      setIsLiked(Boolean(v.isLiked));
      setIsSubscribed(Boolean(v.owner.isSubscribed));

      await recordVideoViewApi(videoId);
    } catch (err) {
      console.error("Failed to fetch video:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== FETCH COMMENTS ===================== */
  const fetchComments = async () => {
    try {
      const res = await fetchCommentsApi(videoId);

const normalized = (res.data?.data?.comments || []).map(c => ({
  ...c,
  owner: c.commentBy,
  isLiked: Boolean(c.isLiked),
  likesCount: Number(c.likes) || 0   // FIX
}));


      setComments(normalized);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    if (!videoId) return;
    fetchVideo();
    fetchComments();
  }, [videoId]);

  /* ===================== VIDEO LIKE ===================== */
  const handleLike = async () => {
    try {
      const res = await toggleVideoLikeApi(videoId);
      const liked = res.data.data.liked;

      setVideo(prev => ({
        ...prev,
        isLiked: liked,
        likes: liked
          ? prev.likes + 1
          : Math.max(prev.likes - 1, 0)
      }));

      setIsLiked(liked);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  /* ===================== SUBSCRIBE ===================== */
const handleSubscribe = async () => {
  try {
    const res = await toggleSubscriptionApi(video.owner._id);

    const subscribed = !!res.data.data; // ✅ derive from backend

    setVideo(prev => ({
      ...prev,
      owner: {
        ...prev.owner,
        isSubscribed: subscribed,
        subscribersCount: subscribed
          ? prev.owner.subscribersCount + 1
          : Math.max(prev.owner.subscribersCount - 1, 0)
      }
    }));

    setIsSubscribed(subscribed);
  } catch (err) {
    console.error("Failed to toggle subscription:", err);
  }
};


  /* ===================== COMMENTS ===================== */
  const handleAddComment = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addCommentApi(videoId, newComment);
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleDeleteComment = async id => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteCommentApi(videoId, id);
      setComments(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const saveEditComment = async id => {
    try {
      await updateCommentApi(videoId, id, editContent);
      setComments(prev =>
        prev.map(c => (c._id === id ? { ...c, content: editContent } : c))
      );
      setEditingCommentId(null);
      setEditContent("");
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

const handleCommentLike = async (id) => {
  try {
    const res = await toggleCommentLikeApi(id);
    const liked = res.data.data.liked; 

    setComments(prev =>
      prev.map(c =>
        c._id === id
          ? {
              ...c,
              isLiked: liked,
              likesCount: liked
                ? c.likesCount + 1
                : Math.max(c.likesCount - 1, 0)
            }
          : c
      )
    );
  } catch (err) {
    console.error("Failed to toggle comment like:", err);
  }
};


  /* ===================== TIME ===================== */
  const formatTimeAgo = date => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const map = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, value] of Object.entries(map)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  /* ===================== RENDER ===================== */
  if (loading) {
    return (
      <div className="video-view-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="video-view-error">
        <h2>Video not found</h2>
      </div>
    );
  }

    return (
      <div className="video-view-page">
        <div className="video-view-container">
          <div className="video-player-section">
            <div className="video-player">
              <video controls autoPlay src={video.videoFile}>
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="video-info-section">
              <h1 className="video-title">{video.title}</h1>

              <div className="video-stats-actions">
                <div className="video-stats">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{formatTimeAgo(video.createdAt)}</span>
                </div>

                <div className="video-actions">
                  <button
                    onClick={handleLike}
                    className={`action-btn ${isLiked ? "liked" : ""}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span>{video.likes}</span>
                  </button>
                </div>
              </div>

              <div className="channel-info">
                <Link to={`/channel/${video.owner?.username}`} className="channel-avatar">
                  <img src={video.owner?.avatar || "/default-avatar.png"} alt={video.owner?.username} />
                </Link>

                <div className="channel-details">
                  <Link to={`/channel/${video.owner?.username}`} className="channel-name">
                    {video.owner?.fullName || video.owner?.username}
                  </Link>
                  <span className="channel-subscribers">
                    {video.owner?.subscribersCount || 0} subscribers
                  </span>
                </div>

                {video.owner?._id !== user?._id && (
                  <button
                    onClick={handleSubscribe}
                    className={`subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                )}
              </div>

              {video.description && (
                <div className="video-description">
                  <p>{video.description}</p>
                </div>
              )}
            </div>

            <div className="comments-section">
              <h3 className="comments-title">{comments.length} Comments</h3>

              <form onSubmit={handleAddComment} className="comment-form">
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt={user?.username}
                  className="comment-avatar"
                />
                <div className="comment-input-wrapper">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                  />
                  {newComment && (
                    <div className="comment-actions">
                      <button type="button" onClick={() => setNewComment("")} className="btn-cancel">
                        Cancel
                      </button>
                      <button type="submit" className="btn-comment">
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </form>

              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <Link to={`/channel/${comment.owner?.username}`} className="comment-avatar">
                      <img src={comment.owner?.avatar || "/default-avatar.png"} alt={comment.owner?.username} />
                    </Link>

                    <div className="comment-content">
                      <div className="comment-header">
                        <Link to={`/channel/${comment.owner?.username}`} className="comment-author">
                          {comment.owner?.username}
                        </Link>
                        <span className="comment-time">{formatTimeAgo(comment.createdAt)}</span>
                      </div>

                      {editingCommentId === comment._id ? (
                        <div className="comment-edit">
                          <input
                            type="text"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="comment-edit-input"
                          />
                          <div className="comment-edit-actions">
                            <button onClick={() => setEditingCommentId(null)} className="btn-cancel">
                              Cancel
                            </button>
                            <button onClick={() => saveEditComment(comment._id)} className="btn-comment">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="comment-text">{comment.content}</p>

                          <div className="comment-actions-row">
                            <button
                              onClick={() => handleCommentLike(comment._id)}
                              className={`comment-action-btn ${comment.isLiked ? "liked" : ""}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                              </svg>
                              <span>{comment.likesCount || 0}</span>
                            </button>

                            {comment.owner?._id === user?._id && (
                              <>
                                <button
                                  onClick={() => startEditComment(comment)}
                                  className="comment-action-btn"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(comment._id)}
                                  className="comment-action-btn delete"
                                >
                                  Delete
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default VideoView;
