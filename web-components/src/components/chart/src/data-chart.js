import { Chart } from 'chart.js'

import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


import componentHtml from './flip-card.html'
import componentStyle from './flip-card.css'

export default class DataChartComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`
      <style>${componentStyle}</style>
      ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-chart', DataChartComponent)
