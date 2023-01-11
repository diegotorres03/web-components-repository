
// class WebWorkerScript extends HTMLScriptElement {
class WebWorkerScript extends HTMLElement {

    constructor() {
        super()
        this.worker
        console.log('initializing worker script tag')
        console.log(this)
    }

    async _render() {
        const url = this.getAttribute('src')
        const inner = html`<section><b>${url}</b>
            <div>
                <script src="./test.js"></script>
                <slot id="slot-item"></slot>
            </div>
        </section>`
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)
    }

    connectedCallback() {
        this._render()
        this.worker = new Worker(this.getAttribute('src'))
        console.log('connectedCallback')
        
        console.log(this.shadowRoot.querySelector('section').children)
        // const slot = this.shadowRoot.querySelector('slot')
        // console.log(slot.children)

        this.addEventListener('slotchange', event => {
            console.log('slotchange')
            const slot = event.target
            console.log(slot)
            const assignedNodes = slot.assignedNodes()
            console.log(assignedNodes) // This will log the nodes assigned to the slot
        })
    }

    onMessage(handler) {
        this.worker.onmessage = handler
    }

    postMessage(message) {
        this.worker.postMessage(message)
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('web-worker-script', WebWorkerScript)
// window.customElements.define('web-worker-script', WebWorkerScript, {extends: 'script'})


// resemble ai