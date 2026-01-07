import { useState } from "react";
import { getAllVideosApi } from "../../api/video/videoApi";

function ListVideos() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");

  async function loadVideos() {
    try {
      const res = await getAllVideosApi();
      console.log(res.data);

      setVideos(res.data.data.videos);
      setMessage("");
    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Failed to load videos");
    }
  }

  return (
    <div>
      <h2>All Videos</h2>
      <button onClick={loadVideos}>Load Videos</button>

      {message && <p>{message}</p>}

      {videos.map((v) => (
        <div key={v._id}>
          <h3>{v.title}</h3>
          <p>{v.description}</p>
          <p>Views: {v.views}</p>
          <p>Owner: {v.owner.username}</p>
          <img src={v.thumbnail} width="200" />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ListVideos;
