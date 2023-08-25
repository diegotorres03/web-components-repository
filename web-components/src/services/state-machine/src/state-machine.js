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


  get #childStates() {
    const childStates = [...this.querySelectorAll('machine-state')]
    return childStates || []
  }


  constructor() {
    super()
    const template = html`
      ${this.hasAttribute('visible') ? `<nav></nav>` : ''}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)


  }



  #startMachine(machineDef) {
    const machine = createMachine(machineDef)

    this.#instance = interpret(machine)

    this.#instance.start()

  }


  async send(event) {
    // console.log('event', event)
    // console.log('sending', event.type)
    // console.log('action', event.action)
    // console.log('#instance', this.#instance.state)

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
    const targetedStateEvent = new CustomEvent(eventName, {
      bubbles: true, composed: true,
      detail: { ...inputData, ...this.dataset }
    })
    const stateChangeEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: { ...inputData, ...this.dataset }
    })


    this.shadowRoot.dispatchEvent(targetedStateEvent)
    this.shadowRoot.dispatchEvent(stateChangeEvent)
  }

  #updateCurrentContext(state, context) {
    Array.from(this.querySelectorAll('machine-state')).forEach(stateItem => stateItem.removeAttribute('selected'))
    const currentState = this.querySelector(`#${state}`)
    currentState.setAttribute('selected', '')
    currentState.eventData = { test: true, ombe: 'carajo' }
    this.#childStates.forEach(child => {
      child.context = context
    })
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

    // const states = [...this.querySelectorAll('machine-state')]
    this.#childStates.forEach(stateElement => {
      const transitionElements = [
        ...stateElement.querySelectorAll('machine-transition')
      ]

      const state = {
        id: stateElement.id,
        on: {
          // [stateElement.getAttribute('emit')]: {
          //   target: stateElement.getAttribute('target')
          // }
        }
      }

      const type = stateElement.getAttribute('type')
      if (type) state['type'] = type


      transitionElements.forEach(element => {
        const transition = {
          target: element.getAttribute('target')
        }

        state.on[element.getAttribute('emit')] = transition

      })

      machineDef.states[stateElement.id] = state
    })

    console.log(JSON.stringify(machineDef, undefined, 2))

    this.#startMachine(machineDef)
    this.#instance.subscribe(state => {

      this.#updateCurrentContext(state.value, state.context)
      this.setAttribute('data-state', state.value)
      const nav = this.shadowRoot.querySelector('nav')
      if (nav) {

        nav.innerHTML = ''
        // state.nextEvents.forEach(next => {
        //   // const btn = `<button data-machine-event-name="${next}" >${next}</button>`
        //   const btn = document.createElement('button')
        //   btn.setAttribute('data-machine-event-name', next)
        //   btn.textContent = next

        //   nav.appendChild(btn)
        // })
        const navContent = html`
          <b>${state.value}</b>
          ${state.nextEvents.map(next => `<button data-machine-event-name="${next}" >${next}</button>`)}
        `
        nav.appendChild(navContent)
      }
      const eventData = {
        state: state.value,
        context: state.context,
        data: { test: true },
        nextEvents: state.nextEvents,
      }
      this.#emitStateChange(eventData)
    })

    registerTriggers(this, (event) => {
      const eventName = event.detail.machineEventName

      // copy data from event detail and element dataset and merge then under one event
      const machineEvent = { type: eventName, data: { ...event.detail, ...event.target.dataset } }
      // console.log('sending from trigger')
      this.send(machineEvent)
    })


    // const childrenStates = [...this.querySelectorAll('machine-state')]

    this.#childStates.forEach(child => {
      child.addEventListener('event', async event => {
        // console.log('on state machine event', event)
        const { type } = event.detail
        // [ ] find a way to let all children know og the updated event
        // console.log('sending from child state', type)
        const transition = this.querySelector(`[emit="${type}"]`)
        // console.log(transition)

        this.send({ type, data: { ...event.detail, ...event.target.dataset } })

        if (!transition || !transition.hasAttribute('action')) return
        const action = transition.getAttribute('action')

        const handler = actions[action]
        if (!handler) return console.warn('no handler was found')
        const res = await handler({}, event)
        if(!res) return
        // console.info('res', res)
        const detail = {
          type: res.emit,
          data: { ...res.data }
        }

        this.send(detail)
      })
    })

    const childrenTransition = [...this.querySelectorAll('machine-transition')]

    childrenTransition.forEach(child => {
      child.addEventListener('event', event => {
        const { type } = event.detail
        const machineEvent = { type, data: { ...event.detail, ...event.target.dataset } }
        this.send(machineEvent)
        this.#updateStateEvent(machineEvent)
      })
    })
  }

  #updateStateEvent(machineEvent) {
    this.#childStates.forEach(state => {
      state.currentEvent = machineEvent
    })
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('state-machine', StateMachineComponent)
