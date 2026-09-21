import fs from 'node:fs'

const getBaseUrl = () => {
  console.time('init')

  const authUser = process.env.STORYBOOK_AUTH_USER
  const authPassword = process.env.STORYBOOK_AUTH_PASSWORD

  try {
    fs.mkdirSync('storybook-static', { recursive: true })
    fs.writeFileSync(
      'storybook-static/config.json',
      JSON.stringify({
        STORYBOOK_AUTH_USER: authUser,
        STORYBOOK_AUTH_PASSWORD: authPassword,
      }),
    )
  } catch {
    // ignore write errors
  }

  console.timeEnd('init')
}

getBaseUrl()
