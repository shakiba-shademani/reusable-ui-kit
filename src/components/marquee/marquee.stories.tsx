import type { Meta, StoryObj } from '@storybook/react-vite'

import { Marquee } from './marquee'
import type { MarqueeProps } from './marquee.types'

const meta = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    children:
      'این یک متن طولانی برای نمایش حرکت مارکی در صورت سرریز شدن عرض است.',
    width: '220px',
    duration: 8,
  } satisfies MarqueeProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="bg-white p-6 font-sans text-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<MarqueeProps>

export default meta
type Story = StoryObj<MarqueeProps>

export const Default: Story = {}

export const ShortText: Story = {
  args: { children: 'متن کوتاه', width: '220px' },
}
