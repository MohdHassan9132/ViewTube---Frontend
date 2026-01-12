import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannelProfileApi } from "../api/channel/channelApi";
import {toggleChannelSubscriptionApi} from '../api/channel/channelApi'
import ChannelTabs from "../components/channel/ChannelTabs";

import "../styles/channel.css";

function ChannelPage() {
  const { username } = useParams();  // <-- FIXED
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  async function loadProfile() {
    try {
      const res = await getChannelProfileApi(username); // <-- FIXED
      setProfile(res.data?.data || null);
    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  }

async function handleToggleSubscribe() {
  try {
    const res = await toggleChannelSubscriptionApi(profile._id);

    const isSubscribed = res.data?.message?.includes("Subscribed");

    setProfile(prev => ({
      ...prev,
      isSubscribed: isSubscribed,
      subscribers: isSubscribed
        ? prev.subscribers + 1
        : prev.subscribers - 1
    }));
  } catch (err) {
    console.log("SUBSCRIBE ERROR:", err);
  }
}


  

  useEffect(() => {
    loadProfile();
  }, [username]);

  if (!profile) return <p>Loading channel...</p>;

  return (
    <div className="channel-page">

      <div className="channel-cover">
  <img src={profile?.coverImage} className="channel-cover-img" />
</div>


      <div className="channel-header">
        <img src={profile.avatar} className="channel-avatar" />

        <div className="channel-info">
          <h2>{profile.username}</h2>
          <p>{profile.subscribers} subscribers</p>
        </div>

<button 
  className={`sub-btn ${profile.isSubscribed ? "subscribed" : ""}`}
  onClick={handleToggleSubscribe}
>
  {profile.isSubscribed ? "Subscribed" : "Subscribe"}
</button>


      </div>

      <ChannelTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
      />
    </div>
  );
}

export default ChannelPage;
