(function (module) {


    const { Auth } = require('aws-amplify') || window.modules['aws-amplify']


    console.log(Auth)

    class AppLogin extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            const inner = html`<b>Hello There!</b>`
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

    window.customElements.define('app-login', AppLogin)

    module.exports = AppLogin

})(module)
