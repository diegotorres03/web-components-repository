import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import { createMachine, interpret } from 'xstate'
import MachineStateComponent from './machine-state'

//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * Web Component that represent a state machine
 * it helps control the flow of the application and ensure
 * only allowed transitions can happen given a state
 * 
 * @fires stateChanged this event is fired on every state transition
 * @fires [string:eventName] the name corresponds to the state name, is triggered when that state is activated 
 *
 * @export
 * @class StateMachineComponent
 * @extends {HTMLElement}
 */
export default class StateMachineComponent extends HTMLElement {

  get DEFAULT_EVENT_NAME() {
    return 'stateChanged'
  }


  #instance

  #context = {}

  /**
   * get all the <machine-state> children 
   *
   * @memberof StateMachineComponent
   * @returns {MachineStateComponent}
   */
  get #childStates() {
    const childStates = [...this.querySelectorAll('machine-state')]
    return childStates || []
  }


  constructor() {
    super()
    const template = html`
      ${this.hasAttribute('visible') ? `<nav></nav>` : ''}
      <button id="open-modal-btn">open</button>
      <app-modal trigger="#open-modal-btn" on="click">
        <h1 slot="title">siii</h1>
      </app-modal>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    const triggers = [...this.shadowRoot.querySelectorAll('[trigger]')]
    console.log('triggers',triggers)

  }



  /**
   * start the xstate intance
   * @param {Object} machineDef 
   */
  #startMachine(machineDef) {
    const machine = createMachine(machineDef)

    this.#instance = interpret(machine)

    this.#instance.start()

  }



  /**
   * Send an event to xstate instance
   *
   * @param {Object} event
   * @param {string} event.type the type of event being fired, this should match with emit attribute on state transitions
   * @param {Object} event.data additional data passed to xstate instance
   * @memberof StateMachineComponent
   */
  async send(event) {

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

  // this is experimental
  // the goal is to keep al the machine-state and machine-transition elements in sync
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

      const state = { id: stateElement.id, on: {} }

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
        console.log(event)
        console.log(event.target)
        // console.log('on state machine event', event)
        const { type } = event.detail
        // [ ] find a way to let all children know og the updated event
        // console.log('sending from child state', type)
        const transition = this.querySelector(`[emit="${type}"]`)
        // console.log(transition)

        this.send({ type, data: { ...event.detail, ...event.target.dataset } })

        if (!transition || !transition.hasAttribute('action')) return
        const action = transition.getAttribute('action')
        console.log('action', action)


        const handler = actions[action]
        if (!handler) return console.warn('no handler was found')
        const res = await handler(JSON.parse(JSON.stringify(this.#context)), event)
        if (!res) return

        if (res.context) {
          Object.keys(res.context).forEach(key => {
            this.#context[key] = { ...res.context }
          })
          console.table(this.#context)
        }

        if (!res.emit) return

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
