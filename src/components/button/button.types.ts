import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Figma Property 5 — Fill / Outline */
export type ButtonVariant = 'filled' | 'outline'

/** Figma Property 3 — Large / Med / Small (fixed demo widths) */
export type ButtonSize = 'large' | 'medium' | 'small'

/** Figma Property 2 — control height in px */
export type ButtonHeight = 40 | 48

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'height'
> & {
  children?: ReactNode
  /** Visual style. Defaults to `filled`. */
  variant?: ButtonVariant
  /** Width preset from Figma. Defaults to `large`. Ignored when `block`. */
  size?: ButtonSize
  /** Height in px from Figma. Defaults to `48`. */
  height?: ButtonHeight
  /** Optional trailing icon (visually after the label; on the right in LTR). */
  icon?: ReactNode
  /** Stretch to 100% width (overrides size width). */
  block?: boolean
  /** Shows a spinner and disables the button. */
  loading?: boolean
  /** Force hover styles (Storybook / visual demos). */
  forceHover?: boolean
  /** Text direction. Defaults to `rtl`. */
  dir?: 'rtl' | 'ltr'
}
