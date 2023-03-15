(function (module) {

    class AppLayout extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            // const baseUrl = useLocal? './' : 'https://d2frjh5xr2nc8a.cloudfront.net/'
            // const inner = await html.import(baseUrl + '/layout/components/layout-component.html')
            const inner = html`
            
<style>
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .space-around {
        justify-content: space-around;
    }

    .space-evenly {
        justify-content: space-evenly;
    }

    .space-between {
        justify-content: space-between;
    }

    .justify-center {
        justify-content: center
    }

    .align-center {
        align-items: center;
    }

    .grid {
        display: grid;
    }

    .hidden {
        display: none;
    }

    /* ⚠️ DISTRIBUTION ⚠️ */

    .super-container {
        height: 100%;
    }

    .header-container {
        height: 5%;
    }

    .top-container {
        height: 5%;
    }

    .left-header {
        width: 25%;
        height: 100%;
    }

    .top-menu {
        width: 75%;
        height: 100%;
    }

    .main-container {
        height: 90%;
    }

    .right-container {
        width: 75%;
        height: 100%;
    }

    .left-menu {
        width: 25%;
        height: 100%;
    }

    .display-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        height: 95%;
        padding: 24px;

        overflow-y: auto;
    }

    .footer {
        height: 5%;
    }

    /* style */

    * {
        /* Tonos grises */
        --black-0: #191919;
        --black-1: #262626;
        --black-2: #3e3e3e;
        --black-3: #6B6B6B;

        /* Tonos claros */
        --white-1: #f5f5f5;
        --white-2: #e2e7ed;
        --white-3: #c4c7cc;
        --white-4: #95989d;
    }

    /* ⚠️ Estilos básicos ⚠️ */
    .header-container,
    .left-header,
    .footer {
        padding: 8px;
    }

    .bcb1-cw4 {
        background-color: var(--black-1);
        color: var(--white-4);
    }

    .bcb0-cw4 {
        background-color: var(--black-0);
        color: var(--white-4);
    }

    .top-menu {
        overflow: hidden;
        overflow-x: auto;
        padding: 0;
    }

    .top-menu .link-tag {
        display: flex;
        align-items: center;

        min-width: 120px;
        height: 80%;
        padding: 4px;
        margin-right: 2px;

        border: 1px solid var(--black-3);
        border-width: 0px 0px 1px 0px;

        text-decoration: none;
        color: var(--white-3);

        background-color: var(--black-2);
    }

    .lt-container {
        width: 100%;
        background-color: #6B6B6B;
    }

    .left-header {
        border: 1px solid var(--black-3);
        border-width: 0px 0px 1px 0px;
    }

    .left-menu {
        padding: 8px;
    }

    .main-content {
        background-color: var(--white-1);
    }

    .footer {
        padding: 8px;
        background-color: var(--black-0);
    }

    /* scroll style */

    .scroll::-webkit-scrollbar {
        -webkit-appearance: none;
        cursor: pointer;
    }

    .scroll::-webkit-scrollbar:vertical {
        width: 10px;
    }

    .scroll::-webkit-scrollbar-button:increment,
    .scroll::-webkit-scrollbar-button {
        display: none;
    }

    .scroll::-webkit-scrollbar:horizontal {
        height: 10px;
    }

    .scroll::-webkit-scrollbar-thumb {
        background-color: var(--black-3);
        border-radius: 0px;
        border: 3px solid var(--black-1);
        border-width: 3px 0;

    }

    .scroll::-webkit-scrollbar-track {
        border-radius: 10px;
    }
</style>



<div class="super-container flex-column">

    <header class="header-container flex-row align-center justify-center bcb0-cw4">

        <slot name="header">HEADER</slot>

    </header>

    <section class="top-container flex-row">

        <div class="left-header flex-row align-center bcb1-cw4">
            <slot name="left-header">LEFT</slot>
        </div>

        <div class="top-menu flex-row align-center bcb1-cw4 scroll">

            <slot name="top-menu"></slot>

        </div>

    </section>

    <section class="main-container flex-row">

        <div class="left-menu flex-column bcb1-cw4">

            <div class="left-content">

                <slot name="left-content">LEFT-CONTENT</slot>

            </div>

        </div>

        <div class="right-container flex-column">

            <div class="display-container flex-column justify-center align-center pattern-1">

                <slot name="main-content">MAIN</slot>

            </div>

            <div class="footer flex-row align-center bcb1-cw4">

                <slot name="footer">FOOTER</slot>

            </div>

        </div>

    </section>



</div>
            `

            await Promise.resolve()
 

            const shadow = this.attachShadow({ mode: 'open' })
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

    window.customElements.define('app-layout', AppLayout)


    module.exports = AppLayout

})(module)