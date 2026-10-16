export function parseByteRange(header, size) {
  if (header === undefined) return null
  if (!Number.isSafeInteger(size) || size <= 0) throw new TypeError('size must be a positive safe integer')

  const match = /^bytes=(\d*)-(\d*)$/.exec(header)
  if (match === null || (match[1] === '' && match[2] === '')) return false

  let start
  let end
  if (match[1] === '') {
    const suffix = Number(match[2])
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return false
    start = Math.max(0, size - suffix)
    end = size - 1
  } else {
    start = Number(match[1])
    end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1)
  }

  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) return false
  return { start, end }
}
