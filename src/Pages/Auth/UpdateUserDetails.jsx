import { useState } from "react";
import { updateUserDetailsApi } from "../../api/user/userApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function UpdateUserDetails() {
  const navigate = useNavigate();
  const { user, reloadUser } = useAuth();

  const [data, setData] = useState({
    username: user?.username || "",
    email: user?.email || ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const updatePayload = {};
      if (data.username.trim()) updatePayload.username = data.username;
      if (data.email.trim()) updatePayload.email = data.email;

      await updateUserDetailsApi(updatePayload);

      await reloadUser();

      setMessage("Profile updated");
      setTimeout(() => navigate("/"), 1200);

    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <input
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateUserDetails;
