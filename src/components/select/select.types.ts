import type { ReactNode } from 'react'

import type { FormRegister } from '../checkbox/checkbox.types'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectRegister = FormRegister

type SelectSharedProps = {
  label?: string
  placeholder?: string
  options: SelectOption[]
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
  name?: string
  dir?: 'rtl' | 'ltr'
  /** Enables inline search; matching options are filtered and sorted by relevance. */
  searchable?: boolean
  searchPlaceholder?: string
  noResultsText?: string
  register?: SelectRegister
  registerOptions?: object
  onBlur?: () => void
}

export type SelectSingleProps = SelectSharedProps & {
  multiple?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export type SelectMultipleProps = SelectSharedProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  formatValue?: (selected: SelectOption[]) => ReactNode
}

export type SelectProps = SelectSingleProps | SelectMultipleProps
