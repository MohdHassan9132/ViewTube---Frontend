import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AppLayout from "./layouts/AppLayout";
import Home from "./Pages/Home/Home";
import VideoView from "./Pages/VideoView/VideoView";
import ChannelPage from "./Pages/Channel/ChannelPage";
import LikedVideos from "./Pages/LikedVideos/LikedVideos";
import WatchHistory from "./Pages/WatchHistory/WatchHistory";
import YourVideos from "./Pages/YourVideos/YourVideos";
import YourTweets from "./Pages/YourTweets/YourTweets";
import PublishVideo from "./Pages/PublishVideo/PublishVideo";
import UpdateVideo from "./Pages/PublishVideo/UpdateVideo";
import SubscribersPage from "./Pages/Subscribers/SubscribersPage";
import YourPlaylists from "./Pages/YourPlaylist/YourPlaylists";
import PlaylistView from "./Pages/PlaylistView/PlaylistView";
import UpdateProfile from "./Pages/Auth/UpdateProfile";
import ChangePassword from "./Pages/Auth/ChangePassword";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="video/:videoId" element={<VideoView />} />
          <Route path="channel/:username" element={<ChannelPage />} />
          <Route path="channel/:username/subscribers" element={<SubscribersPage />} />
          <Route path="liked-videos" element={<LikedVideos />} />
          <Route path="history" element={<WatchHistory />} />
          <Route path="your-videos" element={<YourVideos />} />
          <Route path="your-tweets" element={<YourTweets />} />
          <Route path="your-playlists" element={<YourPlaylists />} />
          <Route path="playlist/:playlistId" element={<PlaylistView />} />
          <Route path="studio/upload" element={<PublishVideo />} />
          <Route path="update-video/:videoId" element={<UpdateVideo />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
