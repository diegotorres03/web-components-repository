
// [ ] create/define list of states
/**
 * @typedef AppTpdpTaskAttributes
 * 
 * 
 * @param {string} todo - current status of the task [in progress, blocked, waiting, not assigned] 
 * @param {boolean} done - is the task completed
 * @param {number} reward - reward for completing this task
 * @param {string} owner - who created this taks (the responsable for completion) 
 * @param {string} resolver - who is responsable for handling this taks (the responsable for completion) 
 * @param {string[]} collaborators - who is collaborating (they will be included in the task) 
 * @param {string[]} viewers - who can see this task (they won't be included in the reward)
 * @param {string} due - due date for this task 
 * @param {string} next - suggested next steps
 * @param {string} [dependsOn] - task id for dependecy  
 * 
 *  
 */


/**
 * this element represent a single task, the html defined inside will pass 
 * inside the default slot.
 * recomended to use an <h*> tag for task nanem <p> for task descriptions
 * and any extra information 
 *
 * @class AppTodoTask
 * @extends {HTMLElement}
 */
class AppTodoTask extends HTMLElement {

    static get observedAttributes() {
        return ['done']
    }
    
    constructor() {
        super()

    }

    get status() { return this.getAttribute('status') }

    get done() { return this.getAttribute('done') }
    set done(value) { this.setAttribute('done', value) }

    async _render() {
        const inner = await Promise.resolve( html`<section>
            <input id="is-done" onchange="doneChange" type="checkbox"><b>({status})</b>
            <slot></slot>
        </section>`)
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(inner)

        // const inner = await html.import('test.component.html')

        // replacing inline handler function with own component methods
        mapComponentEvents(this, eventNames)

        // get variable names
        updateVars(this)

    }

    doneChange(event) {
        this.done = event.target.checked
    }


    connectedCallback() { this._render() }

    disconnectedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
        if (!this.shadowRoot) return

        if (name === 'done' && newValue) {
            // this.shadowRoot.querySelector('#is-done').checked = new Boolean(newValue)
        }
    }

    adoptedCallback() { }

}

window.customElements.define('app-todo-task', AppTodoTask)



// const slider = document.querySelector('app-slider')
// const slides = Array.from