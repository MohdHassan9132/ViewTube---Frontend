import { useState } from "react";
import { deleteVideoApi } from "../../api/video/videoApi";

function DeleteVideo() {
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");

  async function handleDelete(e) {
    e.preventDefault();

    if (!videoId.trim()) {
      setMessage("Enter video ID first");
      return;
    }

    try {
      const res = await deleteVideoApi(videoId);
      console.log(res.data);

      setMessage("Video deleted successfully.");
      setVideoId("");

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error deleting video");
    }
  }

  return (
    <div>
      <h2>Delete Video</h2>

      <form onSubmit={handleDelete}>
        <input
          placeholder="Enter video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button type="submit">Delete</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteVideo;
