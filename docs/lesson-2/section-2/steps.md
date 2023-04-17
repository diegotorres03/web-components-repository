## Section 2.2: Creating a statefull component

### Activity 2.2.1: Memory flip game

Here, we want to create a component that will draw the boar for our memory game.
This componente will be used in this way, and every time we change the level attribute we want to update the component to reflect the new level.
```html
<memory-flip-board id="game-board" level="2"></memory-flip-board>
```

At this point, we are familiar with the process, create a `memory-flip-board` folder on `web-components-app/src/components`. And create the respective `index.js` file to export the component
```js
  export * from './memory-flip-board'
```

We also need to update `web-components-app/src/components/index.js`.
At this point it should look like this:
```js
   export * from './secret-card'
   export * from './grid-layout'
   export * from './memory-flip-board' // add this line
```

Before the `export class ...` lets add an array full of emojist, they will be used as the images on our memory game:
```js
...
// add this after the impors ...
const emojiList = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
  '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
  '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
  '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
]

const trapEmoji = '🔥🔥🔥' // this will be used when odd number of cards are present
...
```

Now create `memory-flip-board.js` on `web-components-app/src/components/memory-flip-board` with an empty web component:
```js
import { 
  html, 
  registerTriggers, 
  getRandomInt, 
  getRandomItem, 
  updateVars 
} from '../../lib/web-tools'

export default class MemoriFlipBoardComponent extends HTMLElement {
  constructor() {
    super()
    const template = html`<main></main>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }

}

window.customElements.define('memory-flip-board', MemoriFlipBoardComponent)
```

Now, in order to detect changes on the `level` attribute, we will use the [lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) api provided by the Web components standar.

In this case, we will use the `attributeChangedCallback` to detect changes on some attributes. Wich attribute you might be asking...
Well the ones we tell JavaScript to observe.
On `memory-flip-board.js` lets add a static property to our class:
```js
  ...
  // add this before class constructor
  static get observedAttributes() {
    return ['level', 'time', 'preview']
  }
  ...
```

and lets add the `attributeChangedCallback` method after the constructor and let add a `generateComponents` method after that. Every time the attribute change we want to call the `generateComponents` method
```js
  // name is the name of the attribute that changed
  // oldValue represent the previous value
  // new value represents the current value for the attribute
  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'level') return // we are only interested on the level attribute
    console.log(name, oldValue, newValue) // lets explore this values

     this.generateComponents()
  }

  generateComponents() {
    console.log(`generating components`)
    // we will add more code here later
  }
  
```

on `index.html` lets replace the old `grid-layout` for the new `memory-flip-board`
```html
<!-- replace this -->
<grid-layout gap="1px" columns="2" rows="2">
   <flip-card></flip-card>
   <flip-card></flip-card>
   <flip-card></flip-card>
   <flip-card></flip-card>
</grid-layout>

<!-- for this -->
<memory-flip-board id="game-board" level="2"></memory-flip-board>
```

Now, if go to the browser, navigate to `#game` page and inspect the html, we should see our `memory-flip-board`:
![memory-flip-board-1](./assets/memory-flip-board-1.png)

lets go ahead and double click on the level attribute and lets change the value to `3`, we should se the console log with the new value:
![memory-flip-board-2](./assets/memory-flip-board-2.png)


### Activity 2.2.2: Generating content dynamically

