const eventNames = [
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
    const res = await (await fetch(htmlUrl, { headers: { 'Content-Type': 'text/html' } })).text()
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
                console.log(property, varName, component[property])
                variable.textContent = component[property]
                console.log('component[' + property + ']', component[property])
            }))
}

/**
 *
 *
 * @param {HTMLElement} component
 */
function renderForLoops(component) {
    const templates = toArray(component.shadowRoot.querySelectorAll('template'))
    console.log(templates)
    templates.forEach(template => console.log(template.dataset))
}



function require(packageName) {
    return window.modules[packageName]
}