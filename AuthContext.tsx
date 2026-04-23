
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('x-auth-token'));
  const [user, setUser] = useState<any>(null);

  const login = (newToken: string) => {
    localStorage.setItem('x-auth-token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('x-auth-token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      // Decode JWT normally here
      setUser({ role: 'admin' }); 
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
