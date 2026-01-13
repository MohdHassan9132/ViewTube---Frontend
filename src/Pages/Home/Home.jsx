import "../Home/Home.css";
import VideoGrid from "../../components/Video/VideoGrid/VideoGrid";

function Home() {
  return (
    <div className="home-main">

      <div className="home-header-row">
        <h2>Recommended Videos</h2>
      </div>

      <VideoGrid />
    </div>
  );
}

export default Home;
