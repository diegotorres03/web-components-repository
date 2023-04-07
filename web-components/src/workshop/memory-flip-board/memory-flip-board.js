import { html, registerTriggers, updateVars } from '../../global/web-tools'


const emojiList = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
  '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
  '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
  '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
]

const trapEmoji = '🔥🔥🔥'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// .splice(getRandomInt(0, arr.length), 1)


export default class MemoriFlipBoardComponent extends HTMLElement {

  static get observedAttributes() {
    return ['level', 'time', 'preview']
  }

  get level() {
    const level = Number(this.getAttribute('level'))
    return Number.isNaN(level) ? 2 : level
  }

  #flipMap = new Map()
  #openCards = new WeakMap()
  #currentCard
  #waiting = false

  attempts = 0

  constructor() {
    super()



    const template = html`
      <h1>({attempts})</h1>
      <grid-layout gap="1px" columns="${this.level}" rows="${this.level}">
      
      </grid-layout>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.generateComponents()
  }

  generateComponents() {
    const pairs = Math.floor((this.level * this.level) / 2)
    const hasTrap = this.level % 2 === 1
    console.log('generateComponents', pairs, hasTrap)

    let pairArray = []


    for (let pairIndex = 0; pairIndex < pairs; pairIndex++) {
      const emoji = emojiList.splice(getRandomInt(0, emojiList.length), 1).pop()
      // console.log('emoji, pairArray', pairIndex, emoji, pairArray)
      pairArray.push(emoji)
      pairArray.unshift(emoji)
    }

    if (hasTrap) pairArray.push(trapEmoji)

    const getRandomItem = (array) => {
      const randomInt = getRandomInt(0, array.length - 1)
      const item = array.splice(randomInt, 1)
      return item.pop()
    }

    for (let colIndex = 1; colIndex <= this.level; colIndex++) {
      for (let rowIndex = 1; rowIndex <= this.level; rowIndex++) {
        let pairEmoji = getRandomItem(pairArray)
        if (!pairEmoji) pairEmoji
        const flip = html`
          <flip-card disabled id="flip-${rowIndex + ((colIndex - 1) * this.level)}" data-pair-id="${pairEmoji}">
            <span slot="front" style="font-size: 3em;">🃏</span>
            <span slot="back" style="font-size: 3em;">${pairEmoji}</span>
          </flip-card>
        `
        // console.log(flip)
        this.shadowRoot.querySelector('grid-layout').appendChild(flip)
        this.#flipMap.set(`flip-${rowIndex}-${colIndex}`)
      }
    }

    Array.from(this.shadowRoot.querySelectorAll('flip-card'))
      .map(flipItem => {
        this.#openCards.set(flipItem, false)
        return flipItem
      })
      .forEach(flipItem => flipItem.addEventListener('click', event => {
        if (this.#waiting) return
        const flipId = event.target.id
        console.log(event, flipId)
        if (!flipId) return
        console.log(this.shadowRoot.querySelector(`#${flipId}`))
        console.log('this.#openCards', this.#openCards)
        const flipCard = this.shadowRoot.querySelector(`#${flipId}`)
        // flipCard.flip()
        if (!this.#openCards.has(flipCard)) return console.warn('flip card should be here')
        if (!this.#openCards.get(flipCard)) {
          this.#openCards.set(flipCard, true)
          flipCard.flip()
          if(flipCard.dataset.pairId === trapEmoji) {
            this.
            return
          }
          if (this.#currentCard) {
            this.#waiting = true
            setTimeout(() => {
              console.log(this.#currentCard.dataset)
              if (this.#currentCard.dataset.pairId === flipCard.dataset.pairId) {
                this.#currentCard = null
                this.#waiting = false
                return
              }

              this.#openCards.set(flipCard, false)
              this.#openCards.set(this.#currentCard, false)
              this.#currentCard.reset()
              flipCard.reset()
              this.#currentCard = null
              this.#waiting = false
            }, 1_000)
            this.attempts += 1
            updateVars(this)
            return
          }
          this.#currentCard = flipCard
        } else {
          // console.log('else if (this.#openCards.get(flipCard))')
          // this.#openCards.set(flipCard, false)
          // flipCard.flip()
        }
        console.log('this.#openCards', this.#openCards)

      }))

  }

  connectedCallback() {
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  attributeChangedCallback(name, oldValue, newValue) { }

}

window.customElements.define('memory-flip-board', MemoriFlipBoardComponent)
