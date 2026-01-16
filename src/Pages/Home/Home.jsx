import { useState } from "react";
import "../Home/Home.css";
import VideoGrid from "../../components/Video/VideoGrid/VideoGrid";
import TweetFeed from "../TweetFeed/TweetFeed";

function Home() {
  const [mode, setMode] = useState("video");

  return (
    <div className="home-main">

      <div className="home-header-row">

        {/* LEFT TITLE */}
        <h2 className="home-title">
          {mode === "video" ? "Recommended Videos" : "Recommended Tweets"}
        </h2>

        {/* RIGHT TOGGLE SWITCH */}
        <div className="home-toggle-bar">
          <button
            className={`home-toggle-btn ${mode === "video" ? "active" : ""}`}
            onClick={() => setMode("video")}
          >
            Videos
          </button>

          <button
            className={`home-toggle-btn ${mode === "tweet" ? "active" : ""}`}
            onClick={() => setMode("tweet")}
          >
            Tweets
          </button>
        </div>

      </div>

      {mode === "video" && <VideoGrid />}
      {mode === "tweet" && <TweetFeed />}
    </div>
  );
}

export default Home;
