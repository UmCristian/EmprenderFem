import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  animationType = 'ripple',
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);

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
        setIsAnimating(false);
        if (onClick) onClick(e);
        return;
      }

      if (animationType === 'ripple') {
        // Efecto ripple personalizado
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';

        buttonRef.current.appendChild(ripple);

        animeFunc({
          targets: ripple,
          width: rect.width * 2,
          height: rect.width * 2,
          opacity: [0.6, 0],
          duration: 600,
          easing: 'easeOutExpo',
          complete: () => {
            ripple.remove();
            setIsAnimating(false);
          }
        });
      } else if (animationType === 'pulse') {
        // Efecto de pulso
        animeFunc({
          targets: buttonRef.current,
          scale: [1, 1.1, 1],
          duration: 300,
          easing: 'easeInOutQuad',
          complete: () => {
            setIsAnimating(false);
          }
        });
      } else if (animationType === 'shake') {
        // Efecto de sacudida
        animeFunc({
          targets: buttonRef.current,
          translateX: [0, -10, 10, -10, 10, 0],
          duration: 400,
          easing: 'easeInOutQuad',
          complete: () => {
            setIsAnimating(false);
          }
        });
      } else if (animationType === 'bounce') {
        // Efecto de rebote
        animeFunc({
          targets: buttonRef.current,
          translateY: [0, -15, 0],
          duration: 500,
          easing: 'easeOutBounce',
          complete: () => {
            setIsAnimating(false);
          }
        });
      } else if (animationType === 'rotate') {
        // Efecto de rotación
        animeFunc({
          targets: buttonRef.current,
          rotate: [0, 360],
          duration: 600,
          easing: 'easeInOutQuad',
          complete: () => {
            setIsAnimating(false);
          }
        });
      }

      // Ejecutar el onClick después de un pequeño delay
      setTimeout(() => {
        if (onClick) onClick(e);
      }, 100);
    });
  };

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={handleClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  animationType: PropTypes.oneOf(['ripple', 'pulse', 'shake', 'bounce', 'rotate']),
  sx: PropTypes.object,
};

export default AnimatedButton;
