function PlaylistCard({ playlist }) {
  return (
    <div className="playlist-card">
      <img src={playlist.playlistCoverImage} className="playlist-img" />
      
      <h4 className="playlist-title">{playlist.name}</h4>
      <p className="playlist-meta">
        {playlist.videos?.length || 0} videos
      </p>
    </div>
  );
}

export default PlaylistCard;
