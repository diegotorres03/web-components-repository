// async mutation() {
//     const id, level, recordType
//     const query = gql`mutation MyMutation {
//       createSession(id: {id: "${id}", level: "${level}", recordType: "${recordType}"}) {
//         id
//         level
//         recordType
//       }
//     }`
//     console.log(query)
//     const res = await rungql(query)

//   }
// const { Amplify, API, graphqlOperation } = require('aws-amplify')



class AppSyncMutation extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`<slot></slot>`
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)
    }

    async post(params) {
        let queryStr = this.textContent
        Object.keys(params).forEach(key => queryStr = queryStr.replace(`$${key}`, params[key]))
        console.log(queryStr)
        const query = gql`${queryStr}`
        console.log(query)
        const res = await rungql(query, params)
        console.log(res)

    }

    async connectedCallback() {
        await this._render()
        await wait(1) // hack to wait until content is rendered

    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('app-sync-mutation', AppSyncMutation)



