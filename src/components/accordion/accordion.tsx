import { clsx } from 'clsx'
import { useState } from 'react'

import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import type { AccordionProps } from './accordion.types'

export function Accordion({
  summary,
  children,
  summaryInfo,
  detailInfo,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  summaryClassName,
  contentClassName,
  dir = 'rtl',
}: AccordionProps) {
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = isControlled ? Boolean(open) : uncontrolledOpen

  const header = summary ?? summaryInfo
  const body = children ?? detailInfo

  const toggle = () => {
    const next = !isOpen
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  return (
    <div
      dir={dir}
      className={clsx(
        'overflow-hidden rounded-xl bg-ruk-option transition-shadow',
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={toggle}
        className={clsx(
          'flex w-full cursor-pointer items-center justify-between gap-3 border-0 bg-transparent px-4 py-3 text-right',
          summaryClassName,
        )}
      >
        <div className="min-w-0 flex-1 text-sm font-medium text-ruk-text">
          {header}
        </div>
        <ChevronDownIcon
          width={16}
          height={16}
          className={clsx(
            'shrink-0 text-ruk-icon transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={clsx(
              'border-t border-ruk-accent/20 px-4 py-3 text-sm text-ruk-text',
              contentClassName,
            )}
          >
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}
