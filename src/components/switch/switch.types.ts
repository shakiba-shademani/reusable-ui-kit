import type { FormRegister } from '../checkbox/checkbox.types'
import type { ReactNode } from 'react'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onChange?: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
  className?: string
  labelClassName?: string
  dir?: 'rtl' | 'ltr'
  name?: string
  register?: FormRegister
  registerOptions?: object
}
