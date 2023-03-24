(function (module, require) {

    const someData = {
        "nodes": [
            {
                "id": 1
            },
            {
                "id": 2
            },
            {
                "id": 3
            }
        ],
        "edges": [
            {
                "source": 1,
                "target": 2
            },
            {
                "source": 1,
                "target": 3,
            }
        ]
    };


    class GraphViewerComponent extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            const inner = html`<div id="alchemy" class="alchemy"></div>`
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)

        }

        connectedCallback() {
            alchemy.begin({ "dataSource": someData })
            this._render()
        }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('graph-viewer', GraphViewerComponent)

    module.exports = GraphViewerComponent

})(module, require)