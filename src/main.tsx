import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Input } from './components/input'
import { WalletIcon } from './icons/wallet-icon'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main
      dir="rtl"
      className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 bg-white p-8 font-sans"
    >
      <h1 className="m-0 text-xl font-semibold text-ruk-text">reusable-ui-kit</h1>
      <Input label="عنوان" placeholder="مانند ..." />
      <Input
        label="عنوان"
        placeholder="مانند ..."
        icon={<WalletIcon width={22} height={22} />}
      />
      <Input label="عنوان" defaultValue="مانند ..." error="متن راهنما" />
    </main>
  </StrictMode>,
)
