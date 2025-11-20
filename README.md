# 💪 EmprenderFem - Plataforma de Emprendimientos Inclusivos

Una plataforma web integral que empodera a mujeres cabeza de hogar mediante formación, microcréditos y acompañamiento.

> 📚 **Documentación del Proyecto** - Información técnica, arquitectura y guías detalladas disponibles en este archivo README.

## 🌟 Descripción del Proyecto

**Empoderar** es una plataforma tecnológica diseñada específicamente para apoyar a mujeres cabeza de hogar en su proceso de emprendimiento. La plataforma ofrece:

- 📚 **Formación Virtual**: Cursos especializados en emprendimiento, finanzas y oficios
- 💰 **Microcréditos**: Acceso a financiación productiva con seguimiento personalizado
- 👥 **Acompañamiento**: Sistema de mentores y comunidad de apoyo
- 📊 **Seguimiento**: Herramientas para monitorear el progreso y crecimiento

## 🏗️ Arquitectura del Sistema

### Backend (API GraphQL)
- **Node.js + Express**: Servidor robusto y escalable
- **Apollo Server v4**: API GraphQL moderna y eficiente
- **MongoDB + Mongoose**: Base de datos flexible para datos complejos
- **JWT**: Autenticación segura y escalable
- **Arquitectura de Microservicios**: Modular y mantenible

### Frontend (React SPA)
- **React 18**: Framework moderno con hooks y suspense
- **Material-UI**: Componentes profesionales y accesibles
- **Apollo Client**: Cliente GraphQL optimizado
- **Framer Motion**: Animaciones fluidas y atractivas
- **Responsive Design**: Optimizado para todos los dispositivos

## 🚀 Características Principales

### 👤 Gestión de Usuarios
- **Registro diferenciado**: Beneficiarias, mentores y administradores
- **Perfiles completos**: Información personal y profesional
- **Roles y permisos**: Acceso controlado según el tipo de usuario
- **Autenticación segura**: JWT con renovación automática

### 📚 Sistema de Cursos
- **Catálogo diverso**: Emprendimiento, finanzas, costura, cocina, tecnología
- **Niveles progresivos**: Básico, intermedio y avanzado
- **Certificación**: Diplomas al completar cursos
- **Seguimiento**: Progreso detallado y métricas de aprendizaje
- **Material multimedia**: Videos, documentos y recursos interactivos

### 💰 Microcréditos
- **Solicitud simplificada**: Proceso intuitivo paso a paso
- **Evaluación automática**: Criterios predefinidos para aprobación
- **Seguimiento de pagos**: Registro detallado de cuotas y mora
- **Flexibilidad**: Plazos de 6 a 36 meses
- **Transparencia**: Información clara sobre intereses y costos

### 📊 Dashboard Inteligente
- **Métricas personales**: Progreso en cursos y préstamos
- **Estadísticas globales**: Datos agregados para administradores
- **Alertas inteligentes**: Notificaciones de vencimientos y oportunidades
- **Reportes**: Análisis de impacto y crecimiento

## 🛠️ Tecnologías Utilizadas

### Backend
```
Node.js 18+
Express 4.x
Apollo Server 4.x
MongoDB 6.x
Mongoose 8.x
JWT
bcryptjs
CORS
```

### Frontend
```
React 18
Vite
Material-UI 5.x
Apollo Client 3.x
Framer Motion
React Router 6.x
TypeScript
```

### Herramientas de Desarrollo
```
Nodemon
ESLint
Prettier
Concurrently
GraphQL Playground
```

## 📁 Estructura del Proyecto

```
empoderar-mujeres-platform/
├── 📁 src/                    # Backend (API GraphQL)
│   ├── 📁 models/             # Modelos de MongoDB
│   ├── 📁 resolvers/          # Resolvers de GraphQL
│   ├── 📁 schema/             # Esquema GraphQL
│   ├── 📁 utils/              # Utilidades y helpers
│   └── server.js              # Servidor principal
├── 📁 frontend/               # Frontend (React SPA)
│   ├── 📁 src/
│   │   ├── 📁 apollo/         # Cliente GraphQL
│   │   ├── 📁 components/     # Componentes React
│   │   ├── 📁 pages/          # Páginas principales
│   │   ├── 📁 contexts/       # Contextos React
│   │   └── 📁 theme/          # Tema Material-UI
│   └── package.json
├── 📄 package.json            # Configuración principal
├── 📄 seed.js                 # Datos de ejemplo
└── 📄 README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** 16 o superior
- **MongoDB** local o Atlas
- **npm** o **yarn**

### Instalación Completa
```bash
# Clonar el repositorio
git clone <repository-url>
cd empoderar-mujeres-platform

