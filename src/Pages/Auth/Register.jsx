import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "../../api/user/userApi";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: ""
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleAvatar(e) {
    setAvatar(e.target.files[0]);
  }

  function handleCover(e) {
    setCoverImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("username", data.username);
      form.append("email", data.email);
      form.append("fullName", data.fullName);
      form.append("password", data.password);

      if (avatar) form.append("avatar", avatar);
      if (coverImage) form.append("coverImage", coverImage);

      await registerUserApi(form);

      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />

        {/* Consistent Password Field */}
        <div className="password-field">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>
            👁
          </span>
        </div>

        <label className="file-label">Avatar</label>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleAvatar}
        />

        <label className="file-label">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleCover}
        />

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <Link className="auth-link" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
