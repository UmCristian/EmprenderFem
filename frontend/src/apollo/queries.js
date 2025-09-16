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

