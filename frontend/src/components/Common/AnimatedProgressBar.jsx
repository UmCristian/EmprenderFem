import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Box } from '@mui/material';

const AnimatedProgressBar = ({ value, duration = 1500, delay = 0, color = 'primary', height = 8 }) => {
  const progressRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current) return;

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
      
      // Objeto para animar el progreso
      const obj = { progress: 0 };

      // Crear nueva animación
      animationRef.current = animeFunc({
        targets: obj,
        progress: value,
        duration: duration,
        delay: delay,
        easing: 'easeOutCubic',
        update: function() {
          if (progressRef.current) {
            // Actualizar el progreso de la barra
            const progressBar = progressRef.current.querySelector('.MuiLinearProgress-bar');
            if (progressBar) {
              progressBar.style.transform = `translateX(-${100 - obj.progress}%)`;
            }
          }
        }
      });
    });

    // Cleanup
    return () => {
      // anime.js no tiene pause, simplemente dejamos que termine
    };
  }, [value, duration, delay]);

  return (
    <Box ref={progressRef} sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={0}
        color={color}
        sx={{
          height: height,
          borderRadius: height / 2,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: height / 2,
            transition: 'none', // Desactivar transición CSS para usar anime.js
          }
        }}
      />
    </Box>
  );
};

AnimatedProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
};

export default AnimatedProgressBar;
