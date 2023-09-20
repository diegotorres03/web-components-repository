import {
  html,
  mapComponentEvents,
  sleep,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import ModalHtml from './app-modal.html'
import ModalCss from './app-modal.css'

/** 
 * @typedef AppModalSlots
 * @property {HTMLSlotElement} title - slot for title
 * @property {HTMLSlotElement} main - slot for main content
 * @memberof ModalComponent
 */


/**
 * Modal Component, create the UI required to have a modal
 * if internally there are data attributes, those will be passed on the
 * `accepted` and `declined` events will include this data attributes
 * in the detail section of the event
 * 
 * Uses the {@link AppModalSlots} slots
 * 
 * 
 * @fires ModalComponent#accepted
 * @fires ModalComponent#declined
 * @author Diego Torres <diegotorres@gmail.com>
 * @author Marco del Boccio <marco@gmail.com>
 * 
 *
 * @class ModalComponent
 * @extends {HTMLElement}
 * 
 * 
 * @example
 * <button id="open-modal-btn">this btn open the modal</button>
 * <app-modal trigger="#open-modal-btn" on="click">
 *  <h1 slot="title">this is the modal title</h1>
 *  <section slot="main">
 *     any html here
 *  </section>
 * </app-modal>
 * 
 * <script>
 *  document.querySelector('app-modal')
 *    .addEventListener('accepted', event => console.log(event.detail))
 * </script>
 */
class ModalComponent extends HTMLElement {

  static get observedAttributes() {
    return ['open']
  }

  get DEFAULT_EVENT_NAME() {
    return 'accepted'
  }


  /**
   * if present modal will open, if not modal will close
   * @type {boolean}
   * @memberof ModalComponent
   */
  open

  /**
   * Creates an instance of ModalComponent.
   * @memberof ModalComponent
   * @constructor
   */
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
    const unregisterTriggers = registerTriggers(this, (event) => this.show(event))
    // setTimeout(unregisterTriggers, 10_000) 

  }


  /**
   * this is the method called when the accept button is clicked on modal
   * @memberof ModalComponent
   */
  accept() {
    // [ ] read form values or data-key and send that as part of the event data
    const inputFields = [...this.querySelectorAll('[name]')]

    // [ ] add hability to use data-key and also get text content
    const datasetFields = [... this.querySelectorAll('[data-key]')]

    // console.log(inputFields)

    const inputData = {}
    inputFields.forEach(field => {
      inputData[field.name] = field.value
    })

    /**
     * 
     * @event ModalComponent#accepted
     * @type {CustomEvent}
     */
    const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: { ...inputData, ...this.dataset }
    })

    // console.log(newEvent)

    this.shadowRoot.dispatchEvent(newEvent)

    this.hide()
  }

  /**
  * this is the method called when the cancel button is clicked on modal
  * @memberof ModalComponent
  */
  cancel() {

    /**
     * 
     * @event ModalComponent#declined
     * @type {CustomEvent}
     */
    this.shadowRoot.dispatchEvent(new CustomEvent('declined', {
      bubbles: true, composed: true,
      detail: { ...this.dataset }
    }))
    this.hide()
  }

  /**
   * To open the modal from JS
   *
   * @memberof ModalComponent
   */
  show(event = {}) {
    // console.log('on modal show', event)
    this.setAttribute('open', '')
    if (!event.detail) return
    Object.keys(event.detail).forEach(key =>
      this.setAttribute(`data-${key}`, event.detail[key]))

  }

  /**
   * To close the modal from JS
   *
   * @memberof ModalComponent
   */
  hide() {
    this.removeAttribute('open')
  }

  /**
   * if modal is opened, it will close it and viceversa
   */
  toggle() {
    this.hasAttribute('open') ? this.hide() : this.show()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, typeof newValue)
    if (!this.shadowRoot) return
    if (name === 'open' && this.shadowRoot.querySelector('#checker')) {
      this.shadowRoot.querySelector('#checker').checked = this.hasAttribute(name)
    }
  }

}

export { ModalComponent }

customElements.define('app-modal', ModalComponent);


