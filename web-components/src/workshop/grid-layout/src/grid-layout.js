import { html, registerTriggers } from '../../../global/web-tools'

export default class GridLayoutComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`
      <style>
        #grid-container {
          display: grid;
          grid-template-columns: repeat(${this.getAttribute('columns')}, 1fr);
          grid-template-rows: repeat(${this.getAttribute('rows')}, 1fr);
          grid-gap: ${ this.getAttribute('gap') || '20px'};
        }
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
