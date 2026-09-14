import { clsx } from 'clsx'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from '../../icons/close-icon'
import type { BottomSheetProps } from './bottom-sheet.types'

const EXIT_MS = 280

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  showDivider = true,
  className,
  maxHeight = '85vh',
  dir = 'rtl',
}: BottomSheetProps) {
  const titleId = useId()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open || !closeOnEscape) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, closeOnEscape, onClose])

  useEffect(() => {
    if (!mounted) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mounted])

  if (!mounted || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className="ruk-bottom-sheet fixed inset-0 z-50 flex items-end justify-center"
      dir={dir}
    >
      <button
        type="button"
        aria-label="بستن"
        className={clsx(
          'absolute inset-0 border-0 bg-black/40 transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => {
          if (closeOnBackdrop) onClose()
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={clsx(
          'relative z-10 flex w-full max-w-lg flex-col bg-white shadow-lg',
          'rounded-t-ruk-sheet transition-transform duration-300 ease-out',
          visible ? 'translate-y-0' : 'translate-y-full',
          className,
        )}
        style={{ maxHeight }}
      >
        {(title || showCloseButton) && (
          <div className="relative flex shrink-0 items-center justify-center px-4 pb-3 pt-4">
            {title ? (
              <h2
                id={titleId}
                className="m-0 text-center text-base font-bold text-black"
              >
                {title}
              </h2>
            ) : null}

            {showCloseButton ? (
              <button
                type="button"
                aria-label="بستن"
                className="absolute end-4 top-4 inline-flex size-8 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-black"
                onClick={onClose}
              >
                <CloseIcon width={20} height={20} />
              </button>
            ) : null}
          </div>
        )}

        {showDivider ? (
          <div className="mx-4 h-0.5 shrink-0 bg-ruk-primary" />
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">{children}</div>

        {footer ? (
          <div className="shrink-0 border-t border-ruk-field-border px-4 py-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
