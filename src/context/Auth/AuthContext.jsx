// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  check: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // fetch /me
  const check = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/auth/me",
        { withCredentials: true }
      );
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }, []);

  // on mount, validate session
  useEffect(() => {
    check();
  }, [check]);

  // logout endpoint and clear user
  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/auth/logout", {
        withCredentials: true,
      });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, check, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to read context
export const useAuthContext = () => useContext(AuthContext);
