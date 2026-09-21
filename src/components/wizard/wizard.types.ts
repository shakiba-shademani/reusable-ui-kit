export interface WizardProps {
  /** Step labels shown in order. */
  steps: string[]
  /** Zero-based active / farthest visited step index. */
  currentStep: number
  /** Called when a step tab is clicked (only if `isClickable`). */
  onStepClick?: (stepIndex: number) => void
  /** When false, steps are display-only. Defaults to `true`. */
  isClickable?: boolean
  className?: string
  dir?: 'rtl' | 'ltr'
}
