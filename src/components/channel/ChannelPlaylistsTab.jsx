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
        <PlaylistCard key={pl._id} playlist={pl} />
      ))}
    </div>
  );
}

export default ChannelPlaylistsTab;
