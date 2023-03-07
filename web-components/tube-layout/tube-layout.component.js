

class TubeLayout extends HTMLElement {

    constructor() {
        super()
    }

    get selectedVideoSrc() {
        return this.shadowRoot.querySelector('#player').src
    }
    set selectedVideoSrc(src) {
        log(src)
        this.shadowRoot.querySelector('#player').src = src
    }

    async _render() {
        const inner = html`
        
        <link rel="stylesheet" href="style-tools.css">
        <link rel="stylesheet" href="tube-layout/style.css">

        <main class="super-container flex-row">
        
        <section class="main-section">

            <video id="player" controls>

                <source src="assets/patd-enc.mp4" type="video/mp4"/>

            </video>
            <div class="video-description flex-col jc-center ">

                <h2>Emperor's Nedasdw Clothes</h2>
                <p>Panic! At The Disco</p>

            </div>

        </section>
        <section class="lateral-section">
            <div>
                <input type="text" placeholder="search">
            </div>
            <div id="video-list"></div>
            <slot name="playlist"></slot>

        </section>

    </main>`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(inner)

        setTimeout(()=> {
            const content = [...this.querySelectorAll('source')]
            console.log(content)
            const container =this.shadowRoot.querySelector('#video-list')
                
            content.forEach(item => {
                const src = item.getAttribute('src')
                const header = html`
                
                    <div class="video-card flex-row" data-source="${src}" onclick="selectSource" class="video-description flex-col jc-center">
                        
                        <div class="video-poster" data-source="${src}">
                            <img src="./tube-layout/assets/poster.jpg" alt="">
                        </div>
                        <div class="video-description flex-col jc-between" data-source="${src}">

                            <h3>Video-name</h3>
                            <small>Author</small>
                            <span id="hash">#1424141</span>
                            <span class="video-tag">video-tag</span>
                            <a href="#">Learn more..</a>

                        </div>

                    </div>
                    `
                // header.addEventListener('click', ev =>this.test(ev))
                container.appendChild(header)
            })
            mapComponentEvents(this, eventNames)
        }, 0)
        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        // mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }

    selectSource(ev) {
        log(ev.target.parentElement)
        const src = ev.target.parentElement.dataset.source
        
        this.selectedVideoSrc = src
        this.selectedFormat = this.getFormat(src)
    }

    getFormat(src) {
        if(src.includes('.mp4')) return 'video/mp4'
    }

    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('tube-layout', TubeLayout)








