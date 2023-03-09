(function (module) {

    class DataSetComponent extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            const inner = html`<div></div>`
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

    window.customElements.define('data-set', DataSetComponent)

    module.exports = DataSetComponent

})(module)
