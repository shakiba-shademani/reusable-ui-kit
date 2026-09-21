import { clsx } from 'clsx'
import { useState } from 'react'

import { CloseIcon } from '../../icons/close-icon'
import type { ToastCardProps, ToastCardVariant } from './toast-card.types'

const VARIANT_BG: Record<ToastCardVariant, string> = {
  warning: 'bg-ruk-toast-warning',
  success: 'bg-ruk-toast-success',
  error: 'bg-ruk-toast-error',
  info: 'bg-ruk-toast-info',
}

export function ToastCard({
  title,
  description,
  icon,
  variant = 'warning',
  backgroundColor,
  iconBackgroundClassName = 'bg-white',
  open,
  defaultOpen = true,
  onOpenChange,
  showCloseButton = false,
  onClose,
  className,
  titleClassName,
  descriptionClassName,
  dir = 'rtl',
  role = 'status',
}: ToastCardProps) {
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = isControlled ? Boolean(open) : uncontrolledOpen

  if (!isOpen) return null

  const handleClose = () => {
    if (!isControlled) setUncontrolledOpen(false)
    onOpenChange?.(false)
    onClose?.()
  }

  return (
    <div
      dir={dir}
      role={role}
      className={clsx(
        'flex min-h-11 w-full items-start justify-between gap-2 rounded-lg px-2 py-2',
        backgroundColor ?? VARIANT_BG[variant],
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-2">
        {icon ? (
          <span
            className={clsx(
              'mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-sm [&>img]:size-5 [&>svg]:size-5',
              iconBackgroundClassName,
            )}
          >
            {icon}
          </span>
        ) : null}

        <div className="flex min-w-0 flex-col py-0.5">
          {title ? (
            <p
              className={clsx(
                'm-0 text-xs font-bold leading-5 text-ruk-text',
                titleClassName,
              )}
            >
              {title}
            </p>
          ) : null}

          {description ? (
            <p
              className={clsx(
                'm-0 mt-1 text-xs font-medium leading-5 break-words text-ruk-text',
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {showCloseButton ? (
        <button
          type="button"
          aria-label="بستن"
          onClick={handleClose}
          className="mt-1 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center text-ruk-icon"
        >
          <CloseIcon width={12} height={12} />
        </button>
      ) : null}
    </div>
  )
}
