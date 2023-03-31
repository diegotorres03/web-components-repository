import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class UIDataSyncComponent extends HTMLElement {

  #template
  #children
  #childrenMap

  constructor() {
    super()
    const template = html`<slot></slot>`
    // const template = html`<template><slot></slot></template>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    this.#mapChildren()
    registerTriggers(this, (event) => this.updateValues(event))
  }


  #mapChildren() {
    this.#template
    this.#childrenMap = new Map()
    this.#children = Array.from(this.children)

    this.#children.filter(child => {
      console.log(child.tagName)
      if (child.tagName.toLowerCase() === 'template') {
        this.#template = child
        return false
      }
      this.#childrenMap.set(child.id, child)
      return true
    })

    // console.log(this.#children)
  }

  updateValues(event) {
    // console.log(event)
    const data = event.detail
    // console.log(data)

    // console.log('this.dataset', this.dataset)
    const lastItem = this.#children[0]

    // lastItem.querySelector
    const keys = Object.keys(data)
    keys
      .filter(key => key !== '__eventSource')
      .forEach(key => {
        if (key === '__id') {
          // this.dataset.dataPointId = data[key]
          this.setAttribute('data-point-id', data[key])
        }

        const fields = [
          ...lastItem.querySelectorAll(`[data-key="${key}"]`),
          ...lastItem.querySelectorAll(`[name="${key}"]`),
        ]
        // console.log(key, '=>', fields)
        fields.forEach(field => {
          const attr = field.dataset.attribute || 'textContent'
          // console.log(attr, field[attr], data[key])
          field[attr] = data[key]
        })

      })

    this.dispatchEvent(new CustomEvent('data', {
      bubbles: false, composed: true,
      detail: {},
    }))

  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('ui-data-sync', UIDataSyncComponent)
