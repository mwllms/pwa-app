<template>
  <div class="mx-12 mb-12">
    <div class="bg-purple-700 rounded-xl h-[800px]"></div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    console.log('hello page')
    // Create browser compatible event handler.
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
        if (parent.postMessage) {
          // replace #wrapper with element that contains
          // actual page content
          const height = document.getElementById('__nuxt').offsetHeight
          console.log('Send height', height)
          parent.postMessage(height, '*')
        }
      },
      false
    )
  },
}
</script>
