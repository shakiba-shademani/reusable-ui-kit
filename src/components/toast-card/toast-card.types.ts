import type { ReactNode } from 'react'

export type ToastCardVariant = 'warning' | 'success' | 'error' | 'info'

export interface ToastCardProps {
  /** Main message. */
  title?: ReactNode
  /** Optional supporting text under the title. */
  description?: ReactNode
  /** Leading icon (SVG / img / custom node). */
  icon?: ReactNode
  /** Preset background colors from Figma / Iva. */
  variant?: ToastCardVariant
  /** Override background (Tailwind class or arbitrary value), e.g. `bg-[#F9F4D8]`. */
  backgroundColor?: string
  /** Background behind the icon. Defaults to white. */
  iconBackgroundClassName?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
  onClose?: () => void
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  dir?: 'rtl' | 'ltr'
  role?: 'status' | 'alert'
}
