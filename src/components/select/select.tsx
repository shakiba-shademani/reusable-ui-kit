import { clsx } from 'clsx'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'

import { CheckIcon } from '../../icons/check-icon'
import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import { toEnglishDigits } from '../../utils/to-english-digits'
import type { SelectOption, SelectProps } from './select.types'

function normalize(text: string) {
  return toEnglishDigits(text).toLowerCase().trim()
}

function rankMatch(label: string, query: string) {
  const l = normalize(label)
  const q = normalize(query)
  if (!q) return 0
  if (l === q) return 0
  if (l.startsWith(q)) return 1
  const index = l.indexOf(q)
  if (index >= 0) return 2 + index
  return Number.POSITIVE_INFINITY
}

function sortAndFilterOptions(options: SelectOption[], query: string) {
  if (!query.trim()) return options

  return options
    .map((option) => ({ option, rank: rankMatch(option.label, query) }))
    .filter((entry) => entry.rank !== Number.POSITIVE_INFINITY)
    .sort(
      (a, b) =>
        a.rank - b.rank || a.option.label.localeCompare(b.option.label, 'fa'),
    )
    .map((entry) => entry.option)
}

function toSelectedArray(
  value: string | string[] | undefined,
  multiple: boolean,
): string[] {
  if (value === undefined) return []
  if (multiple) return Array.isArray(value) ? value : value ? [value] : []
  return Array.isArray(value) ? value.slice(0, 1) : value ? [value] : []
}

