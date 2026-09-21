import type { FormRegister } from '../checkbox/checkbox.types'

export interface CounterProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  onChangeValue?: (value: number) => void
  disabled?: boolean
  className?: string
  dir?: 'rtl' | 'ltr'
  name?: string
  register?: FormRegister
  registerOptions?: object
}
