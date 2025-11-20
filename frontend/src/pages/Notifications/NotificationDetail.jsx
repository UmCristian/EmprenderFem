import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Delete as DeleteIcon,
  OpenInNew,
  CheckCircle,
  Info,
  Warning,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GET_MY_NOTIFICATIONS, DELETE_NOTIFICATION, MARK_NOTIFICATION_AS_READ } from '../../apollo/queries';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, loading, error } = useQuery(GET_MY_NOTIFICATIONS);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: [GET_MY_NOTIFICATIONS],
    onCompleted: () => navigate('/app/notifications'),
  });
  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    refetchQueries: [GET_MY_NOTIFICATIONS],
  });

  // Encontrar la notificación específica
  const notification = data?.myNotifications?.find(n => n.id === id);

  // Marcar como leída al cargar
  React.useEffect(() => {
    if (notification && !notification.read) {
      markAsRead({ variables: { notificationId: id } });
    }
  }, [notification, id, markAsRead]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ fontSize: 64, color: 'success.main' }} />;
      case 'warning':
        return <Warning sx={{ fontSize: 64, color: 'warning.main' }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 64, color: 'error.main' }} />;
      default:
        return <Info sx={{ fontSize: 64, color: 'info.main' }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar esta notificación?')) {
      await deleteNotification({ variables: { notificationId: id } });
    }
  };

  const handleGoToLink = () => {
    if (notification?.link) {
      navigate(notification.link);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (error || !notification) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error ? `Error: ${error.message}` : 'Notificación no encontrada'}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/app/notifications')}
        >
          Volver a Notificaciones
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* Botón Volver */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/app/notifications')}
          sx={{ mb: 3 }}
        >
          Volver a Notificaciones
        </Button>
      </motion.div>

      {/* Card de Detalles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Icono y Tipo */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {getNotificationIcon(notification.type)}
              <Chip
                label={notification.type.toUpperCase()}
                color={getNotificationColor(notification.type)}
                sx={{ mt: 2 }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Título */}
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
              {notification.title}
            </Typography>

            {/* Fecha */}
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
              {format(new Date(parseInt(notification.createdAt)), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                locale: es,
              })}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Mensaje */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Mensaje:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {notification.message}
              </Typography>
            </Box>

            {/* Acciones */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {notification.link && (
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<OpenInNew />}
                  onClick={handleGoToLink}
                  sx={{ minWidth: 200 }}
                >
                  Ir a la página
                </Button>
              )}
              <Button
                variant="outlined"
                size="large"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{ minWidth: 200 }}
              >
                Eliminar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default NotificationDetail;
