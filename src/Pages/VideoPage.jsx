import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import timeAgo from "../utils/timeago";

import {
  fetchCommentsApi,
  addCommentApi,
  deleteCommentApi
} from "../api/comment/commentApi";

import {
  getVideoByIdApi,
  recordVideoViewApi,
  getAllVideosApi,
} from "../api/video/videoApi";

import { toggleVideoLikeApi } from "../api/like/likeApi";
import { toggleSubscriptionApi } from "../api/subscription/subscriptionApi";

import "../styles/videoView.css";
import "../styles/comments.css";

function VideoPage() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // LOAD VIDEO DETAILS
  async function loadVideo() {
    try {
      const res = await getVideoByIdApi(videoId);
      setVideo(res.data?.data);
      await recordVideoViewApi(videoId);
    } catch (err) {
      console.log("VIDEO ERROR:", err);
    }
  }

  // LOAD RECOMMENDED VIDEOS
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

  // LOAD COMMENTS
  async function loadComments() {
    try {
      const res = await fetchCommentsApi(videoId);
      setComments(res.data?.data?.comments || []);
    } catch (err) {
      console.log("COMMENTS ERROR:", err);
    }
  }

  // ADD COMMENT
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

  // DELETE COMMENT
  async function handleDeleteComment(commentId) {
    try {
      await deleteCommentApi(videoId, commentId);
      loadComments();
    } catch (err) {
      console.log("DELETE COMMENT ERROR:", err);
    }
  }

  // LIKE TOGGLE
  async function handleToggleLike() {
    try {
      const res = await toggleVideoLikeApi(videoId);
      const liked = res.data?.data?.liked;

      setVideo(prev => ({
        ...prev,
        isLiked: liked ? 1 : 0,
        likes: liked ? prev.likes + 1 : prev.likes - 1
      }));
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
    console.log("SUBSCRIPTION ERROR:", err);
  }
}


  // ON PAGE LOAD
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

      {/* LEFT SECTION */}
      <div className="video-left">

        <video
          src={video?.videoFile}
          controls
          autoPlay
          className="video-player"
        />

        <h2 className="video-title-main">{video?.title}</h2>

        <div className="video-stats-row">
          <p className="duration">
  {video?.views} views • {timeAgo(video?.createdAt)}
</p>


          <button
            className={`like-btn ${video?.isLiked ? "liked" : ""}`}
            onClick={handleToggleLike}
          >
            {video?.isLiked ? "👍 Liked" : "👍 Like"} • {video?.likes}
          </button>
        </div>

        {/* CHANNEL ROW */}
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
            {video.owner.isSubscribed ? "Subscribed" : "Subscribe"} • {video.owner.subscribers}
          </button>

        </div>

        {/* DESCRIPTION */}
        <div className="description-box">
          <p>{video?.description}</p>
        </div>

        {/* COMMENTS SECTION */}
        <div className="comments-section">

          <h3>Comments</h3>

          {/* COMMENT INPUT */}
          <div className="comment-input-row">
            <input
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="comment-post-btn" onClick={handleAddComment}>
              Post
            </button>
          </div>

          {/* COMMENTS LIST */}
          {comments?.length === 0 && (
            <p className="no-comments">No comments yet.</p>
          )}

          {comments?.map((c) => (
            <div className="comment-card" key={c?._id}>

              <img
                src={c?.commentBy?.avatar}
                className="comment-avatar"
                alt="avatar"
              />

              <div className="comment-body">
                <p className="comment-username">{c?.commentBy?.username}</p>
                <p className="comment-text">{c?.content}</p>
              </div>

              {c?.isOwner && (
                <button
                  className="comment-delete-btn"
                  onClick={() => handleDeleteComment(c?._id)}
                >
                  🗑️
                </button>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="video-right">
        {recommended?.map((v) => (
  <Link
    to={`/video/${v._id}`}
    key={v._id}
    className="recommend-card"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <img src={v.thumbnail} className="recommend-thumb" alt="thumb" />
    
    <div className="recommend-info">
      <h4>{v.title}</h4>
      <p>{v.owner?.username}</p>
      <p className="duration">
        {v.views} views • {timeAgo(v.createdAt)}
      </p>
    </div>
  </Link>
))}

      </div>

    </div>
  );
}

export default VideoPage;
