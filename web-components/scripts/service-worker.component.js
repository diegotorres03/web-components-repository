
class ServiceWorkerScript extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`<b>Hello There!</b>`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }

    connectedCallback() { 
        this._render()
        const workerUrl = this.getAttribute('src')
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(workerUrl).then(function(registration) {
              console.log('Service Worker registered:', registration);
            }).catch(function(error) {
              console.log('Service Worker registration failed:', error);
            });
          }
          
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('service-worker-script', ServiceWorkerScript)
