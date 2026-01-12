import { Routes, Route } from "react-router-dom";
import LikedVideos from "./Pages/LikedVideos.jsx";
import Home from "./Pages/Home.jsx";
import PublishStudio from "./Pages/PublishStudio.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import AppLayout from "./Layout/AppLayout.jsx";
import YourVideos from './Pages/YourVideos.jsx'
import UpdateVideo from './Pages/UpdateVideo.jsx'
import VideoPage from "./Pages/VideoPage.jsx";
import WatchHistory from "./Pages/WatchHistory.jsx";
import ChannelPage from './Pages/ChannelPage.jsx'
function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
<Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/channel/:username" element={<ChannelPage />} />
    <Route path="/studio/upload" element={<PublishStudio hideSidebar/>} />
    <Route path="/your-videos" element={<YourVideos hideSidebar/>} />
    <Route path="/liked-videos" element={<LikedVideos hideSidebar />} />
    <Route path="/update-video/:videoId" element={<UpdateVideo hideSidebar/>} />
    <Route path="/video/:videoId" element={<VideoPage hideSidebar />} />
    <Route path="/history" element={<WatchHistory hideSidebar/>} />
  </Route>
</Route>



    </Routes>
  );
}

export default App;
