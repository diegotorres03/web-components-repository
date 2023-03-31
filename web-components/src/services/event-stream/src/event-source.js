import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
  select, selectAll
} from '../../../global/web-tools'

import { runFilters, runTransforms } from './tools'

export default class EventSourceComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'data'
  }

  defaultEventName = 'data'


  get #eventSource() {
    return {
      trigger: this.getAttribute('trigger'),
      triggerEvent: this.getAttribute('trigger-event') || this.getAttribute('event'),
      dataset: {...this.dataset}
    }
  }

  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)

    const fnName = this.getAttribute('filter')
    console.log('fnName', fnName , window[fnName])

    // acomodating window load
    if (
      this.getAttribute('trigger') === 'window' &&
      this.getAttribute('trigger-event') === 'load'
    ) {
      if (document.readyState === "complete") {
        // alert('here')
        this.emit(new CustomEvent('window:loaded', {
          bubbles: false, composed: true,
          detail: this.dataset,
        }))
      }
      window.addEventListener('load', ev => {
        this.emit(new CustomEvent('window:loaded', {
          bubbles: false, composed: true,
          detail: this.dataset,
        }))
      })
      return
    }

    registerTriggers(this, (event) => this.emit(event))
  }

  emit(event) {
    const filterResult = runFilters(event, this.getAttribute('filter'))
    if (!filterResult) return

    const transformedData = runTransforms(event, this.getAttribute('transform'), this.#eventSource)

    const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: false, composed: true,
      detail: transformedData,
    })
    this.dispatchEvent(newEvent)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('event-source', EventSourceComponent)
