

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

            <video id="player" controls poster="https://external-preview.redd.it/STwA0sOSKsOWQkaJjqizA60k-CkBqa_8VnKuzK5BpPg.jpg?auto=webp&v=enabled&s=cca9d3ea128e72071cc46fc96a00c0ad98690260">
                <source src="assets/patd-enc.mp4" type="video/mp4"/>
            </video>
            <div class="video-description flex-col jc-center ">
                <h2>Emperor's New Clothes</h2>
                <p>Panic! At The Disco</p>
            </div>

        </section>
        <section class="lateral-section">
            <div id="metalo-aca"></div>
            <button onclick="test" ></button>
            <slot name="playlist"></slot>

        </section>

    </main>`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(inner)

        setTimeout(()=> {
            const content = [...this.querySelectorAll('source')]
            console.log(content)
            const container =this.shadowRoot.querySelector('#metalo-aca')
                
            content.forEach(item => {
                const header = html`
                    <!-- <h1 data-source="${item.getAttribute('src')}" onclick="selectSource" >${item.dataset.title}</h1> -->
                    <!-- <video poster="assets/63f849e296743.jpeg">
                        <source src="${item.getAttribute('src')}" type="video/mp4"/>
                    </video> -->
                    <div data-source="${item.getAttribute('src')}" onclick="selectSource" class="video-description flex-col jc-center">
                        <h3>Shakira & Karol G - TQG</h3>
                        <small>Lorem ipsum dolor sit amet.</small>
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
        log(ev.target.parentElement.dataset.source)
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








