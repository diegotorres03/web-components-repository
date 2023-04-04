import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import localforage from 'localforage'




//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class AppAuthenticationComponent extends HTMLElement {

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  // http://localhost:8080/#?token=eyJhbGlhcyI6ImRpZWdvdHJzIiwicm9vbSI6InJvb20gMSIsImV2ZW50IjoiZXZlbnQgMSJ9
  // eyJhbGlhcyI6ImRpZWdvdHJzIiwicm9vbSI6InJvb20gMSIsImV2ZW50IjoiZXZlbnQgMSJ9
  connectedCallback() {
    registerTriggers(this, (event) => console.log(event))

    window.addEventListener('load', async event => {
      console.log('on getTokenFromUrl', event)

      // [x] look for token in URL
      const urlSession = this.#getTokenFromURL()
      if (urlSession) {
        // alert(`urlSession: ${JSON.stringify(urlSession, null, 2)}`)
        await localforage.setItem('session', urlSession)
        return this.#emit(urlSession, 'loggedin')
      }

      // [x] look for token Session Storage
      const localSession = await localforage.getItem('session')
      console.log('localSession', localSession)
      // alert(JSON.stringify(localSession, undefined, 2))
      if (localSession) this.#emit(localSession, 'loggedin')


    })
  }


  #getTokenFromURL() {
    const [hash, query] = window.location.hash.split('?')
    console.log(window.location.hash, hash, query)
    if (!query) return null
    const search = new URLSearchParams(query)
    if (!search.has('token')) return null
    const token = search.get('token')
    const jsonSession = JSON.parse(atob(token))
    // const jsonSession = Buffer.from(str, 'base64').toJSON()
    // Buffer.from(str, 'base64')//.toString('base64').
    console.log(token, jsonSession)

    // await localforage.setItem('session', jsonSession)

    // alert(JSON.stringify(jsonSession, undefined, 2))
    return Object.freeze(jsonSession)
  }

  async #getTokenFromLocalStorage() {
    const session = await localforage.setItem('session', jsonSession)
    console.log(session)
    return session
  }

  #emit(data, eventName) {
    if (!data) return
    console.log(Object.keys(data), data)
    if (Object.keys(data).length === 0) return
    const newEvent = new CustomEvent(eventName, {
      bubbles: true, composed: true,
      detail: { ...data }
    })

    console.log(newEvent)
    this.dispatchEvent(newEvent)
  }

  async logout() {
    await localforage.removeItem('session')
    // alert('deleting session')
    this.#emit(null, 'loggingout')
    window.location.reload()
  }

  async getSessionData() {
    return localforage.getItem('session')
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('app-authenication', AppAuthenticationComponent)
