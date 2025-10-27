import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_NOTIFICATIONS, GET_UNREAD_COUNT, MARK_NOTIFICATION_AS_READ, MARK_ALL_AS_READ, DELETE_NOTIFICATION } from '../../apollo/queries';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  AccountBalance as LoanIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AdminPanelSettings,
  CheckCircle,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedLogo from '../Common/AnimatedLogo';

const drawerWidth = 280;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Queries y mutations de notificaciones
  const { data: notificationsData, refetch: refetchNotifications } = useQuery(GET_MY_NOTIFICATIONS);
  const { data: unreadCountData } = useQuery(GET_UNREAD_COUNT, {
    pollInterval: 30000, // Actualizar cada 30 segundos
  });
  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
    refetchQueries: [GET_MY_NOTIFICATIONS, GET_UNREAD_COUNT],
  });
  const [markAllAsRead] = useMutation(MARK_ALL_AS_READ, {
    refetchQueries: [GET_MY_NOTIFICATIONS, GET_UNREAD_COUNT],
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: [GET_MY_NOTIFICATIONS, GET_UNREAD_COUNT],
  });

  const notifications = notificationsData?.myNotifications || [];
  const unreadCount = unreadCountData?.unreadNotificationsCount || 0;

  // Menú base para todos los usuarios
  const baseMenuItems = [
    { text: t('dashboard'), icon: <DashboardIcon />, path: '/app/dashboard' },
    { text: t('courses'), icon: <SchoolIcon />, path: '/app/courses' },
    { text: t('loans'), icon: <LoanIcon />, path: '/app/loans' },
  ];

  // Ítem adicional solo para administradores
  const adminMenuItem = {
    text: t('manageCourses'),
    icon: <AdminPanelSettings />,
    path: '/app/admin/courses',
  };

  // Combinar menú según el rol del usuario
  const menuItems = user?.role === 'admin'
    ? [...baseMenuItems, adminMenuItem]
    : baseMenuItems;

  // Determine a human‑readable label for the user role. Extracting this logic into
  // a variable improves readability compared to a nested ternary in JSX.
  let roleLabel = 'Administradora';
  if (user?.role === 'beneficiary') {
    roleLabel = 'Beneficiaria';
  } else if (user?.role === 'mentor') {
    roleLabel = 'Mentora';
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
    refetchNotifications();
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotificationClick = async (notification, event) => {
    // Prevenir que el click en el botón de eliminar active esta función
    if (event?.target?.closest('.delete-button')) {
      return;
    }

    // Marcar como leída
    if (!notification.read) {
      await markAsRead({
        variables: { notificationId: notification.id },
      });
    }

    // Navegar al origen de la notificación
    handleNotificationsClose();
    
    if (notification.relatedModel && notification.relatedId) {
      switch (notification.relatedModel) {
        case 'Course':
          navigate('/app/courses');
          break;
        case 'Loan':
          navigate('/app/loans');
          break;
        case 'CourseEnrollment':
          navigate('/app/courses');
          break;
        default:
          break;
      }
    }
  };

  const handleDeleteNotification = async (notificationId, event) => {
    event.stopPropagation(); // Prevenir que active el click del MenuItem
    try {
      await deleteNotification({
        variables: { notificationId },
      });
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo y título */}
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 1.5
          }}>
            <Box sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              padding: 0.5,
            }}>
              <AnimatedLogo size={50} autoPlay={true} loop={false} />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'white',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px'
                }}
              >
                Empoderar
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                Mujeres Cabeza de Hogar
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>

      <Divider />

      {/* Navegación */}
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Divider />

      {/* Información del usuario */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              fontSize: '1rem'
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.name}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
              }}
            >
              {roleLabel}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Bienvenida, {user?.name?.split(' ')[0]} 👋
          </Typography>

          {/* Notificaciones */}
          <IconButton 
            color="inherit" 
            sx={{ mr: 1 }}
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Menú de perfil */}
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
          
          {/* Menú de Notificaciones */}
          <Menu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: { width: 320, maxHeight: 400 }
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Notificaciones
              </Typography>
              {unreadCount > 0 && (
                <Button size="small" onClick={handleMarkAllAsRead}>
                  Marcar todas como leídas
                </Button>
              )}
            </Box>
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No tienes notificaciones
                </Typography>
              </Box>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <MenuItem 
                    onClick={(e) => handleNotificationClick(notification, e)}
                    sx={{ 
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' },
                      display: 'flex',
                      alignItems: 'flex-start',
                      pr: 1,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {notification.type.includes('course') && <SchoolIcon fontSize="small" color="primary" />}
                      {notification.type.includes('loan') && <LoanIcon fontSize="small" color="warning" />}
                      {notification.type === 'course_completed' && <CheckCircle fontSize="small" color="success" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.title}
                      secondary={notification.message}
                      secondaryTypographyProps={{
                        sx: { 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }
                      }}
                      sx={{ flex: 1, pr: 1 }}
                    />
                    <IconButton
                      className="delete-button"
                      size="small"
                      onClick={(e) => handleDeleteNotification(notification.id, e)}
                      sx={{ 
                        ml: 1,
                        opacity: 0.6,
                        '&:hover': { opacity: 1, color: 'error.main' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </MenuItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </Menu>

          {/* Menú de Perfil */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              navigate('/app/profile');
            }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              {t('profile')}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              {t('logout')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

