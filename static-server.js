import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'storybook-static')
const port = Number(process.env.PORT ?? 3000)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8',
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url ?? '/').split('?')[0] || '/')
  const relativePath = requestPath === '/' ? '/index.html' : requestPath
  const filePath = path.normalize(path.join(root, relativePath))

  if (!filePath.startsWith(root)) {
    res.writeHead(403).end('Forbidden')
    return
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(root, 'index.html'), (fallbackError, fallbackData) => {
        if (fallbackError) {
          res.writeHead(404).end('Not found')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(fallbackData)
      })
      return
    }

    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] ?? 'application/octet-stream' }).end(data)
  })
})

server.listen(port, () => {
  console.log(`Storybook listening on http://0.0.0.0:${port}`)
})
