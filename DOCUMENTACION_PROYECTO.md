# 📚 DOCUMENTACIÓN COMPLETA - EmprenderFem

> **Plataforma de Emprendimientos Inclusivos para Mujeres Cabeza de Hogar**

---

## 📋 **ÍNDICE**

1. [Información General](#-información-general)
2. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura de Carpetas](#-estructura-de-carpetas)
5. [Configuración e Instalación](#-configuración-e-instalación)
6. [Funcionalidades Implementadas](#-funcionalidades-implementadas)
7. [Sistema de Autenticación](#-sistema-de-autenticación)
8. [Gestión de Cursos](#-gestión-de-cursos)
9. [Sistema de Préstamos](#-sistema-de-préstamos)
10. [Panel de Administración](#-panel-de-administración)
11. [Casos de Prueba Nielsen](#-casos-de-prueba-nielsen)
12. [Problemas Resueltos](#-problemas-resueltos)
13. [API GraphQL](#-api-graphql)
14. [Componentes Principales](#-componentes-principales)
15. [Credenciales de Acceso](#-credenciales-de-acceso)
16. [Comandos Útiles](#-comandos-útiles)
17. [Equipo de Desarrollo](#-equipo-de-desarrollo)

---

## 🎯 **INFORMACIÓN GENERAL**

### **Descripción:**
EmprenderFem es una plataforma web diseñada para empoderar a mujeres cabeza de hogar a través de:
- 📚 **Educación**: Cursos de emprendimiento, finanzas, tecnología y más
- 💰 **Financiamiento**: Sistema de préstamos para impulsar emprendimientos
- 🎓 **Certificación**: Reconocimiento oficial al completar cursos
- 📊 **Seguimiento**: Dashboard personalizado con progreso y estadísticas

### **Objetivo:**
Proporcionar herramientas educativas y financieras para que mujeres cabeza de hogar puedan desarrollar y fortalecer sus emprendimientos.

### **Fecha de Desarrollo:**
Octubre 2025

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

### **Patrón de Arquitectura:**
```
┌─────────────────────────────────────────────┐
│           FRONTEND (React + Vite)           │
│  - Material-UI para componentes            │
│  - Apollo Client para GraphQL              │
│  - React Router para navegación            │
│  - Framer Motion para animaciones          │
└──────────────────┬──────────────────────────┘
                   │
                   │ HTTP/GraphQL
                   │
┌──────────────────▼──────────────────────────┐
│         BACKEND (Node.js + Express)         │
│  - Apollo Server (GraphQL)                 │
│  - JWT para autenticación                  │
│  - Bcrypt para encriptación                │
└──────────────────┬──────────────────────────┘
                   │
                   │ Mongoose ODM
                   │
┌──────────────────▼──────────────────────────┐
│            BASE DE DATOS (MongoDB)          │
│  - Colecciones: Users, Courses,            │
│    CourseEnrollments, Loans, Repayments    │
└─────────────────────────────────────────────┘
```

---

## 💻 **STACK TECNOLÓGICO**

### **Frontend:**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Framework UI |
| **Vite** | 5.x | Build tool |
| **Material-UI** | 5.x | Componentes UI |
| **Apollo Client** | 3.x | Cliente GraphQL |
| **React Router** | 6.x | Navegación |
| **Framer Motion** | 11.x | Animaciones |

### **Backend:**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 20.x | Runtime |
| **Express** | 4.x | Framework web |
| **Apollo Server** | 4.x | Servidor GraphQL |
| **MongoDB** | 7.x | Base de datos |
| **Mongoose** | 8.x | ODM |
| **JWT** | 9.x | Autenticación |
| **Bcryptjs** | 2.x | Encriptación |

### **Herramientas de Desarrollo:**
- **ESLint** - Linting
- **Prettier** - Formateo de código
- **Nodemon** - Auto-reload en desarrollo
- **Concurrently** - Ejecutar múltiples scripts

---

## 📁 **ESTRUCTURA DE CARPETAS**

```
EmprenderFem/
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── apollo/             # Configuración GraphQL
│   │   │   ├── client.js       # Cliente Apollo
│   │   │   └── queries.js      # Queries y Mutations
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Common/         # Componentes comunes
│   │   │   └── Layout/         # Layout principal
│   │   ├── contexts/           # Context API
│   │   │   └── AuthContext.jsx # Contexto de autenticación
│   │   ├── pages/              # Páginas de la aplicación
│   │   │   ├── Admin/          # Páginas de administración
│   │   │   ├── Auth/           # Login y Registro
│   │   │   ├── Courses/        # Gestión de cursos
│   │   │   ├── Dashboard/      # Dashboard principal
│   │   │   ├── Loans/          # Gestión de préstamos
│   │   │   └── Profile/        # Perfil de usuario
│   │   ├── theme/              # Tema de Material-UI
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Punto de entrada
│   └── package.json
│
├── src/                         # Backend Node.js
│   ├── models/                 # Modelos de Mongoose
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── CourseEnrollment.js
│   │   ├── Loan.js
│   │   └── Repayment.js
│   ├── resolvers/              # Resolvers GraphQL
│   │   ├── user.js
│   │   ├── course.js
│   │   ├── loan.js
│   │   └── index.js
│   ├── schema/                 # Schema GraphQL
│   │   └── index.js
│   ├── middleware/             # Middleware
│   │   └── auth.js
│   ├── utils/                  # Utilidades
│   ├── config/                 # Configuración
│   │   └── db.js
│   ├── seed.js                 # Datos de prueba
│   └── server.js               # Servidor principal
│
├── DOCUMENTACION_PROYECTO.md   # Este archivo
├── README_CASOS_NIELSEN.md     # Casos de prueba Nielsen
├── PLAN_IMPLEMENTACION_NIELSEN.md # Plan de implementación
├── PROBLEMAS_Y_SOLUCIONES.md   # Problemas resueltos
├── CRUD_CURSOS_IMPLEMENTADO.md # Documentación CRUD
├── package.json
└── .env                        # Variables de entorno
```

---

## ⚙️ **CONFIGURACIÓN E INSTALACIÓN**

### **Requisitos Previos:**
- Node.js 20.x o superior
- MongoDB 7.x o superior
- npm o yarn

### **1. Clonar el Repositorio:**
```bash
git clone https://github.com/UmCristian/EmprenderFem.git
cd EmprenderFem
```

### **2. Instalar Dependencias:**

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### **3. Configurar Variables de Entorno:**

Crear archivo `.env` en la raíz:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/emprenderfem

# JWT
JWT_SECRET=tu_clave_secreta_super_segura

# Puerto del servidor
PORT=4000

# Entorno
NODE_ENV=development
```

### **4. Cargar Datos de Prueba:**
```bash
npm run seed
```

### **5. Iniciar el Proyecto:**

**Opción 1: Todo junto (Recomendado)**
```bash
npm run dev
```

**Opción 2: Por separado**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

### **6. Acceder a la Aplicación:**
- **Frontend:** http://localhost:5173
- **Backend GraphQL:** http://localhost:4000/graphql

---

## ✨ **FUNCIONALIDADES IMPLEMENTADAS**

### **1. Autenticación y Autorización** ✅
- Registro de usuarios
- Login con JWT
- Logout
- Roles: admin, beneficiary, mentor
- Rutas protegidas
- Persistencia de sesión

### **2. Dashboard Personalizado** ✅
- Saludo dinámico según hora del día
- Estadísticas personales (cursos, préstamos)
- Cursos en progreso
- Préstamos activos
- Logros recientes
- Panel de administración (solo admin)

### **3. Gestión de Cursos** ✅
- Catálogo de cursos
- Filtros por categoría, nivel
- Búsqueda de cursos
- Inscripción en cursos
- Seguimiento de progreso
- Actualización de progreso
- Certificación al completar

### **4. Sistema de Préstamos** ✅
- Solicitud de préstamos
- Cálculo automático de cuotas
- Estados: pending, approved, rejected
- Historial de préstamos
- Registro de pagos

### **5. Panel de Administración** ✅
- **CRUD Completo de Cursos:**
  - Crear cursos
  - Editar cursos
  - Eliminar cursos
  - Lista de todos los cursos
- **Gestión de Préstamos:**
  - Aprobar/rechazar préstamos
  - Ver detalles de préstamos
- **Estadísticas Globales:**
  - Total de usuarios
  - Total de cursos
  - Préstamos aprobados

### **6. Perfil de Usuario** ✅
- Ver información personal
- Editar perfil
- Cambiar contraseña
- Ver historial de actividad

---

## 🔐 **SISTEMA DE AUTENTICACIÓN**

### **Flujo de Autenticación:**

```
1. Usuario ingresa email y password
        ↓
2. Frontend envía mutation LOGIN_USER
        ↓
3. Backend valida credenciales
        ↓
4. Backend genera token JWT
        ↓
5. Frontend guarda token en localStorage
        ↓
6. AuthContext guarda usuario en estado
        ↓
7. Token se envía en cada request (headers)
        ↓
8. Backend valida token en cada request
```

### **Implementación:**

**Frontend (AuthContext.jsx):**
```javascript
const login = useCallback((token, userData) => {
  localStorage.setItem('token', token);
  setToken(token);
  setUser(userData);
}, []);

const logout = useCallback(() => {
  localStorage.removeItem('token');
  setToken(null);
  setUser(null);
  client.clearStore();
}, [client]);
```

**Backend (auth.js):**
```javascript
const authenticate = async (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  return user;
};
```

### **Roles y Permisos:**

| Rol | Permisos |
|-----|----------|
| **admin** | Todo el sistema + CRUD de cursos + Aprobar préstamos |
| **beneficiary** | Ver cursos, inscribirse, solicitar préstamos |
| **mentor** | Ver cursos, crear contenido (futuro) |

---

## 📚 **GESTIÓN DE CURSOS**

### **Modelo de Datos:**

```javascript
{
  title: String,              // Título del curso
  description: String,        // Descripción
  category: Enum,            // emprendimiento, finanzas, etc.
  duration: Number,          // Horas
  level: Enum,               // basico, intermedio, avanzado
  isFree: Boolean,           // Gratis o de pago
  price: Number,             // Precio si no es gratis
  certification: Boolean,    // Ofrece certificado
  instructor: ObjectId,      // Referencia a User
  contentUrl: String,        // URL del material
  videoUrl: String,          // URL del video
  thumbnailUrl: String,      // URL de la imagen
  isActive: Boolean,         // Activo/Inactivo
  createdAt: Date,
  updatedAt: Date
}
```

### **Categorías Disponibles:**
- 💼 Emprendimiento
- 💰 Finanzas
- 🧵 Costura
- 🍳 Cocina
- 💻 Tecnología
- 👥 Liderazgo
- 📦 Otros

### **Niveles:**
- 🟢 Básico
- 🟡 Intermedio
- 🔴 Avanzado

### **Inscripción en Cursos:**

```javascript
{
  user: ObjectId,           // Usuario inscrito
  course: ObjectId,         // Curso
  progress: Number,         // 0-100
  completed: Boolean,       // Completado o no
  enrolledAt: Date,         // Fecha de inscripción
  completedAt: Date,        // Fecha de completado
  certifiedAt: Date         // Fecha de certificación
}
```

---

## 💰 **SISTEMA DE PRÉSTAMOS**

### **Modelo de Datos:**

```javascript
{
  user: ObjectId,           // Usuario solicitante
  amount: Number,           // Monto solicitado
  purpose: String,          // Propósito del préstamo
  status: Enum,             // pending, approved, rejected
  interestRate: Number,     // Tasa de interés (2.5%)
  termMonths: Number,       // Plazo en meses
  monthlyPayment: Number,   // Cuota mensual
  totalAmount: Number,      // Total a pagar
  remainingAmount: Number,  // Monto restante
  requestedAt: Date,        // Fecha de solicitud
  approvedAt: Date,         // Fecha de aprobación
  dueDate: Date,            // Fecha de vencimiento
  rejectionReason: String,  // Razón de rechazo
  notes: String             // Notas adicionales
}
```

### **Cálculo de Cuotas:**

```javascript
// Fórmula de interés compuesto
const monthlyPayment = (amount * Math.pow(1 + interestRate, termMonths)) / termMonths;
const totalAmount = monthlyPayment * termMonths;
```

**Ejemplo:**
- Monto: $1,000,000
- Tasa: 2.5% mensual
- Plazo: 12 meses
- Cuota mensual: ~$92,000
- Total a pagar: ~$1,104,000

### **Estados del Préstamo:**
- ⏳ **pending** - En espera de aprobación
- ✅ **approved** - Aprobado y activo
- ❌ **rejected** - Rechazado

---

## 🔧 **PANEL DE ADMINISTRACIÓN**

### **Acceso:**
Solo usuarios con `role: 'admin'` pueden acceder.

### **Funcionalidades:**

#### **1. Gestión de Cursos (CRUD Completo):**

**Crear Curso:**
- Ruta: `/admin/courses/new`
- Campos: título, descripción, categoría, nivel, duración, precio, certificación, URLs
- Validación en frontend y backend

**Editar Curso:**
- Ruta: `/admin/courses/edit/:id`
- Pre-carga datos actuales
- Permite modificar todos los campos

**Eliminar Curso:**
- Confirmación con dialog
- Elimina curso e inscripciones asociadas

**Lista de Cursos:**
- Ruta: `/admin/courses`
- Tabla con todos los cursos
- Estadísticas (total, con certificación, gratis)
- Acciones: editar, eliminar

#### **2. Gestión de Préstamos:**
- Ver todas las solicitudes
- Aprobar/rechazar préstamos
- Agregar notas
- Ver historial de pagos

#### **3. Estadísticas Globales:**
- Total de usuarios
- Total de cursos
- Préstamos aprobados
- Monto total financiado

---

## 📊 **CASOS DE PRUEBA NIELSEN**

Se implementaron **20 casos de prueba** basados en los **10 principios de usabilidad de Jakob Nielsen**.

### **Principios Cubiertos:**

1. **Visibilidad del Estado del Sistema**
   - Spinner al iniciar sesión
   - Confirmación al inscribirse en curso

2. **Concordancia con el Mundo Real**
   - Lenguaje simple y claro
   - Dashboard organizado intuitivamente

3. **Control y Libertad del Usuario**
   - Botón cancelar en formularios
   - Deshacer eliminación

4. **Consistencia y Estándares**
   - Botones con colores consistentes
   - Iconos estándar de Material-UI

5. **Prevención de Errores**
   - Validación en tiempo real
   - Confirmación antes de acciones críticas

6. **Reconocimiento vs Recuerdo**
   - Badges de estado en cursos
   - Historial de cursos recientes

7. **Flexibilidad y Eficiencia**
   - Búsqueda rápida de cursos
   - Ordenamiento de cursos

8. **Diseño Minimalista**
   - Dashboard limpio
   - Formularios por pasos

9. **Recuperación de Errores**
   - Mensajes de error claros
   - Sugerencias de solución

10. **Ayuda y Documentación**
    - Tooltips en formularios
    - Centro de ayuda

**Documento completo:** `README_CASOS_NIELSEN.md`

---

## 🐛 **PROBLEMAS RESUELTOS**

### **1. Navegación no funcionaba** ✅
**Problema:** Botones del menú lateral no navegaban.
**Solución:** Agregar `useNavigate()` y `onClick` a cada botón.

### **2. URL del backend incorrecta** ✅
**Problema:** Apollo Client no conectaba con GraphQL.
**Solución:** Cambiar URL de `http://localhost:4000/` a `http://localhost:4000/graphql`.

### **3. Re-renders infinitos en AuthContext** ✅
**Problema:** La app se congelaba por loops infinitos.
**Solución:** Usar `useCallback` para memoizar funciones.

### **4. Botones del Dashboard sin navegación** ✅
**Problema:** Botones "Explorar Cursos" y "Solicitar Préstamo" no funcionaban.
**Solución:** Agregar `onClick={() => navigate('/ruta')}`.

**Documento completo:** `PROBLEMAS_Y_SOLUCIONES.md`

---

## 🔌 **API GRAPHQL**

### **Endpoint:**
```
http://localhost:4000/graphql
```

### **Queries Principales:**

```graphql
# Obtener usuario actual
query {
  me {
    id
    name
    email
    role
  }
}

# Obtener todos los cursos
query {
  allCourses {
    id
    title
    description
    category
    level
    duration
    isFree
    price
  }
}

# Obtener mis inscripciones
query {
  myEnrollments {
    id
    progress
    completed
    course {
      title
    }
  }
}

# Obtener mis préstamos
query {
  myLoans {
    id
    amount
    status
    monthlyPayment
  }
}
```

### **Mutations Principales:**

```graphql
# Login
mutation {
  loginUser(email: "maria@ejemplo.com", password: "password123") {
    token
    user {
      id
      name
      role
    }
  }
}

# Crear curso (admin)
mutation {
  createCourse(
    title: "Emprendimiento Digital"
    description: "Aprende a emprender en línea"
    category: emprendimiento
    duration: 10
    level: basico
    isFree: true
    certification: true
  ) {
    id
    title
  }
}

# Inscribirse en curso
mutation {
  enrollInCourse(courseId: "123") {
    id
    enrolledAt
  }
}

# Solicitar préstamo
mutation {
  requestLoan(
    amount: 1000000
    purpose: "Comprar maquinaria"
    termMonths: 12
  ) {
    id
    monthlyPayment
    totalAmount
  }
}
```

---

## 🧩 **COMPONENTES PRINCIPALES**

### **Layout.jsx**
- Menú lateral con navegación
- AppBar con perfil de usuario
- Menú desplegable (perfil, configuración, logout)
- Ítem "Gestionar Cursos" solo para admin

### **Dashboard.jsx**
- Saludo personalizado
- 4 tarjetas de estadísticas
- Lista de cursos en progreso
- Lista de préstamos activos
- Logros recientes
- Panel de admin (solo admin)

### **Courses.jsx**
- Catálogo de cursos con cards
- Filtros (categoría, nivel)
- Búsqueda
- Botón de inscripción
- Indicador de progreso si está inscrito

### **CourseDetail.jsx**
- Detalles completos del curso
- Video y material descargable
- Botón de inscripción
- Actualización de progreso
- Información del instructor

### **ManageCourses.jsx** (Admin)
- Tabla con todos los cursos
- Estadísticas
- Botones de editar/eliminar
- Confirmación de eliminación

### **CreateCourse.jsx** (Admin)
- Formulario completo
- Validación de campos
- Switch para gratis/pago
- URLs opcionales

### **EditCourse.jsx** (Admin)
- Pre-carga datos actuales
- Formulario de edición
- Guardar cambios

---

## 🔑 **CREDENCIALES DE ACCESO**

### **Administrador:**
```
Email: admin@empoderar.com
Password: admin123
Rol: admin
```

### **Beneficiarias:**
```
Email: maria@ejemplo.com
Password: password123
Rol: beneficiary

Email: ana@ejemplo.com
Password: password123
Rol: beneficiary
```

### **Mentor:**
```
Email: carlos@ejemplo.com
Password: password123
Rol: mentor
```

---

## 🛠️ **COMANDOS ÚTILES**

### **Desarrollo:**
```bash
# Iniciar todo (backend + frontend)
npm run dev

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend

# Cargar datos de prueba
npm run seed
```

### **Producción:**
```bash
# Build del frontend
cd frontend
npm run build

# Iniciar backend en producción
npm start
```

### **Base de Datos:**
```bash
# Conectar a MongoDB
mongosh

# Ver bases de datos
show dbs

# Usar base de datos
use emprenderfem

# Ver colecciones
show collections

# Ver usuarios
db.users.find().pretty()
```

### **Git:**
```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción del cambio"

# Push
git push origin main

# Pull
git pull origin main
```

---

## 👥 **EQUIPO DE DESARROLLO**

| Nombre | Rol |
|--------|-----|
| **David Felipe Rojas Botero** | Desarrollador Full-Stack |
| **Cristian Giovanny Salazar Moreras** | Desarrollador Full-Stack |
| **Victor Alfonso Alarcon Ospina** | Desarrollador Full-Stack |

---

## 📝 **NOTAS ADICIONALES**

### **Seguridad:**
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de roles en backend
- ✅ Rutas protegidas en frontend
- ✅ Variables de entorno para secretos

### **Buenas Prácticas:**
- ✅ Código limpio y documentado
- ✅ Componentes reutilizables
- ✅ Manejo de errores robusto
- ✅ Loading states en todas las operaciones
- ✅ Validación en frontend y backend
- ✅ PropTypes para validación de props
- ✅ useCallback y useMemo para optimización

### **Próximas Mejoras:**
- 📧 Sistema de notificaciones por email
- 📱 Versión móvil nativa
- 💬 Chat en tiempo real
- 📈 Analíticas avanzadas
- 🎥 Videollamadas para mentorías
- 🌐 Internacionalización (i18n)

---

## 🔔 **SISTEMA DE NOTIFICACIONES**

### **Implementación Completa:**
- ✅ Modelo de notificaciones en MongoDB
- ✅ Schema y resolvers GraphQL
- ✅ 8 tipos de notificaciones automáticas
- ✅ Notificaciones en tiempo real

### **Tipos de Notificaciones:**
1. **course_created** - Nuevo curso disponible → Todos los usuarios
2. **course_updated** - Curso actualizado → Usuarios inscritos
3. **course_enrollment** - Usuario se inscribe → Admins
4. **course_completed** - Usuario completa curso → Usuario + Admins
5. **loan_requested** - Préstamo solicitado → Admins
6. **loan_approved** - Préstamo aprobado → Usuario
7. **loan_rejected** - Préstamo rechazado → Usuario
8. **payment_due** - Pago próximo a vencer → Usuario

### **Queries GraphQL:**
```graphql
# Obtener notificaciones
myNotifications: [Notification!]
unreadNotificationsCount: Int!

# Marcar como leída
markNotificationAsRead(notificationId: ID!): Notification!
markAllNotificationsAsRead: Boolean!
```

---

## 📊 **ANÁLISIS DE CALIDAD DE CÓDIGO**

### **SonarQube - Resultados:**
| Métrica | Resultado | Calificación |
|---------|-----------|--------------|
| **Security** | 0 issues | ⭐ A |
| **Reliability** | 0 issues | ⭐ A |
| **Maintainability** | 4 issues | ⭐ A |
| **Duplications** | 1.7% | ✅ Excelente |
| **Coverage** | 8.7% | ⚠️ Sin tests |

### **ESLint - Backend:**
- ✅ 0 errores
- ✅ 0 warnings
- ✅ Código limpio

### **Configuración:**
- **SonarQube Local:** http://localhost:9000
- **Project Key:** emprenderfem
- **Análisis:** `npm run sonar`

---

## 📚 **DOCUMENTOS RELACIONADOS**

1. **README_CASOS_NIELSEN.md** - Casos de prueba de usabilidad
2. **PLAN_IMPLEMENTACION_NIELSEN.md** - Plan de implementación detallado
3. **PROBLEMAS_Y_SOLUCIONES.md** - Problemas resueltos y soluciones

---

## 📞 **SOPORTE**

Para preguntas o problemas:
- 📧 Email: soporte@emprenderfem.com
- 🐛 Issues: https://github.com/UmCristian/EmprenderFem/issues
- 📖 Wiki: https://github.com/UmCristian/EmprenderFem/wiki

---

## 📄 **LICENCIA**

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🎉 **AGRADECIMIENTOS**

Gracias a todas las mujeres emprendedoras que inspiraron este proyecto.

**"Cuando una mujer se empodera, toda la comunidad se fortalece"**

---

**Última actualización:** Octubre 16, 2025
**Versión:** 1.0.0
**Estado:** ✅ Producción
