import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import componentHtml from './deck-reader.html'
import componentStyle from './deck-reader.css'

export default class DeckReaderComponent extends HTMLElement {
  #carousel
  #prevButton
  #nextButton

  constructor() {
    super()
    const template = html`
      <style>
        ${componentStyle}
      </style>
      ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.#carousel = this.shadowRoot.querySelector('.card-scroll')
    this.#prevButton = this.shadowRoot.querySelector('.arrow-left')
    this.#nextButton = this.shadowRoot.querySelector('.arrow-right')

    this.#nextButton.addEventListener('click', (event) => this.next())
    this.#prevButton.addEventListener('click', (event) => this.prev())
  }

  prev() {
    this.#carousel.scrollLeft -= this.#carousel.offsetWidth
  }

  next() {
    this.#carousel.scrollLeft += this.#carousel.offsetWidth
  }

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  adoptedCallback() {}
}

window.customElements.define('deck-reader', DeckReaderComponent)
