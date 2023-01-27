
class AppRouter extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = await html.import(baseUrl + 'router/router.component.html')

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)


    }

    _updateRoutes() {
        const routes = Array.from(this.querySelectorAll('app-route'))
        // .filter(child => child.getAttribute('path') || child.getAttribute('hash'))

        console.log(routes)

        routes.forEach(route => route.classList.remove('hidden'))
        routes.forEach(route => console.log(route.getAttribute('path')))

        routes
            .filter(route => route.getAttribute('path'))
            .filter(route => !window.location.href.includes(route.getAttribute('path')))
            .forEach(route => route.classList.add('hidden'))
        // console.log(routes)

        routes
            .filter(route => route.getAttribute('path'))
            .filter(route => !window.location.hash.includes(route.getAttribute('hash')))
            .forEach(route => route.classList.add('hidden'))

        routes
            .filter(route => route.getAttribute('hash') && !window.location.hash.includes(route.getAttribute('hash')))
            .forEach(route => {
                route.classList.add('hidden')
            })
    }

    connectedCallback() {
        this._render()
            .then(() => this._updateRoutes())

        window.addEventListener('hashchange', ev => {
            console.log('=>', window.location.hash)
            this._updateRoutes()
            this.shadowRoot.dispatchEvent(new CustomEvent('onhash', {
                bubbles: true, composed: true,
                detail: {
                    test: true,
                    hash: window.location.hash
                }
            }))
        })
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('app-router', AppRouter)
