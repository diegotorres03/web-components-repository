
class FlipCard  extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = await html`
        <style>
            *{
                --amz-blck-1:#16191F;
                --amz-blck-2:#232F3E;
                --amz-gray-1 :#545B64;
                --amz-gray-2 :#687078;

                --amz-blue-1 :#306DA3;
                --amz-blue-2 :#0073BB;
                --amz-turq-1 :#44B9C6;
                --amz-orang-1:#EC7211;
            }
            .flip-card-box {
               
                width: 100%;
                height: 180px;
                perspective: 1000px;    
            }

            .flip-card-box:hover .flip-card{
                transform:rotateY(180deg);
            }

            .flip-card{
                width: 100%;
                height: 100%;
                
                transition: all 1.0s ease-in-out;

                transform-style:preserve-3d ;
            }
            .front, .back{
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                overflow: hidden;

                border-radius: 4px;
                
                box-shadow: 0 0 0 1px #929292;

                display: flex;
                align-items: center;
                justify-content: center;

                background-color: var(--amz-blck-1);
                color: var(--amz-orang-1);
            }

            .back{
                transform: rotateY(180deg);
                background-color: var(--amz-orang-1);
                color: ghostwhite;
            }
         

        </style>

        <div class="flip-card-box">

            <div class="flip-card">

                <div class="front">
                    <slot name="front"> 
                        <span class="card-text">This is the front</span>
                    </slot>
                    
                </div>
                <div class="back">
                    <slot name="back"> 
                        <span class="card-text">This is the back</span>
                    </slot>
                </div>

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

    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('flip-card', FlipCard )
