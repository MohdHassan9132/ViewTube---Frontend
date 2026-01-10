import { useState } from "react";
import { publishVideoApi } from "../../api/video/videoApi";

function PublishVideoForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [data, setData] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState({ thumbnailURL: "", videoURL: "" });

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleVideo(e) {
    const f = e.target.files[0];
    setVideoFile(f);
    setPreview((p) => ({ ...p, videoURL: URL.createObjectURL(f) }));
  }

  function handleThumbnail(e) {
    const f = e.target.files[0];
    setThumbnail(f);
    setPreview((p) => ({ ...p, thumbnailURL: URL.createObjectURL(f) }));
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
      await publishVideoApi(formData);
      setMessage("Video published successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading video");
    }
  }

  return (
    <div className="upload-section">
      <form className="upload-form" onSubmit={handleSubmit}>

        <label>Video File</label>
        <input type="file" accept="video/*" onChange={handleVideo} />

        <label>Thumbnail Image</label>
        <input type="file" accept="image/*" onChange={handleThumbnail} />

        <label>Title</label>
        <input name="title" placeholder="Enter title..." onChange={handleInput} />

        <label>Description</label>
        <textarea name="description" placeholder="Enter description..." onChange={handleInput} />

        <button type="submit" className="upload-btn">Publish Video</button>

        {message && <p className="message">{message}</p>}
      </form>

      <div className="preview-box">
        <h3>Preview</h3>

        {preview.thumbnailURL && <img src={preview.thumbnailURL} className="preview-thumb" />}

        {preview.videoURL && <video src={preview.videoURL} controls className="preview-video" />}
      </div>
    </div>
  );
}

export default PublishVideoForm;
