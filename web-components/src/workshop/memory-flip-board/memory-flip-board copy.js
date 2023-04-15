// import { html, registerTriggers, updateVars } from '../../global/web-tools'


// // [ ] Alejo, meta copilit aca

// const emojiList = [
//   '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
//   '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
//   '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
//   '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
//   '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
// ]

// const trapEmoji = '🔥🔥🔥'

// function getRandomInt(min, max) {
//   min = Math.ceil(min)
//   max = Math.ceil(max)
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// function getRandomItem(array) {
//   const randomInt = getRandomInt(0, array.length - 1)
//   const item = array.splice(randomInt, 1)
//   return item.pop()
// }

// export default class MemoriFlipBoardComponent extends HTMLElement {

//   static TRAP_PENALTY = 3

//   static get observedAttributes() {
//     return ['level', 'time', 'preview']
//   }

//   get level() {
//     const level = Number(this.getAttribute('level'))
//     return Number.isNaN(level) ? 2 : level
//   }

//   // #flipMap = new Map()
//   #openCards = new WeakMap()
//   #currentCard
//   #waiting = false

//   attempts = 0

//   constructor() {
//     super()
//     const template = html`
//       <h1>({attempts})</h1>
//       <main>
      
//       </main>
//     `
//     this.attachShadow({ mode: 'open' })
//     this.shadowRoot.appendChild(template)

//     // this.generateComponents()
//   }

//   generateComponents() {
//     this.#drawGridElements()
//     this.#registerFlipCardListeners()
//   }


//   connectedCallback() {
//     updateVars(this)
//     registerTriggers(this, (event) => this.showAll(event))
//   }

//   #drawGridElements() {

//     const gridContainer = this.shadowRoot.querySelector('main')
//     gridContainer.innerHTML = ''

//     const pairCount = Math.floor((this.level * this.level) / 2)
//     const hasTrap = this.level % 2 === 1
//     console.log('generateComponents', pairCount, hasTrap)

//     let pairArray = []


//     for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
//       const emoji = emojiList.splice(getRandomInt(0, emojiList.length), 1).pop()
//       pairArray.push(emoji)
//       pairArray.unshift(emoji)
//     }

//     if (hasTrap) pairArray.push(trapEmoji)



//     const grid = html`
//       <grid-layout gap="1px" columns="${this.level}" rows="${this.level}">
//       </grid-layout>
//     `

//     for (let colIndex = 1; colIndex <= this.level; colIndex++) {
//       for (let rowIndex = 1; rowIndex <= this.level; rowIndex++) {
//         let pairEmoji = getRandomItem(pairArray)
//         // if (!pairEmoji) pairEmoji
//         const id = `flip-${rowIndex + ((colIndex - 1) * this.level)}`
//         const flip = html`
//             <flip-card disabled id="${id}" data-pair-id="${pairEmoji}">
//               <span slot="front" style="font-size: 3em; user-select: none;">🃏</span>
//               <span slot="back" style="font-size: 3em; user-select: none;">${pairEmoji}</span>
//             </flip-card>
//         `
//         // console.log(flip)
//         grid.firstChild.appendChild(flip)
//         // this.#flipMap.set(id, false)
//       }
//     }

//     this.shadowRoot.querySelector('main').appendChild(grid)

//   }

//   #registerFlipCardListeners() {
//     Array.from(this.shadowRoot.querySelectorAll('flip-card'))
//       .map(flipItem => {
//         this.#openCards.set(flipItem, false)
//         return flipItem
//       })
//       .forEach(flipItem => flipItem.addEventListener('click', event => {
//         if (this.#waiting) return
//         const flipId = event.target.id
//         if (!flipId) return
//         const flipCard = this.shadowRoot.querySelector(`#${flipId}`)
//         // flipCard.flip()
//         if (!this.#openCards.has(flipCard)) return console.warn('flip card should be here')
//         if (this.#openCards.get(flipCard)) return
//         this.#openCards.set(flipCard, true)
//         flipCard?.flip()
//         if (flipCard.dataset.pairId === trapEmoji) {
//           this.attempts += MemoriFlipBoardComponent.TRAP_PENALTY
//           return
//         }
//         if (!this.#currentCard) {
//           this.#currentCard = flipCard
//           return
//         }
//         this.#waiting = true

//         setTimeout(() => {
//           this.#checkPair()
//         }, 1_000)

//         this.attempts += 1
//         updateVars(this)
//         return

//       }))
//   }

//   #checkPair() {
//     // pair was found
//     if (this.#currentCard.dataset.pairId === flipCard.dataset.pairId) {
//       this.#currentCard.setAttribute('data-paired', '')
//       flipCard.setAttribute('data-paired', '')
//       console.log(this.#currentCard.dataset.pairId, flipCard.dataset.pairId)
//       this.#currentCard = null
//       this.#waiting = false
//       this.#didIWon()
//       return
//     }

//     // pair wasn't found
//     this.#openCards.set(flipCard, false)
//     this.#openCards.set(this.#currentCard, false)
//     this.#currentCard?.reset()
//     flipCard?.reset()
//     this.#currentCard = null
//     this.#waiting = false
//   }

//   #didIWon() {
//     console.log('#didIWon')
//     let yesYoyDid = true
//     const allItems = Array.from(this.shadowRoot.querySelectorAll('flip-card'))
//     allItems
//       .filter(flipCard => flipCard.dataset.pairId !== trapEmoji)
//       .forEach(flipCard => {
//         console.log(flipCard, flipCard.dataset, flipCard.hasAttribute('data-paired'))
//         yesYoyDid = yesYoyDid && flipCard.hasAttribute('data-paired')
//       })

//     if (!yesYoyDid) return
//     const event = new CustomEvent('levelup', {
//       bubbles: true, composed: true,
//       detail: {
//         level: this.level,
//         attempts: this.attempts,
//         username: this.getAttribute('username'),
//         time: 0,
//       }
//     })
//     this.dispatchEvent(event)
//     this.setAttribute('level', this.level + 1)
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name !== 'level') return
//     // this.level = newValue
//     this.generateComponents()
//   }

// }

// window.customElements.define('memory-flip-board', MemoriFlipBoardComponent)
