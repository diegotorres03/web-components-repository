(function (module) {

    class TubeLayout extends HTMLElement {

        title = 'Video Title'
        author = 'Author of this'

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
        
        <link rel="stylesheet" href="${baseUrl}/style-tools.css">
        <link rel="stylesheet" href="${baseUrl}/tube-layout/style.css">
        
        <main class="super-container flex-row">
        
            <section class="main-section">
        
                <video id="player" autoplay controls>
        
                    <!-- <source src="assets/patd-enc.mp4" type="video/mp4"/> -->
        
                </video>
                <div class="video-description flex-col jc-center ">
        
                    <h2>({title})</h2>
                    <p>({author})</p>
        
                </div>
        
            </section>
            <section class="lateral-section">
                <!-- <div>
                                                                                                <input type="text" placeholder="search">
                                                                                            </div> -->
                <div id="video-list"></div>
                <slot name="playlist"></slot>
        
            </section>
        
        </main>`
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.appendChild(inner)

            setTimeout(() => {
                const content = [...this.querySelectorAll('source')]
                console.log(content)
                const container = this.shadowRoot.querySelector('#video-list')
                const player = this.shadowRoot.querySelector('#player')
                const source = content[0].cloneNode(true)
                console.log('source', source, content[0])
                player.appendChild(source)

                content.forEach(item => {
                    const src = item.getAttribute('src')
                    const { author, title } = item.dataset

                    const dataset = `data-source="${src}" data-author="${author}" data-title="${title}"`

                    const header = html`
                    <div class="video-card flex-row" ${dataset} onclick="selectSource" class="video-description flex-col jc-center">
                    
                        <div class="video-poster" ${dataset}>
                            <!-- <img src="./tube-layout/assets/poster.jpg" alt=""> -->
                            <video width="130" src="${src}"></video>
                        </div>
                        <div class="video-description flex-col jc-between" ${dataset}>
                    
                    
                            <!-- <h3>${item.dataset.title}</h3>
                                                <small>${item.dataset.author}</small> -->
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
            updateVars(this)

            // replacing inline handler function with own component methods
            // mapComponentEvents(this, eventNames)

            // get variable names

        }


        selectSource(ev) {
            log(ev.target.parentElement)
            const { source, author, title } = ev.target.parentElement.dataset
            log(source, author, title)
            this.selectedVideoSrc = source
            this.selectedFormat = this.getFormat(source)
            this.author = author
            this.title = title
            // this.captureThumbnail()
        }

        getFormat(src) {
            if (src.includes('.mp4')) return 'video/mp4'
        }

        connectedCallback() { this._render() }

        disconnectedCallback() { }

        attributeChangedCallback(name, oldValue, newValue) { }

        adoptedCallback() { }

    }

    window.customElements.define('tube-layout', TubeLayout)


    module.exports = TubeLayout



})(module)

