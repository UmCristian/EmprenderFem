const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipos principales
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    phone: String
    address: String
    identification: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
    courses: [CourseEnrollment!]
    loans: [Loan!]
  }

  type Course {
    id: ID!
    title: String!
    description: String
    category: CourseCategory!
    duration: Int!
    contentUrl: String
    videoUrl: String
    thumbnailUrl: String
    isFree: Boolean!
    price: Float!
    certification: Boolean!
    level: CourseLevel!
    instructor: User
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
    enrollments: [CourseEnrollment!]
  }

  type CourseEnrollment {
    id: ID!
    user: User!
    course: Course!
    progress: Float!
    completed: Boolean!
    enrolledAt: String!
    completedAt: String
    certifiedAt: String
    lastAccessedAt: String!
    notes: String
  }

  type Loan {
    id: ID!
    user: User
    amount: Float!
    purpose: String!
    status: LoanStatus!
    interestRate: Float!
    termMonths: Int!
    requestedAt: String!
    approvedAt: String
    dueDate: String
    approvedBy: User
    rejectionReason: String
    notes: String
    monthlyPayment: Float
    totalAmount: Float
    remainingAmount: Float
    createdAt: String!
    updatedAt: String!
    repayments: [Repayment!]
  }

  type Repayment {
    id: ID!
    loan: Loan!
    amount: Float!
    paymentMethod: PaymentMethod!
    reference: String
    paidAt: String!
    recordedBy: User
    notes: String
    isLate: Boolean!
    lateFee: Float!
  }

  # Enumeraciones
  enum Role {
    beneficiary
    mentor
    admin
  }

  enum CourseCategory {
    emprendimiento
    finanzas
    costura
    cocina
    tecnologia
    liderazgo
    otros
  }

  enum CourseLevel {
    basico
    intermedio
    avanzado
  }

  enum LoanStatus {
    pending
    approved
    rejected
    paid
    overdue
  }

  enum PaymentMethod {
    efectivo
    transferencia
    tarjeta
    otro
  }

  # Respuesta de autenticación
  type AuthPayload {
    token: String!
    user: User!
  }

  # Notificaciones
  type Notification {
    id: ID!
    user: User!
    type: NotificationType!
    title: String!
    message: String!
    relatedId: ID
    relatedModel: String
    read: Boolean!
    createdAt: String!
  }

  enum NotificationType {
    course_enrollment
    course_completed
    course_created
    course_updated
    loan_requested
    loan_approved
    loan_rejected
    payment_due
  }

  # Estadísticas
  type Stats {
    totalUsers: Int!
    totalCourses: Int!
    totalLoans: Int!
    activeEnrollments: Int!
    completedCourses: Int!
    approvedLoans: Int!
    totalLoanAmount: Float!
  }

  # Consultas (Queries)
  type Query {
    # Usuarios
    me: User
    getUser(id: ID!): User
    allUsers: [User!]
    usersByRole(role: Role!): [User!]

    # Cursos
    allCourses: [Course!]
    getCourse(id: ID!): Course
    coursesByCategory(category: CourseCategory!): [Course!]
    coursesByLevel(level: CourseLevel!): [Course!]
    myEnrollments: [CourseEnrollment!]
    courseEnrollments(courseId: ID!): [CourseEnrollment!]

    # Préstamos
    myLoans: [Loan!]
    getLoan(id: ID!): Loan
    allLoans: [Loan!]
    loansByStatus(status: LoanStatus!): [Loan!]
    loanRepayments(loanId: ID!): [Repayment!]

    # Estadísticas
    stats: Stats!

    # Notificaciones
    myNotifications: [Notification!]
    unreadNotificationsCount: Int!
  }

  # Mutaciones (para crear o modificar)
  type Mutation {
    # Autenticación
    registerUser(
      name: String!
      email: String!
      password: String!
      phone: String
      address: String
      identification: String
      role: Role = beneficiary
    ): AuthPayload!

    loginUser(email: String!, password: String!): AuthPayload!

    # Usuarios
    updateProfile(
      name: String
      phone: String
      address: String
      identification: String
    ): User!

    # Cursos
    createCourse(
      title: String!
      description: String
      category: CourseCategory!
      duration: Float!
      contentUrl: String
      videoUrl: String
      thumbnailUrl: String
      isFree: Boolean = true
      price: Float = 0
      certification: Boolean = false
      level: CourseLevel = basico
    ): Course!

    updateCourse(
      id: ID!
      title: String
      description: String
      category: CourseCategory
      duration: Float
      contentUrl: String
      videoUrl: String
      thumbnailUrl: String
      isFree: Boolean
      price: Float
      certification: Boolean
      level: CourseLevel
      isActive: Boolean
    ): Course!

    deleteCourse(id: ID!): Course!

    enrollInCourse(courseId: ID!): CourseEnrollment!
    updateCourseProgress(enrollmentId: ID!, progress: Float!): CourseEnrollment!
    completeCourseEnrollment(enrollmentId: ID!): CourseEnrollment!

    # Préstamos
    requestLoan(
      amount: Float!
      purpose: String!
      termMonths: Int = 12
    ): Loan!

    updateLoanStatus(
      loanId: ID!
      status: LoanStatus!
      rejectionReason: String
      notes: String
    ): Loan!

    deleteLoan(loanId: ID!): Loan!

    # Pagos
    registerRepayment(
      loanId: ID!
      amount: Float!
      paymentMethod: PaymentMethod!
      reference: String
      notes: String
    ): Repayment!

    # Notificaciones
    markNotificationAsRead(notificationId: ID!): Notification!
    markAllNotificationsAsRead: Boolean!
    deleteNotification(notificationId: ID!): Notification!
  }
`;

module.exports = typeDefs;

