import { useState } from "react";
import { getVideoByIdApi } from "../../api/video/videoApi";

function GetVideoById() {
  const [videoId, setVideoId] = useState("");
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!videoId.trim()) {
      setMessage("Please enter a video ID");
      return;
    }

    try {
      const res = await getVideoByIdApi(videoId);
      console.log(res.data);

      setVideo(res.data.data);
      setMessage("");

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error fetching video");
    }
  }

  return (
    <div>
      <h2>Get Video By ID</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter video ID"
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>

      {message && <p>{message}</p>}

      {video && (
        <div>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <p>Views: {video.views}</p>
          <p>Owner: {video.owner?.username}</p>
          <p>Subscribers: {video.owner?.subscribersCount}</p>

          {video.thumbnail && (
            <img src={video.thumbnail} width="200" alt="thumbnail" />
          )}

          <br /><br />
          {video.videoFile && (
            <video width="400" controls src={video.videoFile}></video>
          )}

          <hr />
        </div>
      )}
    </div>
  );
}

export default GetVideoById;
