(function (module) {

    class DataPointComponent extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            const inner = html`<span></span>`
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            // mapComponentEvents(this, eventNames)

            // get variable names
            // updateVars(this)

        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('data-point', DataPointComponent)

    module.exports = AppSyncMutation


})(module)
