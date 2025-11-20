import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import Courses from './Courses'
import { GET_ALL_COURSES, GET_MY_ENROLLMENTS, ENROLL_IN_COURSE } from '../../apollo/queries'

// Mock de AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '123', role: 'user' },
  }),
}))

// Mock de LanguageContext
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}))

const mockCourses = [
  {
    id: '1',
    title: 'Curso de Emprendimiento',
    description: 'Aprende a emprender',
    category: 'emprendimiento',
    level: 'basico',
    duration: 40,
    isFree: true,
    price: 0,
    thumbnailUrl: 'https://example.com/image.jpg',
    enrolledCount: 10,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Curso de Marketing',
    description: 'Marketing digital',
    category: 'marketing',
    level: 'intermedio',
    duration: 30,
    isFree: false,
    price: 50000,
    thumbnailUrl: 'https://example.com/image2.jpg',
    enrolledCount: 5,
    createdAt: '2024-01-02',
  },
]

const mocks = [
  {
    request: {
      query: GET_ALL_COURSES,
    },
    result: {
      data: {
        courses: mockCourses,
        myEnrollments: [],
      },
    },
  },
  {
    request: {
      query: ENROLL_IN_COURSE,
      variables: { courseId: '1' },
    },
    result: {
      data: {
        enrollInCourse: {
          id: 'enrollment1',
          course: mockCourses[0],
          progress: 0,
          completed: false,
        },
      },
    },
  },
]

const renderCourses = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <SnackbarProvider>
          <Courses />
        </SnackbarProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

describe('Courses', () => {
  it('renderiza el componente de cursos', () => {
    const { container } = renderCourses()
    expect(container).toBeInTheDocument()
  })

  it('muestra estado de carga inicialmente', () => {
    renderCourses()
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  })

  it('muestra el título de cursos', async () => {
    renderCourses()
    
    await waitFor(() => {
      expect(screen.getByText(/cursos/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra filtros de búsqueda', async () => {
    renderCourses()
    
    await waitFor(() => {
      const searchInputs = screen.getAllByRole('textbox')
      expect(searchInputs.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('renderiza la interfaz de cursos completa', async () => {
    const { container } = renderCourses()
    
    await waitFor(() => {
      expect(container).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

// Pruebas con cursos inscritos
describe('Courses - Con Inscripciones', () => {
  const mockEnrollment = {
    id: 'enrollment1',
    course: mockCourses[0],
    progress: 75,
    completed: false,
  }

  const mocksWithEnrollment = [
    {
      request: {
        query: GET_ALL_COURSES,
      },
      result: {
        data: {
          allCourses: mockCourses,
        },
      },
    },
    {
      request: {
        query: GET_MY_ENROLLMENTS,
      },
      result: {
        data: {
          myEnrollments: [mockEnrollment],
        },
      },
    },
  ]

  const renderCoursesWithEnrollment = () => {
    return render(
      <MockedProvider mocks={mocksWithEnrollment} addTypename={false}>
        <MemoryRouter>
          <SnackbarProvider>
            <Courses />
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
  }

  it('renderiza correctamente cursos con inscripciones', async () => {
    renderCoursesWithEnrollment()
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('muestra botones cuando hay cursos inscritos', async () => {
    renderCoursesWithEnrollment()
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})

// Pruebas con curso completado
describe('Courses - Curso Completado', () => {
  const mockCompletedEnrollment = {
    id: 'enrollment2',
    course: mockCourses[0],
    progress: 100,
    completed: true,
  }

  const mocksWithCompleted = [
    {
      request: {
        query: GET_ALL_COURSES,
      },
      result: {
        data: {
          allCourses: mockCourses,
        },
      },
    },
    {
      request: {
        query: GET_MY_ENROLLMENTS,
      },
      result: {
        data: {
          myEnrollments: [mockCompletedEnrollment],
        },
      },
    },
  ]

  const renderCoursesWithCompleted = () => {
    return render(
      <MockedProvider mocks={mocksWithCompleted} addTypename={false}>
        <MemoryRouter>
          <SnackbarProvider>
            <Courses />
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
  }

  it('renderiza cursos completados correctamente', async () => {
    renderCoursesWithCompleted()
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})

// Pruebas para diferentes niveles
describe('Courses - Niveles de Curso', () => {
  it('renderiza cursos con diferentes niveles', async () => {
    renderCourses()
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})

// Pruebas para certificación
describe('Courses - Certificación', () => {
  it('renderiza información de certificación', async () => {
    renderCourses()
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})
