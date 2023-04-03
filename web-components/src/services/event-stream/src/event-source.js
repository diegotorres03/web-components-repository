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

  get #transformNames() {
    if(!this.getAttribute('transform')) return []
    return this.getAttribute('transform').split(/[,]/g).map(fnName => fnName.trim())
  }
  #fitlerNames = []

  get #eventSource() {
    return {
      trigger: this.getAttribute('trigger'),
      triggerEvent: this.getAttribute('trigger-event') || this.getAttribute('event'),
      dataset: { ...this.dataset }
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

    // const fnName = this.getAttribute('filter')

    // acomodating window load
    console.log('attr transfrom',this.#transformNames)
    

    if (
      this.getAttribute('trigger') === 'window' &&
      this.getAttribute('event') === 'load'
    ) {
      window.addEventListener('load', event => {
        // alert('here')
        console.info(`${this.id} emiting load`, event)
        this.dispatchEvent(new CustomEvent('loaded', {
          bubbles: false, composed: true,
          detail: { ...event.detail, ...this.dataset },
        }))

      })
      return
    }

    registerTriggers(this, (event) => this.emit(event))
  }

  emit(event) {
    const filterResult = runFilters(event, this.getAttribute('filter'))
    console.log('filterResult', filterResult)
    if (!filterResult) return


    console.log('attr transfrom',this.getAttribute('transform'))
    const transformedData = runTransforms(event, this.getAttribute('transform'), this.#eventSource)

    const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: false, composed: true,
      detail: transformedData,
    })
    console.info(`${this.id} emiting ${this.DEFAULT_EVENT_NAME}`, event)
    this.dispatchEvent(newEvent)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('event-source', EventSourceComponent)
