import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


export default class RouterComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'navigated'
  }

  constructor() {
    super()
    // [ ] fix .hidden
    const template = html`
    <!-- this is not working here -->
        <!-- <style>
            .hidden {
                display: none;
            }
        </style> -->
        <slot></slot>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  _updateRoutes() {
    const routes = Array.from(this.querySelectorAll('app-route'))
    // .filter(child => child.getAttribute('path') || child.getAttribute('hash'))

    const routeSet = new Set()
    routes.forEach(route => routeSet.add(route))

    console.log(routes)

    routes.forEach(route => route.classList.remove('hidden'))
    routes.forEach(route => console.log(route.getAttribute('path')))

    routes
      .filter(route => route.getAttribute('path'))
      .filter(route => !window.location.href.includes(route.getAttribute('path')))
      .forEach(route => route.classList.add('hidden'))
    // console.log(routes)

    routes
      .filter(route => route.getAttribute('path'))
      .filter(route => !window.location.hash.includes(route.getAttribute('hash')))
      .forEach(route => route.classList.add('hidden'))

    routes
      .filter(route => route.getAttribute('hash') && !window.location.hash.includes(route.getAttribute('hash')))
      .forEach(route => {
        route.classList.add('hidden')
        routeSet.delete(route)
      })

    console.log('remaining routes', routeSet)

    routeSet.forEach(route => route.activated())
  }

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))


    this._updateRoutes()

    window.addEventListener('hashchange', ev => {
      console.log('=>', window.location.hash)
      this._updateRoutes()
      this.shadowRoot.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
        bubbles: true, composed: true,
        detail: {
          test: true,
          hash: window.location.hash
        }
      }))
    })
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('app-router', RouterComponent)
