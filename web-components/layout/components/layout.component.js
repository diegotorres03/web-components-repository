
class AppLayout extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
<<<<<<< HEAD:web-components/layout/layout.component.js
        const inner = await html.import('./layout/layout-component.html')
        // const inner = html``
=======
        const inner = await html.import('./components/layout-component.html')
      

>>>>>>> 8054b87ebded1025473e548ae5e735bd29d32d4e:web-components/layout/components/layout.component.js
        const shadow = this.attachShadow({mode: 'open'})
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

window.customElements.define('app-layout', AppLayout)
