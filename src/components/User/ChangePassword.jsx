import { useState } from "react";
import { changePasswordApi } from "../../api/user/userApi";

function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.currentPassword.trim() || !form.newPassword.trim()) {
      setMessage("Both fields are required");
      return;
    }

    try {
      const res = await changePasswordApi(form);
      console.log(res.data);
      setMessage("Password changed successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error changing password");
    }
  }

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        {/* Current password */}
        <div>
          <input
            name="currentPassword"
            type={showCurrent ? "text" : "password"}
            placeholder="current password"
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>

        {/* New password */}
        <div>
          <input
            name="newPassword"
            type={showNew ? "text" : "password"}
            placeholder="new password"
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit">Update Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
