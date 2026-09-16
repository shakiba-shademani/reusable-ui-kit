import type { ReactNode, RefCallback } from 'react'

export type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

/** `default` = stacked label above the field. `outlined` = label on the field (Figma 14126:63162). */
export type DropdownVariant = 'default' | 'outlined'

/**
 * Outlined label behavior.
 * `float` — label starts inside and rises to the border on open or value.
 * `fixed` — label stays on the border.
 */
export type DropdownLabelMode = 'float' | 'fixed'

/**
 * Compatible with react-hook-form `UseFormRegister` without depending on RHF.
 * Use with `name`: `<Dropdown name="service" register={register} options={...} />`
 * Prefer `Controller` + `field` for typed values.
 */
export type DropdownRegister = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any,
) => {
  onChange: (event: { target: { name: string; value: unknown } }) => unknown
  onBlur: (event: { target: { name: string } }) => unknown
  ref: RefCallback<HTMLInputElement>
  name: string
}

type DropdownSharedProps = {
  /** Field label. Stacked above the trigger in `default`; inside/on-border in `outlined`. */
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
  /** Visual style. `outlined` uses the floating/border label (40px, white fill). */
  variant?: DropdownVariant
  /**
   * Outlined-only. `float` (default) animates the label up on click/value;
   * `fixed` keeps it on the border.
   */
  labelMode?: DropdownLabelMode
  /** Optional leading icon (right edge in RTL). 24×24 in Figma. */
  icon?: ReactNode
  /**
   * react-hook-form `register` function. Use with `name`:
   * `<Dropdown name="service" register={register} options={...} />`
   * Or use `Controller` and spread `field` (`value` / `onChange` / `onBlur` / `ref`).
   */
  register?: DropdownRegister
  /** Called when the sheet closes (confirm or cancel) — for RHF `field.onBlur`. */
  onBlur?: () => void
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
