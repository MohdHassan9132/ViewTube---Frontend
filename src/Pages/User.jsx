import Register from "../components/User/Register";
import Login from "../components/User/Login";
import Logout from "../components/User/Logout";
import GetUser from "../components/User/GetUser";
import UserCard from "../components/User/UserCard";
import UpdateUserDetails from "../components/User/UpdateUserDetails";
import ChangePassword from "../components/User/ChangePassword";
import UpdateAvatar from "../components/User/UpdateAvatar";
import UpdateCoverImage from "../components/User/UpdateCoverImage";
import GetChannelProfile from "../components/User/GetChannelProfile";
import GetWatchHistory from "../components/User/GetWatchHistory";

function Users() {
  return (
    <div>
      <h1>User Functions</h1>

      <Register />
      <Login />

      <GetUser />
      <UserCard />

      <UpdateUserDetails />
      <ChangePassword />
      <UpdateAvatar />
      <UpdateCoverImage />
      <GetChannelProfile />
      <GetWatchHistory />

      <Logout />
    </div>
  );
}

export default Users;
