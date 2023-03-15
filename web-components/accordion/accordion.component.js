
(function (module) {


    class AppAccordion extends HTMLElement {

        constructor() {
            super()
        }

        async _render() {
            // const baseUrl = useLocal? './' : 'https://d2frjh5xr2nc8a.cloudfront.net/'
            // const inner = await html.import(baseUrl + '/accordion/accordion.component.html')
            
            const inner = html`<style>
            :root {
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
        
            .tab-group {
                margin: 0 auto;
                max-width: 40em;
                width: 100%;
                border-radius: 4px;
                overflow: hidden;
            }
        
            .tab {
                position: relative;
                width: 100%;
            }
        
            .tab input {
                position: absolute;
                left: 0;
                top: 0;
                z-index: -999;
            }
        
            .tab label {
                display: flex;
                align-items: center;
        
                padding: 6px;
        
        
                background: var(--black-0);
                color: var(--white-1);
                font-size: 12px;
            }
        
            .tab input:focus+label,
            .tab label:hover {
                filter: brightness(1.15);
                cursor: pointer;
            }
        
            .tab-content {
                max-height: 0;
        
                overflow: hidden;
                transition: all .35s;
                background-color: var(--white-2);
            }
        
            .tab input:checked~.tab-content {
                max-height: 300px;
                padding: 8px;
                color: var(--amz-blck-1);
                /* max-height: fit-content; */
            }
        </style>
        
        <link rel="stylesheet" href="style-tools.css">
        
        <div id="content" class="tab-group">
        
            <!-- <div class="tab" >
        
                                <input id="tab-one" type="radio" name="tabs">
        
                                <label for="tab-one">
        
                                    <slot name="tab-title">Title</slot>
        
                                </label>
        
                                <div id="content" class="tab-content">
                                    <slot name="tab-content">
        
                                    </slot>
                                </div>
        
                            </div> -->
        
        </div>
        <slot></slot>`

// await Promise.resolve()

            await sleep(1)

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