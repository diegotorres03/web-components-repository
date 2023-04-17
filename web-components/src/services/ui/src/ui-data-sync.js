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
    const children = Array.from(this.children)


    this.#children = children.filter(child => {
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
    const data = event.detail || event.target && event.target.dataset
    console.time('ui-data-sync updateValues')

    if (!Array.isArray(this.#children) || this.#children.length === 0) return

    // const firstItem = this.#children[0]

    // if (firstItem.id === data.__id) {
    //   // [ ] this means item already exist
    //   alert('es el mismo')
    // }

    console.log(data, this.#children)
    const keys = Object.keys(data)


    this.#children.forEach(firstItem => {
      // console.log('firstItem', firstItem)

      // firstItem.querySelector
      keys
        .filter(key => key !== '__eventSource')
        .forEach(key => {
          if (key === '__id') {
            // this.dataset.dataPointId = data[key]
            firstItem.id = `target_${data[key]}`
            this.setAttribute('data-point-id', data[key])
          }

          const fields = [
            ...firstItem.querySelectorAll(`[data-key="${key}"]`),
            ...firstItem.querySelectorAll(`[name="${key}"]`),
          ]
          console.log(key, '=>', fields)

          fields.forEach(field => {
            if(!field.dataset.attribute || field.dataset.attribute.toLowerCase() === 'textcontent') {
              field.textContent = data[key]
              // field[attr] = data[key]
            }
            const attr = field.dataset.attribute
            console.log('attr', attr)
            field.setAttribute(attr, data[key])
          })

        })
    })

    console.timeEnd('ui-data-sync updateValues')
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
