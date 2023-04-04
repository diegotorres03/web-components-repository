import {
    html,
    mapComponentEvents,
    updateVars,
    registerTriggers,
} from '../../../global/web-tools'

import style from './app-accordion.css'

export default class AccordionComponent extends HTMLElement {

    constructor() {
        super()

        const template = html`
            <style>${style}</style>
            <div id="content" class="tab-group"></div>
            <slot></slot>
        `
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template)
    }


    connectedCallback() {
        updateVars(this)
        registerTriggers(this, (ev) => console.log(ev))


        const items = Array.from(this.querySelectorAll('section'))


            items.forEach((item, index) => {
                const titleElement = item.querySelector('h1') ||
                    item.querySelector('h2') ||
                    item.querySelector('h3') ||
                    item.querySelector('h4') ||
                    item.querySelector('h5') ||
                    item.querySelector('h6') ||
                    item.querySelector('h7')

                const title = titleElement.textContent
                const itemTemplate = html`<div class="tab">
                    <input class="input" id="tab-${index + 1}" type="radio" name="tabs" ${index === 0 && 'checked ="true"'}>
                    <label class="label" for="tab-${index + 1}">${title}</label>
                    <div class="tab-content">
                    </div>
                </div>`
                itemTemplate.querySelector('.tab-content').append(item)

                this.shadowRoot.querySelector('#content').append(itemTemplate)
            })

    }


}

customElements.define('app-accordion', AccordionComponent)