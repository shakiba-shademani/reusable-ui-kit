import type { ReactNode } from 'react'

import type { FormRegister } from '../checkbox/checkbox.types'

export type RadioOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  /** Alias used by some consumers / ivapro. */
  list?: RadioOption[]
  title?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onCheckedChange?: (value: string) => void
  disabled?: boolean
  className?: string
  dir?: 'rtl' | 'ltr'
  register?: FormRegister
  registerOptions?: object
}
