import { clsx } from 'clsx'

import { formatAmount } from '../../utils/format-input-value'
import { toPersianDigits } from '../../utils/to-persian-digits'
import type { VistaChartProps } from './vista-chart.types'

function defaultFormatDescription(value: number, unit: string) {
  const amount = toPersianDigits(formatAmount(value) || '0')
  return `${amount} ${unit}`
}

export function VistaChart({
  items,
  unit = 'ریال',
  maxValue,
  className,
  dir = 'rtl',
  formatDescription,
}: VistaChartProps) {
  const peak = maxValue ?? Math.max(0, ...items.map((item) => item.value))

  return (
    <div
      dir={dir}
      className={clsx(
        'flex w-full flex-col gap-4 rounded-xl bg-[#F5F7FA] px-4 py-5',
        className,
      )}
    >
      {items.map((item) => {
        const ratio = peak > 0 ? Math.max(0, item.value) / peak : 0
        const widthPercent = item.value <= 0 ? 0 : Math.max(ratio * 100, 2)
        const description =
          item.description ??
          (formatDescription
            ? formatDescription(item.value)
            : defaultFormatDescription(item.value, unit))

        return (
          <div
            key={`${item.label}-${String(item.value)}`}
            className="flex w-full items-center gap-3"
          >
            <span className="w-12 shrink-0 text-right text-xs font-medium text-[#828282]">
              {toPersianDigits(item.label)}
            </span>

            <div className="flex min-w-0 flex-1 items-center">
              {item.value <= 0 ? (
                <span
                  aria-hidden="true"
                  className="h-4 w-0.5 rounded bg-[#1D51B1]"
                />
              ) : (
                <div
                  className="h-4 rounded bg-[#1D51B1]"
                  style={{ width: `${widthPercent}%` }}
                  title={String(item.value)}
                />
              )}
            </div>

            <span className="shrink-0 text-left text-xs font-medium tabular-nums text-[#323232]">
              {description}
            </span>
          </div>
        )
      })}
    </div>
  )
}
