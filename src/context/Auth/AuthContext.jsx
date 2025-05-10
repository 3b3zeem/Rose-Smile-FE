// src/context/AuthContext.jsx
import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  // logout endpoint and clear user
  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACK_END}/api/v1/auth/logout`, {
        withCredentials: true,
      });
    } finally {
      localStorage.clear();
    }
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

// custom hook to read context
export const useAuthContext = () => useContext(AuthContext);
