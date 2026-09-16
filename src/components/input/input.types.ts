import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
} from 'react'

/** `default` = stacked label above the field. `outlined` = label inside / on the border. */
export type InputVariant = 'default' | 'outlined'

/**
 * Outlined label behavior.
 * `float` — label starts inside and rises to the border on focus or value.
 * `fixed` — label stays on the border.
 */
export type InputLabelMode = 'float' | 'fixed'

/** Horizontal alignment of value and placeholder inside the field. */
export type InputTextAlign = 'left' | 'center' | 'right'

/**
 * Compatible with react-hook-form `UseFormRegister` without depending on RHF.
 * Typed loosely so `register={register}` from any FormValues shape assigns cleanly.
 * Prefer `{...register('field')}` when you want strict field names in the app.
 */
export type InputRegister = (
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

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value' | 'defaultValue' | 'width'
> & {
  /** Controlled value. Persian/Arabic digits are normalized on render. */
  value?: string | number
  /** Uncontrolled initial value. */
  defaultValue?: string | number
  /**
   * Field width (wrapper). Same as the previous DS — e.g. `'100%'` or `'330px'`.
   * Defaults to the Figma field width (`320px` max).
   */
  width?: string | number
  /**
   * react-hook-form `register` function. Use with `name`:
   * `<Input name="mobile" register={register} />`
   * `{...register('mobile')}` still works.
   */
  register?: InputRegister
  /** Extra options forwarded to `register(name, registerOptions)`. */
  registerOptions?: object
  /** Field label. Stacked above in `default`; inside/on-border in `outlined`. */
  label?: string
  /** Visual style. `outlined` uses the floating/border label. */
  variant?: InputVariant
  /**
   * Outlined-only. `float` (default) animates the label up on focus/value;
   * `fixed` keeps it on the border.
   */
  labelMode?: InputLabelMode
  /** Value and placeholder alignment. Defaults to `right` (RTL / Figma). */
  textAlign?: InputTextAlign
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
