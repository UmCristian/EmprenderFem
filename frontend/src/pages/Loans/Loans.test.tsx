import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import Loans from './Loans'
import { GET_MY_LOANS, REQUEST_LOAN } from '../../apollo/queries'

// Mock de AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '123', role: 'user', name: 'Test User' },
  }),
}))

// Mock de LanguageContext
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}))

const mockLoans = [
  {
    id: '1',
    amount: 1000000,
    purpose: 'Comprar maquinaria',
    termMonths: 12,
    interestRate: 2.5,
    status: 'approved',
    monthlyPayment: 90000,
    totalAmount: 1080000,
    remainingAmount: 1080000,
    requestedAt: '2024-01-01',
  },
]

const mocks = [
  {
    request: {
      query: GET_MY_LOANS,
    },
    result: {
      data: {
        myLoans: mockLoans,
      },
    },
  },
  {
    request: {
      query: REQUEST_LOAN,
      variables: {
        amount: 500000,
        purpose: 'Negocio',
        termMonths: 12,
      },
    },
    result: {
      data: {
        requestLoan: {
          id: '2',
          amount: 500000,
          purpose: 'Negocio',
          termMonths: 12,
          status: 'pending',
        },
      },
    },
  },
]

const renderLoans = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <SnackbarProvider>
          <Loans />
        </SnackbarProvider>
      </BrowserRouter>
    </MockedProvider>
  )
}

describe('Loans', () => {
  it('renderiza el componente de préstamos', () => {
    const { container } = renderLoans()
    expect(container).toBeInTheDocument()
  })

  it('muestra estado de carga inicialmente', () => {
    renderLoans()
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  })

  it('muestra el botón de solicitar préstamo', async () => {
    renderLoans()
    
    await waitFor(() => {
      expect(screen.getByText(/solicitar préstamo/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra las estadísticas de préstamos', async () => {
    renderLoans()
    
    await waitFor(() => {
      expect(screen.getByText(/préstamos/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('muestra tarjetas de estadísticas', async () => {
    renderLoans()
    
    await waitFor(() => {
      const cards = screen.getAllByRole('heading', { level: 4 })
      expect(cards.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })
})