# Instalar dependencias de ambos proyectos
npm run install:all

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Poblar la base de datos con datos de ejemplo
npm run seed
```

### Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:
```env
# Base de datos
DB_URI=mongodb://localhost:27017/empoderar-mujeres

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro_aqui_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Servidor
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🎯 Uso del Sistema

### 🚀 Ejecutar Servicios Individualmente

#### 1. Backend (Node.js + GraphQL)
```bash
# Desde la raíz del proyecto
npm start

# O directamente
node src/server.js
```
**Acceso**: http://localhost:4000/graphql

#### 2. Frontend (React + Vite)
```bash
# Desde la carpeta frontend
cd frontend
npm run dev
```
**Acceso**: http://localhost:5173/

#### 3. SonarQube (Análisis de Código)
```bash
# Iniciar SonarQube (desde la carpeta pública)
"C:\Users\Public\Documents\sonarqube-25.9.0.112764\bin\windows-x86-64\StartSonar.bat"

# Ejecutar análisis de código
$env:SONAR_HOST_URL="http://localhost:9000"
$env:SONAR_TOKEN="squ_7cc571b45ee35dd4cae0e19a1b364fc3ef426e9c"
& 'C:\Users\David Rojas\.sonar\native-sonar-scanner\sonar-scanner-5.0.1.3006-windows\bin\sonar-scanner.bat'
```
**Dashboard**: http://localhost:9000/dashboard?id=UmCristian_EmprenderFem

### 🧪 Ejecutar Pruebas y Coverage

#### Backend Tests
```bash
# Desde la raíz del proyecto
npm test
```

#### Frontend Tests
```bash
# Desde la carpeta frontend
cd frontend
npm run test
```

### 🛠️ Comandos de Desarrollo

#### Desarrollo Simultáneo
```bash
# Backend y frontend al mismo tiempo
npm run dev
```

#### Instalación de Dependencias
```bash
# Instalar todo (backend + frontend)
npm run install:all

# Solo backend
npm install

# Solo frontend
cd frontend && npm install
```

### 📊 Acceso a los Servicios

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:5173/ | Aplicación web principal |
| **Backend GraphQL** | http://localhost:4000/ | API GraphQL del servidor |
| **GraphQL Playground** | http://localhost:4000/graphql | Interface para probar queries |
| **Health Check** | http://localhost:4000/health | Estado del backend |
| **SonarQube** | http://localhost:9000/ | Análisis de calidad de código |
| **Dashboard SonarQube** | http://localhost:9000/dashboard?id=UmCristian_EmprenderFem | Resultados del análisis |

### ⚡ Inicio Rápido (Todo el Proyecto)

```bash
# 1. Iniciar backend (en una terminal)
npm start

# 2. Iniciar frontend (en otra terminal)
cd frontend && npm run dev

# 3. Iniciar SonarQube (en tercera terminal)
"C:\Users\Public\Documents\sonarqube-25.9.0.112764\bin\windows-x86-64\StartSonar.bat"

# 4. Ejecutar análisis de código (cuando SonarQube esté listo)
$env:SONAR_HOST_URL="http://localhost:9000"
$env:SONAR_TOKEN="squ_7cc571b45ee35dd4cae0e19a1b364fc3ef426e9c"
& 'C:\Users\David Rojas\.sonar\native-sonar-scanner\sonar-scanner-5.0.1.3006-windows\bin\sonar-scanner.bat'
```

## 👥 Tipos de Usuario

### 👩‍💼 Beneficiaria (Por defecto)
- Acceso completo a cursos
- Solicitud de microcréditos
- Seguimiento de progreso personal
- Participación en comunidad

### 👩‍🏫 Mentora
- Todo lo de beneficiaria +
- Creación de cursos
- Seguimiento de estudiantes
- Acceso a métricas de enseñanza

### 👩‍💻 Administradora
- Acceso completo al sistema
- Gestión de usuarios
- Aprobación de préstamos
- Estadísticas globales
- Configuración del sistema

