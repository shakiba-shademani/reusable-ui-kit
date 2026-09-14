import { clsx } from 'clsx'
import { useState, type KeyboardEvent, type ReactNode } from 'react'

import type { BottomNavigationProps } from './bottom-navigation.types'

function renderIcon(icon: ReactNode | string | undefined) {
  if (icon == null) return null
  if (typeof icon === 'string') {
    return (
      <img
        src={icon}
        alt=""
        className="size-[26px] shrink-0 object-contain"
        draggable={false}
      />
    )
  }
  return (
    <span className="inline-flex size-[26px] shrink-0 items-center justify-center [&_svg]:size-full">
      {icon}
    </span>
  )
}

export function BottomNavigation({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  type = 'icon-title',
  className,
  height = 69,
  onChange,
  blurred = true,
  dir = 'rtl',
}: BottomNavigationProps) {
  const isControlled = activeIndex !== undefined
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex)
  const currentIndex = isControlled ? activeIndex : uncontrolledIndex

  const select = (index: number) => {
    const item = items[index]
    if (!item || item.disabled) return

    if (!isControlled) {
      setUncontrolledIndex(index)
    }
    onChange?.(index, item)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!items.length) return

    const delta =
      event.key === 'ArrowRight' ? (dir === 'rtl' ? -1 : 1) :
      event.key === 'ArrowLeft' ? (dir === 'rtl' ? 1 : -1) :
      event.key === 'Home' ? -currentIndex :
      event.key === 'End' ? items.length - 1 - currentIndex :
      0

    if (!delta && event.key !== 'Home' && event.key !== 'End') return

    event.preventDefault()
    let next = currentIndex + delta
    next = Math.max(0, Math.min(items.length - 1, next))
    while (items[next]?.disabled && next !== currentIndex) {
      next = Math.max(0, Math.min(items.length - 1, next + Math.sign(delta || 1)))
      if (next === 0 || next === items.length - 1) break
    }
    select(next)
  }

  return (
    <nav
      dir={dir}
      aria-label="ناوبری پایین"
      className={clsx(
        'ruk-bottom-navigation relative z-10 flex w-full items-center justify-between',
        'rounded-t-ruk-nav',
        blurred ? 'border-t border-white/40' : 'bg-[#f8f8f8]',
        className,
      )}
      style={{
        height,
        ...(blurred
          ? {
              backgroundColor: 'rgba(220, 220, 220, 0.29)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }
          : undefined),
      }}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) => {
        const isActive = index === currentIndex
        const icon = isActive ? (item.activeIcon ?? item.icon) : item.icon
        const showTitle =
          type === 'icon-title' || (type === 'icon-active-title' && isActive)

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.title}
            onClick={() => select(index)}
            className={clsx(
              'relative z-[1] flex h-full w-full flex-col items-center justify-center gap-1 border-0 bg-transparent px-1',
              'text-ruk-accent select-none',
              item.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
            )}
          >
            {isActive ? (
              <span
                aria-hidden
                className="absolute top-0 left-1/2 h-[3px] w-[45px] -translate-x-1/2 rounded-b-lg bg-ruk-accent"
              />
            ) : null}
            {renderIcon(icon)}
            {showTitle ? (
              <span className="m-0 w-full text-center text-[9px] font-bold leading-none">
                {item.title}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}

BottomNavigation.displayName = 'BottomNavigation'
