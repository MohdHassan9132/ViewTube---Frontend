import { useState } from "react";
import { registerUserApi } from "../../api/user/userApi";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("fullName", form.fullName);
    data.append("password", form.password);

    if (avatar) data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);

    const res = await registerUserApi(data);
    console.log(res.data);
  }

  return (
    <div>
      <h2>Register</h2>

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

        {/* Full Name */}
        <input
          name="fullName"
          placeholder="full name"
          onChange={handleChange}
        />

        {/* Password + eye toggle */}
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

        {/* Avatar Upload */}
        <div>
          <label>Avatar</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label>Cover Image</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
