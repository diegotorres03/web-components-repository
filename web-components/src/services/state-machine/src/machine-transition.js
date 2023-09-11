import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


/**
 * 
 * This Element represent a transition between states.
 * Transitions are the way the machine progress.
 * 
 * A transition can use a trigger, when that trigger fires an event,
 * this transition can react by sending an event to the machine
 *
 * @fires event - used for inter machine communicaton 
 * 
 * @export
 * @class MachineTransitionComponent
 * @extends {HTMLElement}
 */
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

    // console.log('emiting event from transition to machine', detail)
    this.dispatchEvent(new CustomEvent('event', {
      bubbles: true, composed: true,
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

        // If I dont emit this individual event, the flow will be stopped,
        // this is not idea for actions
        if (action) {
          event['action'] = action
        }
        
        // but is perfect for filter, filter is to prevent this event from propagating
        // [ ] add filters

        this.emitEvent(event)
      } catch (err) {
        this.emitError(err)
      }
    })
  }


}

window.customElements.define('machine-transition', MachineTransitionComponent)
