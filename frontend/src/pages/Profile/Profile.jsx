import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Home,
  Badge,
  Edit,
  Save,
  Cancel,
  CheckCircle,
  School,
  AccountBalance,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContext';
import { GET_ME, UPDATE_PROFILE, GET_MY_ENROLLMENTS, GET_MY_LOANS } from '../../apollo/queries';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    identification: user?.identification || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const { data: userData, loading: userLoading } = useQuery(GET_ME);
  const { data: enrollmentsData } = useQuery(GET_MY_ENROLLMENTS);
  const { data: loansData } = useQuery(GET_MY_LOANS);
  
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const enrollments = enrollmentsData?.myEnrollments || [];
  const loans = loansData?.myLoans || [];

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      identification: user?.identification || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      identification: user?.identification || '',
    });
  };

  const handleSave = async () => {
    try {
      const { data } = await updateProfile({
        variables: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          identification: formData.identification,
        },
      });

      if (data?.updateProfile) {
        updateUser(data.updateProfile);
        setIsEditing(false);
        setSuccessMessage('Perfil actualizado exitosamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calcular estadísticas del perfil
  const completedCourses = enrollments.filter(e => e.completed).length;
  const activeCourses = enrollments.filter(e => !e.completed).length;
  const approvedLoans = loans.filter(l => l.status === 'approved').length;
  const totalLoanAmount = loans
    .filter(l => l.status === 'approved')
    .reduce((sum, loan) => sum + loan.amount, 0);

  const getRoleLabel = (role) => {
    switch (role) {
      case 'beneficiary': return 'Beneficiaria';
      case 'mentor': return 'Mentora';
      case 'admin': return 'Administradora';
      default: return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'beneficiary': return 'primary';
      case 'mentor': return 'secondary';
      case 'admin': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '2rem',
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user?.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                {user?.email}
              </Typography>
              <Chip
                label={getRoleLabel(user?.role)}
                color={getRoleColor(user?.role)}
                sx={{ color: 'white' }}
              />
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        </motion.div>
      )}

      <Grid container spacing={3}>
        {/* Información personal */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Información Personal
                  </Typography>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={handleEdit}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Save />}
                        onClick={handleSave}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre completo"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      value={user?.email}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cédula"
                      name="identification"
                      value={formData.identification}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Badge />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Home />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Estadísticas */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Mi Progreso
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <School sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cursos Completados"
                      secondary={`${completedCourses} cursos finalizados`}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {completedCourses}
                    </Typography>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cursos Activos"
                      secondary={`${activeCourses} cursos en progreso`}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {activeCourses}
                    </Typography>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccountBalance sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Préstamos Aprobados"
                      secondary={`${approvedLoans} microcréditos`}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {approvedLoans}
                    </Typography>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEvents sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total Financiado"
                      secondary="Monto total de préstamos"
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
                      ${totalLoanAmount.toLocaleString()}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Información adicional */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Información de la Cuenta
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Fecha de registro
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Estado de la cuenta
                      </Typography>
                      <Chip
                        label={user?.isActive ? 'Activa' : 'Inactiva'}
                        color={user?.isActive ? 'success' : 'error'}
                        size="small"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

