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
    // [ ] read form values or data-key and send that as part of the event data
    const inputFields = [...this.querySelectorAll('[name]')]

    // [ ] add hability to use data-key and also get text content
    const datasetFields = [... this.querySelectorAll('[data-key]')]

    const inputData = {}
    inputFields.forEach(field => {
      inputData[field.name] = field.value
    })

    this.shadowRoot.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: { ...inputData, ...this.dataset }
    }))

    this.hide()
  }

  cancel() {
    this.shadowRoot.dispatchEvent(new CustomEvent('declined', {
      bubbles: true, composed: true,
      detail: { ...this.dataset }
    }))
    this.hide()
  }

  show() {
    this.setAttribute('open', '')
  }

  hide() {
    this.removeAttribute('open')
  }

  toggle() {
    this.hasAttribute('open') ? this.hide() : this.show()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, typeof newValue)
    if (!this.shadowRoot) return
    if (name === 'open' && this.shadowRoot.querySelector('#checker')) {
      this.shadowRoot.querySelector('#checker').checked = this.hasAttribute(name)
    }
  }

}

customElements.define('app-modal', ModalComponent);

