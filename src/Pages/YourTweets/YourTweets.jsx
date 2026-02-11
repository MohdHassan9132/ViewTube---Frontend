import React from "react";
import { useAuth } from "../../context/AuthContext";
import TweetFeed from "../../components/TweetFeed/TweetFeed";
import "../LikedVideos/LikedVideos.css";

const YourTweets = () => {
  const { user } = useAuth();

  return (
    <div className="your-tweets-page">
      <div className="page-header">
        <h1>Your Tweets</h1>
      </div>
      {user && <TweetFeed userId={user._id} isEditable={true} allowCreate={false} />}
    </div>
  );
};

export default YourTweets;
