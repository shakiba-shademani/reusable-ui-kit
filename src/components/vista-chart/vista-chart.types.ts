import type { ReactNode } from 'react'

export type VistaChartItem = {
  /** عنوان کنار بار (مثلاً بازه زمانی). */
  label: string
  /** مقدار عددی برای اندازه بار آبی. */
  value: number
  /** توضیح روبه‌روی بار. اگر نباشد از `value` + واحد ساخته می‌شود. */
  description?: ReactNode
}

export interface VistaChartProps {
  items: VistaChartItem[]
  /** Unit suffix when auto-formatting description. Defaults to «ریال». */
  unit?: string
  /** Override max used for bar scale. Defaults to max item value. */
  maxValue?: number
  className?: string
  dir?: 'rtl' | 'ltr'
  /** Format numeric description. */
  formatDescription?: (value: number) => string
}