## 📊 Funcionalidades por Módulo

### 🔐 Autenticación
- [x] Registro de usuarios
- [x] Login con JWT
- [x] Protección de rutas
- [x] Renovación de tokens
- [x] Logout seguro

### 👤 Gestión de Usuarios
- [x] Perfiles completos
- [x] Edición de datos personales
- [x] Roles y permisos
- [x] Estados de cuenta
- [x] Historial de actividad

### 📚 Sistema de Cursos
- [x] Catálogo de cursos
- [x] Inscripción automática
- [x] Seguimiento de progreso
- [x] Certificación
- [x] Material multimedia
- [x] Filtros y búsqueda

### 💰 Microcréditos
- [x] Solicitud simplificada
- [x] Evaluación automática
- [x] Seguimiento de pagos
- [x] Cálculo de intereses
- [x] Estados de préstamo
- [x] Registro de pagos

### 📊 Dashboard
- [x] Métricas personales
- [x] Estadísticas globales
- [x] Progreso visual
- [x] Accesos rápidos
- [x] Notificaciones

## 🎨 Diseño y UX

### Principios de Diseño
- **Inclusivo**: Accesible para todos los niveles tecnológicos
- **Intuitivo**: Navegación clara y familiar
- **Empoderador**: Colores y mensajes que inspiran confianza
- **Responsive**: Optimizado para móviles y desktop

### Paleta de Colores
- **Primario**: Rosa vibrante (#E91E63) - Empoderamiento femenino
- **Secundario**: Púrpura (#9C27B0) - Complementario elegante
- **Éxito**: Verde (#4CAF50) - Completado/aprobado
- **Advertencia**: Naranja (#FF9800) - Pendiente/en progreso
- **Error**: Rojo (#F44336) - Rechazado/error

## 📈 Métricas e Impacto

### KPIs del Sistema
- **Usuarias registradas**: Crecimiento mensual
- **Cursos completados**: Tasa de finalización
- **Préstamos aprobados**: Volumen y éxito
- **Tiempo promedio**: De solicitud a aprobación
- **Satisfacción**: Ratings y feedback

### Impacto Social Esperado
- **Empoderamiento económico**: Ingresos mejorados
- **Autonomía**: Independencia financiera
- **Educación**: Conocimientos aplicables
- **Comunidad**: Red de apoyo mutuo

## 🔒 Seguridad

### Medidas Implementadas
- **Autenticación JWT**: Tokens seguros y renovables
- **Validación de datos**: Sanitización de entradas
- **CORS configurado**: Control de acceso por origen
- **Encriptación**: Contraseñas hasheadas con bcrypt
- **Roles y permisos**: Acceso controlado por tipo de usuario

### Buenas Prácticas
- Variables de entorno para secretos
- Validación en frontend y backend
- Manejo seguro de errores
- Logs de auditoría
- Rate limiting (pendiente)

## 🚀 Roadmap Futuro

### Fase 2 - Comunidad y Mentoring
- [ ] Sistema de mentores
- [ ] Foros de discusión
- [ ] Eventos virtuales
- [ ] Networking entre usuarias

### Fase 3 - Analytics Avanzados
- [ ] Dashboard de administración
- [ ] Reportes de impacto
- [ ] Predicción de riesgo crediticio
- [ ] Recomendaciones personalizadas

### Fase 4 - Integraciones
- [ ] APIs de bancos
- [ ] Sistemas de pago
- [ ] Notificaciones push
- [ ] Integración con redes sociales

## 🤝 Contribución

### Cómo Contribuir
1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- **ESLint**: Linting automático
- **Prettier**: Formato consistente
- **Commits**: Mensajes descriptivos
- **Tests**: Cobertura de pruebas (pendiente)

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- **Email**: soporte@empoderar.com
- **Issues**: GitHub Issues
- **Documentación**: Wiki del proyecto

## 🙏 Agradecimientos

- **Mujeres cabeza de hogar**: Por su inspiración y fuerza
- **Comunidad open source**: Por las herramientas utilizadas
- **Equipo de desarrollo**: Por su dedicación y pasión
- **Mentores**: Por su guía y apoyo

---

**¡Empoderando mujeres, transformando comunidades! 💪👩‍💼**

*"Cuando una mujer se empodera, toda la comunidad se fortalece"*