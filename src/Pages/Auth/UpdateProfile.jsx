import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserDetailsApi } from "../../api/user/userApi";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, reloadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
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
      await updateUserDetailsApi(formData);
      await reloadUser();
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate(`/channel/${user.username}`), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Update Profile</h1>
            <p>Update your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
