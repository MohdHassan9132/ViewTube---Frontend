import { useState } from "react";
import { getUserChannelProfileApi } from "../../api/user/userApi.js";

function GetChannelProfile() {
  const [username, setUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) {
      setMessage("Enter a username");
      return;
    }

    try {
      const res = await getUserChannelProfileApi(username);
      console.log(res.data);
      setChannel(res.data.data);
      setMessage("");
    } catch (err) {
      console.log(err.response?.data || err);
      setMessage(err.response?.data?.message || "Error fetching profile");
    }
  }

  return (
    <div>
      <h2>Get Channel Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>

      {message && <p>{message}</p>}

      {channel && (
        <div>
          <h3>Channel Info</h3>

          <p>Username: {channel.username}</p>
          <p>Subscribers: {channel.subscribers}</p>
          <p>Subscribed To: {channel.subscribedTo}</p>
          <p>Is Subscribed: {channel.isSubscribed ? "Yes" : "No"}</p>

          {channel.avatar && (
            <img src={channel.avatar} width="80" alt="avatar" />
          )}

          {channel.coverImage && (
            <img src={channel.coverImage} width="200" alt="cover" />
          )}
        </div>
      )}
    </div>
  );
}

export default GetChannelProfile;
