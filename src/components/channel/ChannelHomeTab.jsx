import { useEffect, useState } from "react";
import { getAllVideosApi } from "../../api/video/videoApi";
import { getUserTweetsApi } from "../../api/tweet/tweetApi";
import VideoGrid from "../Video/VideoGrid/VideoGrid";
import TweetCard from "./TweetCard";

function ChannelHomeTab({ userId }) {
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);

  // Load videos sorted by views
  async function loadHomeVideos() {
    try {
      const res = await getAllVideosApi({ userId });
      const list = res.data?.data?.videos || [];
      const sorted = list.sort((a, b) => b.views - a.views);
      setVideos(sorted.slice(0, 5));
    } catch (err) {
      console.log("VIDEOS ERROR:", err);
    }
  }

  // Load tweets (latest first)
  async function loadHomeTweets() {
    console.log("🔍 DEBUG — Calling tweet API with userId =", userId);

    try {
      const res = await getUserTweetsApi({
        userId,
        page: 1,
        limit: 5,
        sortBy: "createdAt",
        sortType: "desc",
      });

      console.log("📥 DEBUG — Tweet API Raw Response:", res);

      const data = res.data?.data;
      console.log("📥 DEBUG — Extracted Tweets Array:", data);

      if (!Array.isArray(data)) {
        console.log("❌ DEBUG — Tweets response is NOT an array");
      } else if (data.length === 0) {
        console.log("⚠️ DEBUG — Tweet API returned an EMPTY list for this user");
      }

      setTweets(data || []);
    } catch (err) {
      console.log("❌ DEBUG — Tweet API ERROR:", err.response?.data || err);
    }
  }

  useEffect(() => {
    if (!userId) {
      console.log("⚠️ DEBUG — userId is missing in ChannelHomeTab");
      return;
    }

    console.log("🔄 DEBUG — ChannelHomeTab mounted with userId:", userId);

    loadHomeVideos();
    loadHomeTweets();
  }, [userId]);

return (
  <div className="channel-home-tab">

    <div className="section-block">
      <div className="featured-video-box">
        <p>Featured video area — future implementation</p>
      </div>
    </div>

    <div className="section-block">
      <h3 className="section-title">For You</h3>
      <VideoGrid videos={videos} />
    </div>

    <div className="section-block">
      <h3 className="section-title">Videos</h3>
      <VideoGrid videos={videos} />
    </div>

    <div className="section-block">
      <h3 className="section-title">Latest Tweets</h3>
      <div className="tweet-list">
        {tweets.map((t) => (
          <TweetCard key={t._id} tweet={t} />
        ))}
      </div>
    </div>

  </div>
);

}

export default ChannelHomeTab;
