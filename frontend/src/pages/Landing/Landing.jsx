import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Login as LoginIcon } from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: 'url(/logo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        p: 4,
        pb: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.7) 0%, rgba(156, 39, 176, 0.7) 100%)',
          zIndex: 0,
        }
      }}
    >
      {/* Botón de Iniciar Sesión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          onClick={() => navigate('/login')}
          sx={{
            py: 2,
            px: 6,
            fontSize: '1.2rem',
            fontWeight: 700,
            borderRadius: 3,
            bgcolor: 'white',
            color: 'primary.main',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.95)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Iniciar Sesión
        </Button>
      </motion.div>
    </Box>
  );
};

export default Landing;
