import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Dropdown } from './dropdown'
import type { DropdownOption, DropdownSingleProps } from './dropdown.types'

const SERVICE_OPTIONS: DropdownOption[] = [
  { value: 'c2c', label: 'کارت به کارت' },
  { value: 'car', label: 'خدمات خودرو' },
  { value: 'internet', label: 'اینترنت' },
  { value: 'charge', label: 'شارژ' },
  { value: 'bill', label: 'قبض' },
  { value: 'balance', label: 'موجودی' },
  { value: 'wallet', label: 'کیف پول' },
]

const FILTER_OPTIONS: DropdownOption[] = [
  { value: 'balance', label: 'موجودی' },
  { value: 'charge', label: 'شارژ' },
  { value: 'bill', label: 'قبض' },
  { value: 'package', label: 'بسته اینترنت' },
  { value: 'kindness', label: 'مهربانی' },
  { value: 'car', label: 'خدمات خودرو' },
  { value: 'funds', label: 'وجوهات' },
  { value: 'exit', label: 'عوارض خروج' },
]

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'RTL dropdown field (Figma Inputs/Mobile/Dropdown). Opens a BottomSheet for single (radio) or multiple (checkbox) selection. Form-friendly via value/onChange.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'عنوان',
    placeholder: 'مانند ...',
    options: SERVICE_OPTIONS,
    sheetTitle: 'خدمت',
    dir: 'rtl',
  } satisfies DropdownSingleProps,
  decorators: [
    (Story) => (
      <div dir="rtl" className="min-h-40 bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DropdownSingleProps>

export default meta
type Story = StoryObj<DropdownSingleProps>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: 'bill',
  },
}

export const Error: Story = {
  args: {
    error: 'متن راهنما',
  },
}

export const Hover: Story = {
  args: {
    forceHover: true,
  },
}

export const HoverError: Story = {
  name: 'Hover, error',
  args: {
    forceHover: true,
    error: 'متن راهنما',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const SingleSelect: Story = {
  name: 'Single select (interactive)',
  render: function SingleSelectStory() {
    const [value, setValue] = useState('bill')
    return (
      <Dropdown
        label="خدمت"
        sheetTitle="خدمت"
        options={SERVICE_OPTIONS}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const MultiSelect: StoryObj = {
  name: 'Multi select (interactive)',
  render: function MultiSelectStory() {
    const [value, setValue] = useState<string[]>(['balance'])
    return (
      <Dropdown
        multiple
        label="نوع سرویس"
        sheetTitle="نوع سرویس"
        placeholder="انتخاب کنید"
        options={FILTER_OPTIONS}
        selectAllLabel="همه موارد"
        value={value}
        onChange={setValue}
        confirmText="تایید"
        cancelText="انصراف"
      />
    )
  },
}

export const FigmaMatrix: Story = {
  name: 'Figma matrix',
  render: () => (
    <div className="grid max-w-[700px] grid-cols-2 gap-8" dir="rtl">
      <Dropdown label="عنوان" placeholder="مانند ..." options={SERVICE_OPTIONS} />
      <Dropdown
        label="عنوان"
        placeholder="مانند ..."
        options={SERVICE_OPTIONS}
        defaultValue="bill"
      />
      <Dropdown
        label="عنوان"
        placeholder="مانند ..."
        options={SERVICE_OPTIONS}
        error="متن راهنما"
      />
      <Dropdown
        label="عنوان"
        options={SERVICE_OPTIONS}
        defaultValue="bill"
        error="متن راهنما"
      />
      <Dropdown
        label="عنوان"
        placeholder="مانند ..."
        options={SERVICE_OPTIONS}
        forceHover
      />
      <Dropdown
        label="عنوان"
        options={SERVICE_OPTIONS}
        defaultValue="bill"
        forceHover
      />
      <Dropdown
        label="عنوان"
        placeholder="مانند ..."
        options={SERVICE_OPTIONS}
        forceHover
        error="متن راهنما"
      />
      <Dropdown
        label="عنوان"
        options={SERVICE_OPTIONS}
        defaultValue="bill"
        forceHover
        error="متن راهنما"
      />
      <Dropdown label="عنوان" placeholder="مانند ..." options={SERVICE_OPTIONS} disabled />
      <Dropdown
        label="عنوان"
        options={SERVICE_OPTIONS}
        defaultValue="bill"
        disabled
      />
    </div>
  ),
}
