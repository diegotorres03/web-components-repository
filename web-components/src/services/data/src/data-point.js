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
      ${this.hasAttribute('visible') ? 
        this.hasAttribute('pretty') ? 
        JSON.stringify(this.dataset, undefined,2 ):
        JSON.stringify(this.dataset) + `<hr>` : ''}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    const children = Array.from(this.querySelectorAll('data-rel'))
    children.forEach(child => child.setAttribute('from', `#${this.id}`))

  }


  connectedCallback() {
    registerTriggers(this, (event) => console.log(event))
    const addedEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: this.dataset,
    })
    this.dispatchEvent(addedEvent)

    // const children = Array.from(this.querySelectorAll('data-rel'))
    // children.forEach(child => child.setAttribute('from', `#${this.id}`))
    // console.log(children)
  }


}

window.customElements.define('data-point', DataPointComponent)
