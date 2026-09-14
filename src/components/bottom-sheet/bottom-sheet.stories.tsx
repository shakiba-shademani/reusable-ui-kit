import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button'
import { BottomSheet } from './bottom-sheet'

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reusable RTL bottom sheet (portal). Used by Dropdown; also usable standalone for custom content.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => {},
    title: 'خدمت',
    children: null,
  },
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: function BasicStory() {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-neutral-100 p-6" dir="rtl">
        <Button type="button" onClick={() => setOpen(true)}>
          باز کردن
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)} title="خدمت">
          <p className="m-0 text-sm text-black">محتوای نمونه باتم‌شیت</p>
        </BottomSheet>
      </div>
    )
  },
}

export const WithFooter: Story = {
  render: function WithFooterStory() {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-neutral-100 p-6" dir="rtl">
        <Button type="button" onClick={() => setOpen(true)}>
          باز کردن
        </Button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="نوع سرویس"
          footer={
            <div className="flex gap-3">
              <Button block className="max-w-none flex-1" onClick={() => setOpen(false)}>
                تایید
              </Button>
              <Button
                variant="outline"
                block
                className="max-w-none flex-1"
                onClick={() => setOpen(false)}
              >
                انصراف
              </Button>
            </div>
          }
        >
          <p className="m-0 text-sm text-black">لیست گزینه‌ها اینجا قرار می‌گیرد.</p>
        </BottomSheet>
      </div>
    )
  },
}
