import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from './accordion'
import type { AccordionProps } from './accordion.types'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    summary: 'جزئیات تراکنش',
    children: 'مبلغ، زمان و وضعیت تراکنش در این بخش نمایش داده می‌شود.',
    defaultOpen: true,
  } satisfies AccordionProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="max-w-md bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<AccordionProps>

export default meta
type Story = StoryObj<AccordionProps>

export const Default: Story = {}

export const Closed: Story = {
  args: { defaultOpen: false },
}
