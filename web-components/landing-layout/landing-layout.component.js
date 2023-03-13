(function(module){

    
    class LandingLayout extends HTMLElement {
    
        constructor() {
            super()
        }
    
        async _render() {
            const inner = await html.import(baseUrl + 'landing-layout/landing-layout.component.html')
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
    
    window.customElements.define('landing-layout', LandingLayout)
    

    module.exports = LandingLayout

})(module)