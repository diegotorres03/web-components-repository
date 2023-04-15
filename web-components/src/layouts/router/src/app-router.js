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
        <style>
            .hidden {
                display: none;
            }
        </style>
        <slot></slot>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  #evaluateGuard(route) {
    const guardId = this.getAttribute('guard')
    if (!guardId) return true
    const guard = document.querySelector(`#${guardId}`)
    if (!gurad) throw new Error('guard function can`t be found!')
    gurd.run(new CustomEvent('routeGuard', { detail: route.getAttribute('hash') }))
  }

  #updateRoutes() {
    const routes = Array.from(this.querySelectorAll('app-route'))
    // .filter(child => child.getAttribute('path') || child.getAttribute('hash'))
    const routeSet = new Set()
    routes.forEach(route => routeSet.add(route))


    // if we hash is empty, look for the default route, the one without hash
    if (window.location.hash === '') {
      const homeRoute = routes.find(route => !route.hasAttribute('hash'))
      routes.forEach(route => route.classList.add('hidden'))
      homeRoute.classList.remove('hidden')
      homeRoute.activated()
      // alert('home')
      return
    }



    routes.forEach(route => {
      route.classList.remove('hidden')
      route.activated()
    })


    routes
      .filter(route => !window.location.hash.includes(route.getAttribute('hash')))
      .forEach(route => route.classList.add('hidden'))

    routes
      .filter(route => (route.getAttribute('hash') && !window.location.hash.includes(route.getAttribute('hash'))))
      .filter(route => {
        console.log(route, route.hasAttribute('hash'), window.location.hash)
        return !route.hasAttribute('hash') && window.location.hash === ''
      })
      .forEach(route => {
        route.classList.add('hidden')
        routeSet.delete(route)
      })

    console.log('remaining routes', routeSet)

    routeSet.forEach(route => route.activated())
  }

  connectedCallback() {
    registerTriggers(this, (event) => console.log(event))


    this.#updateRoutes()

    window.addEventListener('hashchange', ev => {
      this.#updateRoutes()
      // const searchParms = new URLSearchParams(window.location.search)
      // console.log(searchParms.has('test'))
      this.shadowRoot.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
        bubbles: true, composed: true,
        detail: {
          test: true,
          hash: window.location.hash,
          
        }
      }))
    })

    // function (event) {
    //   // url example 'https://domain.com/#hash?token=value'
    //   const hashPath = window.location.hash
    //   const [hash, token] = window.location.hash.split(/[\/]/g)
    //   const token = hashPath.split('token=').pop()
    //   return token ? { token } : null
    // }
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('app-router', RouterComponent)
