import { html, registerTriggers } from '../../global/web-tools'

export default class GridLayoutComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`
      <style>
        #grid-container {
          /* min-height: 300px; */
          display: grid;
          /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
          grid-template-columns: repeat(${this.getAttribute('columns')}, 1fr);
          grid-template-rows: repeat(${this.getAttribute('rows')}, 1fr);
          /* grid-auto-rows: 200px; */
          grid-gap: ${ this.getAttribute('gap') || '20px'};
        }
        /* ::slotted(*) {
          color: red !important;
        } */
      </style>
      <div id="grid-container">
        <slot></slot>
      </div>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  connectedCallback() {
    registerTriggers(this, (event) => console.log(event))
  }

}

window.customElements.define('grid-layout', GridLayoutComponent)
