import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
};

// Traducciones
const translations = {
  es: {
    // Navegación
    dashboard: 'Panel',
    courses: 'Cursos',
    loans: 'Préstamos',
    profile: 'Mi Perfil',
    logout: 'Cerrar Sesión',
    notifications: 'Notificaciones',
    settings: 'Configuración',
    
    // Dashboard
    welcome: 'Bienvenida',
    welcomeAdmin: 'Bienvenida, Admin',
    myProgress: 'Mi Progreso',
    activeCourses: 'Cursos Activos',
    completedCourses: 'Cursos Completados',
    approvedLoans: 'Préstamos Aprobados',
    totalFinanced: 'Total Financiado',
    exploreCourses: 'Explorar Cursos',
    requestLoan: 'Solicitar Préstamo',
    noCoursesYet: 'Aún no te has inscrito en ningún curso',
    noLoansYet: 'Aún no has solicitado ningún préstamo',
    myCourses: 'Mis Cursos',
    myLoans: 'Mis Préstamos',
    viewAll: 'Ver Todo',
    progress: 'Progreso',
    enrolled: 'Inscrita',
    recentAchievements: 'Logros Recientes',
    courseCompleted: 'Curso Completado',
    loanApproved: 'Préstamo Aprobado',
    profileCompleted: 'Perfil Completo',
    newEnrollment: 'Nueva Inscripción',
    
    // Perfil
    personalInfo: 'Información Personal',
    accountInfo: 'Información de la Cuenta',
    statistics: 'Estadísticas',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    name: 'Nombre',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    identification: 'Identificación',
    preferences: 'Preferencias',
    privacy: 'Privacidad',
    theme: 'Tema',
    language: 'Idioma',
    light: 'Claro',
    dark: 'Oscuro',
    auto: 'Automático',
    spanish: 'Español',
    english: 'English',
    emailNotifications: 'Notificaciones por Email',
    courseReminders: 'Recordatorios de Cursos',
    loanUpdates: 'Actualizaciones de Préstamos',
    profileVisibility: 'Visibilidad del Perfil',
    public: 'Público',
    private: 'Privado',
    friends: 'Solo Amigas',
    shareProgress: 'Compartir Progreso',
    allowAnalytics: 'Análisis y Datos',
    registrationDate: 'Fecha de registro',
    accountStatus: 'Estado de la cuenta',
    active: 'Activa',
    inactive: 'Inactiva',
    receiveImportantUpdates: 'Recibir actualizaciones importantes',
    alertsAboutPendingCourses: 'Alertas sobre cursos pendientes',
    notificationsAboutLoanStatus: 'Notificaciones sobre estado de préstamos',
    allowOthersToSeeProgress: 'Permitir que otras vean tu progreso en cursos',
    helpUsImprove: 'Ayúdanos a mejorar compartiendo datos de uso',
    yourDataIsSafe: 'Tus datos están seguros',
    neverShareWithoutConsent: 'Nunca compartimos tu información personal con terceros sin tu consentimiento.',
    coursesInProgress: 'cursos en progreso',
    microcredits: 'microcréditos',
    totalLoanAmount: 'Monto total de préstamos',
    
    // Mensajes
    profileUpdated: 'Perfil actualizado exitosamente',
    preferenceUpdated: 'Preferencia actualizada',
    privacyUpdated: 'Configuración de privacidad actualizada',
    
    // Login
    login: 'Iniciar Sesión',
    loginTitle: 'Iniciar Sesión',
    password: 'Contraseña',
    noAccount: '¿No tienes cuenta?',
    register: 'Regístrate',
    loggingIn: 'Iniciando sesión...',
    
    // Landing
    startSession: 'Iniciar Sesión',
    whatWeOffer: '¿Qué Ofrecemos?',
    education: 'Educación',
    educationDesc: 'Accede a cursos especializados para emprendedoras',
    financing: 'Financiamiento',
    financingDesc: 'Microcréditos diseñados para tu negocio',
    empowerment: 'Empoderamiento',
    empowermentDesc: 'Únete a una comunidad de mujeres emprendedoras',
    
    // Cursos
    allCourses: 'Todos los Cursos',
    availableCourses: 'Cursos Disponibles',
    enrolledCourses: 'Cursos Inscritos',
    category: 'Categoría',
    duration: 'Duración',
    level: 'Nivel',
    free: 'Gratis',
    enroll: 'Inscribirse',
    viewDetails: 'Ver Detalles',
    courseDetails: 'Detalles del Curso',
    instructor: 'Instructor',
    description: 'Descripción',
    search: 'Buscar',
    filter: 'Filtrar',
    all: 'Todos',
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    withCertification: 'Con Certificación',
    noCourses: 'No se encontraron cursos',
    
    // Préstamos
    allLoans: 'Todos los Préstamos',
    myLoanRequests: 'Mis Solicitudes',
    newLoanRequest: 'Nueva Solicitud',
    amount: 'Monto',
    status: 'Estado',
    requestDate: 'Fecha de Solicitud',
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    purpose: 'Propósito',
    term: 'Plazo',
    months: 'meses',
    makePayment: 'Realizar Pago',
    paymentAmount: 'Monto del Pago',
    approve: 'Aprobar',
    reject: 'Rechazar',
    delete: 'Eliminar',
    loanManagement: 'Gestión de Préstamos',
    financialSupport: 'Apoyo Financiero para tu Emprendimiento',
    totalRequested: 'Total Solicitado',
    activeLoans: 'Préstamos Activos',
    pendingRequests: 'Solicitudes Pendientes',
    inReview: 'En Revisión',
    applicant: 'Solicitante',
    loanDetails: 'Detalles del préstamo',
    interestRate: 'Tasa de interés',
    monthlyPayment: 'Cuota mensual',
    outstandingBalance: 'Saldo pendiente',
    
    // Admin
    manageCourses: 'Gestionar Cursos',
    createCourse: 'Crear Curso',
    editCourse: 'Editar Curso',
    deleteCourse: 'Eliminar Curso',
    courseTitle: 'Título del Curso',
    actions: 'Acciones',
    confirmDelete: '¿Confirmar eliminación?',
    deleteConfirmMessage: '¿Estás seguro de que deseas eliminar este curso?',
    price: 'Precio',
    students: 'Estudiantes',
    courseList: 'Lista de Cursos',
    title: 'Título',
    freeCourses: 'Cursos Gratis',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    courses: 'Courses',
    loans: 'Loans',
    profile: 'My Profile',
    logout: 'Logout',
    notifications: 'Notifications',
    settings: 'Settings',
    
    // Dashboard
    welcome: 'Welcome',
    welcomeAdmin: 'Welcome, Admin',
    myProgress: 'My Progress',
    activeCourses: 'Active Courses',
    completedCourses: 'Completed Courses',
    approvedLoans: 'Approved Loans',
    totalFinanced: 'Total Financed',
    exploreCourses: 'Explore Courses',
    requestLoan: 'Request Loan',
    noCoursesYet: 'You have not enrolled in any courses yet',
    noLoansYet: 'You have not requested any loans yet',
    myCourses: 'My Courses',
    myLoans: 'My Loans',
    viewAll: 'View All',
    progress: 'Progress',
    enrolled: 'Enrolled',
    recentAchievements: 'Recent Achievements',
    courseCompleted: 'Course Completed',
    loanApproved: 'Loan Approved',
    profileCompleted: 'Profile Completed',
    newEnrollment: 'New Enrollment',
    
    // Profile
    personalInfo: 'Personal Information',
    accountInfo: 'Account Information',
    statistics: 'Statistics',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    identification: 'Identification',
    preferences: 'Preferences',
    privacy: 'Privacy',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    spanish: 'Español',
    english: 'English',
    emailNotifications: 'Email Notifications',
    courseReminders: 'Course Reminders',
    loanUpdates: 'Loan Updates',
    profileVisibility: 'Profile Visibility',
    public: 'Public',
    private: 'Private',
    friends: 'Friends Only',
    shareProgress: 'Share Progress',
    allowAnalytics: 'Analytics & Data',
    registrationDate: 'Registration Date',
    accountStatus: 'Account Status',
    active: 'Active',
    inactive: 'Inactive',
    receiveImportantUpdates: 'Receive important updates',
    alertsAboutPendingCourses: 'Alerts about pending courses',
    notificationsAboutLoanStatus: 'Notifications about loan status',
    allowOthersToSeeProgress: 'Allow others to see your course progress',
    helpUsImprove: 'Help us improve by sharing usage data',
    yourDataIsSafe: 'Your data is safe',
    neverShareWithoutConsent: 'We never share your personal information with third parties without your consent.',
    coursesInProgress: 'courses in progress',
    microcredits: 'microcredits',
    totalLoanAmount: 'Total loan amount',
    
    // Messages
    profileUpdated: 'Profile updated successfully',
    preferenceUpdated: 'Preference updated',
    privacyUpdated: 'Privacy settings updated',
    
    // Login
    login: 'Login',
    loginTitle: 'Sign In',
    password: 'Password',
    noAccount: "Don't have an account?",
    register: 'Sign Up',
    loggingIn: 'Logging in...',
    
    // Landing
    startSession: 'Get Started',
    whatWeOffer: 'What We Offer?',
    education: 'Education',
    educationDesc: 'Access specialized courses for entrepreneurs',
    financing: 'Financing',
    financingDesc: 'Microcredits designed for your business',
    empowerment: 'Empowerment',
    empowermentDesc: 'Join a community of women entrepreneurs',
    
    // Courses
    allCourses: 'All Courses',
    availableCourses: 'Available Courses',
    enrolledCourses: 'Enrolled Courses',
    category: 'Category',
    duration: 'Duration',
    level: 'Level',
    free: 'Free',
    enroll: 'Enroll',
    viewDetails: 'View Details',
    courseDetails: 'Course Details',
    instructor: 'Instructor',
    description: 'Description',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    basic: 'Basic',
    purpose: 'Purpose',
    term: 'Term',
    months: 'months',
    makePayment: 'Make Payment',
    paymentAmount: 'Payment Amount',
    approve: 'Approve',
    reject: 'Reject',
    delete: 'Delete',
    loanManagement: 'Loan Management',
    financialSupport: 'Financial Support for your Business',
    totalRequested: 'Total Requested',
    activeLoans: 'Active Loans',
    pendingRequests: 'Pending Requests',
    inReview: 'In Review',
    applicant: 'Applicant',
    loanDetails: 'Loan Details',
    interestRate: 'Interest Rate',
    monthlyPayment: 'Monthly Payment',
    outstandingBalance: 'Outstanding Balance',
    
    // Admin
    manageCourses: 'Manage Courses',
    createCourse: 'Create Course',
    editCourse: 'Edit Course',
    deleteCourse: 'Delete Course',
    courseTitle: 'Course Title',
    actions: 'Actions',
    confirmDelete: 'Confirm Deletion?',
    deleteConfirmMessage: 'Are you sure you want to delete this course?',
    price: 'Price',
    students: 'Students',
    courseList: 'Course List',
    title: 'Title',
    freeCourses: 'Free Courses',
  },
};

export const LanguageProvider = ({ children }) => {
  const { user } = useAuth();
  // Inicializar desde localStorage primero
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  // Actualizar cuando el usuario carga sus preferencias
  useEffect(() => {
    if (user?.preferences?.language) {
      const userLang = user.preferences.language;
      if (userLang !== language) {
        setLanguage(userLang);
        localStorage.setItem('language', userLang);
      }
    }
  }, [user]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
