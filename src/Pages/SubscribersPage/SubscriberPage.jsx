import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getChannelProfileApi, getSubscribersChannelApi } from "../../api/channel/channelApi";
import "./SubscribersPage.css";

function SubscribersPage() {
  const { username } = useParams();

  const [channelId, setChannelId] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadChannelId() {
    try {
      const res = await getChannelProfileApi(username);
      setChannelId(res.data?.data?._id);
    } catch (err) {
      console.log("CHANNEL ID ERROR:", err);
    }
  }

  async function loadSubscribers(id) {
    try {
      const res = await getSubscribersChannelApi(id);
      setSubscribers(res.data?.data || []);
    } catch (err) {
      console.log("SUBSCRIBER ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadChannelId();
  }, [username]);

  useEffect(() => {
    if (channelId) loadSubscribers(channelId);
  }, [channelId]);

  if (loading) return <p>Loading subscribers...</p>;

  return (
    <div className="subs-page">
      <h2 className="subs-title">Subscribers</h2>

      {subscribers.length === 0 && (
        <p className="subs-empty">No subscribers yet.</p>
      )}

      <div className="subs-list">
        {subscribers.map((item) => (
          <Link
            key={item._id}
            to={`/channel/${item.subscriber.username}`}
            className="subs-card"
          >
            <img src={item.subscriber.avatar} className="subs-avatar" />
            <p className="subs-name">{item.subscriber.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubscribersPage;
