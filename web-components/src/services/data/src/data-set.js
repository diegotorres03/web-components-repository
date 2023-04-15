import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
  sleep,
} from '../../../global/web-tools'

import DataQueryComponent from './data-query'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

// [ ] use MutationObserver to detect DOM changes and update accordingly

export default class DataSetComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'updated'
  }

  get #dataPoints() {
    return Array.from(this.querySelectorAll('data-point'))
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

    this.#registerQueries()

  }

  #registerQueries() {
    const dataQueries = Array.from(this.querySelectorAll('data-query'))
    dataQueries.forEach(query => {
      console.log('data-query', query)
      const eventName = query.getAttribute('type')
      query.addEventListener(eventName, event => {
        console.log('performing query', event)
        if(eventName === DataQueryComponent.EVENT_TYPES.put) {
          // this.setItem()
        } else if(eventName === DataQueryComponent.EVENT_TYPES.delete) {
          const id = event.detail.__id
          this.removeItem(id)
        } else if(eventName === DataQueryComponent.EVENT_TYPES.clear) {
          const id = event.detail.__id
          this.clear(id)
        // } else if() {
        // } else if() {

        }
        // here emit to data-store or whoever is the parent the query results so data-store can process the change'
        const newEvent = new CustomEvent(eventName, {
          bubbles: true, composed: true,
          detail: { ...event.detail  },
        })
    
        // if(event.type === 'syncItem') return
        this.dispatchEvent(newEvent)
      })
    })
  }


  find(key) {
    this.#dataPoints
      .find(item => console.log('data-point', item))
  }

  clear() {
    Array.from(this.shadowRoot.querySelectorAll('data-point'))
      .forEach(dataPoint => dataPoint && dataPoint.remove())
  }

  /**
   * Save an object on IndexedDB under a given key (this key will be prefixed with the store name)
   * @param {string} key data store key to be used
   * @param {*} value value to be stored on this data store key
   * @returns {*} 
   */
  setItem(key, value) {
    const item = this.#dataPoints.find(item => item.id === key)
    console.log(item)
    // return localforage.setItem(`${this.id}_${key}`, value)
  }

  /**
   * Get an item from IndexedDB by a given key (this key will be prefixed with the store name)
   * @param {string} key 
   * @returns {*}
   */
  getItem(key) {
    return this.shadowRoot.querySelector('data-point')
  }

  hasItem(key) {
    return !!this.getItem(`${this.id}_${key}`)
  }

  /**
   * remove an item from IndexedDB by a given key (this key will be prefixed with the store name)
   * @param {string} key 
   * @returns {*}
   */
  removeItem(key) {
    const item = this.#dataPoints.find(item => item.id === key)
    if(!item) return console.warn('item not found', key)
    console.log(item)
    // item.remove()

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
      detail: {...data, __id: id, },
    })

    if(event.type === 'syncItem') return
    this.dispatchEvent(newEvent)

  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }


}

window.customElements.define('data-set', DataSetComponent)
