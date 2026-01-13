import { Routes, Route } from "react-router-dom";
import LikedVideos from "../src/Pages/LikedVideos/LikedVideos.jsx";
import Home from "../src/Pages/Home/Home.jsx";
import PublishStudio from "../src/Pages/PublishStudio/PublishStudio.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import AppLayout from "./Layout/AppLayout.jsx";
import YourVideos from '../src/Pages/YourVideos/YourVideos.jsx'
import UpdateVideo from '../src/Pages/PublishStudio/UpdateVideo.jsx'
import VideoPage from "../src/Pages/VideoView/VideoPage.jsx";
import WatchHistory from "../src/Pages/WatchHistory/WatchHistory.jsx";
import ChannelPage from '../src/Pages/Channel/ChannelPage.jsx'

function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* FIX: index route */}
          <Route index element={<Home />} />

          <Route path="channel/:username" element={<ChannelPage />} />

          <Route path="studio/upload" element={<PublishStudio />} />

          <Route path="your-videos" element={<YourVideos />} />

          <Route path="liked-videos" element={<LikedVideos />} />

          <Route path="update-video/:videoId" element={<UpdateVideo />} />

          <Route path="video/:videoId" element={<VideoPage />} />

          <Route path="history" element={<WatchHistory />} />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
