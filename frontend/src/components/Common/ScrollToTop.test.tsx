import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

describe('ScrollToTop', () => {
  it('hace scroll al top cuando cambia la ruta', () => {
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    // Simular cambio de ruta
    vi.mocked(useLocation).mockReturnValue({ pathname: '/home', search: '', hash: '', state: null, key: 'default' })
    
    const { rerender } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    )

    expect(scrollToMock).toHaveBeenCalled()

    // Cambiar ruta
    vi.mocked(useLocation).mockReturnValue({ pathname: '/about', search: '', hash: '', state: null, key: 'default' })
    
    rerender(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    )

    expect(scrollToMock).toHaveBeenCalledTimes(2)
  })

  it('no renderiza nada visualmente', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/', search: '', hash: '', state: null, key: 'default' })
    
    const { container } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    )

    expect(container.firstChild).toBeNull()
  })
})
