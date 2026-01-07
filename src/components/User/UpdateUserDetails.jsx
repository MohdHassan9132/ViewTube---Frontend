import { useState } from "react";
import { updateUserDetailsApi } from "../../api/user/userApi";

function UpdateUserDetails({ onUpdate }) {
  const [form, setForm] = useState({
    username: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {};

    // only include fields that user enters
    if (form.username.trim() !== "") payload.username = form.username;
    if (form.email.trim() !== "") payload.email = form.email;

    if (Object.keys(payload).length === 0) {
      setMessage("Enter at least one field");
      return;
    }

    try {
      const res = await updateUserDetailsApi(payload);
      console.log(res.data);

      setMessage("Details updated successfully");

      if (onUpdate) onUpdate(res.data.data);
    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error updating details");
    }
  }

  return (
    <div>
      <h2>Update User Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="new username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="new email"
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateUserDetails;
