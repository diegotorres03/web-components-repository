import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DataSetComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'data'
  }

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => this.addDataPoint(event))
  }

  /**
   * append a <data-point> tag, it will take values from event.detail
   *
   * @param {*} event
   * @memberof DataSetComponent
   */
  addDataPoint(event) {
    console.log('adding datapoint', event)
    const dataAttributes = Object.keys(event.detail)
      .map(key => `data-${key}="${event.detail[key]}"`)
      .join(' ')
    const template = html`<data-point ${
      this.hasAttribute('visible') ? 'visible': ''
    } ${dataAttributes} />`
    // const data = event.detail
    // Object.keys(data).forEach(key => {
    //   template.firstChild.dataset[key] = data[key]
    // })
    this.shadowRoot.appendChild(template)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-set', DataSetComponent)
