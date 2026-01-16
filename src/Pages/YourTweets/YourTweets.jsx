import { useEffect, useState } from "react";
import { getUserTweetsApi, updateTweetApi, deleteTweetApi } from "../../api/tweet/tweetApi";
import TweetFeedCard from "../../components/Tweet/TweetFeedCard/TweetFeedCard";
import { useAuth } from "../../context/AuthContext";
import "./YourTweets.css";

function YourTweets() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTweets() {
    setLoading(true);
    try {
      const res = await getUserTweetsApi({
        userId: user._id,
        page: 1,
        limit: 50,
        sortBy: "createdAt",
        sortType: "asc" // <-- ascending order
      });

      setTweets(res.data?.data || []);
    } catch (err) {
      console.log("MY TWEETS ERROR:", err);
    }
    setLoading(false);
  }

  const handleUpdate = async (tweetId, content) => {
    try {
      const res = await updateTweetApi(tweetId, { content });

      const updated = res.data.data;

      setTweets(prev =>
        prev.map(t => (t._id === tweetId ? updated : t))
      );
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await deleteTweetApi(tweetId);
      setTweets(prev => prev.filter(t => t._id !== tweetId));
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  useEffect(() => {
    loadTweets();
  }, [user._id]);

  return (
    <div className="yourtweets-container">
      <div className="yourtweets-column">

        <h2 className="yourtweets-title">Your Tweets</h2>

        {loading && <p>Loading...</p>}

        {tweets.map(tweet => (
          <TweetFeedCard
            key={tweet._id}
            tweet={tweet}
            editable={true}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}

      </div>
    </div>
  );
}

export default YourTweets;
