import type { ReactNode } from 'react'

export interface MarqueeProps {
  children: ReactNode
  className?: string
  /** CSS width, e.g. `100%` or `200px`. */
  width?: string
  /** Animation duration in seconds. */
  duration?: number
  /** Extra end padding while scrolling. */
  gap?: string
}
