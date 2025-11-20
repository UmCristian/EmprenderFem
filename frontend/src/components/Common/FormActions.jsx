import { Box, Button } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import PropTypes from 'prop-types';

/**
 * Componente reutilizable para acciones de formulario
 * Implementa el principio de Nielsen 3.1: Control y Libertad del Usuario
 * Proporciona botones consistentes de Cancelar y Guardar en todos los formularios
 */
const FormActions = ({
  onCancel,
  onSubmit,
  cancelText = 'Cancelar',
  submitText = 'Guardar',
  submitDisabled = false,
  loading = false,
  showCancelIcon = true,
  showSubmitIcon = true,
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'flex-end',
        mt: 3 
      }}
    >
      <Button
        variant="outlined"
        onClick={onCancel}
        startIcon={showCancelIcon ? <Cancel /> : null}
        disabled={loading}
        aria-label={`Cancelar y volver sin guardar cambios`}
      >
        {cancelText}
      </Button>
      <Button
        variant="contained"
        onClick={onSubmit}
        startIcon={showSubmitIcon ? <Save /> : null}
        disabled={submitDisabled || loading}
        aria-label={`${submitText} los cambios del formulario`}
      >
        {loading ? 'Guardando...' : submitText}
      </Button>
    </Box>
  );
};

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  submitDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  showCancelIcon: PropTypes.bool,
  showSubmitIcon: PropTypes.bool,
};

export default FormActions;
