import { clsx } from 'clsx'
import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import type { SwiperOptions } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/pagination'

import type { SliderItem, SliderProps } from './slider.types'

function toCssSize(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0
  return Math.max(0, Math.min(index, length - 1))
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    {
      items,
      width = '100%',
      height = 200,
      className,
      bulletPagination = false,
      bulletColor,
      bulletActiveColor,
      loop = false,
      autoPlay = false,
      autoPlayDelay = 3000,
      transitionDuration = 500,
      defaultActiveIndex = 0,
      activeIndex,
      onSlideChange,
      onSlideClick,
      spaceBetween = 16,
      ...rest
    },
    ref,
  ) {
    const swiperRef = useRef<SwiperInstance | null>(null)
    const hasItems = items.length > 0
    const hasMultiple = items.length > 1
    const initialIndex = clampIndex(defaultActiveIndex, items.length)

    useEffect(() => {
      if (activeIndex === undefined || !swiperRef.current || !hasItems) return
      const next = clampIndex(activeIndex, items.length)
      if (loop && hasMultiple) {
        swiperRef.current.slideToLoop(next, transitionDuration)
      } else {
        swiperRef.current.slideTo(next, transitionDuration)
      }
    }, [activeIndex, hasItems, hasMultiple, items.length, loop, transitionDuration])

    const handleSlideClick = (
      event: MouseEvent<HTMLDivElement>,
      item: SliderItem,
      index: number,
    ) => {
      event.stopPropagation()
      item.onSlideClick?.(item.id ?? index, item)
      onSlideClick?.(item, index)
    }

    const handleKeyDown = (
      event: KeyboardEvent<HTMLDivElement>,
      item: SliderItem,
      index: number,
    ) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      handleSlideClick(event as unknown as MouseEvent<HTMLDivElement>, item, index)
    }

    const swiperOptions: SwiperOptions = {
      modules: [
        ...(bulletPagination ? [Pagination] : []),
        ...(autoPlay ? [Autoplay] : []),
      ],
      loop: loop && hasMultiple,
      resistanceRatio: 0.85,
      speed: transitionDuration,
      initialSlide: initialIndex,
      slidesPerView: 1,
      spaceBetween,
      watchOverflow: true,
      allowTouchMove: hasMultiple,
      pagination:
        bulletPagination && hasMultiple
          ? { clickable: true, el: '.ruk-slider-pagination' }
          : false,
      autoplay:
        autoPlay && hasMultiple
          ? {
              delay: autoPlayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false,
    }

    if (!hasItems) {
      return (
        <div
          {...rest}
          ref={ref}
          className={clsx(
            'flex items-center justify-center rounded-xl bg-neutral-100 text-sm text-neutral-500',
            className,
          )}
          style={{ width: toCssSize(width), height: toCssSize(height) }}
          dir="rtl"
        >
          اسلایدی برای نمایش وجود ندارد
        </div>
      )
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={clsx('ruk-slider relative w-full overflow-hidden select-none', className)}
        style={{ width: toCssSize(width), height: toCssSize(height), direction: 'ltr' }}
      >
        <Swiper
          {...swiperOptions}
          className="h-full w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => {
            const item = items[swiper.realIndex]
            if (item) onSlideChange?.(item, swiper.realIndex)
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={item.id ?? index}
              className="relative h-[85%] overflow-hidden rounded-2xl"
            >
              <div
                role="button"
                tabIndex={0}
                className="relative h-full w-full cursor-pointer"
                aria-label={`اسلاید ${index + 1}`}
                onClick={(event) => handleSlideClick(event, item, index)}
                onKeyDown={(event) => handleKeyDown(event, item, index)}
              >
                <img
                  src={item.image}
                  alt={item.alt ?? `اسلاید ${index + 1}`}
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                  draggable={false}
                />
                {item.content ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl">
                    {item.content}
                  </div>
                ) : null}
              </div>
            </SwiperSlide>
          ))}

          {bulletPagination && hasMultiple ? (
            <div
              className={clsx(
                'ruk-slider-pagination swiper-pagination !bottom-[10%] !z-30',
                'flex items-center justify-center gap-1.5',
                '[&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:!inline-block',
                '[&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2',
                '[&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!opacity-30',
                '[&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300',
                '[&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!opacity-100',
              )}
              style={
                {
                  '--bullet-color': bulletColor ?? '#9c9d9d',
                  '--bullet-active-color': bulletActiveColor ?? '#4f4f4f',
                } as CSSProperties
              }
              aria-label="صفحه‌بندی اسلایدها"
            />
          ) : null}
        </Swiper>

        <style>{`
          .ruk-slider .swiper-pagination-bullet {
            background: var(--bullet-color, #9c9d9d) !important;
          }
          .ruk-slider .swiper-pagination-bullet-active {
            background: var(--bullet-active-color, #4f4f4f) !important;
          }
        `}</style>
      </div>
    )
  },
)

Slider.displayName = 'Slider'
