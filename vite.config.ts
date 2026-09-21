import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const root = import.meta.dirname

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/main.tsx', 'src/App.tsx'],
      bundleTypes: true,
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      name: 'ReusableUiKit',
      formats: ['es'],
      fileName: 'index',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-multi-date-picker',
        'react-date-object',
        /^react-multi-date-picker\//,
        /^react-date-object\//,
        'swiper',
        'swiper/react',
        'swiper/modules',
        'swiper/css',
        'swiper/css/pagination',
        /^swiper\//,
      ],
      output: {
        assetFileNames: 'reusable-ui-kit.[ext]',
      },
    },
  },
})
