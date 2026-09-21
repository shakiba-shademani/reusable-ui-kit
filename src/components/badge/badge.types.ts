import type {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  ReactNode,
  RefCallback,
} from 'react'

/**
 * Compatible with react-hook-form `UseFormRegister` without depending on RHF.
 * Use with `name`: `<Badge name="merchant" register={register} />`
 */
export type BadgeRegister = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any,
) => {
  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown
  onBlur: (event: FocusEvent<HTMLInputElement>) => unknown
  ref: RefCallback<HTMLInputElement>
  name: string
}

export interface BadgeProps {
  /** Visible label. */
  children?: ReactNode
  /** Alias for `children` when you prefer a string prop. */
  label?: string
  /** Optional leading icon (e.g. filter icon). */
  icon?: ReactNode
  /** Controlled selected state. */
  selected?: boolean
  /** Uncontrolled initial selected state. */
  defaultSelected?: boolean
  /** Called whenever selection changes. */
  onSelectedChange?: (selected: boolean) => void
  /** Called when the badge body is clicked (before select). */
  onClick?: (event: MouseEvent<HTMLElement>) => void
  /** Called when the clear (X) control is clicked. */
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void
  /**
   * Value written to the form when selected.
   * When unselected the form value is `''`.
   * Defaults to `'true'`.
   */
  value?: string
  disabled?: boolean
  className?: string
  dir?: 'rtl' | 'ltr'
  name?: string
  register?: BadgeRegister
  registerOptions?: object
}
