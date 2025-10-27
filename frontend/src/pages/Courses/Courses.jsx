import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Search,
  FilterList,
  PlayCircle,
  Schedule,
  Person,
  CheckCircle,
  School,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COURSES, GET_MY_ENROLLMENTS, ENROLL_IN_COURSE } from '../../apollo/queries';
import { useLanguage } from '../../contexts/LanguageContext';

// PropTypes para validar las props de CourseCard y sus propiedades anidadas.
import PropTypes from 'prop-types';

const getCourseLevelColor = (level) => {
  // Devuelve el color asociado al nivel del curso.
  if (level === 'basico') return 'success';
  if (level === 'intermedio') return 'warning';
  return 'error';
};

const CourseCard = ({ course, isEnrolled, onEnroll, enrollment, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Imagen del curso */}
        <CardMedia
          component="div"
          sx={{
            height: 200,
            background: course.thumbnailUrl 
              ? `url(${course.thumbnailUrl}) center/cover`
              : 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
            }}
          >
            <Chip
              label={course.category}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                color: 'text.primary',
                fontWeight: 600,
              }}
            />
            {course.certification && (
              <Chip
                icon={<EmojiEvents />}
                label="Certificado"
                size="small"
                color="warning"
              />
            )}
          </Box>
          
          <PlayCircle
            sx={{
              fontSize: 48,
              color: 'white',
              opacity: 0.8,
            }}
          />
        </CardMedia>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Información del curso */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {course.description}
            </Typography>
          </Box>

          {/* Detalles del curso */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {course.duration}h
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {course.instructor?.name || 'Instructor'}
              </Typography>
            </Box>
            <Chip
              label={course.level}
              size="small"
              color={getCourseLevelColor(course.level)}
            />
          </Box>

          {/* Progreso si está inscrito */}
          {isEnrolled && enrollment && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progreso
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {enrollment.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={enrollment.progress}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}

          {/* Precio y botón */}
          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {course.isFree ? t('free') : `$${course.price.toLocaleString()}`}
            </Typography>
            <Button
              variant={isEnrolled ? 'outlined' : 'contained'}
              size="small"
              onClick={() => !isEnrolled && onEnroll(course.id)}
              disabled={isEnrolled}
              startIcon={isEnrolled ? <CheckCircle /> : <School />}
            >
              {isEnrolled ? t('enrolled') : t('enroll')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Validar las props que recibe CourseCard. Declaramos los tipos de todas las
// propiedades utilizadas en el componente para evitar advertencias de Sonar.
CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    thumbnailUrl: PropTypes.string,
    category: PropTypes.string,
    certification: PropTypes.bool,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    instructor: PropTypes.shape({
      name: PropTypes.string,
    }),
    level: PropTypes.string.isRequired,
    isFree: PropTypes.bool.isRequired,
    price: PropTypes.number,
  }).isRequired,
  isEnrolled: PropTypes.bool.isRequired,
  onEnroll: PropTypes.func.isRequired,
  enrollment: PropTypes.shape({
    progress: PropTypes.number,
    completed: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    course: PropTypes.object,
  }),
  t: PropTypes.func.isRequired,
};

const Courses = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  const { data: coursesData, loading: coursesLoading } = useQuery(GET_ALL_COURSES);
  const { data: enrollmentsData } = useQuery(GET_MY_ENROLLMENTS);
  const [enrollInCourse] = useMutation(ENROLL_IN_COURSE, {
    refetchQueries: [GET_MY_ENROLLMENTS],
  });

  const courses = coursesData?.allCourses || [];
  const enrollments = enrollmentsData?.myEnrollments || [];

  // Filtrar cursos
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    const matchesLevel = !levelFilter || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse({
        variables: { courseId },
      });
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al inscribirse:', error);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => enrollment.course.id === courseId);
  };

  const getEnrollment = (courseId) => {
    return enrollments.find(enrollment => enrollment.course.id === courseId);
  };

  // Estadísticas de cursos
  const totalCourses = courses.length;
  const enrolledCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.completed).length;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            📚 {t('allCourses')}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {t('educationDesc')}
          </Typography>
        </Paper>
      </motion.div>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {totalCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('availableCourses')}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Person sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {enrolledCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('enrolledCourses')}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {completedCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('completedCourses')}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterList sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {t('filter')}
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Categoría"
                  >
                    <MenuItem value="">Todas las categorías</MenuItem>
                    <MenuItem value="emprendimiento">Emprendimiento</MenuItem>
                    <MenuItem value="finanzas">Finanzas</MenuItem>
                    <MenuItem value="costura">Costura</MenuItem>
                    <MenuItem value="cocina">Cocina</MenuItem>
                    <MenuItem value="tecnologia">Tecnología</MenuItem>
                    <MenuItem value="liderazgo">Liderazgo</MenuItem>
                    <MenuItem value="otros">Otros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Nivel</InputLabel>
                  <Select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    label="Nivel"
                  >
                    <MenuItem value="">Todos los niveles</MenuItem>
                    <MenuItem value="basico">Básico</MenuItem>
                    <MenuItem value="intermedio">Intermedio</MenuItem>
                    <MenuItem value="avanzado">Avanzado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lista de cursos */}
      {coursesLoading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <LinearProgress sx={{ width: '50%', mx: 'auto' }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Cargando cursos...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                isEnrolled={isEnrolled(course.id)}
                enrollment={getEnrollment(course.id)}
                onEnroll={handleEnroll}
                t={t}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Mensaje si no hay cursos */}
      {!coursesLoading && filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No se encontraron cursos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Intenta ajustar los filtros de búsqueda
            </Typography>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default Courses;

