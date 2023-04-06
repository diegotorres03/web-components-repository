import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import componentHtml from './app-layout.html'
import componentCss from './app-layout.css'
import globalStyles from '../../../global/style-tools.css'

export default class AppLayoutComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`
        <style>${globalStyles}</style>
        <style>${componentCss}</style>
        ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))

    console.log(globalStyles)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('app-layout', AppLayoutComponent)
