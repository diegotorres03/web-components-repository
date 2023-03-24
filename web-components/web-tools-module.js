


(function (module, require) {


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

    // const baseUrl = 'https://d1s7mo6ry5mnzt.cloudfront.net'
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

    function mapComponentEvents(component, eventNames) {
        // log(component)
        mapComponentEvents.eventNames.map(eventName => {
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

    mapComponentEvents.eventNames = eventNames

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


    module.exports = {
        html,
        gql,
        wait, sleep,
        mapComponentEvents,
        updateVars,
        registerTriggers,
        renderForLoops,
        // xx,
        log, error, warn,
    }


})(module, require)