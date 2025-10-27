import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayCircle,
  Schedule,
  Person,
  CheckCircle,
  School,
  EmojiEvents,
  Download,
  VideoLibrary,
  Assignment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_COURSES, GET_MY_ENROLLMENTS, ENROLL_IN_COURSE, UPDATE_COURSE_PROGRESS } from '../../apollo/queries';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(0);

  const { data: coursesData, loading: coursesLoading } = useQuery(GET_ALL_COURSES);
  const { data: enrollmentsData, loading: enrollmentsLoading } = useQuery(GET_MY_ENROLLMENTS);
  
  const [enrollInCourse] = useMutation(ENROLL_IN_COURSE, {
    refetchQueries: [GET_MY_ENROLLMENTS],
  });
  
  const [updateCourseProgress] = useMutation(UPDATE_COURSE_PROGRESS, {
    refetchQueries: [GET_MY_ENROLLMENTS],
  });

  const courses = coursesData?.allCourses || [];
  const enrollments = enrollmentsData?.myEnrollments || [];
  
  const course = courses.find(c => c.id === id);
  const enrollment = enrollments.find(e => e.course.id === id);

  if (coursesLoading || enrollmentsLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <LinearProgress sx={{ width: '50%', mx: 'auto' }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando curso...
        </Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Curso no encontrado
        </Typography>
        <Button onClick={() => navigate('/app/courses')} sx={{ mt: 2 }}>
          Volver a Cursos
        </Button>
      </Box>
    );
  }

  const handleEnroll = async () => {
    try {
      await enrollInCourse({
        variables: { courseId: course.id },
      });
    } catch (error) {
      console.error('Error al inscribirse:', error);
    }
  };

  const handleUpdateProgress = async () => {
    try {
      await updateCourseProgress({
        variables: {
          enrollmentId: enrollment.id,
          progress: newProgress,
        },
      });
      setProgressDialogOpen(false);
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
    }
  };

  const isEnrolled = !!enrollment;

  // Determine the color used for displaying the course level. Extracting this logic
  // from inline JSX avoids nested ternary operators and improves readability.
  const getLevelColor = (level) => {
    if (level === 'basico') return 'success';
    if (level === 'intermedio') return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      {/* Header del curso */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ mb: 4, overflow: 'hidden' }}>
          <Box
            sx={{
              height: 300,
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
                  color="warning"
                />
              )}
            </Box>
            
            <PlayCircle
              sx={{
                fontSize: 80,
                color: 'white',
                opacity: 0.9,
              }}
            />
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  {course.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration} horas
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor?.name || 'Instructor'}
                    </Typography>
                  </Box>
                  <Chip
                    label={course.level}
                    color={getLevelColor(course.level)}
                  />
                </Box>

                {/* Progreso si está inscrito */}
                {isEnrolled && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Tu progreso
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {enrollment.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={enrollment.progress}
                      sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setNewProgress(enrollment.progress);
                        setProgressDialogOpen(true);
                      }}
                    >
                      Actualizar Progreso
                    </Button>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {course.isFree ? 'Gratis' : `$${course.price.toLocaleString()}`}
                  </Typography>
                  
                  {isEnrolled ? (
                    <Box>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<CheckCircle />}
                        disabled
                        sx={{ mb: 2 }}
                      >
                        Ya estás inscrito
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate('/app/courses')}
                      >
                        Ver Otros Cursos
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={<School />}
                      onClick={handleEnroll}
                      sx={{ py: 1.5 }}
                    >
                      Inscribirse Ahora
                    </Button>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contenido del curso */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Contenido del Curso
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VideoLibrary sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Videos de aprendizaje"
                      secondary="Contenido multimedia interactivo"
                    />
                    {course.videoUrl && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PlayCircle />}
                        href={course.videoUrl}
                        target="_blank"
                      >
                        Ver Videos
                      </Button>
                    )}
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <Assignment sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Material de estudio"
                      secondary="Documentos y recursos descargables"
                    />
                    {course.contentUrl && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download />}
                        href={course.contentUrl}
                        target="_blank"
                      >
                        Descargar
                      </Button>
                    )}
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEvents sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Certificación"
                      secondary={course.certification ? "Certificado disponible al completar" : "Sin certificación"}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Información del Curso
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Categoría
                  </Typography>
                  <Chip label={course.category} color="primary" />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Nivel
                  </Typography>
                  <Chip 
                    label={course.level} 
                    color={getLevelColor(course.level)}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Duración
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {course.duration} horas
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Instructor
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {course.instructor?.name?.charAt(0)?.toUpperCase() || 'I'}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {course.instructor?.name || 'Instructor'}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Fecha de creación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Dialog para actualizar progreso */}
      <Dialog open={progressDialogOpen} onClose={() => setProgressDialogOpen(false)}>
        <DialogTitle>
          Actualizar Progreso del Curso
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            ¿Qué porcentaje del curso has completado?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">0%</Typography>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={newProgress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Typography variant="body2">100%</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setNewProgress(Math.max(0, newProgress - 10))}
              disabled={newProgress <= 0}
            >
              -10%
            </Button>
            <Typography variant="body1" sx={{ mx: 2, display: 'inline' }}>
              {newProgress}%
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setNewProgress(Math.min(100, newProgress + 10))}
              disabled={newProgress >= 100}
            >
              +10%
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgressDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleUpdateProgress} variant="contained">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetail;

