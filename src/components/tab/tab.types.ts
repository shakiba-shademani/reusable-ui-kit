export type TabItem = {
  /** Stable id used as the controlled `value`. */
  value: string
  label: string
  disabled?: boolean
}

export type TabProps = {
  items: TabItem[]
  /**
   * Controlled active tab. When set, the parent owns selection —
   * changing this from outside always updates the UI.
   */
  value?: string
  /** Uncontrolled initial tab. Defaults to the first item. */
  defaultValue?: string
  onChange?: (value: string, item: TabItem) => void
  className?: string
  dir?: 'rtl' | 'ltr'
  /** Stretch to the container width. Defaults to `true` (Figma). */
  fullWidth?: boolean
  /** Accessible name for the tablist. */
  'aria-label'?: string
}