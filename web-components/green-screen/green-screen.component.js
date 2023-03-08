(function (module) {


  function compareRGB(baseRed, baseGreen, baseBlue, tolerance = 10) {
    return function (red, green, blue) {
      return (
        (red >= baseRed - tolerance && red <= baseRed + tolerance) &&
        (green >= baseGreen - tolerance && green <= baseGreen + tolerance) &&
        (blue >= baseBlue - tolerance && blue <= baseBlue + tolerance)
      )
    }
  }


  class GreenScreenComponent extends HTMLElement {

    constructor() {
      super()
      this.video
      this.videoBackground
      this.c_out
      this.c_tmp
      this.ctx_tmp
    }

    _render() {
      const inner = html`<section>
  <video id="video" width="648" src="${baseUrl}green-screen/green.mp4" controls autoplay muted loop></video>
  <canvas id="output-canvas" width="648" height="380"></canvas>
  <div id="inputs">
    <slot></slot>
  </div>
</section>`
      const shadow = this.attachShadow({ mode: 'open' })
      // this.innerHTML = ''
      shadow.appendChild(inner)
    }

    connectedCallback() {
      this._render()

      const inputSlot = this.shadowRoot.querySelector('#inputs')
      console.log(inputSlot.children)

      this.video = this.shadowRoot.getElementById('video');
      if (!this.video) return
      // this.video.style.display = 'none'
      this.c_out = this.shadowRoot.getElementById('output-canvas');
      this.ctx_out = this.c_out.getContext('2d');
      this.c_tmp = document.createElement('canvas')
      this.c_tmp.setAttribute('width', 800)
      this.c_tmp.setAttribute('height', 450)
      this.ctx_tmp = this.c_tmp.getContext('2d')
      this.video.addEventListener('play', () => this.computeFrame())

      this.videoBackground = document.createElement('video')
      this.videoBackground.src = baseUrl + "green-screen/fire.mp4"
      this.videoBackground.muted = true
      this.videoBackground.autoplay = true

    }

    computeFrame() {
      this.ctx_tmp.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight)
      let frame = this.ctx_tmp.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight)
      this.ctx_tmp.drawImage(this.videoBackground, 0, 0, this.videoBackground.videoWidth, this.videoBackground.videoHeight)
      let frame2 = this.ctx_tmp.getImageData(0, 0, this.videoBackground.videoWidth, this.videoBackground.videoHeight)

      const compareToLight = compareRGB(93, 222, 72, 40)
      // const compareToMedium = compareRGB(120, 177, 72, 20)
      const compareToDark = compareRGB(120, 177, 72, 40)

      for (let i = 0; i < frame.data.length / 4; i++) {
        let r = frame.data[i * 4 + 0]
        let g = frame.data[i * 4 + 1]
        let b = frame.data[i * 4 + 2]
        if (
          compareToLight(r, g, b) ||
          // compareToMedium(r, g, b) ||
          compareToDark(r, g, b)
        ) { // 

          frame.data[i * 4 + 0] = frame2.data[i * 4 + 0]
          frame.data[i * 4 + 1] = frame2.data[i * 4 + 1]
          frame.data[i * 4 + 2] = frame2.data[i * 4 + 2]
          // frame.data[i * 4 + 0] = frame2.data.length < i ? frame2.data[i * 4 + 0] : 0
          // frame.data[i * 4 + 1] = frame2.data.length < i ? frame2.data[i * 4 + 1] : 0
          // frame.data[i * 4 + 2] = frame2.data.length < i ? frame2.data[i * 4 + 2] : 0
          // } else {
          //   frame.data[i * 4 + 0] = 20 // frame2.data[i * 4 + 0]
          //   frame.data[i * 4 + 1] = frame2.data[i * 4 + 1]
          //   frame.data[i * 4 + 2] = frame2.data[i * 4 + 2]
        }
      }

      this.ctx_out.putImageData(frame, 0, 0);
      setTimeout(() => this.computeFrame(), 0);
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

  }

  window.customElements.define('green-screen', GreenScreenComponent)

  module.exports = GreenScreenComponent

})(module)