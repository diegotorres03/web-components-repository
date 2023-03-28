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

export default class DataStore extends HTMLElement {


  get action() { return this.getAttribute('action') }

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
    registerTriggers(this, (event) => this.processEvent(event))

    this.addEventListener('sync', async event => {
      console.log('request to load events', event)
      const key = event.detail.key
      const items = await this.getItem(key)
      const dataSet = this.querySelector(`#${event.detail.key}`)
      console.log('dataSet', dataSet, dataSet.addDataPoint)

      const getEvent = (item) => new CustomEvent('syncItem', { detail: item })


      console.log(items)
      if (Array.isArray(items)) {
        items.forEach(item => {
          const newEvent = getEvent(item)
          console.log('adding', item, newEvent.type)
          dataSet.addDataPoint(newEvent)
        })
      } else {
        dataSet.addDataPoint(getEvent(items))
      }

    })

    this.addEventListener('updated', event => {
      const key = event.target.id
      console.log('request to save event', event, key)
      console.log(event.detail)
      this.processEvent(event)
    })


    // this.addEventListener('added', event => {
    //   const key = event.target.id
    //   console.log('request to add event', event, key)
    //   console.log(event.detail)
    //   console.trace()
    //   this.processEvent(event)
    // })



  }

  async processEvent(event) {
    console.log(event)
    const isBtn = event.target.tagName.toLowerCase() === 'button'
    let data = isBtn ? { ...event.target.dataset } : event.detail
    const key = event.target.id

    console.log('action', this.action)
    if (this.action === 'append') {
      const item = await this.getItem(key)
      const items = Array.isArray(item) ? item : [item]
      items.unshift(data)
      data = items
    }

    this.setItem(key, data)
      // .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  setItem(key, value) {
    return localforage.setItem(`${this.id}_${key}`, value)
  }

  getItem(key) {
    return localforage.getItem(`${this.id}_${key}`)
  }

  hasItem(key) {
    return !!this.getItem(`${this.id}_${key}`)
  }

  removeItem(key) {
    return localforage.removeItem(`${this.id}_${key}`)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-store', DataStore)
