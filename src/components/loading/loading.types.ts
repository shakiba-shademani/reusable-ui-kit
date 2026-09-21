export type LoadingType = 'spin' | 'pulse' | 'dots'

export interface LoadingProps {
  type?: LoadingType
  /** Pixel size of the spinner. */
  size?: number
  color?: string
  className?: string
  /** Accessible label. */
  label?: string
}
