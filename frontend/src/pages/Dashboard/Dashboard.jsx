import { useNavigate } from 'react-router-dom';

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
import { useLanguage } from '../../contexts/LanguageContext';
import { GET_MY_ENROLLMENTS, GET_MY_LOANS, GET_STATS } from '../../apollo/queries';
import AnimatedCounter from '../../components/Common/AnimatedCounter';
import LoadingAnimation from '../../components/Common/LoadingAnimation';
import AnimatedButton from '../../components/Common/AnimatedButton';

const StatCard = ({ title, value, icon, color, trend, delay = 0, prefix = '', suffix = '' }) => {
  // Determinar si el valor es numérico para animar
  const numericValue = typeof value === 'number' ? value : parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
          color: '#FFFFFF',
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
                {isNumeric ? (
                  <AnimatedCounter 
                    value={numericValue} 
                    duration={2000} 
                    delay={delay * 1000}
                    prefix={prefix}
                    suffix={suffix}
                  />
                ) : (
                  value
                )}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 1, fontWeight: 500 }}>
                {title}
              </Typography>
            </Box>
          </Box>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ opacity: 1, fontWeight: 600 }}>
                {trend}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Validación de propiedades para StatCard. Declara explícitamente los tipos esperados de
// cada prop para evitar advertencias de código estático.
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  trend: PropTypes.string,
  delay: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
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

  // Mostrar loading mientras se cargan los datos
  if (enrollmentsLoading || loansLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <LoadingAnimation 
          type="pulse" 
          size={80} 
          color="primary" 
          text={t('welcome')} 
        />
      </Box>
    );
  }

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
            color: '#FFFFFF',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
              </Typography>
              <Typography variant="h6" component="p" sx={{ opacity: 1, color: '#FFFFFF', fontWeight: 400 }}>
                {t('welcome')}
              </Typography>
            </Box>
            <Avatar
              alt={user?.name}
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.3)',
                fontSize: '2rem',
                border: '3px solid rgba(255,255,255,0.5)',
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
            title={t('completedCourses')}
            value={completedCourses}
            icon={<EmojiEvents />}
            color="#4CAF50"
            trend=""
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('activeCourses')}
            value={activeCourses}
            icon={<School />}
            color="#2196F3"
            trend=""
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('approvedLoans')}
            value={approvedLoans}
            icon={<AccountBalance />}
            color="#FF9800"
            trend=""
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('totalFinanced')}
            value={`$${totalLoanAmount.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#9C27B0"
            trend=""
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
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#000000' }}>
                    {t('myCourses')}
                  </Typography>
                </Box>

                {enrollmentsLoading ? (
                  <LinearProgress />
                ) : enrollments.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <School sx={{ fontSize: 48, color: '#000000', mb: 2 }} />
                    <Typography variant="body1" color="#000000">
                      {t('noCoursesYet')}
                    </Typography>
                    <AnimatedButton
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<ArrowForward />}
                      onClick={() => navigate('/app/courses')}
                      animationType="bounce"
                      aria-label="Ir a la página de cursos para explorar y inscribirse"
                    >
                      {t('exploreCourses')}
                    </AnimatedButton>
                  </Box>
                ) : (
                  <List component="nav" aria-label="Mis cursos inscritos">
                    {enrollments.slice(0, 3).map((enrollment, _index) => (
                      <ListItem key={enrollment.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar
                            alt={enrollment.completed ? "Curso completado" : "Curso en progreso"}
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
                          primaryTypographyProps={{ sx: { color: '#000000' } }}
                          secondary={
                            <Box>
                              <Typography variant="caption" color="#FFFFFF">
                                {enrollment.completed ? t('completed') : `${enrollment.progress}% ${t('completed')}`}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={enrollment.progress}
                                sx={{ mt: 1, height: 4, borderRadius: 2 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
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
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#000000' }}>
                    {t('myLoans')}
                  </Typography>
                </Box>

                {loansLoading ? (
                  <LinearProgress />
                ) : loans.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AccountBalance sx={{ fontSize: 48, color: '#000000', mb: 2 }} />
                    <Typography variant="body1" color="#000000">
                      {t('noLoansYet')}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      startIcon={<ArrowForward />}
                      onClick={() => navigate('/app/loans')}
                      aria-label="Ir a la página de préstamos para solicitar uno nuevo"
                    >
                      {t('requestLoan')}
                    </Button>
                  </Box>
                ) : (
                  <List component="nav" aria-label="Mis préstamos solicitados">
                    {loans.slice(0, 3).map((loan, _index) => (
                      <ListItem key={loan.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar
                            alt={`Préstamo ${loan.status}`}
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
                          primaryTypographyProps={{ sx: { color: '#000000' } }}
                          secondary={
                            <Box>
                              <Typography variant="caption" component="div" color="#FFFFFF">
                                {loan.purpose}
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <Chip
                                  label={loan.status}
                                  size="small"
                                  color={getLoanStatusColor(loan.status)}
                                  sx={{
                                    fontWeight: 600,
                                    '& .MuiChip-label': {
                                      color: '#FFFFFF'
                                    }
                                  }}
                                />
                              </Box>
                            </Box>
                          }
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                      </ListItem>
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
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#000000' }}>
                    {t('recentAchievements')}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#1B5E20', color: '#FFFFFF' }}>
                      <EmojiEvents sx={{ fontSize: 32, color: '#81C784', mb: 1 }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                        {t('courseCompleted')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        Emprendimiento Básico
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#0D47A1', color: '#FFFFFF' }}>
                      <AttachMoney sx={{ fontSize: 32, color: '#64B5F6', mb: 1 }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                        {t('loanApproved')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        $1,000,000 COP
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#E65100', color: '#FFFFFF' }}>
                      <Person sx={{ fontSize: 32, color: '#FFB74D', mb: 1 }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                        {t('profileCompleted')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
                        100% actualizado
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#4A148C', color: '#FFFFFF' }}>
                      <School sx={{ fontSize: 32, color: '#BA68C8', mb: 1 }} aria-hidden="true" />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                        {t('newEnrollment')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#FFFFFF' }}>
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

