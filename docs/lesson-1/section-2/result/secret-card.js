import { html } from '../../lib/web-tools'

import componentStyle from './secret-card.css'
import componentHtml from './secret-card.html'


export default class SecretCardComponent extends HTMLElement {

    #flipCard
    #modal

    constructor() {
        super()
        const template = html`
            <style>${componentStyle}</style>
            ${componentHtml}
        `
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template)
        this.#flipCard = this.shadowRoot.querySelector('flip-card')
        this.#modal = this.shadowRoot.querySelector('app-modal')

        this.#flipCard.addEventListener('click', () => this.#modal.show())
        this.#modal.addEventListener('accepted', event => {
            console.log(event)
            const { secret } = event.detail
            if (secret === this.getAttribute('password')) this.#flipCard?.flip()
        })
    }
}

window.customElements.define('secret-card', SecretCardComponent)
