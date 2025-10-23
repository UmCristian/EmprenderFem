import { gql } from '@apollo/client';

// Queries
export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      role
      phone
      address
      identification
      createdAt
    }
  }
`;

export const GET_ALL_COURSES = gql`
  query GetAllCourses {
    allCourses {
      id
      title
      description
      category
      duration
      contentUrl
      videoUrl
      thumbnailUrl
      isFree
      price
      certification
      level
      instructor {
        name
      }
      createdAt
    }
  }
`;

export const GET_MY_ENROLLMENTS = gql`
  query GetMyEnrollments {
    myEnrollments {
      id
      progress
      completed
      enrolledAt
      completedAt
      certifiedAt
      course {
        id
        title
        description
        category
        duration
        thumbnailUrl
        certification
        level
      }
    }
  }
`;

export const GET_MY_LOANS = gql`
  query GetMyLoans {
    myLoans {
      id
      amount
      purpose
      status
      interestRate
      termMonths
      requestedAt
      approvedAt
      dueDate
      monthlyPayment
      totalAmount
      remainingAmount
      rejectionReason
      notes
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_ALL_LOANS = gql`
  query GetAllLoans {
    allLoans {
      id
      amount
      purpose
      status
      interestRate
      termMonths
      requestedAt
      approvedAt
      dueDate
      monthlyPayment
      totalAmount
      remainingAmount
      rejectionReason
      notes
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    stats {
      totalUsers
      totalCourses
      totalLoans
      activeEnrollments
      completedCourses
      approvedLoans
      totalLoanAmount
    }
  }
`;

// Mutations
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String
    $address: String
    $identification: String
    $role: Role
  ) {
    registerUser(
      name: $name
      email: $email
      password: $password
      phone: $phone
      address: $address
      identification: $identification
      role: $role
    ) {
      token
      user {
        id
        name
        email
        role
        phone
        address
        identification
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
        phone
        address
        identification
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String
    $phone: String
    $address: String
    $identification: String
  ) {
    updateProfile(
      name: $name
      phone: $phone
      address: $address
      identification: $identification
    ) {
      id
      name
      email
      phone
      address
      identification
    }
  }
`;

export const ENROLL_IN_COURSE = gql`
  mutation EnrollInCourse($courseId: ID!) {
    enrollInCourse(courseId: $courseId) {
      id
      enrolledAt
      course {
        id
        title
        category
      }
    }
  }
`;

export const UPDATE_COURSE_PROGRESS = gql`
  mutation UpdateCourseProgress($enrollmentId: ID!, $progress: Float!) {
    updateCourseProgress(enrollmentId: $enrollmentId, progress: $progress) {
      id
      progress
      completed
      completedAt
    }
  }
`;

export const REQUEST_LOAN = gql`
  mutation RequestLoan($amount: Float!, $purpose: String!, $termMonths: Int) {
    requestLoan(amount: $amount, purpose: $purpose, termMonths: $termMonths) {
      id
      amount
      purpose
      status
      termMonths
      monthlyPayment
      totalAmount
      requestedAt
    }
  }
`;

export const REGISTER_REPAYMENT = gql`
  mutation RegisterRepayment(
    $loanId: ID!
    $amount: Float!
    $paymentMethod: PaymentMethod!
    $reference: String
    $notes: String
  ) {
    registerRepayment(
      loanId: $loanId
      amount: $amount
      paymentMethod: $paymentMethod
      reference: $reference
      notes: $notes
    ) {
      id
      amount
      paymentMethod
      paidAt
      isLate
      lateFee
    }
  }
`;

export const UPDATE_LOAN_STATUS = gql`
  mutation UpdateLoanStatus(
    $loanId: ID!
    $status: LoanStatus!
    $rejectionReason: String
    $notes: String
  ) {
    updateLoanStatus(
      loanId: $loanId
      status: $status
      rejectionReason: $rejectionReason
      notes: $notes
    ) {
      id
      status
      approvedAt
      rejectionReason
      notes
    }
  }
`;

export const DELETE_LOAN = gql`
  mutation DeleteLoan($loanId: ID!) {
    deleteLoan(loanId: $loanId) {
      id
    }
  }
`;

// Admin - Gestión de Cursos
export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $title: String!
    $description: String!
    $category: CourseCategory!
    $duration: Float!
    $level: CourseLevel!
    $isFree: Boolean!
    $price: Float
    $certification: Boolean
    $contentUrl: String
    $videoUrl: String
    $thumbnailUrl: String
  ) {
    createCourse(
      title: $title
      description: $description
      category: $category
      duration: $duration
      level: $level
      isFree: $isFree
      price: $price
      certification: $certification
      contentUrl: $contentUrl
      videoUrl: $videoUrl
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      title
      description
      category
      duration
      level
      isFree
      price
      certification
      instructor {
        id
        name
      }
      createdAt
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $title: String
    $description: String
    $category: CourseCategory
    $duration: Float
    $level: CourseLevel
    $isFree: Boolean
    $price: Float
    $certification: Boolean
    $contentUrl: String
    $videoUrl: String
    $thumbnailUrl: String
  ) {
    updateCourse(
      id: $id
      title: $title
      description: $description
      category: $category
      duration: $duration
      level: $level
      isFree: $isFree
      price: $price
      certification: $certification
      contentUrl: $contentUrl
      videoUrl: $videoUrl
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      title
      description
      category
      duration
      level
      isFree
      price
      certification
      updatedAt
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      title
    }
  }
`;

// Notificaciones
export const GET_MY_NOTIFICATIONS = gql`
  query GetMyNotifications {
    myNotifications {
      id
      type
      title
      message
      read
      createdAt
      relatedId
      relatedModel
    }
  }
`;

export const GET_UNREAD_COUNT = gql`
  query GetUnreadCount {
    unreadNotificationsCount
  }
`;

export const MARK_NOTIFICATION_AS_READ = gql`
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId) {
      id
      read
    }
  }
`;

export const MARK_ALL_AS_READ = gql`
  mutation MarkAllAsRead {
    markAllNotificationsAsRead
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($notificationId: ID!) {
    deleteNotification(notificationId: $notificationId) {
      id
    }
  }
`;
