import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DraggableItemComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`<section>
      <h1 class="draggable">drag me anywhere</h1>
      <slot></slot>
    </section>
    <style>
      :host {
        /* display: block; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: lightblue;
        padding: 10px;
        cursor: move;
        z-index:1000;
      }
    </style>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)


    var draggableDiv = this.shadowRoot.querySelector('.draggable');
    console.log(draggableDiv)
    var isDragging = false;
    var dragOffset = { x: 0, y: 0 };

    // draggableDiv.addEventListener('mousedown', (event) => {
    //   console.log(event)
    //   console.log(event.clientX, draggableDiv.offsetLeft, event.clientX - draggableDiv.offsetLeft)
    //   isDragging = true;
    //   dragOffset.x = event.clientX - draggableDiv.offsetLeft;
    //   dragOffset.y = event.clientY - draggableDiv.offsetTop;
    //   console.table({
    //     offsetX: dragOffset.x,
    //     offsetY: dragOffset.y,
    //   })
    // });

    // window.document.addEventListener('mousemove', (event) => {
      
    //   if (isDragging) {
    //     console.log(event)
    //     console.table({
    //       x1: event.clientX,
    //       x2: dragOffset.x,
    //       y1: event.clientY,
    //       y2: dragOffset.y,
    //     })
    //     const container = this.shadowRoot.querySelector('section')
    //     this.style.left = (event.clientX - dragOffset.x) + 'px';
    //     this.style.top = (event.clientY - dragOffset.y) + 'px';
    //     console.log(container, container.style.top, container.style.left)
    //   }
    // });

    document.addEventListener('mouseup', (event) => {
      console.log(event)
      isDragging = false;
    });

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

window.customElements.define('draggable-item', DraggableItemComponent)
