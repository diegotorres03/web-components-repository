
class SampleComponent extends HTMLElement {

    _onChildEvent = (event) => {

        console.log(event)
        console.log(event.type)
        console.log(event.detail)

        if (event.type === 'remove-item') this.removeItem(event.detail.name)
    }

    constructor() {
        super()
        this.storeId = this.getAttribute('store-id')
        const children = [...this.children]
        children.forEach(child => child.addEventListener('remove-item', this._onChildEvent))
    }

    get _children() {
        const list = this._list
        if (!list) return []
        return [...list.children]
    }

    get _list() {
        const list = this.querySelector('.shopping-cart')
        // if(!list) throw new Error('list not ready')
        if (!list) return null
        return list
    }

    get items() {
        return this._children.map(child => ({
            name: child.getAttribute('name'),
            type: child.getAttribute('type'),
            qty: Number(child.getAttribute('qty')),
        }))
    }


    _render() {
        /** @type {HTMLElement} */
        const inner = html`<h1>this is my component</h1>`

        this.innerHTML = ''
        this.appendChild(inner)
    }

    // called every time an element is inserted into the DOM
    connectedCallback() {
        this._render()
    }

    // called every time an element is removed from the DOM
    disconnectedCallback() {

    }

    // called every time an attribute is added, removed or updated
    attributeChangedCallback(name, oldValue, newValue) {
        // this._render()
    }

    adoptedCallback() {
        console.log('adoptedCallback')
    }


}

window.customElements.define('sample-component', SampleComponent)