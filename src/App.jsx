import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home/Home";
import VideoView from "./pages/VideoView/VideoView";
import ChannelPage from "./pages/Channel/ChannelPage";
import LikedVideos from "./pages/LikedVideos/LikedVideos";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import YourVideos from "./pages/YourVideos/YourVideos";
import YourTweets from "./pages/YourTweets/YourTweets";
import PublishVideo from "./pages/PublishVideo/PublishVideo";
import UpdateVideo from "./pages/PublishVideo/UpdateVideo";
import SubscribersPage from "./pages/Subscribers/SubscribersPage";
import YourPlaylists from "./Pages/YourPlaylist/YourPlaylists";
import PlaylistView from "./pages/PlaylistView/PlaylistView";
import UpdateProfile from "./pages/Auth/UpdateProfile";
import ChangePassword from "./pages/Auth/ChangePassword";

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
