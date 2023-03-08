
(function (module) {


    class AppAccordion extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            // const baseUrl = useLocal? './' : 'https://d2frjh5xr2nc8a.cloudfront.net/'
            const inner = await html.import(baseUrl + 'accordion/accordion.component.html')
            // alert(baseUrl)
            // const inner = await html.import('accordion/accordion.component.html')
            //         const inner = await Promise.resolve(html`
            //         <style>

            //         :root {
            //             /* Amazon pallete */
            //             --amz-blck-1:#16191F;
            //             --amz-blck-2:#232F3E;
            //             --amz-gray-1 :#545B64;
            //             --amz-gray-2 :#687078;

            //             --amz-blue-1 :#306DA3;
            //             --amz-blue-2 :#0073BB;
            //             --amz-turq-1 :#44B9C6;

            //             --amz-orang-1:#EC7211;

            //             /* Tonos grises */
            //             --black-1: #252525;
            //             --black-2: #323437;
            //             --black-3: #474b4e;

            //             /* Tonos claros */
            //             --white-1: #e2e7ed;
            //             --white-2: #c4c7cc;
            //             --white-3: #95989d;

            //         }

            //             .tab-group {
            //                 margin: 0 auto;
            //                 max-width: 40em;
            //                 width: 100%;
            //                 border-radius:4px;
            //                 overflow: hidden;
            //             }

            //             .tab {
            //                 position: relative;
            //                 width: 100%;
            //             }

            //             .tab input {
            //                 position: absolute;
            //                 left: 0;
            //                 top: 0;
            //                 z-index: -999;
            //             }

            //             .tab label {
            //                 display: flex;
            //                 align-items: center;

            //                 padding: 6px;


            //                 background: var(--amz-blck-1);
            //                 color: var(--amz-blue-2 );
            //                 font-size: 12px;
            //             }

            //             .tab input:focus + label,
            //             .tab label:hover {
            //                 filter: brightness(1.15);
            //                 cursor: pointer;
            //             }

            //             .tab-content {
            //                 max-height: 0;

            //                 overflow: hidden;
            //                 transition: all .35s;
            //                 background-color: var(--white-1);   
            //             }

            //             .tab input:checked ~ .tab-content {
            //                 max-height: 300px;
            //                 padding: 8px;
            //                 color: var(--amz-blck-1);
            //                 /* max-height: fit-content; */
            //             }

            //         </style>


            //             <div id="content" class="tab-group">

            //             </div>
            //             <slot></slot>
            // `)




            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(inner)

            // const inner = await html.import('test.component.html')

            // replacing inline handler function with own component methods
            mapComponentEvents(this, eventNames)

            // get variable names
            updateVars(this)

            // const items = Array.from(this.querySelectorAll('.accordion-tab'))
            const items = Array.from(this.querySelectorAll('section'))


            items.forEach((item, index) => {
                const titleElement = item.querySelector('h1') ||
                    item.querySelector('h2') ||
                    item.querySelector('h3') ||
                    item.querySelector('h4') ||
                    item.querySelector('h5') ||
                    item.querySelector('h6') ||
                    item.querySelector('h7')

                const title = titleElement.textContent
                const itemTemplate = html`<div class="tab">
    <input id="tab-${index + 1}" type="radio" name="tabs" ${index === 0 && 'checked ="true"'}>
    <label for="tab-${index + 1}">${title}</label>
    <div class="tab-content">
    </div>
</div>`
                itemTemplate.querySelector('.tab-content').append(item)

                this.shadowRoot.querySelector('#content').append(itemTemplate)
            })



        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('app-accordion', AppAccordion)

    module.exports = AppAccordion

})(module)