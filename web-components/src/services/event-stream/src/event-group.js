import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import { runFilters, runTransforms } from './tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class EventGroupComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'data'
  }

  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    registerTriggers(this, (event) => this.emit(event))


    Array.from(this.querySelectorAll('event-source'))
      .forEach(eventSource => {
        eventSource.addEventListener('data', event => this.emit(event))
        eventSource.addEventListener('loaded', event => this.emit(event))
      })
  }

  emit(event) {
    const filterResult = runFilters(event, this.getAttribute('filter'))
    if (!filterResult) return

    const transformedData = runTransforms(event, this.getAttribute('transform'))

    console.info(`${this.id} emiting ${this.DEFAULT_EVENT_NAME}`, event)
    this.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: false, composed: true,
      detail: transformedData,
    }))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('event-group', EventGroupComponent)
