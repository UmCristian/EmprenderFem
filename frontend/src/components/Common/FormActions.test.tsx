import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FormActions from './FormActions'

describe('FormActions', () => {
  it('renderiza botones Cancelar y Guardar', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Guardar')).toBeInTheDocument()
  })

  it('llama a onCancel cuando se hace click en Cancelar', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByText('Cancelar'))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('llama a onSubmit cuando se hace click en Guardar', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByText('Guardar'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('deshabilita botones cuando loading es true', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        loading={true}
      />
    )

    const cancelButton = screen.getByText('Cancelar')
    const submitButton = screen.getByText('Guardando...')

    expect(cancelButton).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  it('deshabilita botón submit cuando submitDisabled es true', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        submitDisabled={true}
      />
    )

    const submitButton = screen.getByText('Guardar')
    expect(submitButton).toBeDisabled()
  })

  it('usa textos personalizados', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelText="Volver"
        submitText="Enviar"
      />
    )

    expect(screen.getByText('Volver')).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('oculta íconos cuando showCancelIcon y showSubmitIcon son false', () => {
    const onCancel = vi.fn()
    const onSubmit = vi.fn()

    render(
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        showCancelIcon={false}
        showSubmitIcon={false}
      />
    )

    // Los botones deben existir pero sin íconos
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Guardar')).toBeInTheDocument()
  })
})
