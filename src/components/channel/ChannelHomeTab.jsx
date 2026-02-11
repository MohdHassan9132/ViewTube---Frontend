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

      const sorted = [...list].sort((a, b) => b.views - a.views);
      setVideos(sorted.slice(0, 5));
    } catch (err) {
      console.log("VIDEOS ERROR:", err);
    }
  }

  // Load latest tweets (with isLiked already included)
  async function loadHomeTweets() {
    try {
      const res = await getUserTweetsApi({
        userId,
        page: 1,
        limit: 5,
        sortBy: "createdAt",
        sortType: "desc",
      });

      setTweets(res.data?.data || []);
    } catch (err) {
      console.log("TWEETS ERROR:", err);
    }
  }

  useEffect(() => {
    if (!userId) return;

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
          {tweets.length === 0 && <p>No tweets yet.</p>}

          {tweets.map(tweet => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}   // 👈 contains isLiked
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ChannelHomeTab;
