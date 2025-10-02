# 🚀 Plan de Implementación - Casos Nielsen
## EmprenderFem - Guía Técnica Detallada

---

## ✅ **CASOS YA IMPLEMENTADOS** (11/20)

### 1️⃣ **Visibilidad del Estado**
- ✅ **Caso 1.1 - Spinner al Login**: IMPLEMENTADO
  - Archivo: `frontend/src/pages/Auth/Login.jsx` (línea 194)
  - Código: `{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}`
  - Estado: `disabled={loading}`

- ❌ **Caso 1.2 - Confirmación al Inscribirse**: NO IMPLEMENTADO
  - **Falta**: Toast/Snackbar de confirmación

### 2️⃣ **Concordancia con el Mundo Real**
- ✅ **Caso 2.1 - Lenguaje Simple**: PARCIALMENTE IMPLEMENTADO
  - Ya usa lenguaje simple en formularios
  - **Mejorar**: Agregar más ejemplos contextuales

- ✅ **Caso 2.2 - Dashboard Organizado**: IMPLEMENTADO
  - Archivo: `frontend/src/pages/Dashboard/Dashboard.jsx`
  - Estructura correcta: Saludo → Stats → Cursos → Préstamos

### 4️⃣ **Consistencia**
- ✅ **Caso 4.1 - Botones Consistentes**: IMPLEMENTADO
  - Color primario rosa (#E91E63) consistente
  - Material-UI garantiza consistencia

- ✅ **Caso 4.2 - Iconos Estándar**: IMPLEMENTADO
  - Material Icons en toda la app
  - Dashboard, School, AccountBalance, etc.

### 6️⃣ **Reconocimiento vs Recuerdo**
- ❌ **Caso 6.1 - Badges en Cursos**: NO IMPLEMENTADO
  - **Falta**: Badges de estado en tarjetas de curso

- ❌ **Caso 6.2 - Historial Reciente**: NO IMPLEMENTADO
  - **Falta**: Sección "Continuar viendo"

### 8️⃣ **Diseño Minimalista**
- ✅ **Caso 8.1 - Dashboard Limpio**: IMPLEMENTADO
  - Máximo 4 tarjetas de stats
  - Espaciado generoso
  - Jerarquía clara

- ❌ **Caso 8.2 - Formulario por Pasos**: NO IMPLEMENTADO
  - **Falta**: Wizard multi-paso para préstamos

### 9️⃣ **Recuperación de Errores**
- ✅ **Caso 9.1 - Error Claro en Login**: IMPLEMENTADO
  - Archivo: `Login.jsx` (línea 127-130)
  - Muestra `error` en Alert de Material-UI

- ❌ **Caso 9.2 - Sugerencias en Errores**: NO IMPLEMENTADO
  - **Falta**: Mensajes constructivos con sugerencias

---

## 🔨 **CASOS POR IMPLEMENTAR** (9/20)

### **PRIORIDAD ALTA** 🔴

#### **Caso 1.2: Toast de Confirmación al Inscribirse**

**Archivo a modificar**: `frontend/src/pages/Courses/Courses.jsx`

```jsx
// 1. Instalar notistack (si no está)
npm install notistack

// 2. En App.jsx, envolver con SnackbarProvider
import { SnackbarProvider } from 'notistack';

<SnackbarProvider maxSnack={3}>
  <ApolloProvider client={client}>
    {/* resto del código */}
  </ApolloProvider>
</SnackbarProvider>

// 3. En Courses.jsx, usar enqueueSnackbar
import { useSnackbar } from 'notistack';

const Courses = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse({ variables: { courseId } });
      
      // ✅ IMPLEMENTAR ESTO
      enqueueSnackbar('¡Inscrito exitosamente!', { 
        variant: 'success',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
      });
    } catch (error) {
      enqueueSnackbar('Error al inscribirse', { variant: 'error' });
    }
  };
};
```

---

#### **Caso 3.1: Botón Cancelar en Formularios**

**Crear componente**: `frontend/src/components/Common/CancelDialog.jsx`

```jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const CancelDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Segura que quieres cancelar?</DialogTitle>
      <DialogContent>
        <Typography>
          Se perderá el progreso no guardado.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No, continuar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Sí, cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
```

**Usar en formularios de préstamo**:
```jsx
const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

<Button onClick={() => setCancelDialogOpen(true)}>
  Cancelar
</Button>

<CancelDialog 
  open={cancelDialogOpen}
  onClose={() => setCancelDialogOpen(false)}
  onConfirm={() => navigate('/loans')}
/>
```

---

#### **Caso 3.2: Deshacer Eliminación**

**Modificar**: Cualquier acción de eliminación

```jsx
import { useSnackbar } from 'notistack';

const handleDelete = (item) => {
  // Guardar temporalmente
  const deletedItem = item;
  
  // Eliminar de la UI
  setItems(items.filter(i => i.id !== item.id));
  
  // Mostrar snackbar con opción de deshacer
  enqueueSnackbar('Elemento eliminado', {
    variant: 'info',
    action: (key) => (
      <Button 
        color="inherit" 
        onClick={() => {
          // Restaurar
          setItems([...items, deletedItem]);
          closeSnackbar(key);
        }}
      >
        DESHACER
      </Button>
    ),
    autoHideDuration: 5000,
  });
};
```

---

#### **Caso 5.1: Validación en Tiempo Real**

**Modificar**: `frontend/src/pages/Auth/Register.jsx`

```jsx
import { useState } from 'react';

const Register = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    return {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
    };
  };
  
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    
    if (field === 'email') {
      if (!validateEmail(formData.email)) {
        setErrors({ ...errors, email: 'Email inválido' });
      } else {
        const { email, ...rest } = errors;
        setErrors(rest);
      }
    }
  };
  
  return (
    <TextField
      error={touched.email && !!errors.email}
      helperText={touched.email && errors.email}
      onBlur={() => handleBlur('email')}
      // Borde verde si es válido
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: !errors.email && touched.email ? 'success.main' : undefined,
          },
        },
      }}
    />
  );
};
```

---

#### **Caso 5.2: Confirmación de Préstamo**

**Crear**: `frontend/src/components/Loans/LoanConfirmationDialog.jsx`

```jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';

const LoanConfirmationDialog = ({ open, onClose, onConfirm, loanData }) => {
  const [accepted, setAccepted] = useState(false);
  
  const monthlyPayment = (loanData.amount * 1.025 ** loanData.termMonths) / loanData.termMonths;
  const totalAmount = monthlyPayment * loanData.termMonths;
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmar Solicitud de Préstamo</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>Resumen del Préstamo</Typography>
          
          <Box sx={{ my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>💵 Monto solicitado:</Typography>
              <Typography fontWeight="bold">${loanData.amount.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>📈 Interés mensual:</Typography>
              <Typography fontWeight="bold">2.5%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>💳 Cuota mensual:</Typography>
              <Typography fontWeight="bold" color="primary">
                ${Math.round(monthlyPayment).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>📅 Plazo:</Typography>
              <Typography fontWeight="bold">{loanData.termMonths} meses</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">💰 Total a pagar:</Typography>
              <Typography variant="h6" color="error">
                ${Math.round(totalAmount).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 1, mt: 2 }}>
            <Typography variant="body2">
              ⚠️ <strong>Importante:</strong> Esta solicitud no se puede cancelar una vez enviada.
            </Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={accepted} 
                onChange={(e) => setAccepted(e.target.checked)} 
              />
            }
            label="He leído y acepto los términos del préstamo"
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Revisar Datos</Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          disabled={!accepted}
        >
          Confirmar Solicitud
        </Button>
      </DialogActions>
    </Dialog>
  );
};
```

---

#### **Caso 6.1: Badges en Cursos**

**Modificar**: `frontend/src/pages/Courses/Courses.jsx`

```jsx
const CourseCard = ({ course, isEnrolled, enrollment }) => {
  return (
    <Card>
      <CardMedia>
        {/* Agregar badges de estado */}
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          {isEnrolled && !enrollment?.completed && (
            <Chip 
              label={`En progreso ${enrollment.progress}%`}
              color="warning"
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          {enrollment?.completed && (
            <Chip 
              label="Completado ✓"
              color="success"
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          {!isEnrolled && (
            <Chip 
              label="Nuevo"
              color="info"
              size="small"
            />
          )}
        </Box>
      </CardMedia>
    </Card>
  );
};
```

---

#### **Caso 6.2: Historial de Cursos Recientes**

**Modificar**: `frontend/src/pages/Dashboard/Dashboard.jsx`

```jsx
const Dashboard = () => {
  const enrollments = enrollmentsData?.myEnrollments || [];
  
  // Ordenar por último acceso
  const recentCourses = [...enrollments]
    .filter(e => !e.completed)
    .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
    .slice(0, 3);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📚 Continuar viendo
            </Typography>
            <Grid container spacing={2}>
              {recentCourses.map(enrollment => (
                <Grid item xs={12} md={4} key={enrollment.id}>
                  <Card variant="outlined">
                    <CardMedia
                      component="img"
                      height="140"
                      image={enrollment.course.thumbnailUrl || '/placeholder.jpg'}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {enrollment.course.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Último acceso: {formatDate(enrollment.lastAccessedAt)}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={enrollment.progress} 
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
```

---

#### **Caso 7.1: Búsqueda Rápida**

**Ya está implementado parcialmente** en `Courses.jsx` (línea 358-370)

**Mejorar con autocompletado**:

```jsx
import Autocomplete from '@mui/material/Autocomplete';

const Courses = () => {
  const [searchOptions, setSearchOptions] = useState([]);
  
  useEffect(() => {
    // Crear opciones de búsqueda
    const options = courses.map(c => ({
      label: c.title,
      category: c.category,
      id: c.id,
    }));
    setSearchOptions(options);
  }, [courses]);
  
  return (
    <Autocomplete
      options={searchOptions}
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Buscar cursos..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
      onChange={(event, value) => {
        if (value) {
          // Navegar al curso
          navigate(`/courses/${value.id}`);
        }
      }}
    />
  );
};
```

---

#### **Caso 7.2: Ordenamiento de Cursos**

**Modificar**: `frontend/src/pages/Courses/Courses.jsx`

```jsx
const Courses = () => {
  const [sortBy, setSortBy] = useState('recent');
  
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return (b.enrollments?.length || 0) - (a.enrollments?.length || 0);
      case 'duration':
        return a.duration - b.duration;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Ordenar por</InputLabel>
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        label="Ordenar por"
      >
        <MenuItem value="recent">🆕 Más recientes</MenuItem>
        <MenuItem value="popular">⭐ Más populares</MenuItem>
        <MenuItem value="duration">⏱️ Duración (corta a larga)</MenuItem>
        <MenuItem value="alphabetical">🔤 Alfabético (A-Z)</MenuItem>
      </Select>
    </FormControl>
  );
};
```

---

#### **Caso 8.2: Formulario por Pasos**

**Crear**: `frontend/src/components/Loans/LoanWizard.jsx`

```jsx
import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from '@mui/material';

const steps = ['Información Básica', 'Detalles del Préstamo', 'Confirmación'];

const LoanWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    termMonths: 12,
  });
  
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              ¿Cuánto dinero necesitas?
            </Typography>
            <TextField
              fullWidth
              label="Monto"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="¿Para qué lo necesitas?"
              multiline
              rows={3}
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              sx={{ mt: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Detalles del Préstamo
            </Typography>
            {/* Paso 2 */}
          </Box>
        );
      case 2:
        return <LoanConfirmationDialog />;
      default:
        return 'Unknown step';
    }
  };
  
  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4, mb: 2 }}>
        {getStepContent(activeStep)}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Anterior
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
        </Button>
      </Box>
    </Box>
  );
};
```

---

#### **Caso 9.2: Sugerencias en Errores**

**Modificar validaciones de préstamo**:

```jsx
const validateLoanAmount = (amount) => {
  const min = 100000;
  const max = 5000000;
  
  if (amount < min) {
    return {
      isValid: false,
      message: `El monto mínimo es $${min.toLocaleString()} COP. Te sugerimos solicitar al menos $500,000`,
      suggestions: [
        { label: '$500,000', value: 500000 },
        { label: '$1,000,000', value: 1000000 },
        { label: '$2,000,000', value: 2000000 },
      ],
    };
  }
  
  if (amount > max) {
    return {
      isValid: false,
      message: `El monto máximo es $${max.toLocaleString()} COP`,
      suggestions: [
        { label: '$3,000,000', value: 3000000 },
        { label: '$5,000,000', value: 5000000 },
      ],
    };
  }
  
  return { isValid: true };
};

// En el componente
const validation = validateLoanAmount(formData.amount);

{!validation.isValid && (
  <Alert severity="error">
    <Typography>{validation.message}</Typography>
    <Box sx={{ mt: 1 }}>
      <Typography variant="caption">Montos populares:</Typography>
      {validation.suggestions.map(s => (
        <Chip 
          key={s.value}
          label={s.label}
          onClick={() => setFormData({ ...formData, amount: s.value })}
          sx={{ ml: 1 }}
        />
      ))}
    </Box>
  </Alert>
)}
```

---

#### **Caso 10.1: Tooltips en Formularios**

```jsx
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

<TextField
  label="Tasa de interés"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Tooltip 
          title="Tasa de interés: 2.5% mensual = $25 por cada $1,000 prestados"
          arrow
        >
          <IconButton size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    ),
  }}
/>
```

---

#### **Caso 10.2: Centro de Ayuda**

**Crear**: `frontend/src/pages/Help/HelpCenter.jsx`

```jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { Search, ExpandMore } from '@mui/icons-material';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    {
      icon: '📚',
      title: 'Cursos y Certificaciones',
      faqs: [
        { q: '¿Cómo me inscribo en un curso?', a: 'Ve a la sección de Cursos...' },
        { q: '¿Cómo obtengo mi certificado?', a: 'Completa el curso al 100%...' },
      ],
    },
    {
      icon: '💰',
      title: 'Préstamos y Pagos',
      faqs: [
        { q: '¿Cuál es el monto mínimo?', a: '$100,000 COP' },
        { q: '¿Cómo solicito un préstamo?', a: 'Ve a la sección de Préstamos...' },
      ],
    },
  ];
  
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        ❓ Centro de Ayuda
      </Typography>
      
      <TextField
        fullWidth
        placeholder="¿En qué podemos ayudarte?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />
      
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category.title}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.icon} {category.title}
                </Typography>
                {category.faqs.map((faq, idx) => (
                  <Accordion key={idx}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" gutterBottom>
          ¿No encontraste lo que buscabas?
        </Typography>
        <Button variant="contained">
          Contáctanos
        </Button>
      </Box>
    </Box>
  );
};
```

---

## 📦 **DEPENDENCIAS NECESARIAS**

```bash
# Instalar en frontend/
cd frontend
npm install notistack
```

---

## ✅ **CHECKLIST DE IMPLEMENTACIÓN**

### Fase 1 (Semana 1-2)
- [ ] Caso 1.2 - Toast de confirmación
- [ ] Caso 4.1 - Verificar consistencia de botones
- [ ] Caso 6.1 - Badges en cursos
- [ ] Caso 9.1 - Mejorar mensajes de error

### Fase 2 (Semana 3)
- [ ] Caso 3.1 - Botón cancelar
- [ ] Caso 3.2 - Deshacer eliminación
- [ ] Caso 5.1 - Validación en tiempo real
- [ ] Caso 7.2 - Ordenamiento de cursos

### Fase 3 (Semana 4)
- [ ] Caso 5.2 - Confirmación de préstamo
- [ ] Caso 6.2 - Historial reciente
- [ ] Caso 8.2 - Formulario por pasos
- [ ] Caso 10.1 - Tooltips
- [ ] Caso 10.2 - Centro de ayuda

---

**Total estimado**: 3-4 semanas de desarrollo
**Dificultad**: Moderada
**Impacto en UX**: Alto ⭐⭐⭐⭐⭐
