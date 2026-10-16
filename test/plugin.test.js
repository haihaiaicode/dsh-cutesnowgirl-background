import assert from 'node:assert/strict'
import test from 'node:test'
import { apply, name } from '../lib/index.js'

test('injects presentation assets and registers three same-origin routes', () => {
  const injections = []
  const routes = []
  let injectHandler
  const ctx = {
    on(event, handler) {
      assert.equal(event, 'webserver/index-inject')
      handler(injections)
    },
    inject(services, handler) {
      assert.deepEqual(services, ['webServer'])
      injectHandler = handler
    },
  }

  apply(ctx)
  assert.equal(name, 'cutesnowgirl-background')
  assert.deepEqual(injections.map((row) => row.kind), ['style', 'script'])
  assert.match(injections[0].text, /dsh-cutesnowgirl-background/)
  assert.match(injections[1].text, /dsh550c-host/)

  const webCtx = {
    webServer: {
      register(route) {
        routes.push(route)
        return () => {}
      },
    },
    effect(factory) {
      factory()
    },
  }
  injectHandler(webCtx)
  assert.deepEqual(
    routes.map((route) => route.path),
    [
      '/dsh-cutesnowgirl-background/style.css',
      '/dsh-cutesnowgirl-background/client.js',
      '/dsh-cutesnowgirl-background/background.mp4',
    ],
  )
})
