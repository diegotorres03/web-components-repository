import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

// import { setItem, getItem, removeItem } from 'localforage'
import { Dexie } from 'dexie'

import localforage from 'localforage'
import DataSetComponent from './data-set'
import DataQueryComponent from './data-query'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * This component help to interact with IndexedDB, 
 * allowing you to persis information on the browser
 * 
 * @example
 * <data-store id="usersDatabase" version="1">
 *   <data-set id="userProfile" visible trigger="#new-item-btn" on="click">
 *     <data-index key="id" autoincrement unique></data-index>
 *     <data-index key="name"></data-index>
 *     <data-index key="age"></data-index>
 *   </data-set>
 * 
 *   <data-set id="userPreferences">
 *     <data-index key="userId"></data-index>
 *   </data-set>
 * </data-store>
 * 
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


  #dataSets

  /** @property {Dexie} db - db instance reference */
  db

  get dataSets() {
    const datasets = [...this.querySelectorAll('data-set')]
    return datasets
  }


  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
    // console.log(`${this.id}_key`)
    // setItem('test', { test: true, success: true })
  }


  #dbInit() {
    const version = Number(this.getAttribute('version'))
    const dbName = this.id || 'default'
    console.log('dbName', dbName)
    const db = new Dexie(dbName)
    const stores = {}
    Array.from(this.querySelectorAll('data-set')).forEach(dataset => {
      const indexes = [...dataset.querySelectorAll('data-index')]
      const indexDefinitions = indexes.map(index =>
        `${index.hasAttribute('autoincrement') ? '++' : ''}${index.getAttribute('key')}`)
      console.log('indexDefinitions', indexes, indexDefinitions)
      stores[dataset.id] = indexDefinitions.length > 0 ?
        indexDefinitions.join(', ') :
        '++id'
    })

    console.log('stores', stores, version)
    console.table(stores)
    const versionDeployment = db.version(version).stores(stores)
    console.log('versionDeployment', versionDeployment)
    this.db = db

    db.tables.forEach(table => {
      console.log('table', table)
    })




  }

  connectedCallback() {
    // mapComponentEvents(this)
    // updateVars(this)
    registerTriggers(this, (event) => this.#processEvent(event))

    const version = Number(this.getAttribute('version'))
    this.#dbInit()

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

    this.#dataSets = Array.from(this.querySelectorAll('data-set'))
    console.log('this.#dataSets', this.#dataSets)


    this.#dataSets.forEach(dataSet => {
      console.log('data-set id=', dataSet.id)
      dataSet.addEventListener(DataQueryComponent.EVENT_TYPES.put, event => this.#processCrudEvent(event, DataQueryComponent.EVENT_TYPES.put))
      dataSet.addEventListener(DataQueryComponent.EVENT_TYPES.list, event => this.#processCrudEvent(event, DataQueryComponent.EVENT_TYPES.list))
      dataSet.addEventListener(DataQueryComponent.EVENT_TYPES.get, event => this.#processCrudEvent(event, DataQueryComponent.EVENT_TYPES.get))
      dataSet.addEventListener(DataQueryComponent.EVENT_TYPES.delete, event => this.#processCrudEvent(event, DataQueryComponent.EVENT_TYPES.delete))
      dataSet.addEventListener(DataQueryComponent.EVENT_TYPES.clear, event => this.#processCrudEvent(event, DataQueryComponent.EVENT_TYPES.clear))
    })

    this.addEventListener('updated', event => this.#processEvent(event))

  }

  async #processEvent(event) {
    console.log(event)
    const isBtn = event.target.tagName.toLowerCase() === 'button'
    let data = isBtn ? { ...event.target.dataset } : event.detail
    const tableName = event.target.id


    const userData = {
      id: data.id,
      name: data.name,
      age: data.age,
    }

    console.table(userData)
    const table = this.db.table(tableName)

    if (this.hasAttribute('append') || event.target.hasAttribute('append')) {
      const res = await table.where('id').between(1, 10).toArray()
      console.log(res)
      userData.id = res.length + 1
      return table.add(userData)
    }

    if(!userData.id) userData.id = userData.name
    return table.put(userData,userData.id)

  }

  async #processCrudEvent(event) {
    console.table(event)

  }

  /**
   * Save an object on IndexedDB under a given key (this key will be prefixed with the store name)
   * @param {string} key data store key to be used
   * @param {*} value value to be stored on this data store key
   * @returns {*} 
   */
  setItem(key, value) {
    // return localforage.setItem(`${this.id}_${key}`, value)
    // if(!this.db) return console.warn('db not initialized')
    // this.db.table(tableName).add({
    //   id: 'diego',
    //   name: 'Diego Torres',
    //   age: 30,
    // })

  }


  /**
   * Get an item from IndexedDB by a given key (this key will be prefixed with the store name)
   * @param {string} key 
   * @returns {*}
   */
  getItem(key) {
    // return localforage.getItem(`${this.id}_${key}`)
  }

  hasItem(key) {
    // return !!this.getItem(`${this.id}_${key}`)
  }

  /**
   * remove an item from IndexedDB by a given key (this key will be prefixed with the store name)
   * @param {string} key 
   * @returns {*}
   */
  removeItem(key) {
    // return localforage.removeItem(`${this.id}_${key}`)
  }

  disconnectedCallback() {
    // [ ] disconnect indexedDB
    if (!this.db) return
    this.db.close()
  }

}

window.customElements.define('data-store', DataStore)
