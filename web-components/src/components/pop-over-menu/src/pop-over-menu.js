import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


import componentHtml from './pop-over-menu.html'
import componentStyle from './pop-over-menu.css'

export default class PopOverMenuComponent extends HTMLElement {

  static get observedAttributes() {
    return ['for']
  }
  
  /**
   *
   *
   * @return {boolean} 
   * @memberof PopOverMenuComponent
   */
  
  get #isOpened() {
    return this.shadowRoot.querySelector('.popover').classList.contains('open')
  }
  
  /**
   *
   *
   * @param {boolean} value
   * @memberof PopOverMenuComponent
   */
  set #isOpened(value) {
    if(value) this.shadowRoot.querySelector('.popover').classList.add('open')
    else this.shadowRoot.querySelector('.popover').classList.remove('open')
  }

  constructor() {
    super()
    const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  toggle() {
    if(this.#isOpened) {
      this.shadowRoot.querySelector('.popover').classList.remove('open')
      return 
    }
    this.shadowRoot.querySelector('.popover').classList.add('open')

  }

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => {
      const eventName = this.getAttribute('on')
      if(eventName === 'mouseover') {
        this.#isOpened = true
        // this is the same button indicated in the for attribute
        event.target.addEventListener('mouseout', () => this.#isOpened = false)
      }
  
      if(eventName === 'click') {
        this.toggle()
      }
    })
  }
  

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'for') {
      const selector = `#${newValue}`
      const sourceElement = document.querySelector(selector)
      this.setAttribute('trigger', selector)

      // esto debe imprimr el boton pal cual se va a usar este popover
      console.log('sourceElement', sourceElement)
    }
  }

  adoptedCallback() { }

}

window.customElements.define('pop-over-menu', PopOverMenuComponent)
