import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HelpTooltip from './HelpTooltip'

describe('HelpTooltip', () => {
  it('renderiza el ícono de ayuda', () => {
    render(<HelpTooltip title="Texto de ayuda" />)
    
    const helpButton = screen.getByRole('button', { name: /ayuda contextual/i })
    expect(helpButton).toBeInTheDocument()
  })

  it('muestra el tooltip al hacer hover', async () => {
    const user = userEvent.setup()
    render(<HelpTooltip title="Información útil" />)
    
    const helpButton = screen.getByRole('button', { name: /ayuda contextual/i })
    
    await user.hover(helpButton)
    
    // El tooltip aparece después de un delay
    const tooltip = await screen.findByText('Información útil')
    expect(tooltip).toBeInTheDocument()
  })

  it('acepta diferentes tamaños', () => {
    const { rerender } = render(<HelpTooltip title="Test" size="small" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<HelpTooltip title="Test" size="medium" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<HelpTooltip title="Test" size="large" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('acepta diferentes posiciones de placement', () => {
    const { rerender } = render(<HelpTooltip title="Test" placement="top" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<HelpTooltip title="Test" placement="bottom" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<HelpTooltip title="Test" placement="left" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<HelpTooltip title="Test" placement="right" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
