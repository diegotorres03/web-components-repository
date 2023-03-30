import {
  html,
  mapComponentEvents,
  sleep,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import ModalHtml from './app-modal.html'
import ModalCss from './app-modal.css'


export default class ModalComponent extends HTMLElement {

  static get observedAttributes() {
    return ['open']
  }
  
  get DEFAULT_EVENT_NAME() {
    return 'accepted'
  } 

  constructor() {
    super()

    const template = html`
            <style>${ModalCss}</style>
            ${ModalHtml}
        `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

  }


  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, () => this.show())
  }

  accept() {
    this.shadowRoot.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: {...this.dataset}
    }))
    this.close()
  }

  cancel() {
    this.shadowRoot.dispatchEvent(new CustomEvent('declined', {
      bubbles: true, composed: true,
      detail: {...this.dataset}
    }))
    this.close()
  }

  show() {
    this.setAttribute('open', true)
  }

  close() {
    this.setAttribute('open', false)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, typeof newValue)
    if (!this.shadowRoot) return
    if (name === 'open' && this.shadowRoot.querySelector('#checker')) {
      this.shadowRoot.querySelector('#checker').checked = newValue === 'true'
    }
  }

}

customElements.define('app-modal', ModalComponent);

