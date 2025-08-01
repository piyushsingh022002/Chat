import React, { createContext, useState, useContext, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

type AuthContextType = {
  token: string | null;
  username: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(() => {
    try {
      return token ? (jwtDecode(token) as any).unique_name : null;
    } catch {
      return null;
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUsername((jwtDecode(token) as any).unique_name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
