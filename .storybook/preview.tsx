import type { Preview } from '@storybook/react-vite'

import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'soft', value: '#f7f7f7' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans antialiased" dir="rtl" lang="fa">
        <Story />
      </div>
    ),
  ],
}

export default preview
