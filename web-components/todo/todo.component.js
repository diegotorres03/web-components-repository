
class AppTodo extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = await Promise.resolve(html`<section>
            <slot></slot>
            <!-- <h3>TODO:</h3>
            <ol>
                <li>
                    <input type="checkbox">
                    <details>
                        <summary>AppAuth component</summary>
                        <p>create the app-auth tag, using cognito under the hood</p>
                        <input type="text">
                    </details>
                </li>
            </ol> -->
            <hr>
        </section>`)
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

window.customElements.define('app-todo', AppTodo)
