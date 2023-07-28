import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DropAreaComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'dropped'
  }
  constructor() {
    super()
    const template = html`<section class="drop-item">
        <b>drop here</b>
        <drag-area>
          <!-- <slot></slot> -->
        </drag-area>

    </section>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    const dragArea = this.shadowRoot.querySelector('drag-area')

    const dropItem = this.shadowRoot.querySelector('.drop-item')

    dropItem.addEventListener('dragenter', event => {
      console.log('Drag Enter', event)
      const dragItem = document.querySelector('[data-state="dragging"]')
      console.log('dragItem: ', dragItem)
    })

    dropItem.addEventListener('dragover', event => {
      event.preventDefault()
      console.log('Drag Over')
    })

    dropItem.addEventListener('dragleave', event => {
      console.log('Drag Leave')
    })

    dropItem.addEventListener('drop', event => {
      console.log('Drop')
      console.log(event)
      const dragItem = document.querySelector('[data-state="dragging"]')
      if (!dragItem) return console.log('no drag item')
      dragItem.removeAttribute('data-state')
      console.log('on drop dragItem: ', dragItem)
      if(this.hasAttribute('clone')) {
        console.log('clonning')
        const clone = dragItem.cloneNode(true)
        dragArea.appendChild(clone)
      } else {
        console.log('appending')
        dragArea.appendChild(dragItem)
      }

      const newEvent = new CustomEvent(this.DEFAULT_EVENT_NAME, {
        bubbles: true, composed: true,
        detail: {
          dragItem
        }
      })


      console.log('newEvent', newEvent)

      this.shadowRoot.dispatchEvent(newEvent)


    })

  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('drop-area', DropAreaComponent)
