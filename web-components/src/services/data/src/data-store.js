import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

// import { setItem, getItem, removeItem } from 'localforage'
import localforage from 'localforage'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * This component help to interact with IndexedDB, allowing you to persis information on the browser
 * 
 * 
 * @export
 * @class DataStore
 * @author Diego Torres
 * @extends {HTMLElement}
 */
export default class DataStore extends HTMLElement {

  // [ ] emit events to enable Change Data Capture

  // get action() { return this.getAttribute('action') }

  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
    // console.log(`${this.id}_key`)
    // setItem('test', { test: true, success: true })
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => this.#processEvent(event))

    this.addEventListener('sync', async event => {
      const key = event.detail.key
      const items = await this.getItem(key)
      const dataSet = this.querySelector(`#${event.detail.key}`)

      const getEvent = (item) => new CustomEvent('syncItem', { detail: item })


      console.log(items)
      if (Array.isArray(items)) {
        items.forEach(item => {
          const newEvent = getEvent(item)
          dataSet.addDataPoint(newEvent)
        })
      } else {
        dataSet.addDataPoint(getEvent(items))
      }

    })

    this.addEventListener('updated', event => {
      this.#processEvent(event)
    })

  }

  async #processEvent(event) {
    console.log(event)
    const isBtn = event.target.tagName.toLowerCase() === 'button'
    let data = isBtn ? { ...event.target.dataset } : event.detail
    const key = event.target.id

    if (this.hasAttribute('append') || event.target.hasAttribute('append')) {
      const item = await this.getItem(key)
      const items = Array.isArray(item) ? item : [item]
      items.unshift(data)
      data = items
    }

    this.setItem(key, data)
      // .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  /**
   * Save an object on IndexedDB under a given key (this key will be prefixed with the store name)
   * @param {string} key data store key to be used
   * @param {*} value value to be stored on this data store key
   * @returns {*} 
   */
  setItem(key, value) {
    return localforage.setItem(`${this.id}_${key}`, value)
  }

  /**
   * Get an item from IndexedDB by a given key (this key will be prefixed with the store name)
   * @param {string} key 
   * @returns {*}
   */
  getItem(key) {
    return localforage.getItem(`${this.id}_${key}`)
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
    return localforage.removeItem(`${this.id}_${key}`)
  }

}

window.customElements.define('data-store', DataStore)
