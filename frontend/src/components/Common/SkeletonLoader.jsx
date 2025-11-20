import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Skeleton básico con animación de pulso
export const Skeleton = ({ width = '100%', height = 20, borderRadius = 4, sx = {} }) => (
  <motion.div
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ 
      repeat: Infinity, 
      duration: 1.5,
      ease: "easeInOut"
    }}
    style={{
      width,
      height,
      borderRadius,
      backgroundColor: '#e0e0e0',
      ...sx
    }}
  />
);

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.number,
  sx: PropTypes.object,
};

// Skeleton para tarjeta de curso
export const CourseCardSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Imagen skeleton */}
    <Skeleton width="100%" height={200} borderRadius={0} />
    
    <CardContent sx={{ flexGrow: 1 }}>
      {/* Título */}
      <Skeleton width="80%" height={24} sx={{ mb: 2 }} />
      
      {/* Descripción */}
      <Skeleton width="100%" height={16} sx={{ mb: 1 }} />
      <Skeleton width="90%" height={16} sx={{ mb: 2 }} />
      
      {/* Detalles */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton width={60} height={20} />
        <Skeleton width={80} height={20} />
        <Skeleton width={70} height={20} />
      </Box>
      
      {/* Precio y botón */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
        <Skeleton width={80} height={32} />
        <Skeleton width={100} height={36} borderRadius={8} />
      </Box>
    </CardContent>
  </Card>
);

// Skeleton para estadística del dashboard
export const StatCardSkeleton = () => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <Skeleton width={60} height={32} />
      </Box>
      <Skeleton width="70%" height={32} sx={{ mb: 1 }} />
      <Skeleton width="50%" height={20} />
    </CardContent>
  </Card>
);

// Skeleton para lista de notificaciones
export const NotificationSkeleton = () => (
  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Skeleton width={40} height={40} borderRadius={20} />
      <Box sx={{ flex: 1 }}>
        <Skeleton width="70%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="90%" height={16} />
      </Box>
    </Box>
  </Box>
);

// Skeleton para tabla
export const TableRowSkeleton = ({ columns = 4 }) => (
  <Box sx={{ display: 'flex', gap: 2, p: 2, borderBottom: 1, borderColor: 'divider' }}>
    {Array.from({ length: columns }).map((_, index) => (
      <Skeleton key={index} width={`${100 / columns}%`} height={20} />
    ))}
  </Box>
);

TableRowSkeleton.propTypes = {
  columns: PropTypes.number,
};

export default Skeleton;
