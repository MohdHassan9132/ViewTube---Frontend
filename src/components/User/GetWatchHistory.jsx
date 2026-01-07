import { useState } from "react";
import { getWatchHistoryApi } from "../../api/user/userApi.js";

function GetWatchHistory() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  async function handleClick() {
    try {
      const res = await getWatchHistoryApi();
      console.log(res.data);

      setHistory(res.data.data.watchHistory);
      setMessage("");

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error loading watch history");
    }
  }

  return (
    <div>
      <h2>Watch History</h2>

      <button onClick={handleClick}>Load Watch History</button>

      {message && <p>{message}</p>}

      {history.length > 0 && (
        <div>
          {history.map((video, i) => (
            <div key={i}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p>Views: {video.views}</p>
              <p>Duration: {video.duration}</p>

              {video.thumbnail && (
                <img src={video.thumbnail} width="200" alt="thumbnail" />
              )}

              <p>
                Owner: {video.owner?.username}
              </p>

              {video.owner?.avatar && (
                <img src={video.owner.avatar} width="60" alt="owner avatar" />
              )}

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetWatchHistory;
