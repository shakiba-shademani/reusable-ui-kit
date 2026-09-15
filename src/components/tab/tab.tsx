import { clsx } from 'clsx'
import { useState, type KeyboardEvent } from 'react'

import type { TabItem, TabProps } from './tab.types'

export function Tab({
  items,
  value,
  defaultValue,
  onChange,
  className,
  dir = 'rtl',
  fullWidth = true,
  'aria-label': ariaLabel = 'تب‌ها',
}: TabProps) {
  const firstValue = items[0]?.value
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? firstValue ?? '',
  )

  const selected = isControlled ? value : uncontrolled
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === selected),
  )
  const currentValue = items[selectedIndex]?.value ?? firstValue ?? ''

  const select = (item: TabItem) => {
    if (item.disabled) return
    if (!isControlled) {
      setUncontrolled(item.value)
    }
    onChange?.(item.value, item)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!items.length) return

    const enabled = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled)
    if (!enabled.length) return

    const currentPos = enabled.findIndex(({ index }) => index === selectedIndex)
    const fallbackPos = currentPos < 0 ? 0 : currentPos

    const step = dir === 'rtl' ? -1 : 1
    let nextPos = fallbackPos

    if (event.key === 'ArrowRight') nextPos = fallbackPos + step
    else if (event.key === 'ArrowLeft') nextPos = fallbackPos - step
    else if (event.key === 'Home') nextPos = 0
    else if (event.key === 'End') nextPos = enabled.length - 1
    else return

    event.preventDefault()
    nextPos = Math.max(0, Math.min(enabled.length - 1, nextPos))
    const nextItem = enabled[nextPos].item
    select(nextItem)
    const root = event.currentTarget
    queueMicrotask(() => {
      const node = root.querySelector<HTMLButtonElement>(
        `[data-tab-value="${CSS.escape(nextItem.value)}"]`,
      )
      node?.focus()
    })
  }

  return (
    <div
      dir={dir}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className={clsx(
        'ruk-tab relative flex items-center rounded-ruk bg-ruk-tab-track p-2',
        fullWidth ? 'w-full' : 'w-fit',
        className,
      )}
    >
      {items.map((item) => {
        const isSelected = item.value === currentValue
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={item.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(item)}
            data-tab-value={item.value}
            className={clsx(
              'relative z-10 h-11 min-w-0 flex-1 truncate rounded-ruk border-0 px-3 text-sm font-medium leading-6 transition-[background-color,color] duration-150',
              item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              isSelected
                ? 'bg-ruk-accent text-white'
                : 'bg-transparent text-ruk-text-muted',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

Tab.displayName = 'Tab'