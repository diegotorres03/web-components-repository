import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
  sleep,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DataSetComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'updated'
  }


  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
    
  }

  #loadFromDatastore(){
    console.log('#loadFromDatastore()')
    this.dispatchEvent(new CustomEvent('sync', {
      bubbles: true, composed: true,
      detail: { key: this.id, page: 1, size: 20 },
    }))
  }

  async connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => this.addDataPoint(event))
    
    await sleep(1)
    this.#loadFromDatastore()

  }

  /**
   * append a <data-point> tag, it will take values from event.detail 
   * or dataset.
   * 
   * if event.type is other than'syncItem', an `updated` event will be triggered with the latest
   * data-point created
   *
   * @emits updated
   * @param {*} event
   * @memberof DataSetComponent
   */
  addDataPoint(event) {

    if(!event.detail) return console.warn('event detail not present')


    const isBtn = event.target && event.target.tagName.toLowerCase() === 'button'
    let data = isBtn ? { ...event.target.dataset } : event.detail

    const dataAttributes = Object.keys(data)
      .map(key => `data-${key}="${data[key]}"`)
      .join(' ')

    const id = `data-point-${Date.now()}`
    const template = html`<data-point id="${id}" ${
      this.hasAttribute('visible') ? 'visible': ''
    } ${dataAttributes} />`
    

    this.shadowRoot.prepend(template)
    // this.shadowRoot.appendChild(template)

    if(!data) return console.warn('no data')

    const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: {...data, __id: id},
    })

    if(event.type === 'syncItem') return
    this.dispatchEvent(newEvent)

  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }


}

window.customElements.define('data-set', DataSetComponent)
