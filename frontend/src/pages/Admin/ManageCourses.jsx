import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  School,
  EmojiEvents,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@apollo/client';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, RadialChart, DiscreteColorLegend } from 'react-vis';
import { GET_ALL_COURSES, DELETE_COURSE } from '../../apollo/queries';
import { useLanguage } from '../../contexts/LanguageContext';

const ManageCourses = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { data, loading, error } = useQuery(GET_ALL_COURSES);
  const [deleteCourse, { loading: deleteLoading }] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: GET_ALL_COURSES }],
    onCompleted: () => {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    },
  });

const courses = data?.allCourses || [];
/* __RV_DATASETS__ */
const freePaidData = [
  { x: 'Gratis', y: courses.filter(c => c.isFree).length },
  { x: 'Pago', y: courses.filter(c => !c.isFree).length },
];

const categoryCounts = courses.reduce((acc, c) => {
  const key = c.category || 'Sin categoría';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
const categoryData = Object.entries(categoryCounts).map(([x, count]) => ({ x, y: count }));

const levelMap = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' };
const levelData = Object.entries(levelMap)
  .map(([k, label]) => ({ angle: courses.filter(c => c.level === k).length, label }))
  .filter(d => d.angle > 0);

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse({
          variables: { id: courseToDelete.id },
        });
      } catch (err) {
        console.error('Error al eliminar curso:', err);
      }
    }
  };

  const getLevelColor = (level) => {
    if (level === 'basico') return 'success';
    if (level === 'intermedio') return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>Cargando cursos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error al cargar cursos: {error.message}
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
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                🔧 {t('manageCourses')}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {t('educationDesc')}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={() => navigate('/app/admin/courses/new')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              {t('createCourse')}
            </Button>
          </Box>
        </Paper>
      </motion.div>

      {/* Estadísticas */}
{/* Gráficas (react-vis) */}
<Box sx={{ mt: 2, mb: 4 }}>
  <Grid container spacing={3}>
    {/* Gratis vs Pago */}
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Cursos Gratis vs Pagos</Typography>
          <Box sx={{ overflowX: 'auto', pb: 1 }}>
            <XYPlot xType="ordinal" width={360} height={220} margin={{ left: 60, bottom: 60 }}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={freePaidData} />
            </XYPlot>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Cursos por categoría */}
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Cursos por categoría</Typography>
          <Box sx={{ overflowX: 'auto', pb: 1 }}>
            <XYPlot xType="ordinal" width={360} height={220} margin={{ left: 60, bottom: 100 }}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
              <VerticalBarSeries data={categoryData} />
            </XYPlot>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Distribución por nivel */}
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Distribución por nivel</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <RadialChart data={levelData} width={220} height={220} showLabels />
            <DiscreteColorLegend
              items={levelData.map(d => d.label)}
              orientation="vertical"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('allCourses')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {courses.filter(c => c.certification).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('withCertification')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {courses.filter(c => c.isFree).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('freeCourses')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla de cursos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('courseList')}
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>{t('title')}</strong></TableCell>
                    <TableCell><strong>{t('category')}</strong></TableCell>
                    <TableCell><strong>{t('level')}</strong></TableCell>
                    <TableCell><strong>{t('duration')}</strong></TableCell>
                    <TableCell><strong>{t('price')}</strong></TableCell>
                    <TableCell><strong>{t('instructor')}</strong></TableCell>
                    <TableCell align="right"><strong>{t('actions')}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <School sx={{ color: 'primary.main', fontSize: 20 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {course.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={course.category} size="small" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.level}
                          size="small"
                          color={getLevelColor(course.level)}
                        />
                      </TableCell>
                      <TableCell>{course.duration}h</TableCell>
                      <TableCell>
                        {course.isFree ? (
                          <Chip label={t('free')} size="small" color="success" />
                        ) : (
                          `$${course.price.toLocaleString()}`
                        )}
                      </TableCell>
                      <TableCell>{course.instructor?.name || 'N/A'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/app/admin/courses/edit/${course.id}`)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(course)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {courses.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No hay cursos creados
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/app/admin/courses/new')}
                >
                  Crear Primer Curso
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog de confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>¿Eliminar curso?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el curso <strong>{courseToDelete?.title}</strong>?
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Esta acción no se puede deshacer. Se eliminarán todas las inscripciones asociadas.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCourses;
