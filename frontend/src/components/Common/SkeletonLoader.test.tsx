import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Skeleton, { CourseCardSkeleton, StatCardSkeleton, NotificationSkeleton, TableRowSkeleton } from './SkeletonLoader'

describe('SkeletonLoader', () => {
  describe('Skeleton básico', () => {
    it('renderiza el skeleton con props por defecto', () => {
      const { container } = render(<Skeleton />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('aplica ancho personalizado', () => {
      const { container } = render(<Skeleton width="50%" />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('aplica altura personalizada', () => {
      const { container } = render(<Skeleton height={100} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('aplica borderRadius personalizado', () => {
      const { container } = render(<Skeleton borderRadius={8} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('aplica estilos personalizados', () => {
      const { container } = render(<Skeleton sx={{ margin: 10 }} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('CourseCardSkeleton', () => {
    it('renderiza el skeleton de tarjeta de curso', () => {
      const { container } = render(<CourseCardSkeleton />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('StatCardSkeleton', () => {
    it('renderiza el skeleton de tarjeta de estadística', () => {
      const { container } = render(<StatCardSkeleton />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('NotificationSkeleton', () => {
    it('renderiza el skeleton de notificación', () => {
      const { container } = render(<NotificationSkeleton />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('TableRowSkeleton', () => {
    it('renderiza skeleton de fila de tabla con columnas por defecto', () => {
      const { container } = render(<TableRowSkeleton />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renderiza skeleton de fila de tabla con número personalizado de columnas', () => {
      const { container } = render(<TableRowSkeleton columns={6} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
