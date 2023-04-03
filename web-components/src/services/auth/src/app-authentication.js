import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class AppAuthenticationComponent extends HTMLElement {

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    registerTriggers(this, (event) => console.log(event))

    window.addEventListener('load', event => {
      // alert('here')
      console.info(`${this.id} emiting load`, event)
      this.dispatchEvent(new CustomEvent('loaded', {
        bubbles: false, composed: true,
        detail: { ...event.detail, ...this.dataset },
      }))

    })
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('app-authenication', AppAuthenticationComponent)
