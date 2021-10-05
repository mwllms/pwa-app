function sendHeight() {
  if (parent.postMessage) {
    // replace #wrapper with element that contains
    // actual page content
    const height = document.getElementById('__nuxt').offsetHeight
    console.log('Send height', height)
    parent.postMessage(height, '*')
  }
}

export default () => {
  // Create browser compatible event handler.
  if (process.client) {
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    // Listen for a message from the iframe.

    eventer(
      messageEvent,
      function (e) {
        console.log('eventer', e)
        if (isNaN(e.data)) return
        sendHeight()
      },
      false
    )
  }
}
