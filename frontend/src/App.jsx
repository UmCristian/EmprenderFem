import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ApolloProvider } from '@apollo/client';

import client from './apollo/client';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// PropTypes se utiliza para validar las props de nuestros componentes de orden superior.
import PropTypes from 'prop-types';

// Componentes
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/Courses/CourseDetail';
import Loans from './pages/Loans/Loans';
import Profile from './pages/Profile/Profile';
import LoadingScreen from './components/Common/LoadingScreen';

// Admin
import ManageCourses from './pages/Admin/ManageCourses';
import CreateCourse from './pages/Admin/CreateCourse';
import EditCourse from './pages/Admin/EditCourse';

// Componente de rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente de rutas públicas (solo para usuarios no autenticados)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return !isAuthenticated ? children : <Navigate to="/app/dashboard" replace />;
};

// Validación de props para componentes de rutas. Se espera que children sea un nodo válido.
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
                <Routes>
                {/* Página de inicio */}
                <Route 
                  path="/" 
                  element={
                    <PublicRoute>
                      <Landing />
                    </PublicRoute>
                  } 
                />
                
                {/* Rutas públicas */}
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } 
                />
                
                {/* Rutas protegidas */}
                <Route 
                  path="/app" 
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/:id" element={<CourseDetail />} />
                  <Route path="loans" element={<Loans />} />
                  <Route path="profile" element={<Profile />} />
                  
                  {/* Rutas de Admin */}
                  <Route path="admin/courses" element={<ManageCourses />} />
                  <Route path="admin/courses/new" element={<CreateCourse />} />
                  <Route path="admin/courses/edit/:id" element={<EditCourse />} />
                </Route>
                
                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Router>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

