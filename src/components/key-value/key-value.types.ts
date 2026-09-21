import type { ReactNode } from 'react'

export type KeyValueItem = {
  key: ReactNode
  value: ReactNode
  icon?: ReactNode
  direction?: 'rtl' | 'ltr'
}

export interface KeyValueProps {
  items?: KeyValueItem[]
  /** Alias from ivapro. */
  contentList?: KeyValueItem[]
  evenClassName?: string
  oddClassName?: string
  className?: string
  dir?: 'rtl' | 'ltr'
}
