import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import timeAgo from "../../utils/timeago";

import {
  fetchCommentsApi,
  addCommentApi,
  deleteCommentApi,
  updateCommentApi
} from "../../api/comment/commentApi";

import {
  getVideoByIdApi,
  recordVideoViewApi,
  getAllVideosApi
} from "../../api/video/videoApi";

import { toggleVideoLikeApi,toggleCommentLikeApi } from "../../api/like/likeApi";
import { toggleSubscriptionApi } from "../../api/subscription/subscriptionApi";

import { useAuth } from "../../context/AuthContext";

import "../VideoView/VideoView.css";
import "../VideoView/Comments.css";

function VideoPage() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  async function loadVideo() {
    try {
      const res = await getVideoByIdApi(videoId);
      setVideo(res.data?.data);
      await recordVideoViewApi(videoId);
    } catch (err) {
      console.log("VIDEO ERROR:", err);
    }
  }

  async function loadRecommended() {
    try {
      const res = await getAllVideosApi();
      setRecommended(
        res.data?.data?.videos?.filter(v => v?._id !== videoId) || []
      );
    } catch (err) {
      console.log("RECOMMENDED ERROR:", err);
    }
  }

  async function loadComments() {
    try {
      const res = await fetchCommentsApi(videoId);
      setComments(res.data?.data?.comments || []);
    } catch (err) {
      console.log("COMMENTS ERROR:", err);
    }
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    try {
      await addCommentApi(videoId, newComment);
      setNewComment("");
      loadComments();
    } catch (err) {
      console.log("ADD COMMENT ERROR:", err);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await deleteCommentApi(videoId, commentId);
      loadComments();
    } catch (err) {
      console.log("DELETE COMMENT ERROR:", err);
    }
  }

  async function handleUpdateComment(commentId) {
    if (!editingText.trim()) return;

    try {
      await updateCommentApi(videoId, commentId, editingText);
      setEditingCommentId(null);
      setEditingText("");
      loadComments();
    } catch (err) {
      console.log("UPDATE COMMENT ERROR:", err);
    }
  }

async function handleToggleLike() {
  try {
    const res = await toggleVideoLikeApi(videoId);
    const liked = res.data?.data?.liked;

    setVideo(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        isLiked: liked,
        likes: liked
          ? prev.likes + 1
          : Math.max(prev.likes - 1, 0)
      };
    });
  } catch (err) {
    console.log("LIKE ERROR:", err);
  }
}


  async function handleToggleSubscribe() {
    try {
      const res = await toggleSubscriptionApi(video.owner._id);
      const subscribed = res.data?.message?.includes("Subscribed");

      setVideo(prev => ({
        ...prev,
        owner: {
          ...prev.owner,
          isSubscribed: subscribed ? 1 : 0,
          subscribers: subscribed
            ? prev.owner.subscribers + 1
            : prev.owner.subscribers - 1
        }
      }));
    } catch (err) {
      console.log("SUB ERROR:", err);
    }
  }

  async function handleToggleCommentLike(commentId) {
  try {
    const res = await toggleCommentLikeApi(commentId);
    const liked = res.data?.data?.liked;

    setComments(prev =>
      prev.map(c =>
        c._id === commentId
          ? {
              ...c,
              isLiked: liked ? 1 : 0,
              likes: liked ? c.likes + 1 : c.likes - 1
            }
          : c
      )
    );
  } catch (err) {
    console.log("COMMENT LIKE ERROR:", err);
  }
}


  useEffect(() => {
    setLoading(true);
    loadVideo();
    loadRecommended();
    loadComments();
    setLoading(false);
  }, [videoId]);

  if (loading || !video) return <p>Loading video...</p>;

  return (
    <div className="video-view-container">

      {/* LEFT */}
      <div className="video-left">

        <video src={video?.videoFile} controls autoPlay className="video-player" />

        <h2 className="video-title-main">{video?.title}</h2>

        <div className="video-stats-row">
          <p className="duration">{video?.views} views • {timeAgo(video?.createdAt)}</p>

          <button
            className={`like-btn ${video?.isLiked ? "liked" : ""}`}
            onClick={handleToggleLike}
          >
            {video?.isLiked ? "👍 Liked" : "👍 Like"} • {video?.likes}
          </button>
        </div>

        {/* CHANNEL */}
        <div className="channel-row">
          <Link to={`/channel/${video.owner.username}`}>
            <img src={video?.owner?.avatar} className="channel-avatar" />
          </Link>

          <div className="channel-info">
            <h4>{video?.owner?.username}</h4>
            <p>{video?.owner?.subscribers} subscribers</p>
          </div>

          <button
            className={`sub-btn ${video.owner.isSubscribed ? "subscribed" : ""}`}
            onClick={handleToggleSubscribe}
          >
            {video.owner.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* DESCRIPTION */}
        <div className="description-box">
          <p>{video?.description}</p>
        </div>

        {/* COMMENTS */}
        <div className="comments-section">
          <h3>Comments</h3>

          {/* ADD COMMENT */}
          <div className="comment-input-row">
            <input
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button className="comment-post-btn" onClick={handleAddComment}>Post</button>
          </div>

          {/* NO COMMENTS */}
          {comments?.length === 0 && <p className="no-comments">No comments yet.</p>}

          {/* COMMENT LIST */}
{comments?.map(c => {

  const isOwner = c?.commentBy?._id === user?._id;

  const canEdit = isOwner;
  const canDelete = isOwner;

  return (
    <div className="comment-card" key={c._id}>
      
      <img src={c.commentBy.avatar} className="comment-avatar" />

      <div className="comment-body">
        <p className="comment-username">{c.commentBy.username}</p>

        {editingCommentId === c._id ? (
          <>
            <textarea
              className="comment-edit-input"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />

            <div className="comment-edit-actions">
              <button
                className="comment-save-btn"
                onClick={() => handleUpdateComment(c._id)}
              >
                Save
              </button>

              <button
                className="comment-cancel-btn"
                onClick={() => {
                  setEditingCommentId(null);
                  setEditingText("");
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="comment-text">{c.content}</p>
        )}

      </div>

<div className="comment-actions">

  <button
  className={`comment-heart-btn ${c.isLiked ? "active" : ""}`}
  onClick={() => handleToggleCommentLike(c._id)}
>
  {c.isLiked ? "❤️" : "🤍"}
</button>

  {canEdit && editingCommentId !== c._id && (
    <button
      className="comment-edit-btn"
      onClick={() => {
        setEditingCommentId(c._id);
        setEditingText(c.content);
      }}
    >
      ✏️
    </button>
  )}

  {canDelete && (
    <button
      className="comment-delete-btn"
      onClick={() => handleDeleteComment(c._id)}
    >
      🗑️
    </button>
  )}

</div>


    </div>
  );
})}

        </div>

      </div>

      {/* RIGHT */}
      <div className="video-right">
        {recommended?.map(v => (
          <Link
            to={`/video/${v._id}`}
            key={v._id}
            className="recommend-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={v.thumbnail} className="recommend-thumb" />

            <div className="recommend-info">
              <h4>{v.title}</h4>
              <p>{v.owner?.username}</p>
              <p className="duration">{v.views} views • {timeAgo(v.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default VideoPage;
