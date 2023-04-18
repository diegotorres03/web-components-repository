import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


export default class RouteComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'activated'
  }


  static get observedAttributes() {
    return ['guard']
  }

  constructor() {
    super()
    const template = html`
      <slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  async connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, () => this.activate())
    if (!this.getAttribute('src')) return

    const src = this.getAttribute('src')
    // console.log(src)

    const rawHtml = await (await fetch(src)).text()
    // console.log(rawHtml)
    this.appendChild(html`${rawHtml}`)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) {
    // if (name === 'guard') {
    //   const shouldNavigate = guards[newValue]()
    //   console.log(shouldNavigate)
    //   if (!shouldNavigate) window.location.hash = 'login'

    // }
  }

  adoptedCallback() { }

  activate() {
    window.location.hash = this.getAttribute('hash') || ''
  }

  activated() {
    const componetHash = this.getAttribute('hash')
    const currentHash = window.location.hash.replace('#', '')
    if(currentHash !== componetHash) return
    const event = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: {
        route: currentHash
      }
    })
    // console.log(event)
    this.dispatchEvent(event)
  }

}

window.customElements.define('app-route', RouteComponent)