Because the value of the attribute `level` is very important, and it will be used many times, lets create a [getter property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#using_getters_in_classes) to avoid writing `this.getAttribute('level')` and having to convert this value from string to number. This will be done before the constructor:
```js
  ...
  get level() {
    const level = Number(this.getAttribute('level'))
    return Number.isNaN(level) ? 2 : level // if level is not a number, set a defaul value of 2
  }
  ...
```

The way we will access this is by simply calling `this.level` as a regular property. We will see an example soon.


Now that we see that change is detected, lets go ahead and implement the `drawGridElements` private method:
```js
...
  #drawGridElements() {

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
        // console.log(flip)
        grid.firstChild.appendChild(flip)
        this.#flipMap.set(id, false)
      }
    }

    // 9. last, lets append the grid to the main tag of this component
    this.shadowRoot.querySelector('main').appendChild(grid)

  }
...
```

And lets call this method inside `generateComponents`
```js
  ...
  generateComponents() {
    console.log(`generating components`)
    this.#drawGridElements()
  }
  ...
```

so far, our component code should look similar to this:
`memory-flip-board.js`
```js
import {
  html,
  registerTriggers,
  getRandomInt,
  getRandomItem,
  updateVars
} from '../../lib/web-tools'
const emojiList = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
  '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
  '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
  '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
]

const trapEmoji = '🔥🔥🔥' // this will be used when odd number of cards are present

export default class MemoriFlipBoardComponent2 extends HTMLElement {

  static get observedAttributes() {
    return ['level', 'time', 'preview']
  }

  get level() {
    const level = Number(this.getAttribute('level'))
    return Number.isNaN(level) ? 2 : level
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
    if (name !== 'level') return
    console.log(name, oldValue, newValue)

    this.generateComponents()
  }

  generateComponents() {
    console.log(`generating components`)
    this.#drawGridElements()
  }

  #drawGridElements() {
    console.log('drawing', this.level)

    const gridContainer = this.shadowRoot.querySelector('main')
    gridContainer.innerHTML = ''

    const pairCount = Math.floor((this.level * this.level) / 2)

    const pairArray = []

    for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
      const emoji = emojiList.splice(getRandomInt(0, emojiList.length), 1).pop()

      pairArray.push(emoji)
      pairArray.unshift(emoji)
    }

    const hasTrap = this.level % 2 === 1
    if (hasTrap) pairArray.push(trapEmoji)

    const grid = html`
     <grid-layout gap="1px" columns="${this.level}" rows="${this.level}">
     </grid-layout>
   `

    for (let colIndex = 1; colIndex <= this.level; colIndex++) {
      for (let rowIndex = 1; rowIndex <= this.level; rowIndex++) {

        let pairEmoji = getRandomItem(pairArray) 
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

    this.shadowRoot.querySelector('main').appendChild(grid)
  }

}

window.customElements.define('memory-flip-board-2', MemoriFlipBoardComponent2)
```

And with this, we should be able to see the grid of flip cards back on the game tag

![memory-flip-board-3](./assets/memory-flip-board-3.png)

Lets change the level attribute and we should see how the board increases or decreases flip cards accordingly.
![memory-flip-board-4](./assets/memory-flip-board-4.png)


### Activity 2.2.3: Registering event listeners

Now, all the flipcards are in the board, but we can't interact with them.
Lets proceed in this activity to add the require event listeners to flip cards and detect when a pair is found.

First, lets add some properties before the constructor, we will use them later:
```js
  ...
  attempts = 0
  #waiting
  #currentCard
  ...
```

Now lets add the private method `#registerFlipCardListeners()`, here we want to check if the user has found a pair (2 cards with the same emoji), if so, we want to mark those cards as paired, if not, just flip them back:
```js
  ...
  #registerFlipCardListeners() {

    // 1. get all the flip-card elements
    const flipcards = Array.from(this.shadowRoot.querySelectorAll('flip-card'))

    // 2. lets loop trough all the flip-card and add an event listener
    flipcards
      .forEach(flipItem => flipItem.addEventListener('click', event => {

        // 3. if we are in the waitin stage, exit the function to prevent
        // unexpected behaviour
        if (this.#waiting) return

        // 4. getting the flip-card from the event
        let flipCard = event.target.tagName === 'FLIP-CARD' ? event.target : event.target.parentElement


        // 5. we will use the data-flipped to keep track of wich cards are flipped and wich one not
        if (flipCard.hasAttribute('data-flipped')) return


        flipCard?.setAttribute('data-flipped', '')
        flipCard?.flip()

        // 6. if we flip the trap car, lets add 3 to the score as penalty
        if (flipCard.dataset.pairId === trapEmoji) {
          this.attempts += 3
          return
        }

        // 7. if this.#currentCard doesn't exist, it means is the first move
        // we will exit the function and wait for the second flip
        if (!this.#currentCard) {
          this.#currentCard = flipCard
          return
        }


        // 8. this flag will help us prevent calling this method while the animation is running
        this.#waiting = true

        // 9. now lets wait 1s beforche checking if the first and second cards match.
        // we want to wait so the user can keep track of what is happening on the browser
        setTimeout(() => {

          // 10. if the current card and the new flip card have the same pairId
          // it means we found a pair =D
          if (this.#currentCard.dataset.pairId === flipCard.dataset.pairId) {
            this.#currentCard.setAttribute('data-paired', '')
            flipCard.setAttribute('data-paired', '')

            // 11. we can reset this values to move forward with the next pair
            this.#waiting = false
            this.#currentCard = null

            // 12. check if you won the match with this move. 
            // We will implement this method in the next activity
            this.#checkIfWon()

            return
          }

          // 13. if the cards didn't match, lets remove the data-flipped attribute
          // so we know those cards still in play
          flipCard.removeAttribute('data-flipped')
          this.#currentCard.removeAttribute('data-flipped')

          // 14. calling the reset() method, will take the flip-card to its original step
          this.#currentCard.reset()
          flipCard.reset()

          // 15. we can reset this values to move forward with the next pair
          this.#waiting = false
          this.#currentCard = null
        }, 1_000)

        // 16 increasing attempt counter
        this.attempts += 1
        return

      }))
  }
  ...
```

### Activity 2.2.4: Emiting event from within the component

The last step we need in order to make our game playable, is identify when we won the match, in other words, when all the pairs have been found. Once this happend, we want to emit a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) with the scores for the current level.

