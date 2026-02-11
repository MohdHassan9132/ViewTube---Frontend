import React, { useState } from "react";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import TweetFeed from "../../components/TweetFeed/TweetFeed";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="home-page">
      <div className="home-tabs">
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
          <span>Videos</span>
        </button>
        
        <button
          className={`tab-btn ${activeTab === "tweets" ? "active" : ""}`}
          onClick={() => setActiveTab("tweets")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.86 4.86 0 0 0 15.11 4c-2.7 0-4.89 2.19-4.89 4.89 0 .38.04.75.13 1.1-4.06-.2-7.67-2.15-10.08-5.11a4.86 4.86 0 0 0 1.51 6.52 4.84 4.84 0 0 1-2.21-.61v.06c0 2.37 1.68 4.34 3.92 4.79-.41.11-.84.17-1.29.17-.31 0-.62-.03-.92-.08.62 1.94 2.43 3.35 4.57 3.39a9.76 9.76 0 0 1-6.04 2.08c-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/>
          </svg>
          <span>Tweets</span>
        </button>
      </div>

      <div className="home-content">
        {activeTab === "videos" ? <VideoGrid /> : <TweetFeed allowCreate={true} />}
      </div>
    </div>
  );
};

export default Home;
