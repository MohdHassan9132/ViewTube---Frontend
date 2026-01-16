import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { getChannelProfileApi } from "../../api/channel/channelApi";
import {toggleChannelSubscriptionApi} from '../../api/channel/channelApi'
import ChannelTabs from "../../components/channel/ChannelTabs";
import { useAuth } from "../../context/AuthContext";
import "../Channel/ChannelPage.css";
import { updateAvatarApi, updateCoverImageApi } from "../../api/user/userApi";
import { useNavigate } from "react-router-dom";



function ChannelPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username } = useParams();  // <-- FIXED
    const isOwner = user?.username === username;
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  const [showCoverEdit, setShowCoverEdit] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);



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

async function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("avatar", file);

  try {
    const res = await updateAvatarApi(form);
    setProfile(prev => ({ ...prev, avatar: res.data?.data }));
  } catch (err) {
    console.log("AVATAR UPLOAD ERR:", err);
  }
}

async function handleCoverUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("coverImage", file);

  try {
    const res = await updateCoverImageApi(form);
    setProfile(prev => ({ ...prev, coverImage: res.data?.data }));
  } catch (err) {
    console.log("COVER UPLOAD ERR:", err);
  }
}



  

  useEffect(() => {
    loadProfile();
  }, [username]);

  if (!profile) return <p>Loading channel...</p>;

  return (
    <div className="channel-page">

      <div
  className="channel-cover"
  onMouseEnter={() => isOwner && setShowCoverEdit(true)}
  onMouseLeave={() => setShowCoverEdit(false)}
>
  <img src={profile?.coverImage} className="channel-cover-img" />

  {isOwner && showCoverEdit && (
    <button
      className="edit-cover-btn"
      onClick={() => coverInputRef.current.click()}
    >
      ✏️ Edit Cover
    </button>
  )}

  <input
    type="file"
    accept="image/*"
    hidden
    ref={coverInputRef}
    onChange={handleCoverUpload}
  />
</div>



      <div className="channel-header">
        <div
  className="avatar-wrapper"
  onMouseEnter={() => isOwner && setShowAvatarEdit(true)}
  onMouseLeave={() => setShowAvatarEdit(false)}
>
  <img src={profile.avatar} className="channel-avatar" />

  {isOwner && showAvatarEdit && (
    <button
      className="edit-avatar-btn"
      onClick={() => avatarInputRef.current.click()}
    >
      ✏️
    </button>
  )}

  <input
    type="file"
    accept="image/*"
    hidden
    ref={avatarInputRef}
    onChange={handleAvatarUpload}
  />
</div>


        <div className="channel-info">
          <h2>{profile.username}</h2>
          <button
  className="subscribers-count-btn"
  onClick={() => navigate(`/channel/${username}/subscribers`)}
>
  {profile.subscribers} subscribers
</button>

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
