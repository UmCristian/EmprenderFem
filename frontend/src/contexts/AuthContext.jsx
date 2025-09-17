import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
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

  // Memoize the context value so that consumers only re-render when the underlying
  // state values change. Without useMemo the `value` object would be recreated
  // on every render, potentially causing unnecessary updates in deeply nested
  // components.
  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }), [user, token, loading, login, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de propiedades para AuthProvider. Exigimos que children sea un nodo válido.
// (la importación de PropTypes se realiza arriba)

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

