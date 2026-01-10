import ChannelHomeTab from "./ChannelHomeTab";
import ChannelVideosTab from "./ChannelVideosTab";
import ChannelPlaylistsTab from "./ChannelPlaylistsTab";
import ChannelTweetsTab from "./ChannelTweetsTab";

function ChannelTabs({ activeTab, setActiveTab, profile }) {
  return (
    <div className="channel-tabs-container">
      
      {/* TAB BUTTONS */}
      <div className="channel-tabs">
        <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
          Home
        </button>

        <button className={activeTab === "videos" ? "active" : ""} onClick={() => setActiveTab("videos")}>
          Videos
        </button>

        <button className={activeTab === "playlists" ? "active" : ""} onClick={() => setActiveTab("playlists")}>
          Playlists
        </button>

        <button className={activeTab === "tweets" ? "active" : ""} onClick={() => setActiveTab("tweets")}>
          Tweets
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="channel-tab-content">
        {activeTab === "home" && <ChannelHomeTab userId={profile._id} />}
        {activeTab === "videos" && <ChannelVideosTab userId={profile._id} />}
        {activeTab === "playlists" && <ChannelPlaylistsTab userId={profile._id} />}
        {activeTab === "tweets" && <ChannelTweetsTab userId={profile._id} />}
      </div>
    </div>
  );
}

export default ChannelTabs;
