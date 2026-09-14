import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value' | 'defaultValue'
> & {
  /** Controlled value. Persian/Arabic digits are normalized on render. */
  value?: string | number
  /** Uncontrolled initial value. */
  defaultValue?: string | number
  /** Field label — rendered above the control (right-aligned in RTL). */
  label?: string
  /** Error message shown below the input (takes priority over `helperText`). */
  error?: string
  /** Helper copy below the input when there is no `error`. */
  helperText?: string
  /** Optional leading icon (visually on the right in RTL). */
  icon?: ReactNode
  /** Force hover styles (Storybook / visual demos). */
  forceHover?: boolean
  /** Accept digits only (Persian/Arabic digits are normalized to English). */
  onlyNumber?: boolean
  /** Format value with thousand separators (implies numeric input). */
  amount?: boolean
  /** Format as a 16-digit card number in groups of 4. */
  cardNo?: boolean
  /** Separator between card groups. Defaults to a space. */
  cardNoSeparator?: string
  /** Thousand separator for `amount`. Defaults to `,`. */
  separator?: string
  /**
   * When used with `amount`, show the amount in Persian words as تومان
   * (value is treated as Rials ÷ 10, matching the previous design system).
   */
  persianLetter?: boolean
}
