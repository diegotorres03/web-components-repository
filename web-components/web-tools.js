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
    // console.log(err.stack)
    // const [sourcePathRaw, consumerPahtRaw] = err.stack.toString().split(/\r\n|\n/)
    // const [sourceFunction, sourceUrl] = sourcePathRaw.split('@').map(item => item.replace(/:\d+:\d+/gi, ''))
    // const consumerPath = consumerPahtRaw.replace('@', '').replace(/:\d+:\d+/gi, '')
    // console.log(sourceFunction, sourceUrl)
    // const consumerUrl = new URL(consumerPath)


    const traces = err.stack.toString().split(/\r\n|\n/)
    const currentLocation = traces
        .filter(trace => trace.charAt(0) === '@')
        .map(trace => trace.slice(1).replace(/:\d+:\d+/gi, ''))
        .pop()

    // console.log('currentLocation', currentLocation)
    currentUrl = new URL(currentLocation)

    const sourceLocationRaw = traces[0]
    const [sourceFunction, sourceLocation] = sourceLocationRaw.split('@').map(item => item.replace(/:\d+:\d+/gi, ''))
    const sourceUrl = new URL(sourceLocation)
    // console.log('source', sourceLocation)

    return { sourceUrl, currentUrl, sourceFunction }
}

const module = {
    set exports(mod) {
        console.log('setting module', mod)
        const { currentUrl } = getMyLocation()
        console.log('sourceUrl', currentUrl.toString())
        const pkgName = currentUrl.toString()
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

    // if package name
    if(!packageName.includes('./')) return window.modules[packageName]

    // if url 
    const { currentUrl } = getMyLocation()
    const relativeUrl = new URL(packageName + '.js', currentUrl.toString())
    // console.log('relativeUrl', relativeUrl.toString())
    console.log('require', relativeUrl.toString())
    return window.modules[relativeUrl.toString()]
}
