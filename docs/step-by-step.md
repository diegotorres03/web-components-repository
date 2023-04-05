# Chapter 1: Introduction to Web Components

## Section 1: Using our first components

### Activity 1: Add a flip card
Create a simple `flip-card` and give it some size
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card ></flip-card>
  </div>
```

### Activity 2: Display front and back slots
Add content to `flip-card` by using the `slot` attribute
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card >
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>the secret is in the other side </small>
      </section>

      <section slot="back">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>
```

### Activity 3: Disable flip
Prevent the card from flipping by passing the `disable` attribute
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card disabled>
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>The secret is on the other side </small>
      </section>

      <section slot="back">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>
```


---


## Section 2: Triggers and Events

### Activity 1: Create a button and a modal
Adding a `button` and a `app-modal` and link them together.
`trigger` attribute is a CSS selector and `on` is the event name
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card disabled>
      ...
    </flip-card>
  </div>

  <button>open</button>

  <app-modal>
    <h1 slot="title" >This is the new title</h1>
    <section slot="main" >
      <p>Add html here =)</p>
      <input type="text" name="alias" id="">
    </section>
  </app-modal>

```

### Activity 2: Connect modal to the button
The idea here is that the `button`, when pressed, will emit the `click` event.
We are going to listen to this event by using the `trigger` and `on` attributes on `app-modal`, which is acting as the listener.

The `trigger` attribute is the CSS query for the element(s) this component will be listening to.

The `on` attribute is the event name for the element(s) this component is listening to.
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card disabled>
      ...
    </flip-card>
  </div>

  <button>open</button>

  <app-modal>
    <h1 slot="title" >This is the new title</h1>
    <section slot="main" >
      <p>Add html here =)</p>
      <input type="text" name="alias" id="">
    </section>
  </app-modal>

```


### Activity 3: Connect flip to modal
Link `flip-card` and `app-modal` with the `trigger` attribute
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card disabled trigger="app-modal" on="accepted">
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>The secret is on the other side </small>
      </section>

      <section slot="back">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>

  <button id="open-modal-btn">open</button>

  <app-modal trigger="#open-modal-btn" on="click">
    <h1 slot="title" >Do you want to know the secret?</h1>
    <section slot="main" >
      <p>First, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```

## Activity 4: Reflect event data in the UI
Here we are going to demonstrate how to get the data sent in an event, and how to change a components `textContent` or an attribute.
To implement, create a `data-sync` tag around the HTML you want to update.
Add the `name="propertyName"` property to the `input` or `label` tags, or `data-key="propertyName"` to the other tags. `propertyName` is the key of the data you are receiving.
For example:
```js
const sampleEventData = {
  name: 'Diego',
  favoriteFood: 'Chocolate'
}
``` 
```html
 <ui-data-sync trigger="app-modal" on="accepted">
    <p>Hello <span name="name"></span>!.</p>
    <small><i data-key="favoriteFood"></i> lover.</small> 
  </ui-data-sync>
```
Add `data-sync` and link it to `app-modal`
```html
  <style>
    .flip-card-container {
      width: 500px; 
      height: 300px;  
    }
  </style>
  <div class="flip-card-container">
    <flip-card disabled trigger="app-modal" on="accepted">
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>The secret is on the other side </small>
      </section>

      <section slot="back">
        <ui-data-sync trigger="app-modal" on="accepted">
          <h1>Hello <span name="name"></span></h1>
        </ui-data-sync>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>

  <button id="open-modal-btn">open</button>

  <app-modal trigger="#open-modal-btn" on="click">
    <h1 slot="title" >Do you want to know the secret?</h1>
    <section slot="main" >
      <p>First, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```

---


## Section 3: Creating our first web component

### Activity 1: Create required files
Inside the `src/workshop` folder we will create an `index.js` which will be the index for all components created in this lab
- `index.js` in `src/workshop`
  ```js
  export * from './secret-card'
  ```
Next, create a folder called `secret-card` and create the following files inside it:
- `index.js` - This will be the access point to our component
  ```js
  export * from './secret-card'
  ```
- `secret-card.js` - Here we will define out component and its functionality
- `secret-card.html` - Here we will copy pasted what we did in the previous section
- `secret-card.css` - Any extra style for this component can be added here



Once finished, your folder structure should look like this:

