import React, { createContext, useContext, useState, useEffect } from 'react';
import { IAdmin } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  admin: IAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, admin: IAdmin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setAdmin(res.data.data);
        } catch (error) {
          console.error('Auth verification failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = (newToken: string, newAdmin: IAdmin) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setAdmin(newAdmin);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
