(function (module, require) {

    class Powerbar extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            const inner = html`
        <style>
            .bttn {

                border: 2px solid #477a2a;
                box-shadow: 0px 6px 0px #477a2a;
                border-radius: 4.5px;
                padding: 4px 8px;

                background-color: #feffc8;
                color: #274416;

                font-family: 'Up';
            }

            .bttn:hover {
                background-color: #ecff7d;
                box-shadow: 0px 6px 0px #274416;
                border: 2px solid #274416;
                cursor: pointer;
                transform: translateY(-1px);
            }

            .bttn:active {
                transform: translateY(1px);
            }

        </style>
        <floating-pannel class="">
            <h1 slot="main" >main slot content</h1>
            <div slot="up" class="up">
    
                <button onclick="test" class="bttn" draggable="true">Frontyard</button>
                <button onclick="test" class="bttn" draggable="true">backyard</button>
                <button onclick="test" class="bttn" draggable="true">Diningroom</button>
                <button onclick="test" class="bttn" draggable="true">Kitchen</button>
                
            </div>
            <div slot="down" class="down">
                    
                <button class="bttn" draggable="true">Master bedroom</button>
                <button class="bttn" draggable="true">Master bathroom</button>
                <button class="bttn" draggable="true">Livingroom</button>
    
            </div>
        </floating-pannel>`
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)

        }

        test() {
            alert('test')
        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('power-bar', Powerbar)

    module.exports = AppSyncMutation

})(module, require)