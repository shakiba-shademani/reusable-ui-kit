import { clsx } from 'clsx'
import { useId, useState } from 'react'

import { Button } from '../button'
import { BottomSheet } from '../bottom-sheet'
import { CheckIcon } from '../../icons/check-icon'
import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import type {
  DropdownOption,
  DropdownProps,
} from './dropdown.types'

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : value ? [value] : []
}

function defaultFormatValue(selected: DropdownOption[]): string {
  return selected.map((item) => item.label).join('، ')
}

export function Dropdown(props: DropdownProps) {
  const {
    label,
    placeholder = 'مانند ...',
    options,
    sheetTitle,
    error,
    helperText,
    disabled = false,
    required = false,
    className,
    id,
    name,
    dir = 'rtl',
    forceHover = false,
    selectAllLabel,
    confirmText = 'تایید',
    cancelText = 'انصراف',
    formatValue = defaultFormatValue,
    variant = 'default',
    labelMode = 'float',
    icon,
  } = props

  const multiple = props.multiple === true
  const isControlled = props.value !== undefined

  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = `${fieldId}-message`

  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState<string[]>(() =>
    toArray(props.defaultValue as string | string[] | undefined),
  )
  const [draft, setDraft] = useState<string[]>([])

  const selected = isControlled
    ? toArray(props.value as string | string[] | undefined)
    : uncontrolled

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value),
  )
  const optionValues = options
    .filter((option) => !option.disabled)
    .map((option) => option.value)
  const allOptionsSelected =
    multiple &&
    optionValues.length > 0 &&
    optionValues.every((value) => selected.includes(value))
  const hasValue = selectedOptions.length > 0
  const display = !hasValue
    ? placeholder
    : allOptionsSelected && selectAllLabel
      ? selectAllLabel
      : formatValue(selectedOptions)
  const isInvalid = Boolean(error)
  const message = error ?? helperText
  const isOutlined = variant === 'outlined'
  const labelFloated =
    isOutlined &&
    Boolean(label) &&
    (labelMode === 'fixed' || open || hasValue)
  const hideStackedLabel = isOutlined
  const hideValueWhileLabelInside = isOutlined && Boolean(label) && !labelFloated

  const commit = (next: string[]) => {
    if (!isControlled) {
      setUncontrolled(next)
    }

    if (multiple) {
      ;(props.onChange as ((value: string[]) => void) | undefined)?.(next)
    } else {
      ;(props.onChange as ((value: string) => void) | undefined)?.(next[0] ?? '')
    }
  }

  const openSheet = () => {
    if (disabled) return
    setDraft(selected)
    setOpen(true)
  }

  const closeSheet = () => setOpen(false)

  const toggleMulti = (value: string) => {
    setDraft((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    )
  }

  const toggleSelectAll = () => {
    const allSelected =
      optionValues.length > 0 &&
      optionValues.every((value) => draft.includes(value))
    setDraft(allSelected ? [] : optionValues)
  }

  const selectSingle = (value: string) => {
    setDraft([value])
  }

  const confirmSelection = () => {
    if (draft.length === 0) return
    commit(draft)
    closeSheet()
  }

  const isDraftSelected = (value: string) => draft.includes(value)
  const allSelected =
    optionValues.length > 0 &&
    optionValues.every((value) => draft.includes(value))

  return (
    <div
      dir={dir}
      className={clsx(
        'ruk-dropdown flex w-full max-w-[330px] flex-col gap-2',
        isOutlined && 'pt-2',
        className,
      )}
    >
      {label && !hideStackedLabel ? (
        <label
          htmlFor={fieldId}
          className={clsx(
            'm-0 text-right text-sm font-bold leading-5',
            disabled ? 'text-ruk-field-disabled-fg' : 'text-black',
          )}
        >
          {required ? (
            <span className="ms-1 text-ruk-error" aria-hidden="true">
              *
            </span>
          ) : null}
          {label}
        </label>
      ) : null}

      <button
        type="button"
        id={fieldId}
        name={name}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={isInvalid || undefined}
        aria-describedby={message ? messageId : undefined}
        onClick={openSheet}
        className={clsx(
          'relative flex w-full items-center gap-2 overflow-visible rounded-ruk border border-solid text-sm transition-[border-color,background-color] duration-150',
          isOutlined ? 'h-10 p-2' : 'h-12 px-2',
          disabled
            ? clsx(
                'cursor-not-allowed border-ruk-field-border text-ruk-field-disabled-fg',
                isOutlined ? 'bg-ruk-bg' : 'bg-ruk-btn-disabled',
              )
            : isInvalid
              ? clsx(
                  'cursor-pointer border-ruk-error text-black',
                  isOutlined ? 'bg-ruk-bg' : 'bg-ruk-field',
                )
              : clsx(
                  'cursor-pointer',
                  isOutlined ? 'bg-ruk-bg' : 'bg-ruk-field',
                  forceHover
                    ? 'border-ruk-field-border-hover'
                    : 'border-ruk-field-border hover:border-ruk-field-border-hover',
                ),
        )}
      >
        {icon ? (
          <span
            className={clsx(
              'inline-flex size-6 shrink-0 items-center justify-center',
              disabled ? 'text-ruk-field-disabled-fg' : 'text-black',
            )}
          >
            {icon}
          </span>
        ) : null}

        <span
          className={clsx(
            'min-w-0 flex-1 truncate text-right tracking-[-0.25px]',
            hideValueWhileLabelInside && 'opacity-0',
            disabled
              ? 'text-ruk-field-disabled-fg'
              : hasValue
                ? 'font-medium text-black'
                : isOutlined
                  ? 'text-black'
                  : 'text-ruk-field-placeholder',
          )}
          aria-hidden={hideValueWhileLabelInside || undefined}
        >
          {display}
        </span>

        <span
          className={clsx(
            'inline-flex size-6 shrink-0 items-center justify-center',
            disabled
              ? 'text-ruk-field-disabled-fg'
              : 'text-ruk-field-placeholder',
          )}
        >
          <ChevronDownIcon
            width={24}
            height={24}
            className={clsx('transition-transform', open && 'rotate-180')}
          />
        </span>

        {isOutlined && label ? (
          <span
            className={clsx(
              'pointer-events-none absolute z-10 text-right whitespace-nowrap transition-[top,inset-inline-start,font-size,line-height,font-weight,padding,background-color] duration-150',
              disabled ? 'text-ruk-field-disabled-fg' : 'text-black',
              labelFloated
                ? 'start-[11px] top-0 -translate-y-1/2 bg-ruk-bg px-1 text-[8px] font-bold leading-[1.4]'
                : clsx(
                    'top-1/2 -translate-y-1/2 truncate text-sm font-normal leading-6',
                    icon ? 'start-10' : 'start-2',
                    'end-10',
                  ),
            )}
          >
            {required ? (
              <span className="ms-1 text-ruk-error" aria-hidden="true">
                *
              </span>
            ) : null}
            {label}
          </span>
        ) : null}
      </button>

      {/* Hidden input helps native form / RHF name registration when needed */}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={multiple ? selected.join(',') : (selected[0] ?? '')}
          readOnly
        />
      ) : null}

      {message ? (
        <p
          id={messageId}
          role={isInvalid ? 'alert' : undefined}
          className={clsx(
            'm-0 text-right text-xs font-normal leading-[1.4]',
            isInvalid ? 'text-ruk-error' : 'text-ruk-text-muted',
          )}
        >
          {message}
        </p>
      ) : null}

      <BottomSheet
        open={open}
        onClose={closeSheet}
        title={sheetTitle ?? label} 
        dir={dir}
        footer={
          <div className="flex gap-3">
            <Button
              type="button"
              variant="filled"
              size="medium"
              height={48}
              block
              className="max-w-none flex-1"
              disabled={draft.length === 0}
              onClick={confirmSelection}
            >
              {confirmText}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="medium"
              height={48}
              block
              className="max-w-none flex-1"
              onClick={closeSheet}
            >
              {cancelText}
            </Button>
          </div>
        }
      >
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {multiple && selectAllLabel ? (
            <li>
              <OptionRow
                label={selectAllLabel}
                selected={allSelected}
                multiple
                onSelect={toggleSelectAll}
              />
            </li>
          ) : null}

          {options.map((option) => {
            const selectedRow = isDraftSelected(option.value)
            return (
              <li key={option.value}>
                <OptionRow
                  label={option.label}
                  selected={selectedRow}
                  multiple={multiple}
                  disabled={option.disabled}
                  onSelect={() => {
                    if (option.disabled) return
                    if (multiple) toggleMulti(option.value)
                    else selectSingle(option.value)
                  }}
                />
              </li>
            )
          })}
        </ul>
      </BottomSheet>
    </div>
  )
}

function OptionRow({
  label,
  selected,
  multiple,
  disabled,
  onSelect,
}: {
  label: string
  selected: boolean
  multiple: boolean
  disabled?: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={clsx(
        'flex h-11 w-full items-center gap-2 rounded-ruk border-0 bg-ruk-option px-3 text-sm font-medium text-black',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <span className="inline-flex size-5 shrink-0 items-center justify-center">
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
      </span>

      <span className="min-w-0 flex-1 truncate text-right">{label}</span>
    </button>
  )
}

Dropdown.displayName = 'Dropdown'
