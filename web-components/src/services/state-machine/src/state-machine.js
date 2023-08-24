import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import { createMachine, interpret } from 'xstate'

//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class StateMachineComponent extends HTMLElement {

  get DEFAULT_EVENT_NAME() {
    return 'stateChanged'
  }


  #instance

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)


  }



  #startMachine(machineDef) {
    const old = {
      id: 'toggle',
      context: {
        test: true,
      },
      initial: 'inactive',
      states: {
        inactive: {
          on: {
            TOGGLE: {
              target: 'active'
            }
          }
        },
        active: {
          on: {
            TOGGLE: {
              target: 'inactive'
            }
          }
        }
      }
    }

    const currentMachineDef = {
      id: 'reengage',
      context: {context: true},
      initial: 'start',
      states: {
        start: {
          on: {
            load: { 
              target: 'checkSession',
              // actions: 'log'
            },
          },
        },
        checkSession: {
          // entry: 'checkSessionToken',
          on: {
            sessionActive: {
              target: 'idle',
              // actions: 'log'
            },
            noSession: {
              target: 'loginForm',
            },
          }
        },
        loginForm: {
          on: {
            submit: {
              target: 'idle'
            },
          }
        },
        idle: {
          type: 'final'
        },
        // promptLogin: {},
        // loggingin: {},
        // loadingUserProfile: {},
        // loadingDashboard: {},
        // loadTracker: {},
        // end: {},
      }
    }
    const machine = createMachine(machineDef, {
      actions: {
        // checkSessionToken: (ctx, event) => {
        //   setTimeout(() => {
        //     alert('YEEEAAA')
        //     this.#instance.send({type: 'sessionActive'})
        //   }, 2_000)
        // },
        // log: (ctx, otro) => {
        //   console.log('log', ctx, otro)
        // }
      }
    })

    this.#instance = interpret(machine)
    // this.#instance.subscribe(state => console.log(state.value))

    this.#instance.start()

  }


  send(event) {
    this.#instance.send(event)
  }

  /**
   *
   *
   * @param {Object} inputData
   * @param {String} inputData.state
   * @param {Object} inputData.context
   * @param {Object} inputData.data
   * @memberof StateMachineComponent
   */
  #emitStateChange(inputData) {
    // const eventName = this.DEFAULT_EVENT_NAME
    const eventName = inputData.state
    const newEvent = new CustomEvent(eventName, {
      bubbles: true, composed: true,
      detail: { ...inputData, ...this.dataset }
    })

    // console.log(newEvent)

    this.shadowRoot.dispatchEvent(newEvent)
  }


  connectedCallback() {
    // mapComponentEvents(this)
    // updateVars(this)

    const machineDef = {
      id: this.id,
      initial: this.getAttribute('initial-state'),
      context: {},
      states: {}
    }

    const states = [...this.querySelectorAll('machine-state')]
    states.forEach(stateElement => {
      const transitionElements = [
        ...stateElement.querySelectorAll('machine-transition')
      ]

      const state = {
        id: stateElement.id,
        on: {
          // [stateElement.getAttribute('on')]: {
          //   target: stateElement.getAttribute('target')
          // }
        }
      }

      const type = stateElement.getAttribute('type')
      if (type) state['type'] = type
      

      console.log('transitionElements', transitionElements)
      transitionElements.forEach(element => {
        const transition = {
          target: element.getAttribute('target')
        }

        state.on[element.getAttribute('on')] = transition

      })

      machineDef.states[stateElement.id] = state
    })

    console.log(JSON.stringify(machineDef, undefined, 2))

    this.#startMachine(machineDef)
    this.#instance.subscribe(state => {
      this.setAttribute('data-state', state.value)
      console.log(state.value)
      // console.log(state)
      // console.log(state.context)
      const eventData = {
        state: state.value,
        context: state.context,
        data: { test: true }
      }
      this.#emitStateChange(eventData)
    })

    registerTriggers(this, (event) => {
      console.log(event)
      console.log('ready to send to machine')
      const eventName = event.detail.machineEventName

      // copy data from event detail and element dataset and merge then under one event
      const machineEvent = { type: eventName, data: { ...event.detail, ...event.target.dataset } }
      console.log(eventName, machineEvent)
      this.#instance.send(machineEvent)
      // this.#instance.send({ type: 'TOGGLE' })
      // console.log(event)
    })
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('state-machine', StateMachineComponent)
