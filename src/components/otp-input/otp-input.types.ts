import type { InputHTMLAttributes } from 'react'

export type OtpInputProps = {
  /** Number of boxes. Defaults to `6` (Figma). */
  length?: number
  /** Controlled value (concatenated string). */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Fires on every change with the full string. */
  onChange?: (value: string) => void
  /** Fires once when all boxes are filled. */
  onComplete?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  /** Shows error border styling. */
  error?: boolean
  className?: string
  name?: string
  id?: string
  'aria-label'?: string
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange' | 'size' | 'type'
>
