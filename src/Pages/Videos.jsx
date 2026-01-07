import GetVideoById from "../components/Video/GetVideoById.jsx";
import ListVideos from "../components/Video/ListVideos.jsx";
import PublishVideo from "../components/Video/PublishVideo.jsx";
import UpdateVideo from "../components/Video/UpdateVideo.jsx";
import DeleteVideo from "../components/Video/DeleteVideo.jsx";
import TogglePublishStatus from "../components/Video/TogglePublishStatus.jsx";
function Videos() {
  return (
    <div>
      <h1>Video Functions</h1>
      <ListVideos/>
      <PublishVideo/>
      <GetVideoById/>
      <UpdateVideo/>
      <DeleteVideo/>
      <TogglePublishStatus/>  
    </div>
  );
}

export default Videos;
