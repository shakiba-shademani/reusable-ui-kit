import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToastCard } from './toast-card'
import type { ToastCardProps } from './toast-card.types'

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="#FCB600" strokeWidth="1.5" />
    <path d="M10 5.5V11" stroke="#FCB600" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1" fill="#FCB600" />
  </svg>
)

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="#00A03C" strokeWidth="1.5" />
    <path
      d="M6 10.2L8.8 13L14 7.5"
      stroke="#00A03C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="#CB0000" strokeWidth="1.5" />
    <path d="M7 7L13 13M13 7L7 13" stroke="#CB0000" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const meta = {
  title: 'Components/ToastCard',
  component: ToastCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline toast / notice card (Ertefa Iva / custom-toast-box). Icon + title + optional description, with variant backgrounds.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" className="max-w-md bg-white p-6 font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ToastCardProps>

export default meta
type Story = StoryObj<ToastCardProps>

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <WarningIcon />,
    title: 'کارمزد استعلام موجودی کارت ۵۰۰ ریال است.',
    description: 'جهت استفاده از این سرویس، هویت مالک کارت و سیم کارت باید یکسان باشد.',
    showCloseButton: true,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    icon: <SuccessIcon />,
    title: 'درخواست رمز پویا ارسال شد.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    icon: <ErrorIcon />,
    title: 'خطایی رخ داده است.',
    description: 'لطفاً دوباره تلاش کنید.',
    showCloseButton: true,
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    icon: <WarningIcon />,
    title: 'توجه',
    description: 'این یک پیام اطلاع‌رسانی است.',
  },
}

export const CustomBackground: Story = {
  args: {
    backgroundColor: 'bg-[#E8F5E9]',
    icon: <SuccessIcon />,
    title: 'پس‌زمینه سفارشی',
  },
}
