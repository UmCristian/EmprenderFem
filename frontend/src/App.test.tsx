import { render, screen } from '@testing-library/react'
import App from './App.jsx'

it('renderiza App', () => {
  render(<App />)
  // opcional: comprueba algo visible si tu App lo tiene
  // expect(screen.getByText(/emprender/i)).toBeInTheDocument()
})
