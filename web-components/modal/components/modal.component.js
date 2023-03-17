
class AppModal extends HTMLElement {

    static get observedAttributes() {
        return ['open']
    }

    constructor() {
        super()
    }

    async _render() {
        // const inner = await Promise.resolve(html.import(baseUrl + 'modal/components/modal.component.html'))
        const inner = html`<style>
        * {
            /* Amazon pallete */
            --amz-blck-1: #16191F;
            --amz-blck-2: #232F3E;
            --amz-gray-1: #545B64;
            --amz-gray-2: #687078;
            --amz-blue-1: #306DA3;
            --amz-blue-2: #0073BB;
            --amz-turq-1: #44B9C6;
            --amz-orang-1: #EC7211;
    
            /* Tonos grises */
            --black-1: #252525;
            --black-2: #323437;
            --black-3: #474b4e;
    
            /* Tonos claros */
            --white-1: #e2e7ed;
            --white-2: #c4c7cc;
            --white-3: #95989d;
    
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
    
        /* flex */
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
    
        /* grid */
        .grid {
            display: grid;
        }
    
        /* positions */
    
        .relative{
            position: relative;
        }
    
        .absolute{
            position: absolute;
        }
    
        .fixed{
            position: fixed;
        }
    
        .hidden {
            display: none;
        }
    
        .dft-btn {
            /* Tamaño */
            width: calc(50% - 6px);
            padding: 6px 12px;
    
            /* Fuente */
            font-family: 'amazon-ember', monospace;
            color: #232323;
    
            /* Bordes */
            border-radius: 4px;
            border: 1px solid #232323;
    
            /* Fondo */
            background-color: #e2e2e9;
    
            /* Otros */
            cursor: pointer;
        }
    
        .darker {
            /* Fuente */
            color: var(--amz-blue-2);
    
            /* Bordes */
            border-color: transparent;
    
            /* Fondo */
            background-color: var(--amz-blck-1);
        }
    
        .brighter {
            /* Fuente */
            color: var(--white-1);
    
            /* Bordes */
            border-color: transparent;
    
            /* Fondo */
            background-color: var(--amz-orang-1);
        }
    
        .clickable {
            transition: all 0.2 ease;
            user-select: none;
        }
    
        .clickable:hover {
            filter: brightness(1.2);
            cursor: pointer;
        }
    
        .clickable:active {
            transform: scale(0.95);
        }
    
        /* CSS */
    
        .modal-overlay {
            width: 100%;
            height: 100vh;
    
            top: 0;
            left: 0;
            z-index: -600;
    
            opacity: 0;
            /* z-index: -100; */
            transform: scale(.5);
    
            transition: all .75s cubic-bezier(0.68, -0.55, 0.265, 1.55)
        }
    
        .modal-wrap {
            width: 60%;
            max-width: 400px;
            
    
            border-radius: 4px;
            filter: drop-shadow(0 12px 42px rgba(89, 89, 89, 0.705));
            overflow: hidden;
        }
    
        #checker {
            top: -1000px;
        }
    
        #checker:checked~.modal-overlay {
            animation: 1s 1 normal appear;
    
            animation-delay: 0.4s;
            animation-fill-mode: forwards;
    
            opacity: 1;
            transform: scale(1);
            z-index: 800;
        }
    
        @keyframes appear {
    
            from {
                background: transparent;
            }
    
            to {
                background: #161616e8;
            }
        }
    
    
        .modal-header {
            width: 100%;
            padding: 12px;
    
            border-bottom: 8px solid var(--amz-blck-2);
    
            color: var(--white-1);
            background-color: var(--amz-blck-1);
        }
    
        .close {
            width: 20px;
            height: 20px;
            padding-bottom: 1px;
    
            border-radius: 2px;
    
            background-color: var(--amz-blck-2);
            color: var(--white-2);
        }
    
        .close span {
            width: 100%;
            height: 100%;
            padding: 0;
        }
    
        .close:hover {
            outline: 1px solid var(--white-1);
            color: var(--white-1);
            cursor: pointer;
        }
    
        .close:active {
            transform: scale(0.95);
            font-size: 13px;
        }
    
        .main-content {
            width: 100%;
            padding: 12px 12px 0;
            background-color: var(--white-1);
        }
    
        .footer-content {
            width: 100%;
            padding: 12px;
            background-color: var(--white-1);
        }
    
       
    </style>
    
    <div>
        <!-- <label for="checker">open modal</label> -->
    
        <input class="absolute" id="checker" type="checkbox">
    
        <div class="modal-overlay flex-row align-center justify-center fixed">
    
            <section class="modal-wrap flex-column align-center">
                <header class="modal-header flex-row align-center space-between">
    
                    <slot name="title" class="title">This is a title</slot>
                    <label class="close darker relative" for="checker"><span class="flex-row justify-center align-center">&#10006;</span></label>
    
                </header>
                <section class="main-content">
    
                    <slot name="main"></slot>
    
                </section>
                <footer class="footer-content flex-row space-between">
    
                    <slot name="footer ">
                        <button onclick="accept" class="dft-btn brighter clickable">Accept</button>
                        <button onclick="cancel" class="dft-btn darker clickable">Decline</button>
                    </slot>
    
                </footer>
            </section>
        </div>
    </div>`
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)


        if (this.getAttribute('open')) this.show()
        
        if(this.hasAttribute('trigger')) {
            const triggerId = '#' + this.getAttribute('trigger')
            const trigger = document.querySelector(triggerId)
            if(!trigger) return
            const triggerEvent = this.getAttribute('trigger-event') || 'click'
            // alert('trigger:' + this.getAttribute('trigger'))
            trigger.addEventListener(triggerEvent, ev => this.show())

        }

        console.log('trigger')

    }

    // [ ] document the event names 

    accept() {
        this.shadowRoot.dispatchEvent(new CustomEvent('accepted', {
            bubbles: true, composed: true,
            detail: {
                success: true
            }
        }))
        this.close()
    }


    cancel() {
        this.shadowRoot.dispatchEvent(new CustomEvent('declined', {
            bubbles: true, composed: true,
            detail: {
                success: true
            }
        }))
        this.close()
    }

    show() {
        this.setAttribute('open', true)
    }

    close() {
        this.setAttribute('open', false)
    }

    connectedCallback() {
        this._render()

        this.addEventListener('slotchange', event => {
            const slot = event.target;
            console.log('slotchange')
            const assignedNodes = slot.assignedNodes();
            console.log(assignedNodes); // This will log the nodes assigned to the slot
        });

    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log(name, oldValue, typeof newValue)
        if (!this.shadowRoot) return
        if (name === 'open' && this.shadowRoot.querySelector('#checker')) {
            this.shadowRoot.querySelector('#checker').checked = newValue === 'true'
        }
    }

    adoptedCallback() { }

}

window.customElements.define('app-modal', AppModal)
