import { useEffect, useState } from "react";
import { getChannelPlaylistsApi } from "../../api/channel/channelApi";
import PlaylistCard from "./PlaylistCard";

function ChannelPlaylistsTab({ userId }) {
  const [playlists, setPlaylists] = useState([]);

  async function loadPlaylists() {
    try {
      const res = await getChannelPlaylistsApi(userId);
      setPlaylists(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadPlaylists();
  }, [userId]);

return (
  <div className="playlist-grid">
    {playlists.map((pl) => (
      <div
        key={pl._id}
        className="playlist-click-wrapper"
        onClick={() => alert(`Playlist feature comming soon`)}
        style={{ cursor: "pointer" }}
      >
        <PlaylistCard playlist={pl} />
      </div>
    ))}
  </div>
);

}

export default ChannelPlaylistsTab;
