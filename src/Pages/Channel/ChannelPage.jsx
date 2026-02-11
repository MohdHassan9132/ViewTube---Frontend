import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserChannelProfileApi } from "../../api/user/userApi";
import { updateAvatarApi, updateCoverImageApi } from "../../api/user/userApi";
import { toggleSubscriptionApi } from "../../api/subscription/subscriptionApi";
import { getUserTweetsApi } from "../../api/tweet/tweetApi";
import { getAllVideosApi } from "../../api/video/videoApi";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import TweetFeed from "../../components/TweetFeed/TweetFeed";
import "./ChannelPage.css";

const ChannelPage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isOwnChannel = user?.username === username;

  useEffect(() => {
    fetchChannelData();
  }, [username]);

  const fetchChannelData = async () => {
    try {
      const res = await getUserChannelProfileApi(username);
      setChannel(res.data.data);
      setIsSubscribed(res.data.data.isSubscribed || false);
    } catch (error) {
      console.error("Failed to fetch channel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      await toggleSubscriptionApi(channel._id);
      setIsSubscribed(!isSubscribed);
      setChannel({
        ...channel,
        subscribersCount: isSubscribed ? channel.subscribersCount - 1 : channel.subscribersCount + 1
      });
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await updateAvatarApi(formData);
      setChannel({ ...channel, avatar: res.data.data.avatar });
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    try {
      const res = await updateCoverImageApi(formData);
      setChannel({ ...channel, coverImage: res.data.data.coverImage });
    } catch (error) {
      console.error("Failed to update cover:", error);
    }
  };

  if (loading) {
    return (
      <div className="channel-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="channel-error">
        <h2>Channel not found</h2>
      </div>
    );
  }

  return (
    <div className="channel-page">
      <div className="channel-cover">
        {channel.coverImage && (
          <img src={channel.coverImage} alt="Cover" className="cover-image" />
        )}
        {isOwnChannel && (
          <label className="cover-upload-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            <input type="file" accept="image/*" onChange={handleCoverUpload} hidden />
          </label>
        )}
      </div>

      <div className="channel-header">
        <div className="channel-avatar-wrapper">
          <img
            src={channel.avatar || "/default-avatar.png"}
            alt={channel.username}
            className="channel-avatar"
          />
          {isOwnChannel && (
            <label className="avatar-upload-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
            </label>
          )}
        </div>

        <div className="channel-info">
          <h1 className="channel-name">{channel.fullName || channel.username}</h1>
          <div className="channel-meta">
            <span>@{channel.username}</span>
            <span>•</span>
            <span>{channel.subscribers || 0} subscribers</span>
            <span>•</span>
            <span>{channel.Videos || 0} videos</span>
          </div>

        </div>

        {!isOwnChannel && (
          <button
            onClick={handleSubscribe}
            className={`subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      <div className="channel-tabs">
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`tab-btn ${activeTab === "tweets" ? "active" : ""}`}
          onClick={() => setActiveTab("tweets")}
        >
          Tweets
        </button>
        <button
          className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>

      <div className="channel-content">
        {activeTab === "videos" && <VideoGrid userId={channel._id} />}
        {activeTab === "tweets" && <TweetFeed userId={channel._id} isEditable={false} allowCreate={false} />}
        {activeTab === "about" && (
          <div className="about-section">
            <h3>About</h3>
            <p>Channel information coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
