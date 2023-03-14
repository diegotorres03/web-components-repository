
class PlainCard extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`
        <style>

.plain-card{
    padding: 8px;
    border-radius: 4px;

    background-color: ghostwhite;
    /* box-shadow: 0 4px 16px 4px #0000002d; */
}

        </style>
        <div class="plain-card">

            <slot></slot>
        
        </div>
        `
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('plain-card', PlainCard)