- `cdk repo`:
  - `web-components`:
    - `src`:
      - `workshop`:
        - index.js
        - `secret-card`:
          - index.js
          - secret-card.js
          - secret-card.html
          - secret-card.css


### Activity 2: Copy/paste the HTML and CSS
Copy all the HTML inside the `body` tag (not including the `body` tag itself) into `secret-card.html`. Don't add `body`, `html` or `header` tags.
```html
<div class="flip-card-container">
    <flip-card disabled trigger="app-modal" on="accepted">
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>The secret is in the other side </small>
      </section>

      <section slot="back">
        <ui-data-sync trigger="app-modal" on="accepted">
          <h1>Hello <span name="name"></span></h1>
        </ui-data-sync>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>

  <button id="open-modal-btn">open</button>

  <app-modal trigger="#open-modal-btn" on="click">
    <h1 slot="title" >Do you want to know the secret?</h1>
    <section slot="main" >
      <p>First, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```
If you have any CSS, copy it into `secret-card.css`
```css
  .flip-card-container {
    width: 500px; 
    height: 300px;
  }
```

### Activity 3: Create `SecretCardComponent` class
In `secret-card.js` we will now provide the component definition and it's functionality.
- First we want to import some dependencies. The `html` stored on  `./web-components/src/global/web-tools.js`
  ```js
    import {  html } from '../../../global/web-tools'
  ```
- Next, create a class named `SecretCardComponent`. This class will extend the native `HTMLElement` class.
  ```js
  import {  html } from '../../../global/web-tools'

  export default class SecretCardComponent extends HTMLElement {
    constructor() {
      super()
    }
  }
  ```
- Import the HTML and CSS
  ```js
  import {  html } from '../../../global/web-tools'
  
  import componentStyle from './secret-card.css'
  import componentHtml from './secret-card.html'

  export default class SecretCardComponent extends HTMLElement {
    constructor() {
      super()
    }
  }
  ```
- Lets use the imported assets in our component by creating a template and attaching it to the shadow root of the component
  ```js
  import {  html } from '../../../global/web-tools'

  // import css and html as strings and use it inside the template string
  import componentStyle from './secret-card.css'
  import componentHtml from './secret-card.html'

  export default class SecretCardComponent extends HTMLElement {

    constructor() {
      super()
      const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
      `
       this.attachShadow({ mode: 'open' })
       this.shadowRoot.appendChild(template)
    }

  }
  ```
- Finally, register the web component on the browser by calling 
  ```js
  export default class SecretCardComponent extends HTMLElement {
    ...
  }

  // here we are registering our component on the browser
  // first argument is how you will use the tag <secret-card>
  window.customElements.define('secret-card', SecretCardComponent)
  ```

Here is the whole snippet:
```js
  // this is a set of global tools to simplify development
  import {  html } from '../../../global/web-tools'

  // import css and html as strings and use it inside the template string
  import componentStyle from './secret-card.css'
  import componentHtml from './secret-card.html'

  export default class SecretCardComponent extends HTMLElement {

    constructor() {
      super()
      const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
      `
       this.attachShadow({ mode: 'open' })
       this.shadowRoot.appendChild(template)
    }

  }

  // here we are registering our component on the browser
  // first argument is how you will use the tag <secret-card>
  window.customElements.define('secret-card', SecretCardComponent)

```


### Activity 4: Testing the new `secret-card` tag
Let's we go back to `index.html` and replace the previous content with just this:
```html
  <secret-card></secret-card>
```

## Section 4: Communication from within a component

## Activity 1: remove the `button`, `ui-data-sync` and all the `trigger` and `on` attributes from `secret-card.html`
From within the component, we will be handling events with JavaScript rather than the `trigger` attribute.
```html
<div class="flip-card-container">
    <flip-card disabled>
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>The secret is in the other side </small>
      </section>

      <section slot="back">
        <h1>Hello <span name="name"></span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>


  <app-modal>
    <h1 slot="title" >Do you want to know the secret?</h1>
    <section slot="main" >
      <p>First, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```


## Activity 2: Get interactive elements from `secret-card.js`
Here we want to select and store a reference for the  `flip-card` and `app-modal` elements.
1. 
```js
  // ... imports here

  export default class SecretCardComponent extends HTMLElement {

    // 1. Private variables to store a reference to flip-card and modal
    #flipCard
    #modal

    constructor() {
      super()
      const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
      `
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template)

      // 2. Selecting elements from shadow dom
      this.#flipCard = this.shadowRoot.querySelector('flip-card')
      this.#modal = this.shadowRoot.querySelector('app-modal')

    }

  }

  window.customElements.define('secret-card', SecretCardComponent)

