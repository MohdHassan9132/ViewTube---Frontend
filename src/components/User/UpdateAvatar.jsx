import { useState } from "react";
import { updateAvatarApi } from "../../api/user/userApi";

function UpdateAvatar({ onAvatarUpdate }) {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    setAvatar(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!avatar) {
      setMessage("Please select an avatar file");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const res = await updateAvatarApi(formData);
      console.log(res.data);

      setMessage("Avatar updated successfully");

      if (onAvatarUpdate) onAvatarUpdate(res.data.data);

    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error updating avatar");
    }
  }

  return (
    <div>
      <h2>Update Avatar</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload New Avatar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateAvatar;
