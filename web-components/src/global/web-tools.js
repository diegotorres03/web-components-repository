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
  return new Promise((resolve) => setTimeout(resolve, time))
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
    const regexRes = Array.from(str.matchAll(/[^{\}]+(?=})/g))
    regexRes.forEach(
      (res) =>
        (str = str.replace(
          `({${res}})`,
          `<span class="variable ${res}-var">${res}</span>`,
        )),
    )
  }
  // str = str.replace(/[^{}]*(?=\})/g, 'fuck yeah')
  template.innerHTML = str.trim()

  return template.content.cloneNode(true)
}

function mapComponentEvents(component) {
  const EVENT_NAMES = [
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
  // log(component)
  EVENT_NAMES.map((eventName) => {
    Array.from(component.shadowRoot.querySelectorAll(`[${eventName}]`)).forEach(
      (handled) => {
        const handlerName = handled.getAttribute(eventName)
        handled.addEventListener(eventName.replace('on', ''), (event) => {
          component[handlerName](event)
          updateVars(component)
        })
        handled.removeAttribute(eventName)
      },
    )
  })
}

function updateVars(component) {
  const variables = Array.from(
    component.shadowRoot.querySelectorAll('.variable'),
  )
  variables.forEach((variable) =>
    Array.from(variable.classList)
      .filter((item) => item !== 'variable')
      .forEach((varName) => {
        const property = varName.replace('-var', '')
        variable.textContent = component[property]
      }),
  )
}

/**
 *
 *
 * @param {HTMLElement} component
 */
function renderForLoops(component) {
  const templates = Array.from(
    component.shadowRoot.querySelectorAll('template'),
  )
  templates.forEach((template) => console.log(template.dataset))
}

///// GraphQL
function gql(templates, ...values) {
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
  const selector = element.getAttribute('trigger')
  const triggers = Array.from(document.querySelectorAll(selector))

  if (!triggers) return
  let triggerEvent = element.getAttribute('trigger-event')

  triggers.map((trigger) => {
    if (!triggerEvent) triggerEvent = trigger.DEFAULT_EVENT_NAME || 'click'
    trigger.addEventListener(triggerEvent, callback)
  })

  return triggers
}

function select(selector, scope = document) {
  return scope.querySelector(selector)
}

function selectAll(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector))
}

module.exports = {
  html,
  mapComponentEvents,
  renderForLoops,
  sleep,
  updateVars,
  gql,
  registerTriggers,
  select,
  selectAll,
}
