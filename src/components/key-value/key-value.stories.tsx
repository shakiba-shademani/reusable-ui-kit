import type { Meta, StoryObj } from '@storybook/react-vite'

import { KeyValue } from './key-value'
import type { KeyValueProps } from './key-value.types'

const meta = {
  title: 'Components/KeyValue',
  component: KeyValue,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    items: [
      { key: 'نام پذیرنده', value: 'فروشگاه نمونه' },
      { key: 'شماره پایانه', value: '12345678', direction: 'ltr' },
      { key: 'وضعیت', value: 'فعال' },
    ],
  } satisfies KeyValueProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="max-w-md bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<KeyValueProps>

export default meta
type Story = StoryObj<KeyValueProps>

export const Default: Story = {}
