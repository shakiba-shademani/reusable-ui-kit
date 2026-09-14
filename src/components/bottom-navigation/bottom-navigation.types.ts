import type { ReactNode } from 'react'

export type BottomNavigationType = 'icon-only' | 'icon-title' | 'icon-active-title'

export type BottomNavigationItem = {
  id: string | number
  /** Inactive icon — React node or image URL. */
  icon: ReactNode | string
  /** Active icon — React node or image URL. Defaults to `icon`. */
  activeIcon?: ReactNode | string
  title: string
  disabled?: boolean
}

export type BottomNavigationProps = {
  items: BottomNavigationItem[]
  /** Controlled active index. */
  activeIndex?: number
  /** Uncontrolled initial active index. Defaults to `0`. */
  defaultActiveIndex?: number
  type?: BottomNavigationType
  className?: string
  /** Bar height in px. Defaults to `69`. */
  height?: number
  onChange?: (index: number, item: BottomNavigationItem) => void
  /** Frosted glass background. Defaults to `true` (Figma). */
  blurred?: boolean
  dir?: 'rtl' | 'ltr'
}
