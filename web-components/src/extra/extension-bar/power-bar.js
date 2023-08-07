
import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../lib/web-tools'


import componentHtml from './power-bar.html'
import componentStyle from './power-bar.css'



let instance

export default class LinkSaverExtensionComponent extends HTMLElement {

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

    const settingToggleBtn = instance.shadowRoot.querySelector('#setting-toggle')
    const settingContainer = instance.shadowRoot.querySelector('.lse-settings')

    instance.shadowRoot.querySelector('#expandToggle-btn')
      .addEventListener('click', event => {
        const container = instance.shadowRoot.querySelector('.lse-container')
        container.classList.toggle("toggle-up")
      })

    instance.shadowRoot.querySelector('#saveLink-btn')
      .addEventListener('click', event => {
        console.log(event)
        const linkName = instance.shadowRoot.querySelector('[name="linkName"]')
        linkName.value = ''
        console.log('linkName', linkName)
      })

    settingToggleBtn.addEventListener('click', e => {

      settingContainer.classList.toggle("disabled")
      console.log("o")

    })


    // mapComponentEvents(this)
    // updateVars(this)
    // registerTriggers(this, (event) => console.log(event))

    console.log('instance', instance)
    registerTriggers(instance, (event) => console.log(event))

    /* 🌟 Header */
    const header = instance.querySelector('header')
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
            const modelName = window.location.pathname.replace(/[\/]/g, '')
            const { amount } = event.target.dataset
            tip(modelName, amount, '😘')
            console.log(event.target.dataset)
          })
          // item.addEventListener('mouseover') // add more events
          return item
        })
        .map(appendToList(instance.shadowRoot.querySelector('#header-nav ul')))
    }/**/

    /* 🌟 Main */
    const main = instance.querySelector('main')
    if (main) {
      const mainListContainer = instance.shadowRoot.querySelector('#main-list-section')
      const lists = [...main.querySelectorAll('nav')]
      console.log(lists)

      const generateHtml = (list, items) => {
        // const folderName = list.getAttribute('name')
        const folderName = list.dataset.name
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
          item.addEventListener('click', event => {
            // event.preventDefault()
            // console.log()
            // here navigate to models page
            // instance.linkClicked(event)
          })

          response.querySelector('nav').appendChild(item)
        })
        return response
      }

      lists.map(list => {
        // const name = list.getAttribute('name')
        // console.log(list.getAttribute('name'))
        const items = [...list.children]
        const responsehtml = generateHtml(list, items)
        mainListContainer.appendChild(responsehtml)
      })

    }/**/
  }


  saveLink() {
    const linkName = instance.shadowRoot.querySelector('[name="linkName"]')
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

    instance.shadowRoot.dispatchEvent(newEvent)
  }

  connectedCallback() {
    // mapComponentEvents(this)
    // updateVars(this)

    // console.log(instance.children)
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('power-bar', LinkSaverExtensionComponent)
