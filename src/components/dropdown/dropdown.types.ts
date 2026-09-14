import type { ReactNode } from 'react'

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

type DropdownSharedProps = {
  /** Field label above the trigger. */
  label?: string
  /** Placeholder when nothing is selected. */
  placeholder?: string
  /** Options shown inside the bottom sheet. */
  options: DropdownOption[]
  /** Bottom sheet header title. */
  sheetTitle?: string
  /** Error message under the field (also turns the border red). */
  error?: string
  /** Helper text when there is no error. */
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
  name?: string
  dir?: 'rtl' | 'ltr'
  /** Force hover styles (Storybook). */
  forceHover?: boolean
  /** Optional label for a “select all” row in multiple mode. */
  selectAllLabel?: string
  /** Confirm button label. Defaults to «تایید». */
  confirmText?: string
  /** Cancel button label. Defaults to «انصراف». */
  cancelText?: string
  /** How to render multiple selected values in the trigger. */
  formatValue?: (selected: DropdownOption[]) => ReactNode
}

export type DropdownSingleProps = DropdownSharedProps & {
  multiple?: false
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export type DropdownMultipleProps = DropdownSharedProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

export type DropdownProps = DropdownSingleProps | DropdownMultipleProps
