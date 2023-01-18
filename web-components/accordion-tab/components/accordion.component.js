
class AccordionTab extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`
<link href="https://dev.iconly.io/public/gZ9X2NucmsiK/iconly.css" rel="stylesheet"/>

<style>
    .accordion:not(:last-of-type){
        margin-bottom: 12px;
    }

    .accordion{
        width: 100%;
        cursor: pointer;
        border-radius: 5px;
        overflow: hidden;
    }

    .accordion .header{
        display: flex;
        justify-content: space-between;
        align-items:center;
        
        padding: 4px 12px;
        border-radius: 4px 4px 0 0;

        color: #6bc0dc;
        background-color: #343434;
    }

    .accordion-sign{
        display: grid;
        place-items: center;
        
        font-size: 24px;
    }

    .accordion .body{
        
        background-color: #bdbdbd;
        border-radius: 0 0 4px 4px;

        transition: all 0.25s ease ;

        overflow: hidden;
        overflow-y: auto;
        max-height:0;

    }
    .accordion.active .body{
        max-height: 300px;
    }
    
    .content{
        display: block;
        width: auto;
        max-height: 100%;
        padding: 12px;
    }
    .accordion.active .body::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
    }

    .accordion.active .body::-webkit-scrollbar:vertical {
        width:12px;
    }

    .accordion.active .body::-webkit-scrollbar-button:increment,.accordion.active .body::-webkit-scrollbar-button {
        display: none;
    } 

    .accordion.active .body::-webkit-scrollbar-thumb {

        background-color: #25252556;
        border-radius: 6px;
        border: 4px solid #bdbdbd;
    }

    .accordion.active .body::-webkit-scrollbar-track {
        border-radius: 10px;  
    }
</style>

<div class="accordion">

        <div class="header" >

            <slot name="title"><h2>Titulo por defecto</h2></slot>
            <i class="accordion-sign icon-menu-down"></i>

        </div>
        <div class="body active">

            <slot class="content" name="content">

                <p>Texto por defecto</p>

            </slot>

        </div>
              
</div>
`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

        // const accordions = this.shadowRoot.querySelectorAll('.accordion')
        const headers = this.shadowRoot.querySelectorAll('.header')
    
        headers.forEach(header => {
            header.addEventListener('click',e =>{

                let toggleSigns = header.querySelector('.accordion-sign')
                let accordion = shadow.querySelector('.accordion')
    
                accordion.classList.toggle('active')
                toggleSigns.classList.toggle('icon-menu-up')

            })
        })

        // accordions.forEach(accordion => {
        //     accordion.addEventListener('click',e =>{

        //         let toggleSigns = accordion.querySelector('.accordion-sign')
    
        //         accordion.classList.toggle('active')
        //         toggleSigns.classList.toggle('icon-menu-up')

        //     })
        // })

    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('accordion-tab', AccordionTab)
