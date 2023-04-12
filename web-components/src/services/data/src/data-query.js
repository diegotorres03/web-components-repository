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


  static EVENT_TYPES = {
    list: 'list',
    get: 'get',
    put: 'put',
    delete: 'delete',
    clear: 'clear',
  }


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
    const type = this.getAttribute('type')
    const key = this.getAttribute('key') || this.parentElement.id
    const size = this.getAttribute('size') || 100
    const page = this.getAttribute('page') || 1

    console.log(type, key, size, page)

    if (type === 'list') {
      const items = await this.getItem(key)

      if(!items) return
  
      items.forEach((item, index) => {
        if (index < size * (page - 1)) return
        if (index >= size * page) return

        console.log(item)
        this.emit(item, type)
      })

    } else if(type === 'get') {
      const item = await this.getItem(key)
      this.emit(item, type)

    } else if(type === 'put') {
      if(!event.detail.__id) return console.warn('__id is not present')
      this.putItem(key, event.detail)
      this.emit({...event.detail, type})


    } else if(type === 'delete') {
      if(!event.detail.__id) return console.warn('__id is not present')
      this.deleteItem(key, event.detail.__id)
      this.emit({__id: event.detail.__id}, type)

    } else if(type === 'clear') {
      this.clearStore(key)
      this.emit({}, type)
    }


  }

  emit(data, queryType) {
    console.info(`on ${this.id} emiting ${queryType}`)
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
    return localforage.getItem(dbKey)
  }

  hasItem(key) {
    return !!this.getItem(`${this.#parent.id}_${key}`)
  }

  clearStore(key) {
    return localforage.removeItem(`${this.#parent.id}_${key}`)
  }

  async putItem(key, data) {
    const items = await this.getItem(key)
    const index = items.findIndex(item => item.__id === __id)
    if(index ==- -1) return console.warn(`item with __id=${__id} was not found`)

    items[index] = data
    await this.setItem(key, items)    
  }


  async deleteItem(key, __id) {
    const items = await this.getItem(key)
    const index = items.findIndex(item => item.__id === __id)
    if(index ==- -1) return console.warn(`item with __id=${__id} was not found`)

    items.splice(index, 1)
    await this.setItem(key, items)    
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


