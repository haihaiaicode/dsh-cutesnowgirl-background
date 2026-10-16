(() => {
  const GLOBAL = '__dshCutesnowgirlBackground'
  const LAYER_ID = 'dsh-cutesnowgirl-background'
  const READY_CLASS = 'dsh-cutesnowgirl-background-ready'
  const VIDEO_URL = '/dsh-cutesnowgirl-background/background.mp4'
  const BOOT_SELECTOR = '[data-dsh-boot], [data-dsh-boot-splash], .dsh550c-host'
  const WORKSPACE_SELECTOR = '.BynINW_frame, [data-dsh-workspace], [data-dsh-main-frame]'

  window[GLOBAL]?.dispose?.()

  function mount() {
    if (document.body === null) return

    const layer = document.createElement('div')
    layer.id = LAYER_ID
    layer.setAttribute('aria-hidden', 'true')
    const video = document.createElement('video')
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = 'metadata'
    video.tabIndex = -1
    video.disablePictureInPicture = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    layer.appendChild(video)
    document.body.prepend(layer)

    let disposed = false
    let scheduled = false
    let playing = false

    const isBooting = () =>
      document.querySelector(BOOT_SELECTOR) !== null ||
      document.documentElement.classList.contains('dsh550c-first')

    const hasWorkspace = () =>
      document.querySelector(WORKSPACE_SELECTOR) !== null ||
      document.querySelector('[contenteditable="true"], textarea') !== null

    function sync() {
      scheduled = false
      if (disposed) return
      const ready = hasWorkspace() && !isBooting()
      document.body.classList.toggle(READY_CLASS, ready)
      if (ready && !video.hasAttribute('src')) video.src = VIDEO_URL

      const shouldPlay = ready && !document.hidden
      if (shouldPlay === playing) return
      playing = shouldPlay
      if (shouldPlay) video.play().catch(() => {})
      else video.pause()
    }

    function schedule() {
      if (scheduled || disposed) return
      scheduled = true
      requestAnimationFrame(sync)
    }

    const observer = new MutationObserver(schedule)
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
    document.addEventListener('visibilitychange', sync)

    function dispose() {
      if (disposed) return
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      document.body.classList.remove(READY_CLASS)
      video.pause()
      video.removeAttribute('src')
      video.load()
      layer.remove()
      if (window[GLOBAL]?.dispose === dispose) delete window[GLOBAL]
    }

    video.addEventListener('error', dispose, { once: true })
    window[GLOBAL] = { dispose, sync }
    sync()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true })
  } else {
    mount()
  }
})()
