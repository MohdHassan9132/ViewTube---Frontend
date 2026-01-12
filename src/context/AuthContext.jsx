import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/user/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function loadUser() {
    try {
      const res = await getUserApi();
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked, reloadUser: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔴 THIS WAS MISSING
export const useAuth = () => useContext(AuthContext);