export function Select(props: SelectProps) {
  const {
    label,
    placeholder = 'انتخاب کنید',
    options,
    error,
    helperText,
    disabled = false,
    required = false,
    className,
    id,
    name,
    dir = 'rtl',
    searchable = false,
    searchPlaceholder = 'جستجو...',
    noResultsText = 'نتیجه‌ای یافت نشد',
    register,
    registerOptions,
    onBlur,
  } = props

  const multiple = Boolean(props.multiple)
  const autoId = useId()
  const fieldId = id ?? autoId
  const rootRef = useRef<HTMLDivElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const isControlled = props.value !== undefined
  const [uncontrolled, setUncontrolled] = useState<string[]>(() =>
    toSelectedArray(props.defaultValue as string | string[] | undefined, multiple),
  )
  const selectedValues = isControlled
    ? toSelectedArray(props.value as string | string[] | undefined, multiple)
    : uncontrolled

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const visibleOptions = useMemo(
    () => (searchable ? sortAndFilterOptions(options, search) : options),
    [options, search, searchable],
  )

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  )

  const displayLabel = (() => {
    if (selectedOptions.length === 0) return placeholder
    if (multiple && props.multiple && props.formatValue) {
      return props.formatValue(selectedOptions)
    }
    return selectedOptions.map((option) => option.label).join('، ')
  })()

  const syncHidden = (next: string[]) => {
    const input = hiddenInputRef.current
    if (!input || !registerBinding) return
    input.value = multiple ? next.join(',') : (next[0] ?? '')
    registerBinding.onChange({
      target: input,
      currentTarget: input,
      type: 'change',
    } as ChangeEvent<HTMLInputElement>)
  }

  const commit = (next: string[]) => {
    if (!isControlled) setUncontrolled(next)
    syncHidden(next)

    if (multiple) {
      ;(props as Extract<SelectProps, { multiple: true }>).onChange?.(next)
    } else {
      ;(props as Extract<SelectProps, { multiple?: false }>).onChange?.(
        next[0] ?? '',
      )
    }
  }

  const close = () => {
    setOpen(false)
    setSearch('')
    onBlur?.()
    registerBinding?.onBlur({
      target: { name: registerBinding.name },
    } as never)
  }

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (open && searchable) searchInputRef.current?.focus()
  }, [open, searchable])

  const toggleOpen = () => {
    if (disabled) return
    if (open) close()
    else setOpen(true)
  }

  const handleSelect = (optionValue: string) => {
    if (disabled) return
    const option = options.find((item) => item.value === optionValue)
    if (option?.disabled) return

    if (multiple) {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((item) => item !== optionValue)
        : [...selectedValues, optionValue]
      commit(next)
      return
    }

    commit([optionValue])
    close()
  }

  const setHiddenRef = (node: HTMLInputElement | null) => {
    hiddenInputRef.current = node
    registerBinding?.ref(node)
  }

  const message = error ?? helperText
  const isInvalid = Boolean(error)

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!open) setOpen(true)
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      close()
    }
  }

  return (
    <div
      ref={rootRef}
      dir={dir}
      className={clsx('relative flex w-full max-w-[320px] flex-col gap-2', className)}
    >
      {label ? (
        <label
          htmlFor={fieldId}
          className={clsx(
            'm-0 text-right text-sm font-medium leading-5',
            disabled ? 'text-ruk-text-disabled' : 'text-ruk-text',
          )}
        >
          {label}
          {required ? (
            <span className="ms-1 text-ruk-error" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {registerBinding ? (
        <input
          type="hidden"
          name={registerBinding.name}
          ref={setHiddenRef}
          defaultValue={
            multiple ? selectedValues.join(',') : (selectedValues[0] ?? '')
          }
        />
      ) : null}

      <button
        id={fieldId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={isInvalid || undefined}
        onClick={toggleOpen}
        onKeyDown={onTriggerKeyDown}
        className={clsx(
          'flex min-h-12 w-full items-center justify-between gap-2 rounded-ruk border border-solid bg-ruk-bg px-4 py-3 text-right transition-[border-color]',
          disabled
            ? 'cursor-not-allowed border-ruk-border bg-ruk-bg-disabled text-ruk-text-disabled'
            : isInvalid
              ? 'border-ruk-error'
              : 'border-ruk-border hover:border-ruk-border-hover',
        )}
      >
        <span
          className={clsx(
            'min-w-0 flex-1 truncate text-sm font-medium',
            selectedOptions.length > 0 ? 'text-ruk-text' : 'text-ruk-text-muted',
          )}
        >
          {displayLabel}
        </span>
        <ChevronDownIcon
          width={16}
          height={16}
          className={clsx(
            'shrink-0 text-ruk-icon transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && !disabled ? (
        <div className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-ruk border border-ruk-border bg-white shadow-lg">
          {searchable ? (
            <div className="border-b border-ruk-border p-2">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-ruk border border-ruk-field-border bg-ruk-field px-3 text-sm outline-none focus:border-ruk-field-border-hover"
                onClick={(event: MouseEvent<HTMLInputElement>) =>
                  event.stopPropagation()
                }
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          ) : null}

          <ul
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className="m-0 max-h-60 list-none overflow-auto p-2"
          >
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => {
                const selected = selectedValues.includes(option.value)
                return (
                  <li key={option.value} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      disabled={option.disabled}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleSelect(option.value)}
                      className={clsx(
                        'flex h-11 w-full items-center gap-2 rounded-ruk border-0 px-3 text-sm font-medium text-black',
                        selected ? 'bg-[#E5ECFF]' : 'bg-ruk-option hover:bg-[#e9e9e9]',
                        option.disabled
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer',
                      )}
                    >
                      {multiple ? (
                        <span
                          className={clsx(
                            'flex size-5 items-center justify-center rounded-[4px] border-2 border-solid border-black',
                            selected ? 'bg-ruk-primary text-black' : 'bg-white',
                          )}
                        >
                          {selected ? <CheckIcon width={14} height={14} /> : null}
                        </span>
                      ) : (
                        <span
                          className={clsx(
                            'inline-flex size-5 items-center justify-center rounded-full',
                            selected
                              ? 'bg-ruk-primary'
                              : 'border-2 border-solid border-black bg-transparent',
                          )}
                        >
                          {selected ? (
                            <span className="size-1.5 rounded-full bg-white" />
                          ) : null}
                        </span>
                      )}
                      <span className="min-w-0 flex-1 truncate text-right">
                        {option.label}
                      </span>
                    </button>
                  </li>
                )
              })
            ) : (
              <li className="px-3 py-4 text-center text-sm text-ruk-text-muted">
                {noResultsText}
              </li>
            )}
          </ul>
        </div>
      ) : null}

      {message ? (
        <p
          className={clsx(
            'm-0 text-xs',
            error ? 'text-ruk-error' : 'text-ruk-text-muted',
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
