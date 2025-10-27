import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const LoadingAnimation = ({ type = 'dots', size = 60, color = 'primary', text = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Importar anime dinámicamente
    import('animejs').then((animeModule) => {
      // Intentar obtener la función anime de diferentes formas
      let animeFunc = animeModule.default;
      if (!animeFunc && typeof animeModule === 'function') {
        animeFunc = animeModule;
      }
      if (!animeFunc && animeModule.anime) {
        animeFunc = animeModule.anime;
      }
      
      // Si aún no tenemos la función, buscar en las propiedades del módulo
      if (!animeFunc) {
        const keys = Object.keys(animeModule);
        for (const key of keys) {
          if (typeof animeModule[key] === 'function') {
            animeFunc = animeModule[key];
            break;
          }
        }
      }
      
      if (!animeFunc) {
        console.error('No se pudo cargar anime.js', animeModule);
        return;
      }

      const elements = containerRef.current.querySelectorAll('.loading-element');

      if (type === 'dots') {
        // Animación de puntos saltando
        animeFunc({
          targets: elements,
          translateY: [0, -20, 0],
          duration: 800,
          delay: (el, i) => i * 100,
          loop: true,
          easing: 'easeInOutQuad'
        });
      } else if (type === 'pulse') {
        // Animación de pulso
        animeFunc({
          targets: elements,
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
          duration: 1200,
          delay: (el, i) => i * 150,
          loop: true,
          easing: 'easeInOutSine'
        });
      } else if (type === 'rotate') {
        // Animación de rotación
        animeFunc({
          targets: containerRef.current.querySelector('.loading-spinner'),
          rotate: '360deg',
          duration: 1500,
          loop: true,
          easing: 'linear'
        });
      } else if (type === 'wave') {
        // Animación de onda
        animeFunc({
          targets: elements,
          scaleY: [1, 2, 1],
          duration: 1000,
          delay: (el, i) => i * 100,
          loop: true,
          easing: 'easeInOutQuad'
        });
      }
    });
  }, [type]);

  const getColorValue = () => {
    const colors = {
      primary: '#E91E63',
      secondary: '#9C27B0',
      success: '#4CAF50',
      error: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    };
    return colors[color] || colors.primary;
  };

  const renderLoading = () => {
    const colorValue = getColorValue();
    const dotSize = size / 5;

    if (type === 'dots') {
      return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              className="loading-element"
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                bgcolor: colorValue,
              }}
            />
          ))}
        </Box>
      );
    } else if (type === 'pulse') {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              className="loading-element"
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                bgcolor: colorValue,
              }}
            />
          ))}
        </Box>
      );
    } else if (type === 'rotate') {
      return (
        <Box
          className="loading-spinner"
          sx={{
            width: size,
            height: size,
            border: `${size / 10}px solid rgba(0,0,0,0.1)`,
            borderTop: `${size / 10}px solid ${colorValue}`,
            borderRadius: '50%',
          }}
        />
      );
    } else if (type === 'wave') {
      return (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end', height: size }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              className="loading-element"
              sx={{
                width: dotSize / 2,
                height: size / 3,
                bgcolor: colorValue,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box ref={containerRef}>{renderLoading()}</Box>
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  );
};

LoadingAnimation.propTypes = {
  type: PropTypes.oneOf(['dots', 'pulse', 'rotate', 'wave']),
  size: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  text: PropTypes.string,
};

export default LoadingAnimation;
