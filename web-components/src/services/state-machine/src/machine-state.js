import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class MachineStateComponent extends HTMLElement {

  static get observedAttributes() {
    return ['selected']
  }


  #handler
  #context // an attempt to get the context in sync
  #currentEvent // an attempt to keep the current event
  
  eventData



  set context(value) {
    this.#context = value
  }
  set currentEvent(value) {
    this.#currentEvent = value
  }


  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }



  emitEvent(event) {
    const eventName = event.type

    this.dispatchEvent(new CustomEvent('event', {
      bubbles: false, composed: true,
      detail: {
        ...event.data,
        ...this.dataset.dataset,
        type: eventName,
      },
    }))

  }


  connectedCallback() {
    registerTriggers(this, async (event) => {
      if(this.#currentEvent) {
        // console.table(this.#currentEvent)
      }
      const res = await this.#handler(this.#context, this.#currentEvent)
      // console.info('res', res)
      const newEvent = {
        type: res.emit,
        data: { ...res.data }
      }
      this.emitEvent(newEvent)
    })

  }

  disconnectedCallback() { }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected') {
      // console.table(this.#currentEvent)
      const actionName = this.getAttribute('action')
      if (!actionName) return
      this.#handler = actions[actionName]
      const res = await this.#handler(this.#context, this.#currentEvent)
      if (!res) return

      const newEvent = {
        type: res.emit,
        data: { ...res.data }
      }
      this.emitEvent(newEvent)
    }

  }

  adoptedCallback() { }

}

window.customElements.define('machine-state', MachineStateComponent)
