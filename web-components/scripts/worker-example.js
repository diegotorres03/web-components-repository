self.onmessage = function (event) {
    console.log('from main', event.data)

    // Send a message back to the main thread
    self.postMessage('Hello from the worker!')
}