import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  CheckCircle,
  Info,
  Warning,
  Error as ErrorIcon,
  ChevronRight,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GET_MY_NOTIFICATIONS, DELETE_NOTIFICATION, MARK_NOTIFICATION_AS_READ } from '../../apollo/queries';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const Notifications = () => {
  const navigate = useNavigate();
  
  const { data, loading, error } = useQuery(GET_MY_NOTIFICATIONS);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: [GET_MY_NOTIFICATIONS],
  });
  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    refetchQueries: [GET_MY_NOTIFICATIONS],
  });

  const notifications = data?.myNotifications || [];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  const handleNotificationClick = async (notification) => {
    // Marcar como leída
    if (!notification.read) {
      await markAsRead({ variables: { notificationId: notification.id } });
    }
    // Navegar a detalles
    navigate(`/app/notifications/${notification.id}`);
  };

  const handleDelete = async (e, notificationId) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar esta notificación?')) {
      await deleteNotification({ variables: { notificationId } });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>Cargando notificaciones...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error al cargar notificaciones: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)', color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NotificationsIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Notificaciones
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {notifications.length} notificaciones totales
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lista de Notificaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card>
          <CardContent sx={{ p: 0 }}>
            {notifications.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No tienes notificaciones
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <ListItem
                        disablePadding
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={(e) => handleDelete(e, notification.id)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        sx={{
                          bgcolor: notification.read ? 'transparent' : 'action.hover',
                        }}
                      >
                        <ListItemButton onClick={() => handleNotificationClick(notification)}>
                          <ListItemIcon>
                            {getNotificationIcon(notification.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: notification.read ? 400 : 600,
                                  }}
                                >
                                  {notification.title}
                                </Typography>
                                {!notification.read && (
                                  <Chip label="Nueva" size="small" color="primary" />
                                )}
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  {notification.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDistanceToNow(new Date(parseInt(notification.createdAt)), {
                                    addSuffix: true,
                                    locale: es,
                                  })}
                                </Typography>
                              </Box>
                            }
                          />
                          <ChevronRight />
                        </ListItemButton>
                      </ListItem>
                    </motion.div>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Notifications;
