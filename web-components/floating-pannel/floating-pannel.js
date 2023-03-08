(function (module) {

class FloatingPannel extends HTMLElement {

    constructor() {
        super()
        this.someNumber = '002'
    }

    _render() {



        const inner = html`
        <!-- <link rel="stylesheet" href="http://d16kb0k9sbz46n.cloudfront.net/style.css"> -->
        <link rel="stylesheet" href="http://127.0.0.1:5500/web-components/floating-pannel/style.css">
        
        
        
        <article id="container" class="container">
            <div class="title">
        
                <button id="title-button" class="title-button">Ui tool</button>
        
            </div>
        
            <section id="powerbar" class="powerbar">
        
                <div class="house-areas-container">
                    <slot name="main"></slot>
                    <slot name="up"></slot>
                    <slot name="down"></slot>
                    <!-- 
                            <div class="up">
                
                                <button class="house-areas bttn" draggable="true">Frontyard</button>
                                <button class="house-areas bttn" draggable="true">backyard</button>
                                <button class="house-areas bttn" draggable="true">Diningroom</button>
                                <button class="house-areas bttn" draggable="true">Kitchen</button>
                
                            </div>
                            <div class="down">
                
                                <button class="house-areas bttn" draggable="true">Master bedroom</button>
                                <button class="house-areas bttn" draggable="true">Master bathroom</button>
                                <button class="house-areas bttn" draggable="true">Livingroom</button>
                
                            </div> -->
                </div>
        
                <div class="panel-container">
        
                    <button class="previous bttn">
                        < </button> <div>
        
                            <ul class="ubication">
        
                                <li onclick="test" class="ubications bttn">001</li>
                                <li onclick="test" class="ubications bttn">({someNumber})</li>
                                <li class="ubications bttn">003</li>
                                <li class="ubications bttn">004</li>
        
                            </ul>
        
                </div>
        
                <button class="next bttn"> > </button>
        
                </div>
        
            </section>
        
        </article>`
        const shadow = this.attachShadow({ mode: 'open' })
        // shadow.adoptedStyleSheets = [ sheet ]
        shadow.appendChild(inner)

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }


    test(event) {
        console.log('test')
        console.log(event)
    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('floating-pannel', FloatingPannel)


module.exports = FloatingPannel

})(module)