import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class MachineTransitionComponent extends HTMLElement {

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  emitEvent(event) {
    const eventName = this.getAttribute('emit')

    const detail = {
      ...event.detail,
      ...event.target.dataset,
      type: eventName,
    }

    console.log('emiting event from transition to machine', detail)
    this.dispatchEvent(new CustomEvent('event', {
      bubbles: false, composed: true,
      detail,
    }))

  }


  emitError(error) {
    const eventName = this.getAttribute('event')

    const detail = {
      error,
      type: eventName,
    }

    this.dispatchEvent(new CustomEvent('error', {
      bubbles: false, composed: true,
      detail,
    }))

  }


  connectedCallback() {
    registerTriggers(this, async (event) => {
      const action = this.getAttribute('action')
      try {
        const eventDetail = { ...event.detail, ...event.target.dataset, ...this.dataset }
        console.log('action', action)

        if (action) {
          event['action'] = action
        }


        // If I dont emit this individual event, the flow will be stopped,
        // this is not idea for actions
        // but is perfect for filter, filter is to prevent this event from propagating
        this.emitEvent(event)
        if (!action) return // this.emitEvent(event)
        const handler = actions[action]
        if(!handler) return console.warn('no handler was found')
        const res = await handler({}, eventDetail)
        if(!res) return

        // console.info('res', res)
        const detail = {
          type: res.emit,
          data: { ...res.data }
        }
        // console.log(detail)
        this.dispatchEvent(new CustomEvent('event', {
          bubbles: true, composed: true,
          detail,
        }))
      } catch (err) {
        this.emitError(err)
      }
    })
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('machine-transition', MachineTransitionComponent)
