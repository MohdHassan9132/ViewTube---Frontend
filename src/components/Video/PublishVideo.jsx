import { useState } from "react";
import { publishVideoApi } from "../../api/video/videoApi";

function PublishVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleVideoChange(e) {
    setVideoFile(e.target.files[0]);
  }

  function handleThumbnailChange(e) {
    setThumbnail(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!videoFile || !thumbnail || !data.title || !data.description) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const res = await publishVideoApi(formData);
      console.log(res.data);

      setMessage("Video published successfully!");

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Upload failed");
    }
  }

  return (
    <div>
      <h2>Publish Video</h2>

      <form onSubmit={handleSubmit}>

        Video: <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
        />
        <br />

        Thumbnail: <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        <br />

        <input
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
        />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <br />

        <button type="submit">Publish</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PublishVideo;
