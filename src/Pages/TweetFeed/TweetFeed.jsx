import { useEffect, useState } from "react";
import { getUserTweetsApi } from "../../api/tweet/tweetApi";
import TweetFeedCard from "../../components/Tweet/TweetFeedCard/TweetFeedCard";
import CreateTweet from "../../components/Tweet/CreateTweet/CreateTweet"; 
import "./TweetFeed.css";

function TweetFeed() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  async function loadTweets() {
    try {
      setLoading(true);

      const res = await getUserTweetsApi({
        page: 1,
        limit: 50,
        sortBy: "createdAt",
        sortType: "desc",
      });

      setTweets(res.data?.data || []);
    } catch (err) {
      console.log("Tweet Load Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTweets();
  }, []);

  // refresh tweets after creating one
  const handleTweetCreated = () => {
    setShowCreate(false);
    loadTweets();
  };

  return (
    <div className="tweetfeed-container">

      <div className="tweetfeed-center-column">

        {loading && <p className="tweetfeed-loading">Loading tweets...</p>}

        {!loading && tweets.length === 0 && (
          <p className="tweetfeed-empty">No tweets found</p>
        )}

        {tweets.map((tweet) => (
          <TweetFeedCard key={tweet._id} tweet={tweet} />
        ))}

      </div>

      <button
        className="tweetfeed-create-btn"
        onClick={() => setShowCreate(true)}
      >
        + Create
      </button>

      {showCreate && (
        <CreateTweet
          onClose={() => setShowCreate(false)}
          onCreated={handleTweetCreated}
        />
      )}
    </div>
  );
}

export default TweetFeed;
