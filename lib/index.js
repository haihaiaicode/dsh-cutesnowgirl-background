import { createReadStream, readFileSync, statSync } from 'node:fs'
import { pipeline } from 'node:stream'
import { parseByteRange } from './range.js'

export const name = 'cutesnowgirl-background'

const ROUTE_PREFIX = '/dsh-cutesnowgirl-background'
const videoUrl = new URL('../assets/background.mp4', import.meta.url)
const css = readFileSync(new URL('./style.css', import.meta.url), 'utf8')
const client = readFileSync(new URL('./client.js', import.meta.url), 'utf8')

function sendText(res, method, type, body) {
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' })
    res.end()
    return
  }
  res.writeHead(200, {
    'content-type': type,
    'content-length': String(Buffer.byteLength(body)),
    'cache-control': 'no-store',
  })
  res.end(method === 'HEAD' ? undefined : body)
}

function sendVideo(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' })
    res.end()
    return
  }

  const { size } = statSync(videoUrl)
  const range = parseByteRange(req.headers.range, size)
  if (range === false) {
    res.writeHead(416, { 'content-range': `bytes */${size}` })
    res.end()
    return
  }

  const start = range?.start ?? 0
  const end = range?.end ?? size - 1
  const headers = {
    'content-type': 'video/mp4',
    'content-length': String(end - start + 1),
    'accept-ranges': 'bytes',
    'cache-control': 'private, max-age=86400',
  }
  if (range !== null) headers['content-range'] = `bytes ${start}-${end}/${size}`
  res.writeHead(range === null ? 200 : 206, headers)
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  pipeline(createReadStream(videoUrl, { start, end }), res, () => {})
}

function registerRoute(ctx, path, handler) {
  return ctx.webServer.register({ kind: 'exact', path, handler })
}

export function apply(ctx) {
  ctx.on('webserver/index-inject', (table) => {
    table.push({ kind: 'style', text: css })
    table.push({ kind: 'script', placement: 'head', text: client })
  })

  ctx.inject(['webServer'], (webCtx) => {
    webCtx.effect(
      () => registerRoute(webCtx, `${ROUTE_PREFIX}/style.css`, (req, res) => {
        sendText(res, req.method, 'text/css; charset=utf-8', css)
      }),
      `${name}: stylesheet route`,
    )
    webCtx.effect(
      () => registerRoute(webCtx, `${ROUTE_PREFIX}/client.js`, (req, res) => {
        sendText(res, req.method, 'text/javascript; charset=utf-8', client)
      }),
      `${name}: client route`,
    )
    webCtx.effect(
      () => registerRoute(webCtx, `${ROUTE_PREFIX}/background.mp4`, sendVideo),
      `${name}: video route`,
    )
  })
}
