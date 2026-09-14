import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { OtpInput } from './otp-input'

const meta = {
  title: 'Components/OtpInput',
  component: OtpInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    length: 6,
    autoFocus: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-8" dir="rtl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FourDigits: Story = {
  args: { length: 4 },
}

export const WithValue: Story = {
  args: { value: '۸۱۲۳۴۵', autoFocus: false },
}

export const Error: Story = {
  args: { error: true, defaultValue: '12' },
}

export const Disabled: Story = {
  args: { disabled: true, value: '123456' },
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [value, setValue] = useState('')
    const [complete, setComplete] = useState('')
    return (
      <div className="flex flex-col items-center gap-4" dir="rtl">
        <OtpInput
          value={value}
          onChange={setValue}
          onComplete={setComplete}
          autoFocus
        />
        <p className="m-0 text-sm text-ruk-text-muted">مقدار: {value || '—'}</p>
        <p className="m-0 text-sm text-ruk-text-muted">کامل شد: {complete || '—'}</p>
      </div>
    )
  },
}
