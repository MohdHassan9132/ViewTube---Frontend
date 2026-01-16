import { useState } from "react";
import { createTweetApi } from "../../../api/tweet/tweetApi";
import "./CreateTweet.css";

function CreateTweet({ onClose, onCreated }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) setMedia(file);
  };

  const removeMedia = () => setMedia(null);

  const handleCreate = async () => {
    if (!content.trim() && !media) return;

    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    setLoading(true);
    try {
      await createTweetApi(formData);
      onCreated();
    } catch (err) {
      console.log("CREATE ERROR:", err);
    }
    setLoading(false);
  };

  const isVideo = media && media.type.startsWith("video");
  const isImage = media && media.type.startsWith("image");

  return (
    <div className="createtweet-overlay">
      <div className="createtweet-box">

        <h3>Create Tweet</h3>

        <textarea
          className="createtweet-input"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* Media Preview */}
        {media && (
          <div className="createtweet-media-preview">
            {isImage && (
              <img src={URL.createObjectURL(media)} alt="preview" />
            )}

            {isVideo && (
              <video
                src={URL.createObjectURL(media)}
                controls
                className="createtweet-video"
              />
            )}

            <button className="createtweet-remove-media" onClick={removeMedia}>
              ✖
            </button>
          </div>
        )}

        {/* Upload */}
        <label className="createtweet-upload-btn">
          📎 Upload Media
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleMediaChange}
          />
        </label>

        {/* Actions */}
        <div className="createtweet-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="tweet-btn" onClick={handleCreate} disabled={loading}>
            {loading ? "Posting..." : "Tweet"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTweet;
