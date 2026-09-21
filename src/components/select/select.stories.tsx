import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Select } from './select'
import type { SelectMultipleProps, SelectSingleProps } from './select.types'

const CITY_OPTIONS = [
  { value: 'teh', label: 'تهران' },
  { value: 'isf', label: 'اصفهان' },
  { value: 'shir', label: 'شیراز' },
  { value: 'mash', label: 'مشهد' },
  { value: 'tab', label: 'تبریز' },
  { value: 'kar', label: 'کرج' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-80 bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

export const SingleSearchable: StoryObj<SelectSingleProps> = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        label="شهر"
        placeholder="انتخاب کنید"
        options={CITY_OPTIONS}
        searchable
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const Multiple: StoryObj<SelectMultipleProps> = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <Select
        multiple
        label="شهرها"
        placeholder="انتخاب کنید"
        options={CITY_OPTIONS}
        searchable
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const WithError: StoryObj<SelectSingleProps> = {
  render: () => (
    <Select
      label="شهر"
      options={CITY_OPTIONS}
      error="انتخاب شهر الزامی است"
    />
  ),
}
