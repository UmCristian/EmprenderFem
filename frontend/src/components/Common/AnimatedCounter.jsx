import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedCounter = ({ value, duration = 2000, delay = 0, prefix = '', suffix = '' }) => {
  const counterRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!counterRef.current) return;

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
      
      // Objeto para animar
      const obj = { count: 0 };

      // Crear nueva animación
      animationRef.current = animeFunc({
        targets: obj,
        count: value,
        duration: duration,
        delay: delay,
        easing: 'easeOutExpo',
        round: 1,
        update: function() {
          if (counterRef.current) {
            counterRef.current.textContent = `${prefix}${obj.count.toLocaleString()}${suffix}`;
          }
        }
      });
    });

    // Cleanup
    return () => {
      // anime.js no tiene pause, simplemente dejamos que termine
    };
  }, [value, duration, delay, prefix, suffix]);

  return <span ref={counterRef}>0</span>;
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

export default AnimatedCounter;
