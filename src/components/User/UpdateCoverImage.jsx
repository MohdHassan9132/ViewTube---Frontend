import { useState } from "react";
import { updateCoverImageApi } from "../../api/user/userApi";

function UpdateCoverImage({ onCoverUpdate }) {
  const [cover, setCover] = useState(null);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    setCover(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cover) {
      setMessage("Please select a cover image file");
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", cover);

    try {
      const res = await updateCoverImageApi(formData);
      console.log(res.data);

      setMessage("Cover image updated successfully");

      if (onCoverUpdate) onCoverUpdate(res.data.data);

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error updating cover image");
    }
  }

  return (
    <div>
      <h2>Update Cover Image</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload New Cover Image</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateCoverImage;
