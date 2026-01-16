import { useState } from "react";
import { changePasswordApi } from "../../api/user/userApi";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await changePasswordApi({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });

      setMessage("Password updated successfully");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Change Password</h2>

        <div className="password-field">
          <input
            type={showOldPass ? "text" : "password"}
            name="currentPassword"
            placeholder="Current Password"
            onChange={handleChange}
          />
          <span className="eye-toggle" onClick={() => setShowOldPass(!showOldPass)}>👁</span>
        </div>

        <div className="password-field">
          <input
            type={showNewPass ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
          />
          <span className="eye-toggle" onClick={() => setShowNewPass(!showNewPass)}>👁</span>
        </div>

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
