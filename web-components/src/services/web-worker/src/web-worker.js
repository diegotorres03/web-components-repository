import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

// export default class WebWorkerComponent extends HTMLScriptElement {
  export default class WebWorkerComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'message'
  }

  #worker

  constructor() {
    super()
    // const template = html`
    //   <b>web worker</b>
    // `
    // this.attachShadow({ mode: 'open' })
    // this.shadowRoot.appendChild(template)
    console.log(this)

    console.log(this.textContent)

    // this.textContent = `console.log('removed')`
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => (event))

    this.#registerWorker()
    // this.#worker.onmessage = message =>
  }


  #registerWorker() {
    // let url = this.getAttribute('src')
    const fnStr = `
    self.onmessage = function (event) {
      console.log('from main', event.data)
  
      // Send a message back to the main thread
      self.postMessage('Hello from the worker!')
    }`


    // let url = URL.createObjectURL(new Blob([fnStr]))

    // this.#worker = new Worker(url)
    this.#worker = new Worker(new URL('./worker-example.js', import.meta.url))

    this.onMessage(event => this.emit(event))
    this.postMessage({ test: true, message: 'esooo carajoo!!' })

  }

  sendEvent(event) {
    this.postMessage(event.details)
  }

  emit(event) {
    console.log('emiting', event)
    this.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: event
    }))
  }

  onMessage(handler) {
    this.#worker.onmessage = message => {
      const event = JSON.parse(message.data)
      handler(event)
    }
  }

  postMessage(message) {
    this.#worker.postMessage(message)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

// window.customElements.define('web-worker', WebWorkerComponent, {extends: 'script'})
window.customElements.define('web-worker', WebWorkerComponent)
