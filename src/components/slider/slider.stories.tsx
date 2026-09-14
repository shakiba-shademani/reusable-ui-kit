import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from './slider'
import type { SliderItem } from './slider.types'

const items: SliderItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/ruk1/800/400',
    alt: 'اسلاید ۱',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/ruk2/800/400',
    alt: 'اسلاید ۲',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/ruk3/800/400',
    alt: 'اسلاید ۳',
  },
]

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    items,
    width: 360,
    height: 220,
    bulletPagination: true,
    loop: true,
    autoPlay: false,
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    autoPlayDelay: 2500,
  },
}

export const NoLoop: Story = {
  args: {
    loop: false,
  },
}

export const SingleSlide: Story = {
  args: {
    items: [items[0]],
    loop: false,
    autoPlay: false,
  },
}

export const CustomBullets: Story = {
  args: {
    bulletColor: 'rgba(255,255,255,0.45)',
    bulletActiveColor: '#fcb600',
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}
