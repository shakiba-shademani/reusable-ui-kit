import { clsx } from 'clsx'

import type { KeyValueProps } from './key-value.types'

export function KeyValue({
  items,
  contentList,
  evenClassName = 'bg-ruk-field',
  oddClassName = 'bg-ruk-option',
  className,
  dir = 'rtl',
}: KeyValueProps) {
  const rows = items ?? contentList ?? []

  return (
    <div dir={dir} className={clsx('flex w-full flex-col gap-2', className)}>
      {rows.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.icon ? (
            <span className="inline-flex size-7 shrink-0 items-center justify-center [&>img]:max-h-7 [&>img]:max-w-7 [&>svg]:size-5">
              {item.icon}
            </span>
          ) : null}

          <div
            className={clsx(
              'flex w-full items-center justify-between rounded px-6 py-2 text-sm',
              index % 2 === 0 ? oddClassName : evenClassName,
            )}
          >
            <div className="w-1/2 font-medium text-ruk-text">{item.key}</div>
            <div
              dir={item.direction}
              className="w-1/2 text-left text-ruk-text"
            >
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
