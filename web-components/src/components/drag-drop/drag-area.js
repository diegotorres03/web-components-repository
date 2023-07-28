import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DragAreaComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`<section class="drag-area">
      <!-- <div draggable="true">dasdasd</div> -->
      <slot>
      </slot>
    </section>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    const dragstart = event => {
      event.target.setAttribute('data-state', 'dragging')
      // this.setAttribute('data-state', 'dragging')
      console.log('Draggeo', event.target)
    }

    const drag = event => {
      // console.log('Draggeando')
    }

    const dragend = event => {
      // console.log('Desdraggeo')
      // event.target.removeAttribute('data-state')

    }

    Array.from(this.children).forEach(child => {
      child.setAttribute('draggable', 'true')
      child.addEventListener('dragstart', dragstart)
      child.addEventListener('drag', drag)
      child.addEventListener('dragend', dragend)
    })

    // console.log('dragItem', dragItem)
    // console.log('children', this.children)




    // const dragItem = this.querySelector('[draggable="true"]')
    // dragItem.addEventListener('dragstart', dragstart)
    // dragItem.addEventListener('drag', drag)
    // dragItem.addEventListener('dragend', dragend)

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

window.customElements.define('drag-area', DragAreaComponent)
