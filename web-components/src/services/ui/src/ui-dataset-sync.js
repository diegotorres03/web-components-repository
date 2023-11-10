import {
    html,
    mapComponentEvents,
    updateVars,
    registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

/**
 * take the detail of an event and make it data- attributes on the child elements
 *
 * @export
 * @class UIDatasetSyncComponent
 * @extends {HTMLElement}
 */
export default class UIDatasetSyncComponent extends HTMLElement {

    constructor() {
        super()
        const template = html`<slot></slot>`
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template)
    }


    connectedCallback() {
        mapComponentEvents(this)
        updateVars(this)
        registerTriggers(this, (event) => this.#syncData(event))
    }

    #syncData(event) {
        const children = Array.from(this.children)
        const data = {
            ...event.detail, 
            ...event.target.dataset, 
            value: event.target.value
        }
        
        console.log(event)
        console.log(data)
        console.log('children', children)
        if(!children) return 
        children.forEach(child => {
            console.log('child', child, data)
            Object.keys(data).forEach(key => {
                console.log('updating dataset', data, child, `data-${key}`, data[key])
                child.setAttribute(`data-${key}`, data[key])
            })
        })
    }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    adoptedCallback() { }

}

window.customElements.define('ui-dataset-sync', UIDatasetSyncComponent)
