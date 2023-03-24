
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

const module = {
    set exports(mod) {
        const { currentUrl } = getMyLocation()
        // console.log('sourceUrl', currentUrl.toString())
        const pkgName = currentUrl.toString()
        if (!window.modules) {
            window.modules = {}
        }
        console.log('setting module', pkgName, mod)
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
    console.log(`Requiring: ... ${pkg}`)
    const moduleUrl = moduleList.find(modItem => modItem.includes(pkg))
    return window.modules[moduleUrl]
}

