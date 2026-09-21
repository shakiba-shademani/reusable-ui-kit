import type { ReactNode } from 'react'

export interface AccordionProps {
  /** Header / summary content. */
  summary: ReactNode
  /** Expanded body content. */
  children: ReactNode
  /** Alias from ivapro `summaryInfo`. */
  summaryInfo?: ReactNode
  /** Alias from ivapro `detailInfo`. */
  detailInfo?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  summaryClassName?: string
  contentClassName?: string
  dir?: 'rtl' | 'ltr'
}
