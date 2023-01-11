
class AppAccordion extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        console.log(window.location.href)
        const inner = await html.import('./accordion/accordion.component.html')
        const shadow = this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

        const items = Array.from(this.querySelectorAll('.accordion-tab'))

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
    <input id="tab-${index}" type="radio" name="tabs" ${index === 0 && 'checked="true"'} >
    <label for="tab-${index}">${title}</label>
    <div class="tab-content">
    </div>
</div>`
            itemTemplate.querySelector('.tab-content').append(item)

            this.shadowRoot.querySelector('#content').append(itemTemplate)
        })



    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('app-accordion', AppAccordion)
