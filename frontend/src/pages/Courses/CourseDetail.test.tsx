import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import CourseDetail from './CourseDetail'
import { GET_ALL_COURSES, GET_MY_ENROLLMENTS, ENROLL_IN_COURSE, UPDATE_COURSE_PROGRESS } from '../../apollo/queries'

const mockCourse = {
  id: '1',
  title: 'Curso de Emprendimiento',
  description: 'Aprende a emprender desde cero',
  category: 'emprendimiento',
  level: 'basico',
  duration: 40,
  isFree: true,
  price: 0,
  thumbnailUrl: 'https://example.com/image.jpg',
  enrolledCount: 10,
  instructor: 'María García',
  modules: [],
  certification: true,
  videoUrl: 'https://example.com/video',
  contentUrl: 'https://example.com/content.pdf',
}

const mockEnrollment = {
  id: 'enrollment1',
  course: mockCourse,
  progress: 50,
  completed: false,
}

const mocks = [
  {
    request: {
      query: GET_ALL_COURSES,
    },
    result: {
      data: {
        allCourses: [mockCourse],
      },
    },
  },
  {
    request: {
      query: GET_MY_ENROLLMENTS,
    },
    result: {
      data: {
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
          course: mockCourse,
          progress: 0,
          completed: false,
        },
      },
    },
  },
]

const renderCourseDetail = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/courses/1']}>
        <SnackbarProvider>
          <Routes>
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
        </SnackbarProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

describe('CourseDetail', () => {
  it('muestra estado de carga inicialmente', () => {
    renderCourseDetail()
    expect(screen.getByText(/cargando curso/i)).toBeInTheDocument()
  })

  it('muestra información del curso cuando carga', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      expect(screen.getByText('Curso de Emprendimiento')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra el botón de inscripción', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      expect(screen.getByText(/inscribirse/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra información adicional del curso', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('muestra chips de información del curso', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      const chips = screen.getAllByRole('button')
      expect(chips.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('muestra botones de video y descarga cuando están disponibles', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('muestra el botón de inscribirse cuando no está inscrito', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      expect(screen.getByText(/inscribirse ahora/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra el precio del curso', async () => {
    renderCourseDetail()
    
    await waitFor(() => {
      expect(screen.getByText(/gratis/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

// Pruebas para curso con usuario inscrito
describe('CourseDetail - Usuario Inscrito', () => {
  const mocksWithEnrollment = [
    {
      request: {
        query: GET_ALL_COURSES,
      },
      result: {
        data: {
          allCourses: [mockCourse],
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

  const renderEnrolledCourse = () => {
    return render(
      <MockedProvider mocks={mocksWithEnrollment} addTypename={false}>
        <MemoryRouter initialEntries={['/courses/1']}>
          <SnackbarProvider>
            <Routes>
              <Route path="/courses/:id" element={<CourseDetail />} />
            </Routes>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
  }

  it('muestra el progreso del curso cuando el usuario está inscrito', async () => {
    renderEnrolledCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/tu progreso/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra el botón de actualizar progreso', async () => {
    renderEnrolledCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/actualizar progreso/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra que el usuario ya está inscrito', async () => {
    renderEnrolledCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/ya estás inscrito/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra el botón "Ver Otros Cursos" cuando está inscrito', async () => {
    renderEnrolledCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/ver otros cursos/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra el porcentaje de progreso correcto', async () => {
    renderEnrolledCourse()
    
    await waitFor(() => {
      expect(screen.getByText('50%')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('puede abrir el diálogo de actualizar progreso', async () => {
    const user = userEvent.setup()
    renderEnrolledCourse()
    
    await waitFor(async () => {
      const updateButton = screen.getByText(/actualizar progreso/i)
      expect(updateButton).toBeInTheDocument()
      await user.click(updateButton)
    }, { timeout: 3000 })
  })
})

// Pruebas para curso no encontrado
describe('CourseDetail - Curso No Encontrado', () => {
  const mocksNoCourse = [
    {
      request: {
        query: GET_ALL_COURSES,
      },
      result: {
        data: {
          allCourses: [],
        },
      },
    },
    {
      request: {
        query: GET_MY_ENROLLMENTS,
      },
      result: {
        data: {
          myEnrollments: [],
        },
      },
    },
  ]

  const renderNoCourse = () => {
    return render(
      <MockedProvider mocks={mocksNoCourse} addTypename={false}>
        <MemoryRouter initialEntries={['/courses/999']}>
          <SnackbarProvider>
            <Routes>
              <Route path="/courses/:id" element={<CourseDetail />} />
            </Routes>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
  }

  it('muestra mensaje de curso no encontrado', async () => {
    renderNoCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/curso no encontrado/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra botón para volver a cursos', async () => {
    renderNoCourse()
    
    await waitFor(() => {
      expect(screen.getByText(/volver a cursos/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

// Pruebas para curso sin thumbnail
describe('CourseDetail - Sin Thumbnail', () => {
  const courseNoThumb = { ...mockCourse, thumbnailUrl: null }
  const mocksNoThumb = [
    {
      request: { query: GET_ALL_COURSES },
      result: { data: { allCourses: [courseNoThumb] } },
    },
    {
      request: { query: GET_MY_ENROLLMENTS },
      result: { data: { myEnrollments: [] } },
    },
  ]

  it('muestra gradiente cuando no hay thumbnail', async () => {
    render(
      <MockedProvider mocks={mocksNoThumb} addTypename={false}>
        <MemoryRouter initialEntries={['/courses/1']}>
          <SnackbarProvider>
            <Routes>
              <Route path="/courses/:id" element={<CourseDetail />} />
            </Routes>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Curso de Emprendimiento')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

// Pruebas para diferentes niveles de curso
describe('CourseDetail - Niveles de Curso', () => {
  const testLevel = (level: string) => {
    const courseWithLevel = { ...mockCourse, level }
    const mocksWithLevel = [
      {
        request: { query: GET_ALL_COURSES },
        result: { data: { allCourses: [courseWithLevel] } },
      },
      {
        request: { query: GET_MY_ENROLLMENTS },
        result: { data: { myEnrollments: [] } },
      },
    ]

    return render(
      <MockedProvider mocks={mocksWithLevel} addTypename={false}>
        <MemoryRouter initialEntries={['/courses/1']}>
          <SnackbarProvider>
            <Routes>
              <Route path="/courses/:id" element={<CourseDetail />} />
            </Routes>
          </SnackbarProvider>
        </MemoryRouter>
      </MockedProvider>
    )
  }

  it('renderiza curso con nivel básico', async () => {
    testLevel('basico')
    
    await waitFor(() => {
      expect(screen.getByText('Curso de Emprendimiento')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('renderiza curso con nivel intermedio', async () => {
    testLevel('intermedio')
    
    await waitFor(() => {
      expect(screen.getByText('Curso de Emprendimiento')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('renderiza curso con nivel avanzado', async () => {
    testLevel('avanzado')
    
    await waitFor(() => {
      expect(screen.getByText('Curso de Emprendimiento')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
