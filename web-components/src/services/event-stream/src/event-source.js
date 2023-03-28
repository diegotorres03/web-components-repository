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

  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => this.emit(event))
  }


  // runFilters(event) {
  //   const filterSelector = this.getAttribute('filter')
  //   if (!filterSelector) return true
  //   const filters = selectAll(filterSelector)
  //   if (filters.length === 0) return false
  //   let res = true
  //   filters.forEach(filter => res = filter.run(event) && res)
  //   return res
  // }

  // runTransforms(event) {
  //   const transformSelector = this.getAttribute('transform')
  //   if (!transformSelector) return event
  //   const transforms = selectAll(transformSelector)
  //   let currentData = event.detail
  //   transforms.forEach(transform =>
  //     currentData = transform.run(currentData))
  //   return currentData
  // }

  emit(event) {
    console.log(event)
    const filterResult = runFilters(event, this.getAttribute('filter'))
    if (!filterResult) return

    const transformedData = runTransforms(event, this.getAttribute('transform'))

    console.log(transformedData)
    const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: false, composed: true,
      detail: transformedData,
    })
    console.log(newEvent)
    this.dispatchEvent(newEvent)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('event-source', EventSourceComponent)
