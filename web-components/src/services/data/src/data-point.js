import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * Al the starting point we will find `data-point` tags, this will represent a single data entry.
 * use `data-` attributes to store the values, tag attributes will be used by the component.
 *
 * @export
 * @emits added - when a new item is attached to the dom
 * @emits updated - when an existing data-point values change // [ ] implement this
 * @class DataPointComponent
 * @extends {HTMLElement}
 */
export default class DataPointComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'added'
  }

  constructor() {
    super()
    const template = html`<span></span>
      ${this.hasAttribute('visible') ? JSON.stringify(this.dataset) + `<hr>` : ''}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
    console.log('redy to emit', this.dataset)
    const addedEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: this.dataset,
    })
    console.log(addedEvent)
    this.dispatchEvent(addedEvent)
  }


}

window.customElements.define('data-point', DataPointComponent)