// const { Amplify, API, graphqlOperation } = require('aws-amplify')

(function (module) {



    class AppSyncSubscription extends HTMLElement {

        constructor() {
            super()
            this.subscriptionQuery
            this.unsubscribe

        }

        async _render() {
            const inner = await html`<slot></slot>`
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)


            console.log('subscription')
            // const content = Array.from(this.parentElement.children)


            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)

        }


        subscribe(fn) {
            const query = gql`${this.subscriptionQuery}`
            console.log('this.parentElement', this.parentElement)
            console.log(query)
            const subscription = this.parentElement.rungql(query)
            subscription.subscribe({
                next: event => fn(event)
            })
            return subscription.unsubscribe
        }

        async connectedCallback() {
            await this._render()
            await wait(1) // hack to wait until content is rendered
            this.subscriptionQuery = this.textContent
            this.unsubscribe = this.subscribe(event => {
                console.log(event)
                this.dispatchEvent(new CustomEvent('data', {
                    bubbles: true, composed: true,
                    detail: event.value.data
                }))
            })
        }

        disconnectedCallback() {
            this.unsubscribe()
        }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('app-sync-subscription', AppSyncSubscription)

    module.exports = AppSyncSubscription


})(module)
