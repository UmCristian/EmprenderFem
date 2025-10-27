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
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  Notifications,
  Security,
  Palette,
  Language,
  Visibility,
  Lock,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { GET_ME, UPDATE_PROFILE, GET_MY_ENROLLMENTS, GET_MY_LOANS, UPDATE_PREFERENCES, UPDATE_PRIVACY } from '../../apollo/queries';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { setThemeMode } = useTheme();
  const { changeLanguage, t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    identification: user?.identification || '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  // Estados para Preferencias
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || 'light',
    language: user?.preferences?.language || 'es',
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    courseReminders: user?.preferences?.courseReminders ?? true,
    loanUpdates: user?.preferences?.loanUpdates ?? true,
  });
  const [preferencesChanged, setPreferencesChanged] = useState(false);
  
  // Estados para Privacidad
  const [privacy, setPrivacy] = useState({
    profileVisibility: user?.privacy?.profileVisibility || 'public',
    shareProgress: user?.privacy?.shareProgress ?? true,
    allowAnalytics: user?.privacy?.allowAnalytics ?? true,
  });
  const [privacyChanged, setPrivacyChanged] = useState(false);

  // Ejecutamos la consulta GET_ME solo para mantener el caché actualizado; no usamos
  // los valores devueltos porque el contexto de autenticación ya proporciona
  // toda la información necesaria del usuario.
  useQuery(GET_ME);
  const { data: enrollmentsData } = useQuery(GET_MY_ENROLLMENTS);
  const { data: loansData } = useQuery(GET_MY_LOANS);
  
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updatePreferences] = useMutation(UPDATE_PREFERENCES);
  const [updatePrivacy] = useMutation(UPDATE_PRIVACY);

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
  
  const handlePreferenceChange = (key, value) => {
    const newPreferences = {
      ...preferences,
      [key]: value,
    };
    setPreferences(newPreferences);
    setPreferencesChanged(true);

    // Aplicar cambios inmediatamente en la UI
    if (key === 'theme') {
      setThemeMode(value);
    }
    if (key === 'language') {
      changeLanguage(value);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await updatePreferences({
        variables: preferences,
      });

      setPreferencesChanged(false);
      setSuccessMessage(t('preferenceUpdated'));
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al actualizar preferencias:', error);
      setSuccessMessage('');
    }
  };
  
  const handlePrivacyChange = (key, value) => {
    const newPrivacy = {
      ...privacy,
      [key]: value,
    };
    setPrivacy(newPrivacy);
    setPrivacyChanged(true);
  };

  const handleSavePrivacy = async () => {
    try {
      await updatePrivacy({
        variables: privacy,
      });

      setPrivacyChanged(false);
      setSuccessMessage(t('privacyUpdated'));
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al actualizar privacidad:', error);
      setSuccessMessage('');
    }
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
                    {t('personalInfo')}
                  </Typography>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      onClick={handleEdit}
                    >
                      {t('edit')}
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Save />}
                        onClick={handleSave}
                      >
                        {t('save')}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                      >
                        {t('cancel')}
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('name')}
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
                      label={t('email')}
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
                      label={t('phone')}
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
                      label={t('identification')}
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
                      label={t('address')}
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
                  {t('myProgress')}
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <School sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('completedCourses')}
                      secondary={`${completedCourses} ${t('coursesInProgress')}`}
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
                      primary={t('activeCourses')}
                      secondary={`${activeCourses} ${t('coursesInProgress')}`}
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
                      primary={t('approvedLoans')}
                      secondary={`${approvedLoans} ${t('microcredits')}`}
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
                      primary={t('totalFinanced')}
                      secondary={t('totalLoanAmount')}
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
                  {t('accountInfo')}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'grey.50'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {t('registrationDate')}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'grey.50'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {t('accountStatus')}
                      </Typography>
                      <Chip
                        label={user?.isActive ? t('active') : t('inactive')}
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

        {/* Preferencias */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Palette sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('preferences')}
                    </Typography>
                  </Box>
                  {preferencesChanged && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Save />}
                      onClick={handleSavePreferences}
                    >
                      {t('save')}
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Tema */}
                  <FormControl fullWidth>
                    <InputLabel>{t('theme')}</InputLabel>
                    <Select
                      value={preferences.theme}
                      label={t('theme')}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    >
                      <MenuItem value="light">{t('light')}</MenuItem>
                      <MenuItem value="dark">{t('dark')}</MenuItem>
                      <MenuItem value="auto">{t('auto')}</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Idioma */}
                  <FormControl fullWidth>
                    <InputLabel>{t('language')}</InputLabel>
                    <Select
                      value={preferences.language}
                      label={t('language')}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    >
                      <MenuItem value="es">{t('spanish')}</MenuItem>
                      <MenuItem value="en">{t('english')}</MenuItem>
                    </Select>
                  </FormControl>

                  <Divider sx={{ my: 1 }} />

                  {/* Notificaciones por Email */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{t('emailNotifications')}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('receiveImportantUpdates')}
                        </Typography>
                      </Box>
                    }
                  />

                  {/* Recordatorios de Cursos */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.courseReminders}
                        onChange={(e) => handlePreferenceChange('courseReminders', e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{t('courseReminders')}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('alertsAboutPendingCourses')}
                        </Typography>
                      </Box>
                    }
                  />

                  {/* Actualizaciones de Préstamos */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.loanUpdates}
                        onChange={(e) => handlePreferenceChange('loanUpdates', e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{t('loanUpdates')}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('notificationsAboutLoanStatus')}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Privacidad */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Lock sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('privacy')}
                    </Typography>
                  </Box>
                  {privacyChanged && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Save />}
                      onClick={handleSavePrivacy}
                    >
                      {t('save')}
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Visibilidad del Perfil */}
                  <FormControl fullWidth>
                    <InputLabel>{t('profileVisibility')}</InputLabel>
                    <Select
                      value={privacy.profileVisibility}
                      label={t('profileVisibility')}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <MenuItem value="public">{t('public')}</MenuItem>
                      <MenuItem value="private">{t('private')}</MenuItem>
                      <MenuItem value="friends">{t('friends')}</MenuItem>
                    </Select>
                  </FormControl>

                  <Divider sx={{ my: 1 }} />

                  {/* Compartir Progreso */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.shareProgress}
                        onChange={(e) => handlePrivacyChange('shareProgress', e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{t('shareProgress')}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('allowOthersToSeeProgress')}
                        </Typography>
                      </Box>
                    }
                  />

                  {/* Análisis y Datos */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.allowAnalytics}
                        onChange={(e) => handlePrivacyChange('allowAnalytics', e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{t('allowAnalytics')}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('helpUsImprove')}
                        </Typography>
                      </Box>
                    }
                  />

                  <Divider sx={{ my: 1 }} />

                  {/* Información adicional */}
                  <Paper sx={{ p: 2, bgcolor: 'info.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Security sx={{ mr: 1, color: 'info.main', fontSize: 20 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {t('yourDataIsSafe')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('neverShareWithoutConsent')}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

