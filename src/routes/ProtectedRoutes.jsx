import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Still checking user
  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Logged in → render the children pages
  return <Outlet />;
}

export default ProtectedRoute;
