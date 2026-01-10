import { useEffect, useState } from "react";
import { getChannelTweetsApi } from "../../api/channel/channelApi";
import TweetCard from "./TweetCard";

function ChannelTweetsTab({ userId }) {
  const [tweets, setTweets] = useState([]);

  async function loadTweets() {
    try {
      const res = await getChannelTweetsApi({ userId });
      setTweets(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadTweets();
  }, [userId]);

  return (
    <div className="tweet-list">
      {tweets.map((t) => (
        <TweetCard key={t._id} tweet={t} />
      ))}
    </div>
  );
}

export default ChannelTweetsTab;
