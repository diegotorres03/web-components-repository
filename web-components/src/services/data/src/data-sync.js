import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * This component enable sync to a rest api, or an appsync api
 *
 * @export
 * @class DataSyncComponent
 * @extends {HTMLElement}
 */
export default class DataSyncComponent extends HTMLElement {

  constructor() {
    super()
    const template = html``
     this.attachShadow({ mode: 'open' })
     this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-sync', DataSyncComponent)
