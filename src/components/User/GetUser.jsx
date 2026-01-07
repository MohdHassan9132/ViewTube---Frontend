import { getUserApi } from "../../api/user/userApi";

function GetUser({ onLoadUser }) {

  async function handleClick() {
    const res = await getUserApi();
    onLoadUser(res.data.data);
  }

  return (
    <div>
      <button onClick={handleClick}>Get User</button>
    </div>
  );
}

export default GetUser;
