
class LiveForm extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`<div>
    <slot></slot>
    <button onclick="save">save</button>
    <button onclick="cancel">cancel</button>
</div>`
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }
    getValues() {
        const inputs = Array.from(this.querySelectorAll('[name]'))
        console.log('inputs', inputs)
        const values = inputs
            .map(input => ({ name: input.getAttribute('name'), value: input.value }))
            .reduce((prev, next) => {
                console.log(next, prev)
                return ({ ...prev, [next.name]: next.value })
            }, {})
        console.log(values)
        return values
    }


    async save() {
        const item = this.getValues()
        const url = this.getAttribute('src')
        const res = await fetch(url, {method: 'post', body: JSON.stringify(item), headers: {'Content-Type': 'application/json'}})
        console.log(res)
    }

    cancel() {

    }


    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }


}

window.customElements.define('live-form', LiveForm)
