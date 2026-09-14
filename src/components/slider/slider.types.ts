import type { HTMLAttributes, ReactNode } from 'react'

export type SliderItem = {
  id?: string | number
  image: string
  alt?: string
  content?: ReactNode
  onSlideClick?: (id: string | number, item: SliderItem) => void
}

export type SliderProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  items: SliderItem[]
  width?: string | number
  height?: string | number
  bulletPagination?: boolean
  bulletColor?: string
  bulletActiveColor?: string
  loop?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  transitionDuration?: number
  defaultActiveIndex?: number
  activeIndex?: number
  onSlideChange?: (item: SliderItem, index: number) => void
  onSlideClick?: (item: SliderItem, index: number) => void
}
