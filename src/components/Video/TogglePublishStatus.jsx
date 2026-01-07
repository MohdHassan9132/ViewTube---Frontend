import { useState } from "react";
import { togglePublishStatusApi } from "../../api/video/videoApi";

function TogglePublishStatus() {
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");

  async function handleToggle(e) {
    e.preventDefault();

    if (!videoId.trim()) {
      setMessage("Enter video ID first");
      return;
    }

    try {
      const res = await togglePublishStatusApi(videoId);
      console.log(res.data);

      const newStatus = res.data?.data?.isPublished;
      setMessage(`Publish status updated: ${newStatus ? "PUBLISHED" : "UNPUBLISHED"}`);

      setVideoId("");

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error toggling status");
    }
  }

  return (
    <div>
      <h2>Toggle Publish Status</h2>

      <form onSubmit={handleToggle}>
        <input
          placeholder="Enter video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button type="submit">Toggle</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default TogglePublishStatus;
