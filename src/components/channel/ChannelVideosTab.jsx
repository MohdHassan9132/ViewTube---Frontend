import { useEffect, useState } from "react";
import { getAllVideosApi } from "../../api/video/videoApi";
import VideoGrid from "../Video/VideoGrid/VideoGrid";

function ChannelVideosTab({ userId }) {
  const [videos, setVideos] = useState([]);
  const [sortType, setSortType] = useState("latest");

  async function loadVideos() {
    try {
      const res = await getAllVideosApi({userId});
      const list = res.data?.data?.videos || [];
      sortVideos(list);
    } catch (err) {
      console.log(err);
    }
  }

  function sortVideos(list) {
    let sorted = [...list];

    if (sortType === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "popular") {
      sorted.sort((a, b) => b.views - a.views);
    }

    setVideos(sorted);
  }

  useEffect(() => {
    loadVideos();
  }, [userId]);

  useEffect(() => {
    sortVideos(videos);
  }, [sortType]);

  return (
    <div>
        <div className="tab-sort-row">
      <button
        className={sortType === "latest" ? "active" : ""}
        onClick={() => setSortType("latest")}
      >
        Latest
      </button>

      <button
        className={sortType === "oldest" ? "active" : ""}
        onClick={() => setSortType("oldest")}
      >
        Oldest
      </button>

      <button
        className={sortType === "popular" ? "active" : ""}
        onClick={() => setSortType("popular")}
      >
        Popular
      </button>
      </div>
      <VideoGrid videos={videos} />
    </div>
  );
}

export default ChannelVideosTab;
