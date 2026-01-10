import { useEffect, useState } from "react";
import { getWatchHistoryApi } from "../api/user/userApi.js";
import VideoGrid from "../components/Video/VideoGrid.jsx";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const res = await getWatchHistoryApi();

      // API returns watchHistory array of video objects
      setHistory(res.data?.data?.watchHistory || []);

    } catch (err) {
      console.log("HISTORY ERROR:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading watch history...</p>;

  return (
    <div className="home-main">
      <h2 style={{ marginBottom: "15px", color: "#10b981" }}>Watch History</h2>

      <VideoGrid videos={history} />
    </div>
  );
}

export default WatchHistory;
