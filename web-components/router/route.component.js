
class AppRoute extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`<slot></slot>`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

        if(!this.getAttribute('src')) return

        const src = this.getAttribute('src')
        console.log(src)

        const rawHtml = await (await fetch(src)).text()
        console.log(rawHtml)
        this.appendChild(html`${rawHtml}`)

    }

    connectedCallback() { 
        this._render()
        
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('app-route', AppRoute)
