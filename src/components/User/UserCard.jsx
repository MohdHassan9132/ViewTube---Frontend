function UserCard({ user }) {
  if (!user) return null;

  return (
    <div>
      <h3>User Info</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.fullName}</p>
      {user.avatar && <img src={user.avatar} width="100" />}
    </div>
  );
}

export default UserCard;
