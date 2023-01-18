
// const fakeFetch = (url) => new Promise(resolve => {
//     if(url === 'https://path/to/list1') return resolve([
//         { id: '1', name: 'user1', other: 'other field' },
//         { id: '2', name: 'user2', other: 'other field' },
//         { id: '3', name: 'user3', other: 'other field' },
//         { id: '4', name: 'user4', other: 'other field' },
//         { id: '5', name: 'user5', other: 'other field' },
//         { id: '6', name: 'user6', other: 'other field' },
//         { id: '7', name: 'user7', other: 'other field' },
//         { id: '8', name: 'user8', other: 'other field' },
//         { id: '9', name: 'user9', other: 'other field' },
//     ])
//     resolve([
//         { id: '1', name: 'user1', moreItems: ['1','2','3'] },
//         { id: '2', name: 'user2', moreItems: ['1','2','3'] },
//         { id: '3', name: 'user3', moreItems: ['1','2','3'] },
//         { id: '4', name: 'user4', moreItems: ['1','2','3'] },
//         { id: '5', name: 'user5', moreItems: ['1','2','3'] },
//         { id: '6', name: 'user6', moreItems: ['1','2','3'] },
//         { id: '7', name: 'user7', moreItems: ['1','2','3'] },
//         { id: '8', name: 'user8', moreItems: ['1','2','3'] },
//         { id: '9', name: 'user9', moreItems: ['1','2','3'] },
//     ])
// })


class LiveTable extends HTMLElement {

    static get observedAttributes() {
        return ['src', 'dynamo-table']
    }

    constructor() {
        super()
        this.items = []
    }

    async _render() {
        const inner = await html.import('./live-table/live-table.component.html')
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

        // console.log(this.getAttribute('src'))
        // console.log(this.getAttribute('dynamo-table'))
        this.renderTable()

    }

    connectedCallback() {
        this._render()
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log('attributeChangedCallback', name, oldValue, newValue)
        // console.log('this.hasAttribute(\'src\')', this.hasAttribute('src'))
        this.renderTable()


    }

    adoptedCallback() { }

    async renderTable() {

        if (!this.shadowRoot) return
        if (this.hasAttribute('src')) {
            this.items = await (await fetch(this.getAttribute('src'), { headers: { 'Content-type': 'application/json' } })).json()
            // console.table(this.items)
            // console.error(error)
        } else if (this.hasAttribute('dynamo-table')) {
            this.items = [] // TODO use sdk to read from dynamo
        }

        const table = this.shadowRoot.querySelector('table')
        // console.log(table)
        table.innerHTML = ''
        const keys = new Set()
        this.items
            .map(item => Object.keys(item))
            .map(itemKeys => itemKeys.forEach(key => keys.add(key)))

        // console.log(keys)
        const tableHeader = html`<thead>
    <tr>
        ${Array.from(keys).map(key => `<th>${key.toUpperCase()}</th>`).join('\n')}
    </tr>
</thead>`

        const tableBody = html`<tbody>
    ${this.items.map(item => `<tr>
        ${Array.from(keys).map(key => `<td>${itemToString(item[key])}</td>`).join('\n')}
    </tr>`).join('\n')}
</tbody>`

        table.appendChild(tableHeader)
        table.appendChild(tableBody)

        // update select
        const select = this.shadowRoot.querySelector('#new-filter-key')
        select.innerHTML = ''

        Array.from(keys)
            .map(key => html`<option value="${key}">${key}</option>`)
            .forEach(option => select.appendChild(option))



    }


    addFilterItem() {
        const src = this.getAttribute('src')
        const keyInput = this.shadowRoot.querySelector('#new-filter-key')
        const valueInput = this.shadowRoot.querySelector('#new-filter-value')
        const filterList = this.shadowRoot.querySelector('#filter-list')

        const key = keyInput.value
        const value = valueInput.value

        const li = html`<li data-key="${key}" data-value="${value}"><b>${key}: </b>${value} <button>x</button></li>`
        li.querySelector('button').addEventListener('click', ev => this.removeFilterItem(ev))
        filterList.appendChild(li)


        const newSrc = src + `${src.includes('?') ? '&' : '?'}${key}=${value}`
        this.setAttribute('src', newSrc)
    }

    removeFilterItem(event) {
        const element = event.target
        console.log(element.parentElement)
        const { key, value } = element.parentElement.dataset
        console.log(`${key}=${value}`)
        element.parentElement.remove()
        const src = this.getAttribute('src')
        const [path, queryStr] = src.split('?')
        const filters = queryStr.split('&').filter(str => str !== `${key}=${value}`)
        
        console.log(filters)
        
        console.log('queryStr', queryStr)
        const newSrc = `${path}?${filters.join('&')}`
        console.log('newSrc', newSrc)
        this.setAttribute('src', newSrc)

    }

}

window.customElements.define('live-table', LiveTable)


function itemToString(item) {
    if (!item) return ''
    if (typeof item === 'string') return item
    if (typeof item === 'number') return item
    if (Array.isArray(item)) return item.join(', ')
    if (typeof item === 'object') return JSON.stringify(item, undefined, 2)


}