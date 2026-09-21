import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

import type { MarqueeProps } from './marquee.types'

export function Marquee({
  children,
  className,
  width = '100%',
  duration = 10,
  gap = '10%',
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const measure = () => {
      setOverflowing(text.scrollWidth > container.clientWidth)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [children])

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className={clsx('overflow-hidden whitespace-nowrap', className)}
      style={{ width }}
    >
      <p
        ref={textRef}
        className={clsx(
          'm-0 inline-block',
          overflowing && 'animate-ruk-marquee',
        )}
        style={{
          paddingInlineEnd: overflowing ? gap : undefined,
          animationDuration: `${duration}s`,
        }}
      >
        {children}
      </p>
      {overflowing ? (
        <p
          className="m-0 inline-block animate-ruk-marquee"
          style={{
            paddingInlineEnd: gap,
            animationDuration: `${duration}s`,
          }}
          aria-hidden="true"
        >
          {children}
        </p>
      ) : null}
    </div>
  )
}
