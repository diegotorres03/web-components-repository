
class PlainCard extends HTMLElement {

    constructor() {
        super()
    }

    async _render() {
        const inner = html`
        <style>

.cta-box {
    width: 80%;
    padding: 24px;
    border-radius: 4px;

    background-color: ghostwhite;
    box-shadow: 0 4px 16px 4px #0000002d;
}

.cta-box h1 {
    font-size: 32px;
    line-height: 32px;
    /* margin-bottom: 12px; */
}

.cta-box p {
    font-size: 16px;
    margin: 12px 0;
    line-height: 1.5;
    color: var(--g2);
}

.cta-box .input-box input {
    padding: 4px 12px;
    border: 1px solid var(--b1);
    background-color: transparent;
    border-radius: 4px 0 0 4px;
    width: 70%;
}

.cta-box .input-box input:focus {
    outline: none;
    background-color: var(--g3);
}

.cta-box .input-box button {
    width: 30%;
}
        </style>
        <div class="cta-box">
            <slot></slot>
<!--         
            <h1>Subscribe with us now!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit orem ipsum dolor sit amet, consectetur
                adipisicing elit.</p>
        
            <div class="input-box flex-row ">
                <input type="text" class="cta-input" placeholder="example@email.com">
                <button type="submit" class="btn cta-btn clickable">Get Started</button>
            </div> -->
        
        </div>
        `
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

window.customElements.define('plain-card', PlainCard)
