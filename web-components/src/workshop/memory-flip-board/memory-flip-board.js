// import { html, registerTriggers, updateVars } from '../../global/web-tools'
import {
  html,
  getRandomInt,
  getRandomItem,
} from '../../global/web-tools'

const emojiList = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
  '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
  '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
  '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
]

const trapEmoji = '🔥🔥🔥' // this will be used when odd number of cards are present

export default class MemoriFlipBoardComponent extends HTMLElement {

  static get observedAttributes() {
    return ['level', 'time', 'preview']
  }

  get level() {
    const level = Number(this.getAttribute('level'))
    return Number.isNaN(level) ? 2 : level // if level is not a number, set a defaul value of 2
  }

  attempts = 0
  #waiting
  #currentCard

  constructor() {
    super()
    const template = html`<main></main>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'level') return // we are only interested on the level attribute
    console.log(name, oldValue, newValue) // lets explore this values

    this.generateComponents()
  }

  generateComponents() {
    console.log(`generating components`)
    this.#drawGridElements()
    this.#registerFlipCardListeners()
  }

  #drawGridElements() {
    console.log('drawing', this.level)

    // 1. get the main tag from this component and empty it
    const gridContainer = this.shadowRoot.querySelector('main')
    gridContainer.innerHTML = ''

    // 2. let see how many pairs can we fit according to the level
    const pairCount = Math.floor((this.level * this.level) / 2)

    // 3. lets create an empty array to hold all the emojis that will be used this round
    const pairArray = []

    // 4. lets randomly select elements from the
    for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
      const emoji = emojiList.splice(getRandomInt(0, emojiList.length), 1).pop()

      pairArray.push(emoji)// adding the emoji at the end of the array
      pairArray.unshift(emoji) // and at the begining, we want 2 cards with the same emoji
    }

    // 5. if level is odd, lets add a trap card, add the trap emoji to the list
    const hasTrap = this.level % 2 === 1
    if (hasTrap) pairArray.push(trapEmoji)

    // 6. lets create the grid-layout that will hold the flip cards
    const grid = html`
     <grid-layout gap="1px" columns="${this.level}" rows="${this.level}">
     </grid-layout>
   `

    // 7. we got all we need, lets loop and print
    for (let colIndex = 1; colIndex <= this.level; colIndex++) {
      for (let rowIndex = 1; rowIndex <= this.level; rowIndex++) {

        let pairEmoji = getRandomItem(pairArray) // getting a random emoji from array
        // if (!pairEmoji) pairEmoji
        const id = `flip-${rowIndex + ((colIndex - 1) * this.level)}`
        const flip = html`
              <flip-card disabled id="${id}" data-pair-id="${pairEmoji}">
                <span slot="front" style="font-size: 3em; user-select: none;">🃏</span>
                <span slot="back" style="font-size: 3em; user-select: none;">${pairEmoji}</span>
              </flip-card>
          `
        console.log(flip)
        grid.firstChild.appendChild(flip)
      }
    }

    // 9. last, lets append the grid to the main tag of this component
    this.shadowRoot.querySelector('main').appendChild(grid)

  }

  #registerFlipCardListeners() {

    // 1. get all the flip-card elements
    const flipcards = Array.from(this.shadowRoot.querySelectorAll('flip-card'))

    // 2. lets loop trough all the flip-card and add an event listener
    flipcards
      .forEach(flipItem => flipItem.addEventListener('click', event => {

        // if we are in the waitin stage, exit the function to prevent
        // unexpected behaviour
        if (this.#waiting) return

        // getting the flip-card from the event
        let flipCard = event.target.tagName === 'FLIP-CARD' ? event.target : event.target.parentElement

        // we will use the data-flipped to keep track of wich cards are flipped and wich one not
        if (flipCard.hasAttribute('data-flipped')) return
        

        flipCard?.setAttribute('data-flipped', '')
        flipCard?.flip()

        // if we flip the trap car, lets add 3 to the score as penalty
        if (flipCard.dataset.pairId === trapEmoji) {
          this.attempts += 3
          return
        }

        // if this.#currentCard doesn't exist, it means is the first move
        // we will exit the function and wait for the second flip
        if (!this.#currentCard) {
          this.#currentCard = flipCard
          return
        }


        // this flag will help us prevent calling this method while the animation is running
        this.#waiting = true

        // now lets wait 1s beforche checking if the first and second cards match.
        // we want to wait so the user can keep track of what is happening on the browser
        setTimeout(() => {

          // if the current card and the new flip card have the same pairId
          // it means we found a pair =D
          if (this.#currentCard.dataset.pairId === flipCard.dataset.pairId) {
            this.#currentCard.setAttribute('data-paired', '')
            flipCard.setAttribute('data-paired', '')

            // we can reset this values to move forward with the next pair
            this.#waiting = false
            this.#currentCard = null

            // check if you won the match with this move. 
            // We will implement this method in the next activity
            this.#checkIfWon()

            return
          }

          // if the cards didn't match, lets remove the data-flipped attribute
          // so we know those cards still in play
          flipCard.removeAttribute('data-flipped')
          this.#currentCard.removeAttribute('data-flipped')

          // calling the reset() method, will take the flip-card to its original step
          this.#currentCard.reset()
          flipCard.reset()

          // we can reset this values to move forward with the next pair
          this.#waiting = false
          this.#currentCard = null
        }, 1_000)

        this.attempts += 1
        // updateVars(this)
        return

      }))
  }

  #checkIfWon() {
    // temporary variable
    let yesYoyDid = true

    // get all flip cards as an array
    Array.from(this.shadowRoot.querySelectorAll('flip-card'))

      // removing trap card if present
      .filter(flipCard => flipCard.dataset.pairId !== trapEmoji)

      // updating the temporary variable, 
      //if one item don't have the data-paired attribute this will return false and the game will continue
      .forEach(flipCard => {
        console.log(flipCard, flipCard.dataset, flipCard.hasAttribute('data-paired'))
        yesYoyDid = yesYoyDid && flipCard.hasAttribute('data-paired')
      })

    // if we didn't won, lets keep playing
    if (!yesYoyDid) return

    // if we won. lets emit the levelup event, so other components
    // can react to this change
    const event = new CustomEvent('levelup', {
      bubbles: true, composed: true,
      detail: {
        level: this.level,
        attempts: this.attempts,
      }
    })
    this.dispatchEvent(event)

    // and lets auto increase the level attribute
    this.setAttribute('level', this.level + 1)
  }

}

window.customElements.define('memory-flip-board', MemoriFlipBoardComponent)