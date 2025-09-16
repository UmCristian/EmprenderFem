# 💪 Empoderar - Frontend

Frontend moderno y responsivo para la plataforma de emprendimientos inclusivos para mujeres cabeza de hogar.

## 🚀 Características

- **Diseño Moderno**: Interfaz atractiva con Material-UI y animaciones fluidas
- **Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Autenticación**: Sistema completo de login/registro con JWT
- **GraphQL**: Integración completa con Apollo Client
- **UX Intuitiva**: Navegación fluida y experiencia de usuario excepcional

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool rápido y moderno
- **Material-UI** - Componentes de UI profesionales
- **Apollo Client** - Cliente GraphQL
- **Framer Motion** - Animaciones fluidas
- **React Router** - Navegación SPA

## 📱 Páginas Principales

### 🔐 Autenticación
- **Login**: Interfaz elegante con validación en tiempo real
- **Registro**: Formulario completo con diferentes tipos de usuario

### 🏠 Dashboard
- **Resumen personalizado**: Estadísticas de cursos y préstamos
- **Progreso visual**: Barras de progreso y métricas
- **Accesos rápidos**: Botones para acciones principales

### 📚 Cursos
- **Catálogo completo**: Grid responsivo con filtros avanzados
- **Detalle del curso**: Información completa con inscripción
- **Progreso**: Seguimiento del avance en cada curso

### 💰 Préstamos
- **Solicitud intuitiva**: Wizard paso a paso
- **Gestión de pagos**: Registro fácil de pagos
- **Estado visual**: Seguimiento del estado de préstamos

### 👤 Perfil
- **Edición en línea**: Actualización de datos personales
- **Estadísticas**: Resumen del progreso personal
- **Información de cuenta**: Detalles de la cuenta

## 🎨 Diseño

### Paleta de Colores
- **Primario**: Rosa vibrante (#E91E63) - Empoderamiento femenino
- **Secundario**: Púrpura (#9C27B0) - Complementario elegante
- **Éxito**: Verde (#4CAF50) - Completado/aprobado
- **Advertencia**: Naranja (#FF9800) - Pendiente/en progreso
- **Error**: Rojo (#F44336) - Rechazado/error

### Componentes Principales
- **Layout**: Navegación lateral con header fijo
- **Cards**: Diseño elevado con hover effects
- **Botones**: Estilos consistentes con iconos
- **Formularios**: Validación visual y feedback inmediato

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+
- npm o yarn
- Backend API ejecutándose en puerto 4000

### Instalación
```bash
cd frontend
npm install
```

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/src/
├── apollo/              # Configuración GraphQL
│   ├── client.js        # Cliente Apollo
│   └── queries.js       # Queries y mutations
├── components/          # Componentes reutilizables
│   ├── Common/          # Componentes comunes
│   └── Layout/          # Componentes de layout
├── contexts/            # Contextos React
│   └── AuthContext.jsx  # Contexto de autenticación
├── pages/               # Páginas principales
│   ├── Auth/            # Login y registro
│   ├── Courses/         # Cursos y detalle
│   ├── Dashboard/       # Dashboard principal
│   ├── Loans/           # Préstamos
│   └── Profile/         # Perfil de usuario
├── theme/               # Configuración de tema
│   └── theme.js         # Tema Material-UI
├── App.jsx              # Componente principal
└── main.ts              # Punto de entrada
```

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env` en la raíz del frontend:
```env
VITE_API_URL=http://localhost:4000/graphql
VITE_APP_NAME=Empoderar
```

### Apollo Client
Configurado para:
- Autenticación automática con JWT
- Cache inteligente
- Manejo de errores
- Refetch automático

## 📱 Responsive Design

### Breakpoints
- **xs**: 0px - 600px (Móviles)
- **sm**: 600px - 960px (Tablets)
- **md**: 960px - 1280px (Desktop pequeño)
- **lg**: 1280px+ (Desktop grande)

### Adaptaciones
- **Navegación**: Sidebar colapsable en móviles
- **Grids**: Adaptación automática de columnas
- **Formularios**: Campos apilados en móviles
- **Cards**: Tamaño optimizado por dispositivo

## 🎭 Animaciones

### Framer Motion
- **Entrada**: Fade in con movimiento suave
- **Hover**: Elevación y escalado sutil
- **Transiciones**: Cambios de página fluidos
- **Loading**: Estados de carga animados

### Efectos Especiales
- **Cards**: Elevación al hover
- **Botones**: Efectos de ripple
- **Navegación**: Transiciones suaves
- **Formularios**: Feedback visual inmediato

## 🔐 Autenticación

### Flujo de Autenticación
1. **Login/Registro**: Formularios con validación
2. **JWT Storage**: Token almacenado en localStorage
3. **Context**: Estado global del usuario
4. **Protección**: Rutas protegidas automáticamente
5. **Logout**: Limpieza completa del estado

### Roles de Usuario
- **Beneficiaria**: Acceso completo a cursos y préstamos
- **Mentora**: Acceso extendido para enseñanza
- **Administradora**: Acceso completo al sistema

## 📊 Estado de la Aplicación

### Contextos
- **AuthContext**: Usuario autenticado y métodos
- **Apollo Cache**: Estado de GraphQL

### Persistencia
- **localStorage**: Token de autenticación
- **Apollo Cache**: Datos de GraphQL
- **Session**: Estado temporal

## 🎯 Características UX

### Navegación
- **Breadcrumbs**: Ubicación actual clara
- **Sidebar**: Navegación principal siempre visible
- **Header**: Acciones rápidas y perfil

### Feedback
- **Loading**: Estados de carga claros
- **Errores**: Mensajes de error útiles
- **Éxito**: Confirmaciones de acciones
- **Validación**: Feedback en tiempo real

### Accesibilidad
- **ARIA**: Etiquetas para lectores de pantalla
- **Contraste**: Colores con suficiente contraste
- **Navegación**: Accesible por teclado
- **Iconos**: Texto alternativo descriptivo

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Optimizaciones
- **Code Splitting**: Carga bajo demanda
- **Tree Shaking**: Eliminación de código no usado
- **Minificación**: Archivos optimizados
- **Compresión**: Assets comprimidos

### Hosting Recomendado
- **Vercel**: Despliegue automático
- **Netlify**: CDN global
- **Firebase**: Hosting con SSL
- **GitHub Pages**: Gratuito para proyectos públicos

## 🔧 Desarrollo

### Scripts Disponibles
- `npm run dev`: Servidor de desarrollo
- `npm run build`: Build de producción
- `npm run preview`: Preview del build
- `npm run lint`: Linting del código

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
style: cambios de estilo
refactor: refactorización
docs: documentación
test: pruebas
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**¡Empoderando mujeres, transformando comunidades! 💪👩‍💼**


