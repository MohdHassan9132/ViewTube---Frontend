import { logoutUserApi } from "../../api/user/userApi";

function Logout({ onLogout }) {

  async function handleLogout() {
    const res = await logoutUserApi();
    console.log(res.data);

    if (onLogout) onLogout(); // parent can clear user state
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
