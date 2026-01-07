import { useState } from "react";
import { updateVideoApi } from "../../api/video/videoApi";

function UpdateVideo() {
  const [videoId, setVideoId] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleThumbnailChange(e) {
    setThumbnail(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!videoId.trim()) {
      setMessage("Enter video ID first");
      return;
    }

    const formData = new FormData();

    if (data.title.trim() !== "") formData.append("title", data.title);
    if (data.description.trim() !== "") formData.append("description", data.description);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const res = await updateVideoApi(videoId, formData);
      console.log(res.data);

      setMessage("Video updated successfully.");
    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error updating video");
    }
  }

  return (
    <div>
      <h2>Update Video</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          placeholder="Enter video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <br /><br />

        <input
          name="title"
          placeholder="New Title (optional)"
          onChange={handleInputChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="New Description (optional)"
          onChange={handleInputChange}
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        <br /><br />

        <button type="submit">Update Video</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateVideo;
