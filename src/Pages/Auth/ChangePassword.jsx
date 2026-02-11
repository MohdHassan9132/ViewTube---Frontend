import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordApi } from "../../api/user/userApi";
import "./Auth.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
  });
  
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await changePasswordApi(formData);
      setSuccess("Password changed successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Change Password</h1>
            <p>Update your password</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <div className="form-group">
              <label htmlFor="oldPassword">Current Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.old ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                >
                  {showPasswords.old ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
