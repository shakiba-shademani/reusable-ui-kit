import { clsx } from 'clsx'

import type { WizardProps } from './wizard.types'

export function Wizard({
  steps,
  currentStep,
  onStepClick,
  isClickable = true,
  className,
  dir = 'rtl',
}: WizardProps) {
  const handleClick = (index: number) => {
    if (!isClickable) return
    onStepClick?.(index)
  }

  return (
    <div dir={dir} className={clsx('w-full border-b border-ruk-border', className)}>
      <nav className="-mb-px flex w-full justify-around" aria-label="مراحل">
        {steps.map((step, index) => {
          const isVisited = index <= currentStep

          return (
            <button
              type="button"
              key={`${step}-${index}`}
              disabled={!isClickable}
              aria-current={index === currentStep ? 'step' : undefined}
              onClick={() => handleClick(index)}
              className={clsx(
                'w-full whitespace-nowrap border-b-2 px-1 py-[10px] pb-2 text-center text-[13px] font-bold transition-colors duration-200',
                isVisited
                  ? 'border-ruk-accent text-ruk-accent'
                  : 'border-transparent text-ruk-text-muted',
                isClickable &&
                  !isVisited &&
                  'cursor-pointer hover:border-ruk-border-hover hover:text-ruk-text',
                isClickable && isVisited && 'cursor-pointer',
                !isClickable && 'cursor-default',
              )}
            >
              {step}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
