
import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'


import componentHtml from './shortcut-panel.html'
import componentStyle from './shortcut-panel.css'

let instance

export default class ShortcutPanelComponent extends HTMLElement {

  get DEFAULT_EVENT_NAME() {
    return 'linkClicked'
  }

  constructor() {
    super()
    instance = this
    const template = html`
    <style>
      ${componentStyle}
    </style>
    ${componentHtml}
  `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)


    // const toggleBtn = this.shadowRoot.querySelector('#toggle')
    // const container = this.shadowRoot.querySelector('.lse-container')

    // toggleBtn.addEventListener('click', e => {

    //   container.classList.toggle("toggle-up")
    //   console.log("o")

    // })

    const settingToggleBtn = this.shadowRoot.querySelector('#setting-toggle')
    const settingContainer = this.shadowRoot.querySelector('.lse-settings')

    settingToggleBtn.addEventListener('click', e => {

      settingContainer.classList.toggle("disabled")
      console.log("o")

    })
  }

  /**
   * Emit expanded event
   *
   * @memberof ShortcutPanelComponent
   */
  expandToggle() {
    const container = this.shadowRoot.querySelector('.lse-container')
    container.classList.toggle("toggle-up")

    const newEvent = new CustomEvent('expandToggled', {
      bubbles: true, composed: true,
      detail: {
        value: !container.classList.contains('toggle-up')
      }
    })

    this.shadowRoot.dispatchEvent(newEvent)
  }

  saveLink() {
    const linkName = this.shadowRoot.querySelector('[name="linkName"]')
    alert('saved ' + linkName.value)
    linkName.value = ''
    console.log(linkName)
  }

  linkClicked(event) {
    const newEvent = new CustomEvent('linkClicked', {
      bubbles: true, composed: true,
      detail: {
        url: event.target.href
      }
    })

    this.shadowRoot.dispatchEvent(newEvent)
  }

  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))

    /* 🌟 Header */
    const header = this.querySelector('header')
    console.log(header)
    if (header) {
      const items = [...header.children]
      console.log(items)

      const appendToList = list => item => {
        console.log(list, item)
        list.appendChild(item)
      }

      const generateListItem = (item) => {
        const li = document.createElement('li')
        li.classList.add('lse-header__link-box')
        li.appendChild(item)
        item.classList.add('lse-header__link')
        return li
      }

      items
        .map(generateListItem)
        .map(item => {
          item.setAttribute('data-folder', 'shortcuts')
          item.addEventListener('click', event => {
            event.preventDefault()
            this.linkClicked(event)
          })
          // item.addEventListener('mouseover') // add more events
          return item
        })
        .map(appendToList(this.shadowRoot.querySelector('#header-nav ul')))
    }

    /* 🌟 Main */
    const main = this.querySelector('main')
    if (main) {
      const mainListContainer = this.shadowRoot.querySelector('#main-list-section')
      const lists = [...main.querySelectorAll('nav')]
      console.log(lists)

      const generateHtml = (list, items) => {
        const folderName = list.getAttribute('name')
        const response = html`<div class="lse-folder__folder">
        

        <h2 class="lse-folder__folder-title">${folderName}</h2>
        <nav data-dragdrop data-role="folder" class="folder__folder-items">
            <!-- <a href="#" title="facebook" class="lse-header__link">fb</a>
            <a href="#" class="lse-header__link">cr</a>
            <a href="#" class="lse-header__link">fc</a>
            <a href="#" class="lse-header__link">fb</a>
            <a href="#" class="lse-header__link">fb</a>
            <a href="#" class="lse-header__link">fb</a> -->

        </nav>
      </div>`

        items.forEach(item => {
          item.classList.add('lse-header__link')
          item.setAttribute('data-folder', folderName)
          item.addEventListener('click', event =>  event => {
            event.preventDefault()
            this.linkClicked(event)
          })

          response.querySelector('nav').appendChild(item)
        })
        return response
      }

      lists.map(list => {
        // const name = list.getAttribute('name')
        console.log(list.getAttribute('name'))
        const items = [...list.children]
        const responsehtml = generateHtml(list, items)
        mainListContainer.appendChild(responsehtml)
      })

    }
    // console.log(this.children)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('shortcut-panel', ShortcutPanelComponent)
