import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ambil token langsung dari localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("auth_token");
  });

  // ambil user dengan guard JSON.parse
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth_user");

    if (!savedUser || savedUser === "undefined") return null;

    try {
      return JSON.parse(savedUser);
    } catch (err) {
      console.error("Invalid auth_user in localStorage", err);
      localStorage.removeItem("auth_user");
      return null;
    }
  });

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("auth_token", newToken);

    if (newUser) {
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("auth_user");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
