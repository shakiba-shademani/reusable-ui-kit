import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { DateObject } from 'react-multi-date-picker'

import { DatePicker } from './date-picker'
import type { DatePickerProps } from './date-picker.types'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Persian (Jalali) date picker ported from beat. Supports single-day and range selection with the same visual style.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    range: true,
    disablePastDates: false,
  } satisfies DatePickerProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-80 bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DatePickerProps>

export default meta
type Story = StoryObj<DatePickerProps>

function RangeDemo(props: DatePickerProps) {
  const [value, setValue] = useState<DateObject[]>(props.value ?? [])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <DatePicker {...props} value={value} onChange={setValue} />
      <p className="text-sm text-[#636362]">
        {value.length === 0
          ? 'تاریخی انتخاب نشده'
          : value.map((date) => date.format('YYYY/MM/DD')).join(' — ')}
      </p>
    </div>
  )
}

export const Range: Story = {
  render: (args) => <RangeDemo {...args} range />,
}

export const Single: Story = {
  name: 'Single date',
  render: (args) => <RangeDemo {...args} range={false} />,
}

export const DisablePastDates: Story = {
  name: 'Disable past dates',
  render: (args) => <RangeDemo {...args} range={false} disablePastDates />,
}

export const WithInitialRange: Story = {
  name: 'Initial range',
  render: (args) => {
    const start = new DateObject({ calendar: persian, locale: persian_fa })
    const end = new DateObject(start).add(4, 'days')

    return <RangeDemo {...args} range value={[start, end]} />
  },
}

export const WithInitialSingle: Story = {
  name: 'Initial single date',
  render: (args) => {
    const selected = new DateObject({ calendar: persian, locale: persian_fa })

    return <RangeDemo {...args} range={false} value={[selected]} />
  },
}
