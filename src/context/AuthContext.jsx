import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/user/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // --- FIX: define loadUser OUTSIDE useEffect ---
  const loadUser = async () => {
    try {
      const res = await getUserApi();
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authChecked,
        reloadUser: loadUser, // now works
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
