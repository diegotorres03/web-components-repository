import { mapComponentEvents, updateVars, registerTriggers, html } from "../../../global/web-tools.js";
import FlipCardHtml from "./flip-card.html";
import FlipCardCss from "./flip-card.css";


class FlipCard extends HTMLElement {
  constructor() {
    super();

    const template = html`
      <style>
        ${FlipCardCss}
      </style>
      ${FlipCardHtml}
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template);

  }

  conectedCallback() {
    console.log("conectedCallback!!const eventNames = [
    'onclick',
    'ondblclick',
    'onabort',
    'onanimationcancel',
    'onauxclick',
    'onchange',
    'onclose',
    'onkeydown',
    'onkeyup',
    'onkeypress',
    'onload',
    'onmouseleave',
    'onmouseenter',
    'onmousemove',
    'onmouseover',
]

const toArray = Array.from
const { log, error, warn } = console

const baseUrl = 'https://d1s7mo6ry5mnzt.cloudfront.net'
// const baseUrl = './'


/**
 * Creates idle time for a given period of time (in millisecotds).
 * Return a promise, use .then() or use async await
 *
 * @example
 * async funtion run() {
 *      console.log('starting function')
 *      await sleep()
 *      console.log('this will print after default time')
 * }
 *
 * @param {number} [time=300]
 * @returns {Promise}
 */
function sleep(time = 300) {
    return new Promise(resolve => setTimeout(resolve, time))
}


// document.createElement('button').
function html(templates, ...values) {
    const template = document.createElement('template')
    let str = ''
    templates.forEach((template, index) => {

        str += template
        str = values[index] ? str + values[index] : str
    })
    if (str.match(/[^{}]*(?=\})/g)) {
        const regexRes = toArray(str.matchAll(/[^{\}]+(?=})/g))
        regexRes.forEach(res => str = str.replace(`({${res}})`, `<span class="variable ${res}-var">${res}</span>`))
    }
    // str = str.replace(/[^{}]*(?=\})/g, 'fuck yeah')
    template.innerHTML = str.trim()

    return template.content.cloneNode(true)
}

html.import = async (htmlUrl) => {
    console.trace()
    const headers = {}
    console.log('headers', headers)
    const res = await (await fetch(htmlUrl, { headers })).text()
    return html`${res}`
}

const mapComponentEvents = (component, eventNames) => {
    // log(component)
    eventNames.map(eventName => {
        toArray(component.shadowRoot.querySelectorAll(`[${eventName}]`))
            .forEach(handled => {
                const handlerName = handled.getAttribute(eventName)
                handled.addEventListener(eventName.replace('on', ''), event => {
                    component[handlerName](event)
                    updateVars(component)
                })
                handled.removeAttribute(eventName)
            })
    })
}

function updateVars(component) {
    const variables = toArray(component.shadowRoot.querySelectorAll('.variable'))
    variables.forEach(variable =>
        toArray(variable.classList)
            .filter(item => item !== 'variable')
            .forEach(varName => {
                const property = varName.replace('-var', '')
                variable.textContent = component[property]
            }))
}


/**
 *
 *
 * @param {HTMLElement} component
 */
function renderForLoops(component) {
    const templates = toArray(component.shadowRoot.querySelectorAll('template'))
    templates.forEach(template => console.log(template.dataset))
}



function wait(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time))
}


///// GraphQL
const gql = function (templates, ...values) {
    let str = ''
    templates.forEach((template, index) => {
        str += template
        str = values[index] ? str + values[index] : str
    })
    return str.trim()
}

function getMyLocation() {
    const err = new Error('test error')

    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi
    const traces = err.stack.toString()
        .split(/\r\n|\n/)
        .filter(trace => urlRegex.test(trace))
        .map(trace => trace.match(urlRegex).pop().replace(/:\d+:\d+/gi, '').replace(/[()]/gi, ''))

    const currentLocation = traces.pop()

    try {
        currentUrl = new URL(currentLocation)
    } catch (err) { log('pillao 1', err) }

    // const sourceLocationRaw = traces[0]
    const sourceLocation = traces.shift()

    let sourceUrl
    try {
        // log(sourceLocation)
        sourceUrl = new URL(sourceLocation)
    } catch (err) { log('pillao 2', err) }

    return { sourceUrl, currentUrl }
}


/**
 * registrer triggers for an element
 * this is what enable the trigger="css_selector" and trigger-event="click"
 * on elements like <app-modal trigger="css_selector" and trigger-event="click">
 *
 * @param {HTMLElement} element
 * @param {Function} callback
 */
function registerTriggers(element, callback) {
    if (!element.hasAttribute('trigger')) return
    // [ ] change this from accepting an ID to accept a query selector, in this way, multiple actions can open the same modal
    const selector = element.getAttribute('trigger')
    const triggers = Array.from(document.querySelectorAll(selector))
    // const triggerId = '#' + this.getAttribute('trigger')
    // const trigger = document.querySelector(triggerId)

    console.log(triggers)
    if (!triggers) return
    const triggerEvent = element.getAttribute('trigger-event') || 'click'

    triggers.map(trigger =>
        trigger.addEventListener(triggerEvent, callback))

    // alert('trigger:' + this.getAttribute('trigger'))

}

const module = {
    set exports(mod) {
        const { currentUrl } = getMyLocation()
        // console.log('sourceUrl', currentUrl.toString())
        const pkgName = currentUrl.toString()
        if (!window.modules) {
            window.modules = {}
        }
        // console.log('setting module', pkgName, mod)
        window.modules[pkgName] = mod
    }
}


/**
 *
 *
 * @param {string} packageName
 * @return {*}
 */
function require(packageName) {

    // if(packageName.includes('http://') || packageName.includes('https://'))

    // if package name
    if (!packageName.includes('./')) return window.modules[packageName]

    // if url
    const moduleList = Object.keys(window.modules)
    const pkg = packageName.replace(/^[./]/i, '')
    const moduleUrl = moduleList.find(modItem => modItem.includes(pkg))
    return window.modules[moduleUrl]
}
")
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, this.flip);
  }

  flip() {
    const flipcard = this.shadowRoot.querySelector(".flip-card");
    // log(flipcard.classList)
    flipcard.classList.toggle("active");
    // log(flipcard.classList)
    this.dispatchEvent(
      new CustomEvent("flipped", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

export default FlipCard;