```


## Activity 3: Add event listeners
Now we are going to listen to the `click` event on the `flip-card`. When this event is detected we want to open the modal and ask for a password
```js
export default class SecretCardComponent extends HTMLElement {

  #flipCard
  #modal

  constructor() {
    super()
    const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.#flipCard = this.shadowRoot.querySelector('flip-card')
    this.#modal = this.shadowRoot.querySelector('app-modal')
    
    // when flip card is clicked, show the modal
    this.#flipCard.addEventListener('click', event => this.#modal.show())


    this.#modal.addEventListener('accepted', event => {
      console.log(event) // data is located on event.detail
    })
  }
}
```
In `secret-card.html`, let's change the input from a name type to a password type
```html
  <!-- replace -->
   <app-modal>
     <h1 slot="title">Do you want to know the secret?</h1>
     <section slot="main">
       <p>First, let us know your name</p>
       <input type="text" name="name" id="">
     </section>
   </app-modal>

  <!-- for this -->
   <app-modal>
     <h1 slot="title">Do you want to know the secret?</h1>
     <section slot="main">
       <p>First, let us know the password</p>
       <input type="password" name="secret" id="">
     </section>
   </app-modal>

```

## Activity 4: Get a value from an attribute
Here we want to listen to the `secret-word` property from the `secret-card` component.
In `index.html`, let's add this property:
```html
  <secret-card secret-word="a secret password"></secret-card>
```
Now, let's use this value inside the `secret-card.js` file
```js

export default class SecretCardComponent extends HTMLElement {

  #flipCard
  #modal

  constructor() {
    super()
    const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.#flipCard = this.shadowRoot.querySelector('flip-card')
    this.#modal = this.shadowRoot.querySelector('app-modal')
    
    this.#flipCard.addEventListener('click', event => this.#modal.show())

    this.#modal.addEventListener('accepted', event => {
      console.log(event)
      const { secret } = event.detail
      // this.getAttribute is the way
      if (secret === this.getAttribute('secret-word'))
      this.#flipCard.flip()
    })
  }

}
```

### Activity 5: Implement the `trigger` and `on` attributes
Let's enable this component to listen to events from other components by using `trigger` and `on` attributes.
In order to achieve this, we are going to be using the `registerTriggers` helper function from `web-components/src/global/web-tools.js`. Feel free to explore the source code for this function and any other component used on this workshop.
First, let's import `registerTriggers`
```js
// this is a set of global tools to simplify development
import { html, registerTriggers } from '../../global/web-tools'

import componentStyle from './secret-card.css'
import componentHtml from './secret-card.html'


export default class SecretCardComponent extends HTMLElement {
...
```

Our goal is to register event listeners when the component is mounted on the DOM.
Then call the `registerTriggers` function which, internally, will get all the elements that match the [css selector](doclink). Then register a listener for the event specified on the `on` attribute.
We only need to pass a callback function to handle those events.
Here we are using the [connectedCallback](link to doc) life cycle event. This will be called when the component is mounted on the DOM.

```js
export default class SecretCardComponent extends HTMLElement {

  #flipCard
  #modal


  constructor() {
    super()
    const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.#flipCard = this.shadowRoot.querySelector('flip-card')
    this.#modal = this.shadowRoot.querySelector('app-modal')
    this.#flipCard.addEventListener('click', event => this.#modal.show())
    this.#modal.addEventListener('accepted', event => {
      console.log(event)
      const { secret } = event.detail
      if (secret === this.getAttribute('secret-word'))
      this.#flipCard.flip()
    })
  }

  connectedCallback() {
    registerTriggers(this, () => this.#modal.show())
  }


}

```

Finally, let's test in `index.html`
```html
...
<body>

  <button id="reveal-btn">reveal secret</button>
  
  <secret-card trigger="#reveal-btn" on="click" secret-word="a secret password"></secret-card>
  
</body>
...
```


---


# Chapter 2: Composing apps with Web Components
### Activity x: 

---

end chapter 1

---


```html

```

```html

```

```html

```


---


[back to top](#chapter-1-intro-to-web-components)