import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'

const outputDirectory = resolve('out')
const port = Number(process.env.PORT ?? 4173)
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Bad request')
    return
  }

  let filePath = resolve(outputDirectory, `.${pathname}`)
  if (filePath !== outputDirectory && !filePath.startsWith(`${outputDirectory}${sep}`)) {
    response.writeHead(403).end('Forbidden')
    return
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html')
    const content = await readFile(filePath)
    const isGeneratedSocialImage = /(?:open)?graph-image|twitter-image/.test(filePath)
    const contentType = isGeneratedSocialImage ? 'image/png' : contentTypes[extname(filePath)]

    if (!contentType) {
      response.writeHead(415).end('Unsupported media type')
      return
    }

    response.writeHead(200, { 'Content-Type': contentType })
    response.end(request.method === 'HEAD' ? undefined : content)
  } catch {
    response.writeHead(404).end('Not found')
  }
})

server.listen(port, '127.0.0.1')
