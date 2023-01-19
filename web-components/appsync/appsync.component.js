const { Amplify, API, graphqlOperation } = require('aws-amplify')

// console.log(Amplify, API, graphqlOperation)

const appConfig = {
    aws_appsync_graphqlEndpoint: "https://etqor7oilndspncbfezvjt27he.appsync-api.us-west-2.amazonaws.com/graphql",
    aws_appsync_region: "us-east-2",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-qrzngj3sx5f3xm76bg5ggxso6e",
}

function rungql(query) {
    return API.graphql(graphqlOperation(query))
}

class AppSync extends HTMLElement {

    constructor() {
        super()

        Amplify.configure(appConfig)

    }

    async _render() {
        const inner = html`<b>Hello There AppSync!</b>`
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

window.customElements.define('app-sync', AppSync)
