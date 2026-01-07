import { useState } from "react";
import { loginUserApi } from "../../api/user/userApi";

function Login({ onLogin }) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {};

    if (data.username.trim() !== "") payload.username = data.username;
    if (data.email.trim() !== "") payload.email = data.email;

    payload.password = data.password;

    try {
        const res = await loginUserApi(payload);
        console.log(res.data);
        if (onLogin) onLogin();
    } catch (err) {
        console.log("LOGIN ERROR:", err.response?.data);
        alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        {/* Username */}
        <input
          name="username"
          placeholder="username"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        {/* Password + toggle */}
        <div>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
