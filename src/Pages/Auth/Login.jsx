import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../../api/user/userApi";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { setUser, reloadUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {};
      if (data.username.trim()) payload.username = data.username;
      if (data.email.trim()) payload.email = data.email;
      payload.password = data.password;

      const res = await loginUserApi(payload);

      // Save user in context
      setUser(res.data.data);
      localStorage.setItem("userId", res.data.data._id);

      // Reload user from backend
      await reloadUser();

      navigate("/"); // go home

    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid Credentials");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input name="username" placeholder="Username (optional)" onChange={handleChange} />
        <input name="email" placeholder="Email (optional)" onChange={handleChange} />

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

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <Link className="auth-link" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
