import { clsx } from 'clsx'
import { useId, useState, type ChangeEvent } from 'react'

import type { RadioGroupProps } from './radio-group.types'

export function RadioGroup({
  options,
  list,
  title,
  name,
  value,
  defaultValue = '',
  onChange,
  onCheckedChange,
  disabled = false,
  className,
  dir = 'rtl',
  register,
  registerOptions,
}: RadioGroupProps) {
  const groupId = useId()
  const items = options ?? list ?? []
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const selected = isControlled ? (value ?? '') : uncontrolled
  const fieldName = name ?? `radio-${groupId}`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
    onCheckedChange?.(next)

    if (register && name) {
      register(name, registerOptions).onChange(event)
    }
  }

  return (
    <fieldset
      dir={dir}
      disabled={disabled}
      className={clsx('m-0 flex flex-col gap-2 border-0 p-0', className)}
    >
      {title ? (
        <legend className="mb-1 px-0 text-sm font-medium text-ruk-text">{title}</legend>
      ) : null}

      <div className="flex flex-col gap-2" role="radiogroup" aria-label={title}>
        {items.map((item, index) => {
          const inputId = `${groupId}-${item.value}`
          const isSelected = selected === item.value
          const itemDisabled = disabled || item.disabled
          const registerBinding =
            register && name ? register(name, registerOptions) : null

          return (
            <label
              key={item.value}
              htmlFor={inputId}
              className={clsx(
                'flex h-11 w-full cursor-pointer items-center gap-2 rounded-ruk bg-ruk-option px-3 text-sm font-medium text-black',
                itemDisabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                <input
                  id={inputId}
                  type="radio"
                  className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  name={registerBinding?.name ?? fieldName}
                  value={item.value}
                  checked={isSelected}
                  disabled={itemDisabled}
                  ref={index === 0 ? registerBinding?.ref : undefined}
                  onBlur={registerBinding?.onBlur}
                  onChange={handleChange}
                />
                <span
                  className={clsx(
                    'pointer-events-none inline-flex size-5 items-center justify-center rounded-full',
                    isSelected
                      ? 'bg-ruk-primary'
                      : 'border-2 border-solid border-black bg-transparent',
                  )}
                  aria-hidden="true"
                >
                  {isSelected ? (
                    <span className="size-1.5 rounded-full bg-white" />
                  ) : null}
                </span>
              </span>

              <span className="min-w-0 flex-1 truncate text-right">{item.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
