import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class JSFunctionComponent extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'done'
  }

  #fn
  #params

  constructor() {
    super()
    const template = html`<slot></slot>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

  run(event) {
    
    if(!this.#params) return  this.#fn(event)

    const [first, ...fnParams] = this.#params
    const fnParamValues = fnParams.map(key => this.dataset[key])
    return this.#fn(event, ...fnParamValues)
  }

  connectedCallback() {
    this.style.display = 'none'
    const fnStr = this.textContent.trim()
    const funSigRegex = /\bfunction\s*\((.*?)\)/g
    const [sigStr, sigParams] = funSigRegex.exec(fnStr)
    const fnBody = fnStr.replace(sigStr, '')
    let content = fnBody.trim()
    content = content.charAt(0) === '{' ? content.replace('{', '') : content
    content = content.slice(0, content.length - 1)
    this.#params = sigParams.split(/[,]/g).map(str => str.trim())
    this.#fn = new Function(...this.#params, content)

    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => this.emit(event))
  }

  emit(event) {
    const res = this.#fn(event)
    this.dispatchEvent(new CustomEvent(this.DEFAULT_EVENT_NAME, {
      bubbles: true, composed: true,
      detail: res,
    }))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('js-fn', JSFunctionComponent)
