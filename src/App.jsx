import { Routes, Route, Link } from "react-router-dom";
import Users from "../src/Pages/User.jsx";
import Videos from "../src/pages/Videos.jsx";

function App() {
  return (
    <div>

      {/* Simple navigation */}
      <nav>
        <Link to="/users">Users</Link>
        <Link to="/videos">Videos</Link>
      </nav>

      {/* Routing */}
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>

    </div>
  );
}

export default App;
