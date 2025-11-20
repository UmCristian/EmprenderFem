import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Login as LoginIcon, School, AccountBalance, EmojiEvents, KeyboardArrowDown, VerifiedUser, CardGiftcard, Lock } from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();

  // Función de scroll suave personalizada
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 segundo
      let start = null;

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      // Función de easing para suavizar
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  const features = [
    {
      icon: <School sx={{ fontSize: 48 }} />,
      title: 'Cursos de Capacitación',
      description: 'Aprende nuevas habilidades con nuestros cursos especializados',
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      title: 'Microcréditos',
      description: 'Accede a financiamiento para tu emprendimiento',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 48 }} />,
      title: 'Empoderamiento',
      description: 'Únete a una comunidad de mujeres emprendedoras',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/Empoderar.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#FFB6D9',
          position: 'relative',
          p: 4,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.3) 0%, rgba(255, 182, 217, 0.3) 100%)',
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          {/* Título con animación */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '7rem' },
                fontWeight: 900,
                color: 'text.primary',
                textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              Empoderar
            </Typography>
          </motion.div>

          {/* Slogan con animación */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                fontWeight: 600,
                color: 'text.primary',
                textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                mb: 6,
              }}
            >
              Mujeres cabeza de hogar
            </Typography>
          </motion.div>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
            {/* Botón Principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
                sx={{
                  py: 3,
                  px: 8,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  '&:hover': {
                    bgcolor: '#FFFFFF',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Iniciar Sesión
              </Button>
            </motion.div>

            {/* Botón Secundario */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => smoothScrollTo('features')}
                sx={{
                  py: 3,
                  px: 8,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  borderColor: 'text.primary',
                  borderWidth: 2,
                  color: 'text.primary',
                  bgcolor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    bgcolor: 'rgba(255,255,255,0.35)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Conocer Más
              </Button>
            </motion.div>
          </Box>

          {/* Badges de Confianza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
              <Chip
                icon={<VerifiedUser />}
                label="Certificado"
                sx={{
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2.5,
                  px: 1,
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
              <Chip
                icon={<CardGiftcard />}
                label="Gratuito"
                sx={{
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2.5,
                  px: 1,
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
              <Chip
                icon={<Lock />}
                label="Seguro"
                sx={{
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2.5,
                  px: 1,
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
            </Box>
          </motion.div>

          {/* Flecha de Scroll Animada */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <KeyboardArrowDown
                sx={{
                  fontSize: 48,
                  color: 'text.primary',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
                onClick={() => smoothScrollTo('features')}
              />
            </motion.div>
          </motion.div>
        </Container>

        {/* Partículas Flotantes */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,182,217,0.6)',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          pt: 16,
          pb: 12,
          bgcolor: 'background.default',
          scrollMarginTop: '0px',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}
          >
            ¿Qué Ofrecemos?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
