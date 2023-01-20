
class AppModal extends HTMLElement {

    static get observedAttributes() {
        return ['open']
    }

    constructor() {
        super()
    }

    async _render() {
        const inner = await html.import('./modal/components/modal.component.html')
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

        if (this.getAttribute('open')) this.open()

    }

    accept() {
        this.shadowRoot.dispatchEvent(new CustomEvent('accept', {
            bubbles: true, composed: true,
            detail: {
                success: true
            }
        }))
        this.close()
    }


    cancel() {
        this.shadowRoot.dispatchEvent(new CustomEvent('cancel', {
            bubbles: true, composed: true,
            detail: {
                success: true
            }
        }))
        this.close()
    }

    open() {
        this.setAttribute('open', true)
    }

    close() {
        this.setAttribute('open', false)
    }

    connectedCallback() {
        this._render()

        this.addEventListener('slotchange', event => {
            const slot = event.target;
            console.log('slotchange')
            const assignedNodes = slot.assignedNodes();
            console.log(assignedNodes); // This will log the nodes assigned to the slot
        });

    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, typeof newValue)
        if (!this.shadowRoot) return
        if (name === 'open' && this.shadowRoot.querySelector('#checker')) {
            this.shadowRoot.querySelector('#checker').checked = newValue === 'true'
        }
    }

    adoptedCallback() { }

}

window.customElements.define('app-modal', AppModal)