Lets implement this functionallity, lets create the `#checkIfWon()` method:
```js
  #checkIfWon() {
    // 1. temporary variable
    let yesYoyDid = true

    // 2. get all flip cards as an array
    Array.from(this.shadowRoot.querySelectorAll('flip-card'))
      
      // 3. removing trap card if present
      .filter(flipCard => flipCard.dataset.pairId !== trapEmoji)
    
      // 4. updating the temporary variable, 
      //if one item don't have the data-paired attribute this will return false and the game will continue
      .forEach(flipCard => {
        console.log(flipCard, flipCard.dataset, flipCard.hasAttribute('data-paired'))
        yesYoyDid = yesYoyDid && flipCard.hasAttribute('data-paired')
      })

    // 5. if we didn't won, lets keep playing
    if (!yesYoyDid) return

    // 6. if we won. lets emit the levelup event, so other components
    // can react to this change
    const event = new CustomEvent('levelup', {
      bubbles: true, composed: true,
      detail: {
        level: this.level,
        attempts: this.attempts,
      }
    })
    this.dispatchEvent(event)

    // 7. and lets auto increase the level attribute
    this.setAttribute('level', this.level + 1)
  }

```

lets take a final look of the `memory-flip-board` files
**memory-flip-board.js**
```js
import {
  html,
  getRandomInt,
  getRandomItem,
} from '../../lib/web-tools'
const emojiList = [
  '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒',
  '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌭', '🍔', '🍟',
  '🍕', '🌮', '🍧', '🍦', '🥧', '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉',
  '🎱', '🏓', '🏸', '🏒', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛷',
  '⛸️', '🏂', '🎤', '🎼', '🎹', '🪘', '🥁', '🎷', '🎺', '🪗', '🎸', '🎻',
]

const trapEmoji = '🔥🔥🔥' // this will be used when odd number of cards are present

export default class MemoriFlipBoardComponent2 extends HTMLElement {

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

window.customElements.define('memory-flip-board-2', MemoriFlipBoardComponent2)
```

This is how it should be looking:
![memory-flip-board-5](./assets/memory-flip-board-5.png)

And if we won this match, we should automatically see the next level:
![memory-flip-board-6](./assets/memory-flip-board-6.png)

