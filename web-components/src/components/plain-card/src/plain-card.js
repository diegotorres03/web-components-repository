import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import plainCardHtml from './plain-card.html'
import plainCardStyle from './plain-card.css'

export default class PlainCardComponent extends HTMLElement {
  constructor() {
    super()
    const template = html`<style>
        ${plainCardStyle}
      </style>
      ${plainCardHtml}`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  adoptedCallback() {}
}

window.customElements.define('plain-card', PlainCardComponent)
