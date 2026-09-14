import type { ReactNode } from 'react'

export type BottomSheetProps = {
  /** Controls visibility. */
  open: boolean
  /** Called when backdrop / close / Escape should dismiss the sheet. */
  onClose: () => void
  /** Header title (centered). */
  title?: string
  /** Sheet body. */
  children: ReactNode
  /** Optional footer (e.g. action buttons). */
  footer?: ReactNode
  /** Close when clicking the dimmed backdrop. Defaults to true. */
  closeOnBackdrop?: boolean
  /** Close on Escape. Defaults to true. */
  closeOnEscape?: boolean
  /** Show the X button. Defaults to true. */
  showCloseButton?: boolean
  /** Show the yellow header divider. Defaults to true. */
  showDivider?: boolean
  className?: string
  /** Max height of the sheet panel. Defaults to `85vh`. */
  maxHeight?: string
  dir?: 'rtl' | 'ltr'
}
