import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_ME } from '../apollo/queries';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const client = useApolloClient();

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const { data } = await client.query({
            query: GET_ME,
            errorPolicy: 'ignore'
          });
          if (data?.me) {
            setUser(data.me);
          } else {
            // Token inválido
            logout();
          }
        } catch (error) {
          console.error('Error verificando autenticación:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token, client]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    client.clearStore();
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

