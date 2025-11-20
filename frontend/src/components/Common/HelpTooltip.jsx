import { Tooltip, IconButton } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';

/**
 * Componente reutilizable para tooltips de ayuda
 * Implementa el principio de Nielsen 10.1: Ayuda y Documentación
 * Proporciona ayuda contextual sin interrumpir el flujo del usuario
 */
const HelpTooltip = ({ 
  title, 
  placement = 'top',
  size = 'small',
  color = 'default'
}) => {
  return (
    <Tooltip 
      title={title} 
      placement={placement}
      arrow
      enterDelay={200}
      leaveDelay={100}
    >
      <IconButton 
        size={size}
        color={color}
        aria-label="Ayuda contextual"
        sx={{ ml: 0.5 }}
      >
        <HelpOutline fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

HelpTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
};

export default HelpTooltip;
