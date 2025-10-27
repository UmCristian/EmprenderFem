import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const AnimatedLogo = ({ size = 200, autoPlay = true, loop = false }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || !svgRef.current) return;

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

      const paths = svgRef.current.querySelectorAll('path');
      
      // Animación de trazado (stroke)
      animeFunc({
        targets: paths,
        strokeDashoffset: [animeFunc.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: loop,
        complete: function() {
          // Después del trazado, animar el fill
          animeFunc({
            targets: paths,
            fill: ['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 1)'],
            duration: 1000,
            easing: 'easeInOutQuad'
          });
        }
      });

      // Animación de escala pulsante
      animeFunc({
        targets: svgRef.current,
        scale: [0.95, 1],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
        delay: 2500
      });
    });
  }, [autoPlay, loop]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Logo "E" estilizado para Empoderar */}
        <path
          d="M50 50 L150 50 M50 50 L50 150 M50 100 L130 100 M50 150 L150 150"
          stroke="#E91E63"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Círculo decorativo */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#9C27B0"
          strokeWidth="4"
          fill="none"
          opacity="0.3"
        />
        
        {/* Estrella de empoderamiento */}
        <path
          d="M100 40 L110 70 L140 70 L115 90 L125 120 L100 100 L75 120 L85 90 L60 70 L90 70 Z"
          fill="rgba(233, 30, 99, 0)"
          stroke="#E91E63"
          strokeWidth="2"
        />
      </svg>
    </Box>
  );
};

AnimatedLogo.propTypes = {
  size: PropTypes.number,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
};

export default AnimatedLogo;
