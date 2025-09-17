import React from 'react';

// PropTypes se utiliza para validar las propiedades que se pasan a los componentes.
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  School,
  AccountBalance,
  Person,
  CheckCircle,
  Schedule,
  Star,
  ArrowForward,
  EmojiEvents,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { useAuth } from '../../contexts/AuthContext';
import { GET_MY_ENROLLMENTS, GET_MY_LOANS, GET_STATS } from '../../apollo/queries';

const StatCard = ({ title, value, icon, color, trend, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {title}
            </Typography>
          </Box>
        </Box>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {trend}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Validación de propiedades para StatCard. Declara explícitamente los tipos esperados de
// cada prop para evitar advertencias de código estático.
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  trend: PropTypes.string,
  delay: PropTypes.number,
};

const Dashboard = () => {
  const { user } = useAuth();
  const { data: enrollmentsData, loading: enrollmentsLoading } = useQuery(GET_MY_ENROLLMENTS);
  const { data: loansData, loading: loansLoading } = useQuery(GET_MY_LOANS);
  // Consultar estadísticas generales. No almacenamos loading ni el objeto de estadísticas
  // localmente porque no se usan en el componente. El simple hecho de ejecutar la
  // consulta es suficiente para refrescar el caché de Apollo.
  useQuery(GET_STATS);

  const enrollments = enrollmentsData?.myEnrollments || [];
  const loans = loansData?.myLoans || [];
  // No se utiliza el objeto de estadísticas en el componente actualmente, por lo que
  // no lo almacenamos en una variable. Si en el futuro se necesitan estadísticas
  // globales, se pueden extraer desde la consulta GET_STATS.

  // Calcular estadísticas personales
  const completedCourses = enrollments.filter(e => e.completed).length;
  const activeCourses = enrollments.filter(e => !e.completed).length;
  const approvedLoans = loans.filter(l => l.status === 'approved').length;
  const totalLoanAmount = loans
    .filter(l => l.status === 'approved')
    .reduce((sum, loan) => sum + loan.amount, 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Devuelve un color para el fondo del avatar según el estado del préstamo.
  const getLoanAvatarColor = (status) => {
    if (status === 'approved') return 'success.main';
    if (status === 'pending') return 'warning.main';
    if (status === 'rejected') return 'error.main';
    return 'primary.main';
  };

  // Devuelve un color para el chip según el estado del préstamo.
  const getLoanStatusColor = (status) => {
    if (status === 'approved') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'rejected') return 'error';
    return 'default';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header de bienvenida */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Bienvenida a tu espacio de crecimiento y empoderamiento
              </Typography>
            </Box>
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
          </Box>
        </Paper>
      </motion.div>

      {/* Estadísticas personales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cursos Completados"
            value={completedCourses}
            icon={<EmojiEvents />}
            color="#4CAF50"
            trend="+2 este mes"
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cursos Activos"
            value={activeCourses}
            icon={<School />}
            color="#2196F3"
            trend="En progreso"
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Préstamos Aprobados"
            value={approvedLoans}
            icon={<AccountBalance />}
            color="#FF9800"
            trend="Activos"
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Financiado"
            value={`$${totalLoanAmount.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#9C27B0"
            trend="COP"
            delay={0.4}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Cursos en progreso */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <School sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Mis Cursos
                  </Typography>
                </Box>

                {enrollmentsLoading ? (
                  <LinearProgress />
                ) : enrollments.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <School sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Aún no te has inscrito en ningún curso
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<ArrowForward />}
                    >
                      Explorar Cursos
                    </Button>
                  </Box>
                ) : (
                  <List>
                    {enrollments.slice(0, 3).map((enrollment, index) => (
                      <React.Fragment key={enrollment.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor: enrollment.completed ? 'success.main' : 'primary.main',
                                width: 32,
                                height: 32,
                              }}
                            >
                              {enrollment.completed ? <CheckCircle /> : <Schedule />}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={enrollment.course.title}
                            secondary={
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  {enrollment.course.category} • {enrollment.course.level}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={enrollment.progress}
                                    sx={{ height: 6, borderRadius: 3 }}
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    {enrollment.progress}% completado
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < enrollments.slice(0, 3).length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Préstamos */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccountBalance sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Mis Préstamos
                  </Typography>
                </Box>

                {loansLoading ? (
                  <LinearProgress />
                ) : loans.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AccountBalance sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Aún no has solicitado préstamos
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<ArrowForward />}
                    >
                      Solicitar Préstamo
                    </Button>
                  </Box>
                ) : (
                  <List>
                    {loans.slice(0, 3).map((loan, index) => (
                      <React.Fragment key={loan.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar
                              sx={{
                                bgcolor: getLoanAvatarColor(loan.status),
                                width: 32,
                                height: 32,
                              }}
                            >
                              <AttachMoney />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={`$${loan.amount.toLocaleString()}`}
                            secondary={
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  {loan.purpose}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  <Chip
                                    label={loan.status}
                                    size="small"
                                    color={getLoanStatusColor(loan.status)}
                                  />
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < loans.slice(0, 3).length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Logros recientes */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Star sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Logros Recientes
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                      <EmojiEvents sx={{ fontSize: 32, color: 'success.dark', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Curso Completado
                      </Typography>
                      <Typography variant="caption">
                        Emprendimiento Básico
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                      <AttachMoney sx={{ fontSize: 32, color: 'primary.dark', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Préstamo Aprobado
                      </Typography>
                      <Typography variant="caption">
                        $1,000,000 COP
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                      <Person sx={{ fontSize: 32, color: 'warning.dark', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Perfil Completo
                      </Typography>
                      <Typography variant="caption">
                        100% actualizado
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                      <School sx={{ fontSize: 32, color: 'secondary.dark', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Nueva Inscripción
                      </Typography>
                      <Typography variant="caption">
                        Finanzas Personales
                      </Typography>
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

export default Dashboard;

