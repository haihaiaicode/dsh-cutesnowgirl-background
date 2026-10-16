import assert from 'node:assert/strict'
import test from 'node:test'
import { parseByteRange } from '../lib/range.js'

test('returns null when no Range header is supplied', () => {
  assert.equal(parseByteRange(undefined, 100), null)
})

test('parses bounded and open byte ranges', () => {
  assert.deepEqual(parseByteRange('bytes=10-19', 100), { start: 10, end: 19 })
  assert.deepEqual(parseByteRange('bytes=90-', 100), { start: 90, end: 99 })
  assert.deepEqual(parseByteRange('bytes=90-999', 100), { start: 90, end: 99 })
})

test('parses suffix ranges', () => {
  assert.deepEqual(parseByteRange('bytes=-10', 100), { start: 90, end: 99 })
  assert.deepEqual(parseByteRange('bytes=-200', 100), { start: 0, end: 99 })
})

test('rejects malformed and unsatisfiable ranges', () => {
  assert.equal(parseByteRange('bytes=-0', 100), false)
  assert.equal(parseByteRange('bytes=100-', 100), false)
  assert.equal(parseByteRange('bytes=20-10', 100), false)
  assert.equal(parseByteRange('items=0-10', 100), false)
  assert.equal(parseByteRange('bytes=0-1,4-5', 100), false)
})
