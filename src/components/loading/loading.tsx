import { clsx } from 'clsx'

import type { LoadingProps } from './loading.types'

export function Loading({
  type = 'spin',
  size = 32,
  color = 'var(--color-ruk-primary)',
  className,
  label = 'در حال بارگذاری',
}: LoadingProps) {
  if (type === 'dots') {
    return (
      <span
        role="status"
        aria-label={label}
        className={clsx('inline-flex items-center gap-1', className)}
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="inline-block size-2 animate-pulse rounded-full"
            style={{
              backgroundColor: color,
              animationDelay: `${index * 150}ms`,
            }}
          />
        ))}
      </span>
    )
  }

  if (type === 'pulse') {
    return (
      <span
        role="status"
        aria-label={label}
        className={clsx('inline-block animate-pulse rounded-full', className)}
        style={{ width: size, height: size, backgroundColor: color }}
      />
    )
  }

  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
        className,
      )}
      style={{ width: size, height: size, color }}
    />
  )
}
