import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  PersonAdd,
  CheckCircle,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContext';
import { LOGIN_USER } from '../../apollo/queries';
import AnimatedLogo from '../../components/Common/AnimatedLogo';
import AnimatedButton from '../../components/Common/AnimatedButton';

const Login = () => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(localStorage.getItem('rememberedEmail')));
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);

  // Validación en tiempo real
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getEmailError = () => {
    if (!touched.email) return '';
    if (!formData.email) return 'El correo es requerido';
    if (!validateEmail(formData.email)) return 'Correo inválido';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!formData.password) return 'La contraseña es requerida';
    if (formData.password.length < 6) return 'Mínimo 6 caracteres';
    return '';
  };

  const isFormValid = () => {
    return formData.email && 
           formData.password && 
           validateEmail(formData.email) && 
           formData.password.length >= 6;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await loginUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.loginUser) {
        // Guardar o eliminar email según checkbox
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        login(data.loginUser.token, data.loginUser.user);
        navigate('/app/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Partículas de fondo - Reducidas para mejor rendimiento */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              willChange: 'transform',
            }}
          />
        ))}
      </Box>

      {/* Card de Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{ position: 'relative', zIndex: 1, willChange: 'transform, opacity' }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <AnimatedLogo size={100} autoPlay={false} loop={false} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1,
                    mt: 2,
                  }}
                >
                  Empoderar
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Inicia sesión en tu cuenta
                </Typography>
              </motion.div>
            </Box>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, email: true })}
                error={Boolean(getEmailError())}
                helperText={getEmailError()}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: touched.email && !getEmailError() && formData.email && (
                    <InputAdornment position="end">
                      <CheckCircle color="success" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, password: true })}
                error={Boolean(getPasswordError())}
                helperText={getPasswordError()}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Recordar email y Olvidaste contraseña */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Recordar mi correo
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => {
                    // TODO: Implementar recuperación de contraseña
                    alert('Funcionalidad en desarrollo');
                  }}
                  aria-label="Recuperar contraseña olvidada"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>

              <AnimatedButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !isFormValid()}
                animationType="pulse"
                sx={{
                  mb: 3,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  position: 'relative',
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    Iniciando sesión...
                  </Box>
                ) : (
                  'Iniciar Sesión'
                )}
              </AnimatedButton>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿No tienes cuenta?
                </Typography>
              </Divider>

              <Button
                component={RouterLink}
                to="/register"
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<PersonAdd />}
                aria-label="Ir a página de registro para crear una cuenta nueva"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Crear Cuenta
              </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Al iniciar sesión, aceptas nuestros términos de servicio
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;

