import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import localforage from 'localforage'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DataQueryComponent extends HTMLElement {

  get #parent() {
    return this.#findParent(this, 'data-store')
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
    registerTriggers(this, (event) => this.#processRequest(event))
  }

  async #processRequest(event) {
    console.log('#processRequest(event)', event)
    const type = this.getAttribute('type')
    const key = this.getAttribute('key')
    const size = this.getAttribute('size') || 100
    const page = this.getAttribute('page') || 1

    console.log(type, key, size, page)

    if (type === 'list') {
      const items = await this.getItem(key)
      console.log(items, size, page)

      if(!items) return
      items.forEach((item, index) => {
        if (index < size * (page - 1)) return
        if (index >= size * page) return

        console.log(item)
        this.emit(item, type)
      })
    } else if(type === 'clear') {
      this.removeItem(key)
      this.emit({}, type)
    }


  }

  emit(data, queryType) {
    console.log('emiting', queryType, data)
    this.dispatchEvent(new CustomEvent(queryType, {
      bubbles: true, composed: true,
      detail: data,
    }))
  }

  setItem(key, value) {
    return localforage.setItem(`${this.#parent.id}_${key}`, value)
  }

  getItem(key) {
    const dbKey = `${this.#parent.id}_${key}`
    console.log(dbKey)
    return localforage.getItem(dbKey)
  }

  hasItem(key) {
    return !!this.getItem(`${this.#parent.id}_${key}`)
  }

  removeItem(key) {
    return localforage.removeItem(`${this.#parent.id}_${key}`)
  }


  /**
 *
 *
 * @param {HTMLElement} element
 * @param {string} selector
 */
  #findParent(element, tagName) {
    const isHere = element.parentElement.tagName.toLowerCase() === tagName
    if (isHere) return element.parentElement
    return this.#findParent(element.parentElement, tagName)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-query', DataQueryComponent)


