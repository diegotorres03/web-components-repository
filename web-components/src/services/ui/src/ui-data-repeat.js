import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


/**
 * this class will listen to events and repeat the content inside, 
 * it will add ui-data-sync to make items auto update and it will route the 
 * rigth event to the right ui-data-sync
 *
 * @export
 * @class UIDataRepeatComponent
 * @extends {HTMLElement}
 */
export default class UIDataRepeatComponent extends HTMLElement {

  #template
  #children
  #childrenMap = new Map()
  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {

    
    mapComponentEvents(this)
    updateVars(this)
    this.#mapChildren()
    registerTriggers(this, (event) => {
      console.log(event)
      if (this.#childrenMap.has(event.detail.__id)) {
        return this.#updateItem(event)
      }
      this.#appendItem(event)
    })
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

  }

  /**
   * 
   * @returns {HTMLTemplateElement}
   */
  #cloneTemplate() {
    return this.#template.content.cloneNode(true)
  }

  #updateItem() {
    console.log('updating')
  }

  #appendItem(event) {
    if(!this.id) this.setAttribute('id',``+ Date.now())
    console.log('adding', event)
    const dataSync = document.createElement('ui-data-sync')
    const dataSyncId = `${this.id}_${event.detail.__id}` || Date.now() + ''
    dataSync.setAttribute('id', dataSyncId)
    dataSync.setAttribute('trigger', `#${this.id}`)
    dataSync.setAttribute('event', dataSyncId)

    const copy = this.#cloneTemplate()
    const editBtn = copy.querySelector('button[name="edit"]')
    const deleteBtn = copy.querySelector('button[name="delete"]')

    if (editBtn) {
      Object.keys(event.detail).forEach(key => {
        if (key === '__eventSource') return // || key === '__id'
        editBtn.setAttribute(`data-${key}`, event.detail[key])
      })
      editBtn.addEventListener('click', ev => this.dispatchEvent(
        new CustomEvent(`edit`, { bubbles: false, composed: true, detail: editBtn.dataset })
      ))
    }
    if (deleteBtn) {
      deleteBtn.setAttribute('data-__id', event.detail.__id)
      deleteBtn.addEventListener('click', ev => this.dispatchEvent(
        new CustomEvent(`delete`, { bubbles: false, composed: true, detail: deleteBtn.dataset })
      ))
    }
    dataSync.appendChild(copy)
    this.appendChild(dataSync)
    console.log(dataSync, copy)
    this.#emit(event, dataSyncId)
    console.log(dataSync.innerHTML)
  }

  #emit(event, eventName = 'data') {
    if (!event) return
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: false, composed: true,
      detail: { ...event.detail },
    }))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('ui-data-repeat', UIDataRepeatComponent)
