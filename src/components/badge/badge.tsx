import { clsx } from 'clsx'
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'

import { CloseIcon } from '../../icons/close-icon'
import type { BadgeProps } from './badge.types'

export function Badge({
  children,
  label,
  icon,
  selected,
  defaultSelected = false,
  onSelectedChange,
  onClick,
  onClear,
  value = 'true',
  disabled = false,
  className,
  dir = 'rtl',
  name,
  register,
  registerOptions,
}: BadgeProps) {
  const isControlled = selected !== undefined
  const [uncontrolledSelected, setUncontrolledSelected] = useState(defaultSelected)
  const isSelected = isControlled ? Boolean(selected) : uncontrolledSelected
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const content = children ?? label

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const syncHiddenInput = useCallback(
    (nextSelected: boolean) => {
      const input = hiddenInputRef.current
      if (!input || !registerBinding) return

      input.value = nextSelected ? value : ''

      const event = {
        target: input,
        currentTarget: input,
        type: 'change',
      } as ChangeEvent<HTMLInputElement>

      registerBinding.onChange(event)
    },
    [registerBinding, value],
  )

  const setSelected = (nextSelected: boolean) => {
    if (!isControlled) {
      setUncontrolledSelected(nextSelected)
    }
    syncHiddenInput(nextSelected)
    onSelectedChange?.(nextSelected)
  }

  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    onClick?.(event)
    if (event.defaultPrevented) return

    if (!isSelected) {
      setSelected(true)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(event as unknown as MouseEvent<HTMLElement>)
    }
  }

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (disabled) return

    onClear?.(event)
    setSelected(false)
  }

  const setHiddenRef = (node: HTMLInputElement | null) => {
    hiddenInputRef.current = node
    registerBinding?.ref(node)
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      dir={dir}
      aria-pressed={isSelected}
      aria-disabled={disabled || undefined}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={clsx(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded border px-3 py-[4.5px] transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-ruk-badge-selected/30',
        disabled && 'cursor-not-allowed opacity-50',
        isSelected
          ? 'border-ruk-badge-selected bg-ruk-badge-selected-bg text-ruk-badge-selected'
          : 'border-ruk-badge-border bg-ruk-bg text-ruk-badge-text',
        className,
      )}
    >
      {registerBinding ? (
        <input
          type="hidden"
          name={registerBinding.name}
          ref={setHiddenRef}
          onBlur={registerBinding.onBlur}
          defaultValue={isSelected ? value : ''}
        />
      ) : null}

      <span className="flex items-center gap-1 text-sm font-medium whitespace-nowrap">
        {icon ? (
          <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4 [&>img]:size-4">
            {icon}
          </span>
        ) : null}

        {content}

        {isSelected ? (
          <button
            type="button"
            aria-label="حذف فیلتر"
            disabled={disabled}
            className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center text-current"
            onClick={handleClear}
          >
            <CloseIcon width={12} height={12} />
          </button>
        ) : null}
      </span>
    </div>
  )
}
