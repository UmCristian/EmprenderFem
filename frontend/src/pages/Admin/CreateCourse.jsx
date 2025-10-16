import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  School,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE, GET_ALL_COURSES } from '../../apollo/queries';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'emprendimiento',
    duration: '',
    level: 'basico',
    isFree: true,
    price: '',
    certification: false,
    contentUrl: '',
    videoUrl: '',
    thumbnailUrl: '',
  });

  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE, {
    refetchQueries: [{ query: GET_ALL_COURSES }],
    onCompleted: () => {
      navigate('/admin/courses');
    },
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse({
        variables: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          duration: parseFloat(formData.duration),
          level: formData.level,
          isFree: formData.isFree,
          price: formData.isFree ? 0 : parseFloat(formData.price),
          certification: formData.certification,
          contentUrl: formData.contentUrl || null,
          videoUrl: formData.videoUrl || null,
          thumbnailUrl: formData.thumbnailUrl || null,
        },
      });
    } catch (err) {
      console.error('Error al crear curso:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
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
            background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/admin/courses')}
              sx={{ color: 'white' }}
            >
              Volver
            </Button>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                ➕ Crear Nuevo Curso
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Completa la información del curso
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Formulario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Error al crear curso: {error.message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              {/* Información Básica */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                📝 Información Básica
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Título del Curso"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ej: Emprendimiento Digital para Mujeres"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe el contenido y objetivos del curso..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      label="Categoría"
                    >
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

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Nivel</InputLabel>
                    <Select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      label="Nivel"
                    >
                      <MenuItem value="basico">Básico</MenuItem>
                      <MenuItem value="intermedio">Intermedio</MenuItem>
                      <MenuItem value="avanzado">Avanzado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Duración (horas)"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: 0.5 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.certification}
                        onChange={handleChange}
                        name="certification"
                      />
                    }
                    label="Ofrece Certificación"
                  />
                </Grid>
              </Grid>

              {/* Precio */}
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 3 }}>
                💰 Precio
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isFree}
                        onChange={handleChange}
                        name="isFree"
                      />
                    }
                    label="Curso Gratuito"
                  />
                </Grid>

                {!formData.isFree && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      type="number"
                      label="Precio"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                )}
              </Grid>

              {/* Recursos */}
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 3 }}>
                🔗 Recursos (Opcional)
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL del Material de Estudio"
                    name="contentUrl"
                    value={formData.contentUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL del Video"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL de la Imagen del Curso"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Grid>
              </Grid>

              {/* Botones */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/admin/courses')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  disabled={loading}
                  sx={{ flex: 1 }}
                >
                  {loading ? 'Creando...' : 'Crear Curso'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default CreateCourse;
