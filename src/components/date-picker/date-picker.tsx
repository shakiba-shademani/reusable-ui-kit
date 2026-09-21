import { clsx } from 'clsx'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { Calendar, DateObject, type CalendarRef } from 'react-multi-date-picker'

import './date-picker.css'
import {
  datesToFormValue,
  formValueToDates,
  type DatePickerProps,
} from './date-picker.types'

const PERSIAN_WEEK_DAYS = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
]

const today = new DateObject({ calendar: persian, locale: persian_fa })

const formatRangeLabel = (dates: DateObject[]) => {
  if (dates.length === 0) {
    return null
  }

  const start = dates[0].format('D MMMM YYYY')

  if (dates.length === 1) {
    return start
  }

  return `${start} - ${dates[1].format('D MMMM YYYY')}`
}

const toDateArray = (dates: DateObject[] | null) => {
  if (!dates) {
    return []
  }

  return dates.filter((date) => date?.isValid)
}

const isSameDay = (left: DateObject, right: DateObject) =>
  left.format('YYYY/MM/DD') === right.format('YYYY/MM/DD')

const toSelectedDates = (dates: DateObject | DateObject[] | null) => {
  if (!dates) {
    return []
  }

  return toDateArray(Array.isArray(dates) ? dates : [dates])
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  className,
  range = true,
  disablePastDates = false,
  name,
  register,
  registerOptions,
}: DatePickerProps) {
  const calendarRef = useRef<CalendarRef>(null)
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)
  const isControlled = value !== undefined

  const [uncontrolledDates, setUncontrolledDates] = useState<DateObject[]>(() =>
    formValueToDates(defaultValue),
  )

  const selectedDates = isControlled ? (value ?? []) : uncontrolledDates

  const [viewDate, setViewDate] = useState(
    () =>
      selectedDates[0] ??
      new DateObject({ calendar: persian, locale: persian_fa }),
  )

  const registerBinding = useMemo(() => {
    if (!register || !name) return null
    return register(name, registerOptions)
  }, [register, name, registerOptions])

  const syncHiddenInput = useCallback(
    (dates: DateObject[]) => {
      const input = hiddenInputRef.current
      if (!input || !registerBinding) return

      const nextValue = datesToFormValue(dates)
      input.value = nextValue

      const event = {
        target: input,
        currentTarget: input,
        type: 'change',
      } as ChangeEvent<HTMLInputElement>

      registerBinding.onChange(event)
    },
    [registerBinding],
  )

  useEffect(() => {
    if (!registerBinding || isControlled) return
    const input = hiddenInputRef.current
    if (!input?.value) return

    const fromInput = formValueToDates(input.value)
    if (fromInput.length === 0) return

    setUncontrolledDates(fromInput)
    setViewDate(fromInput[0])
  }, [registerBinding, isControlled])

  const handleDatesChange = (dates: DateObject[]) => {
    if (!isControlled) {
      setUncontrolledDates(dates)
    }

    syncHiddenInput(dates)
    onChange?.(dates)
  }

  const rangeLabel = formatRangeLabel(selectedDates)

  const changeMonth = (offset: number) => {
    const nextDate = new DateObject(viewDate).add(offset, 'month')

    calendarRef.current?.set('year', nextDate.year)
    calendarRef.current?.set('month', nextDate.month.number)
    setViewDate(nextDate)
  }

  const setHiddenRef = (node: HTMLInputElement | null) => {
    hiddenInputRef.current = node
    registerBinding?.ref(node)
  }

  return (
    <div className={clsx('flex w-full flex-col items-center', className)}>
      {registerBinding ? (
        <input
          type="hidden"
          name={registerBinding.name}
          ref={setHiddenRef}
          onBlur={registerBinding.onBlur}
          defaultValue={datesToFormValue(formValueToDates(defaultValue))}
        />
      ) : null}

      <div className="mb-2 flex w-full max-w-[320px] items-center justify-between px-1">
        <div className="flex min-w-0 flex-col items-start gap-0.5">
          <p className="text-sm font-medium text-[#323232]">
            {viewDate.format('MMMM YYYY')}
          </p>
          {rangeLabel ? (
            <p className="text-xs font-medium text-[#636362]">{rangeLabel}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2" dir="ltr">
          <button
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#EEF2F6] text-[#636362]"
            onClick={() => changeMonth(1)}
            aria-label="ماه بعد"
          >
            <span className="text-base leading-none">{'<'}</span>
          </button>

          <button
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#EEF2F6] text-[#636362]"
            onClick={() => changeMonth(-1)}
            aria-label="ماه قبل"
          >
            <span className="text-base leading-none">{'>'}</span>
          </button>
        </div>
      </div>

      <Calendar
        ref={calendarRef}
        range={range}
        rangeHover={range}
        shadow={false}
        buttons={false}
        hideMonth
        hideYear
        highlightToday={false}
        className={clsx(
          'ruk-date-picker-calendar',
          !range && 'ruk-date-picker-single-mode',
        )}
        value={range ? selectedDates : (selectedDates[0] ?? null)}
        currentDate={viewDate}
        minDate={disablePastDates ? today : undefined}
        onMonthChange={(date) => setViewDate(new DateObject(date))}
        onChange={(dates) => handleDatesChange(toSelectedDates(dates))}
        calendar={persian}
        locale={persian_fa}
        weekDays={PERSIAN_WEEK_DAYS}
        monthYearSeparator=" "
        mapDays={({ date, today: calendarToday, selectedDate }) => {
          if (
            disablePastDates &&
            date.format('YYYY/MM/DD') < calendarToday.format('YYYY/MM/DD')
          ) {
            return { disabled: true }
          }

          if (range) {
            const selected = Array.isArray(selectedDate)
              ? selectedDate.filter(Boolean)
              : []

            if (selected.length === 1 && isSameDay(date, selected[0])) {
              return {
                className: 'ruk-date-picker-single',
              }
            }
          }
        }}
      />
    </div>
  )
}
