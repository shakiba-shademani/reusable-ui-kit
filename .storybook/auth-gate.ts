const AUTH_SESSION_KEY = 'reusable-ui-kit-sb-auth'
const AUTH_PENDING_CLASS = 'sb-auth-pending'

type AuthConfig = {
  STORYBOOK_AUTH_USER?: string
  STORYBOOK_AUTH_PASSWORD?: string
}

const isDev = process.env.NODE_ENV === 'development'

async function loadAuthConfig(): Promise<AuthConfig> {
  if (isDev) {
    return {
      STORYBOOK_AUTH_USER: process.env.STORYBOOK_AUTH_USER ?? '',
      STORYBOOK_AUTH_PASSWORD: process.env.STORYBOOK_AUTH_PASSWORD ?? '',
    }
  }

  try {
    const response = await fetch('./config.json', { cache: 'no-store' })
    if (!response.ok) return {}
    return (await response.json()) as AuthConfig
  } catch {
    return {}
  }
}

function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'ok'
  } catch {
    return false
  }
}

function setAuthenticated(): void {
  sessionStorage.setItem(AUTH_SESSION_KEY, 'ok')
}

function clearAuthPending(): void {
  document.documentElement.classList.remove(AUTH_PENDING_CLASS)
}

function showLoginGate(expectedUser: string, expectedPassword: string): void {
  const overlay = document.createElement('div')
  overlay.id = 'sb-login-gate'
  overlay.setAttribute('dir', 'rtl')
  overlay.setAttribute('lang', 'fa')
  overlay.innerHTML = `
    <style>
      #sb-login-gate {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at top, #eef2ff 0%, transparent 45%),
          linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        font-family: Vazirmatn, Tahoma, sans-serif;
        color: #0f172a;
      }

      #sb-login-gate .card {
        width: min(100%, 380px);
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 28px 24px;
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
      }

      #sb-login-gate h1 {
        margin: 0 0 8px;
        font-size: 1.35rem;
        font-weight: 700;
      }

      #sb-login-gate p {
        margin: 0 0 20px;
        color: #64748b;
        font-size: 0.92rem;
        line-height: 1.6;
      }

      #sb-login-gate label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.85rem;
        font-weight: 600;
      }

      #sb-login-gate .field {
        margin-bottom: 14px;
      }

      #sb-login-gate input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 11px 12px;
        font: inherit;
        background: #fff;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }

      #sb-login-gate input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
      }

      #sb-login-gate button {
        width: 100%;
        margin-top: 8px;
        border: 0;
        border-radius: 10px;
        padding: 12px 14px;
        background: #0f172a;
        color: #fff;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
      }

      #sb-login-gate button:hover {
        background: #1e293b;
      }

      #sb-login-gate .error {
        display: none;
        margin: 0 0 12px;
        padding: 10px 12px;
        border-radius: 10px;
        background: #fef2f2;
        color: #b91c1c;
        font-size: 0.85rem;
      }

      #sb-login-gate .error.is-visible {
        display: block;
      }
    </style>
    <form class="card" autocomplete="on">
      <h1>ورود به Storybook</h1>
      <p>برای مشاهده کامپوننت‌ها، نام کاربری و رمز عبور را وارد کنید.</p>
      <div class="error" role="alert"></div>
      <div class="field">
        <label for="sb-auth-user">نام کاربری</label>
        <input id="sb-auth-user" name="username" type="text" autocomplete="username" required />
      </div>
      <div class="field">
        <label for="sb-auth-pass">رمز عبور</label>
        <input id="sb-auth-pass" name="password" type="password" autocomplete="current-password" required />
      </div>
      <button type="submit">ورود</button>
    </form>
  `

  const form = overlay.querySelector('form')
  const error = overlay.querySelector('.error')
  const userInput = overlay.querySelector<HTMLInputElement>('#sb-auth-user')
  const passInput = overlay.querySelector<HTMLInputElement>('#sb-auth-pass')

  form?.addEventListener('submit', (event) => {
    event.preventDefault()

    const user = userInput?.value.trim() ?? ''
    const password = passInput?.value ?? ''

    if (!expectedUser || !expectedPassword) {
      if (error) {
        error.textContent = isDev
          ? 'اطلاعات ورود پیکربندی نشده است. فایل .env.local را بررسی کنید.'
          : 'اطلاعات ورود پیکربندی نشده است. فایل config.json را بررسی کنید.'
        error.classList.add('is-visible')
      }
      return
    }

    if (user === expectedUser && password === expectedPassword) {
      setAuthenticated()
      clearAuthPending()
      overlay.remove()
      window.location.reload()
      return
    }

    if (error) {
      error.textContent = 'نام کاربری یا رمز عبور نادرست است.'
      error.classList.add('is-visible')
    }
  })

  document.body.appendChild(overlay)
  clearAuthPending()
  userInput?.focus()
}

function bootstrapAuthGate(): void {
  if (isAuthenticated()) {
    clearAuthPending()
    return
  }

  const start = async () => {
    const config = await loadAuthConfig()
    showLoginGate(config.STORYBOOK_AUTH_USER ?? '', config.STORYBOOK_AUTH_PASSWORD ?? '')
  }

  if (document.body) {
    void start()
    return
  }

  document.addEventListener('DOMContentLoaded', () => void start(), { once: true })
}

bootstrapAuthGate()
