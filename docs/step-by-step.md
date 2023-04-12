# Chapter 1: Introduction to Web Components

## Section 1.1: Using our first components

### Activity 1.1.1: Add a flip card
Create a simple `flip-card` and give it some size:
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

### Activity 1.1.2: Display front and back slots
Add content to `flip-card` by using the `slot` attribute:
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

### Activity 1.1.3: Disable flip
Prevent the card from flipping by passing the `disable` attribute:
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


## Section 1.2: Triggers and Events

### Activity 1.2.1: Create a button and a modal
Add a `button` and an `app-modal` and link them together:
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

### Activity 1.2.2: Connect the modal to the button
The idea here is that the `button`, when clicked, will emit a `click` event.
We are going to listen for this event by using the `trigger` and `on` attributes in `app-modal`, which act as the listener for the click event.

The `trigger` attribute is the CSS query the `app-modal` component will be listening for.

The `on` attribute is the event type the `app-modal` component is listening for.

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

  <app-modal trigger="button" on="click">
    <h1 slot="title" >This is the new title</h1>
    <section slot="main" >
      <p>Add HTML here =)</p>
      <input type="text" name="alias" id="">
    </section>
  </app-modal>

```


### Activity 1.2.3: Connect the flip-card component to the app-modal
Link `flip-card` and `app-modal` with the `trigger` attribute:
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

### Activity 1.2.4: Reflect event data in the UI
Here we are going to demonstrate how to get the data sent in an event, and how to change a components `textContent` or an attribute.
To implement, create a `ui-data-sync` tag around the HTML you want to update.
Add the `name="<'propertyName'>"` property to the `input` or `label` tags, or `data-key="<'propertyName'>"` to the other tags. `propertyName` is the key for the data you are receiving.
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
      <input type="text" name="name">
    </section>
  </app-modal>
```

---


## Section 1.3: Creating our first web component

### Activity 1.3.1: Create required files
Inside the `src/workshop` folder we will create an `index.js` which will be the index for all components created in this lab and add the following 'export' statement to it:
- `index.js` in `src/workshop`
  ```js
  export * from './secret-card'
  ```
Next, create a folder called `secret-card` and create the following files inside it:
- `index.js` - This will be the access point to our component. Add the following 'export' statement to it:
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


### Activity 1.3.2: Move html and CSS to new web component assets
Copy all the HTML inside the `body` tag (not including the `body` tag itself) into `secret-card.html`. Don't add `body`, `html` or `header` tags.
[DIEGO TO DO - need clarification somewhere on the refernce to 'bogy', 'html', 'header'....these are mentioned in the line above but not found anywhere in the instructions so far]
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
Copy the following CSS it into `secret-card.css`
```css
  .flip-card-container {
    width: 500px; 
    height: 300px;
  }
```

### Activity 1.3.3: Create `SecretCardComponent` class
In `secret-card.js` we will now provide the component definition and it's functionality.
- First we want to import some dependencies. Add the following line to import the `html` stored in  `./web-components/src/global/web-tools.js`:
  ```js
    import {  html } from '../../../global/web-tools'
  ```
- Next, create a class named `SecretCardComponent`. This class will extend the native `HTMLElement` class:
  ```js
  import {  html } from '../../../global/web-tools'

  export default class SecretCardComponent extends HTMLElement {
    constructor() {
      super()
    }
  }
  ```
- Import the HTML and CSS:
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
- Lets use the imported assets in our component by creating a template and attaching it to the shadow root of the component:
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
- Finally, register the web component on the browser by calling:
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


### Activity 1.3.4: Testing the new `secret-card` tag
Let's now we go back to `index.html` and use the new component we just created by replacing the previous content with this single line:
```html
  <secret-card></secret-card>
```

## Section 1.4: Communication from within a component

### Activity 1.4.1: Remove the `button`, `ui-data-sync` and all the `trigger` and `on` attributes from `secret-card.html`
From within the component, we will be handling events with JavaScript rather than the `trigger` attribute:
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


### Activity 1.4.2: Get interactive elements from `secret-card.js`
Here we want to select and store a reference for the `flip-card` and `app-modal` elements:
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


### Activity 1.4.3: Add event listeners
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

### Activity 1.4.4: Get a value from an attribute
Here we want to listen to the `secret-word` property from the `secret-card` component.
In `index.html`, let's add this property:
```html
  <secret-card secret-word="a secret password"></secret-card>
```
Now, let's use this value inside the `secret-card.js` file:
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

### Activity 1.4.5: Implement the `trigger` and `on` attributes
Let's enable this component to listen to events from other components by using the `trigger` and `on` attributes.
In order to achieve this, we are going to be using the `registerTriggers` helper function from `web-components/src/global/web-tools.js`. Feel free to explore the source code for this function and any other component used on this workshop.
First, let's import `registerTriggers`:
```js
// this is a set of global tools to simplify development
import { html, registerTriggers } from '../../global/web-tools'

import componentStyle from './secret-card.css'
import componentHtml from './secret-card.html'


export default class SecretCardComponent extends HTMLElement {
...
```

Our goal is to register event listeners when the component is mounted on the DOM.
Then call the `registerTriggers` function which, internally, will get all the elements that match the [css selector](doclink). Then register a listener for the event specified in the `on` attribute.
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

Finally, let's test it in `index.html`:
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

## Section 2.1: Layout components

### Activity 2.1.1: app-layout
Lets create and app layout.
The slot name will be displayed in the browser:
```html
   <app-layout></app-layout>
```

Let's fill the `header`, `left-header`, `left-menu`, `top-menu` and `footer` slots. Here we are adding some titles and a navigation bar on top with 3 routes:
```html
  <style>
    nav a {
      color: var(--main-tone);
      padding: 2px 4px;
    }
  </style>
  <app-layout>
    <header slot="header">Welcome to our memory flip game</header>
    <b slot="left-header">Game stats</b>

    <nav slot="top-menu" class="">
      <a href="#">Home</a>
      <a href="#game">Game</a>
      <a href="#leaderboard">Leaderboard</a>
    </nav>

    <footer slot="footer">Thank you.</footer>
  </app-layout>
```

Now, on the left-content, lets add some components - a `plain-card` on top and an `app-accordion` below:  
```html
   ...
    </nav>

    <section slot="left-content">
      <plain-card></plain-card>
      <app-accordion></app-accordion>
    </section>

    <footer slot="foother">Thank you.</footer>
    ...
```

There are 2 slots in `plain-card` - `title` to add text to upper bar, and `main` to add the content of the card.
Let's add some placeholders for the score:
```html
  <plain-card>
     <h2 slot="title">My Score</h2>
     <section slot="main">
       <b>Best Score:</b><span>0</span>
     </section>
   </plain-card>
```

For the accordion, we only use one slot, so it's not require to specify the slot attribute. Everything passed to this component will be added inside the accordion.
Every item on the accordion should be wrapped on a tag, like `section`, `article` or `div`. Also, the first item should be a <h*> like `h1`, `h2` and so on. This will be adopted as the title on the accordion tab.
Here let's add the instructions for our game:
```html
   <app-accordion>
      <section>
       <h5>Game instructions</h5>
       <p>This is a memory game, where you have to find pairs in a set of cards.</p>
       <p>You will have X minutes to solve multiple challenges and the score will be based on how far you get.</p>
      </section>
      <section>
       <h5>FAQs</h5>
       <b>Question 1:</b>
       <p>Answer 1</p>
       <hr>
       <b>Question 2:</b>
       <p>Answer 2</p>
       <hr>
      </section>
   </app-accordion>
```

So, the `main` slot is the last one to fill, but before doing it, let's talk about routing.


### Activity 2.1.2: Hash routing
In the previous chapter we added 3 links at the top of the page - `home`, `game` and `leaderboard`.
In order to handle them we'll make use of hash routing. In other words, we will display different content with different hashes (#users, #orders and so on) of the url. https://subdomain.domain.tld/route#hash.

To detect and handle these hash changes, we have the `app-router` and `app-route` components.
The first one, `app-router`, is the parent element, and is the one that listens for changes in the url and allows the child `app-route` to activate or not.

Lets add an `app-router` as the main slot:
```html
  ...
         </section>
      </app-accordion>
    </section>

    <app-router slot="main">
      <!-- routes will be here -->
    </app-router>

    <footer slot="footer">Thank you.</footer>
  ...
```

For each individual route, we will use an `app-route`.
This component has the attribute `hash="<hash_rotue>"` to specify when it should be displayed or not.
For the default route, don't specify the `hash` attribute.

Let's add `app-route` for the 3 routes we have:
```html
  ...
   <app-router slot="main">

      <app-route>I'm Home</app-route>
      <app-route hash="game" >I'm Game</app-route>
      <app-route hash="leaderboard" >I'm Leaderboard</app-route>

   </app-router>
  ...
```

and let's add a `hidden` css class"
```css
    .hidden {
      display: none;
    }
```

Now, if you test in your browser, you should be able to navigate and see page changes on your app.

`app-router` emits a `navigated` event when there is a change in the url and it will activate the proper `app-route`.
This `app-route`, when the hash is matched, it will display its content and it will emit the `activated` event.

Let's see this in action by adding an `app-modal` that asks for a username every time we navigate to the `Game` page.
fFrst, let's add an `id` attribute to the game route:
```html
  <app-route id="game-route" hash="game">
```
Then let's add an `app-modal` and set the `trigger` and the `on` attributes:
```html
  ...
   <app-router slot="main">
  
      <app-modal id="username-selection-modal" trigger="#game-route" on="activated">
        <h1 slot="title">Start a new match</h1>
        <section slot="main">
          <p>Ready to start a new match?</p>
          <p>Choose a username and let's play</p>
          <form>
            <label>Username:</label><input type="text" name="username">
          </form>
        </section>
      </app-modal>
  
      <app-route>
  ...
```

On the game route, let's reflect the username.
Let's add an `ui-data-sync` to get the `username` input from `app-modal` and place it inside a `span` tag. 
**Note:** The input name must match the data-key attribute on the desired target element.

```html
   ...
   <app-route id="game-route" hash="game">
     <h1>I'm Game</h1>
     <ui-data-sync trigger="#username-selection-modal" on="accepted" >
       <p>Welcome <span data-key="username"></span></p>
     </ui-data-sync>
   </app-route>
   ...
```

And lastly, lets log every route change in the console.
```html
   ...
   </app-modal>

      <script>
        document
          .querySelector('app-router')
          .addEventListener('navigated', event =>
            console.log(`navigated to ${event.detail.hash || 'home'}`))
      </script>

      <app-route>
   ...
```



### Activity 2.1.3: grid-layout component
on `web-components/src/workshop` create the `grid-layout` folder
then create the `index.js` on `web-components/src/workshop/grid-layout` with the following content:
```js
  export * from './grid-layout'
```
then lets create `grid-layout.js` on the same folder and let's initialize an emtpy component
```js
   import { html, registerTriggers } from '../../../global/web-tools'

   export default class GridLayoutComponent extends HTMLElement {

     constructor() {
       super()
       const template = html``
       this.attachShadow({ mode: 'open' })
       this.shadowRoot.appendChild(template)
     }

     connectedCallback() {
       registerTriggers(this, (event) => console.log(event))
     }

   }

   window.customElements.define('grid-layout', GridLayoutComponent)
```


Now, in order to render the content that is passed between the `<grid-layout>this content </grid-layout>` we need to use a `slot` tag.
Because for our use case, this component will only have one slot, there is no need to specify the slot name when consuming this `grid-layout`

let's go back to the constructor function and add the slot tag
```js
   constructor() {
      super()
      const template = html`<slot></slot>` // here
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template)
   }
```

this will be enogh to test our component,  no grid so far.
On `index.html` lets add the following snippet:

```html
   <grid-layout gap="1px" columns="2" rows="2">
    <flip-card></flip-card>
    <flip-card></flip-card>
    <flip-card></flip-card>
    <flip-card></flip-card>
   </grid-layout>
```
And we should see a 4 by 4 grid of flip cards


### Activity 2.1.4: Memory Flip component


At this point, we are familiar with the process, create a `memory-flip-board` folder on `web-components/src/workshop`. And create the respective `index.js` file to export the component
```js
  export * from './memory-flip-board'
```

We also need to update `web-components/src/workshop/index.js`.
At this point it should look like this:
```js
   export * from './secret-card'
   export * from './grid-layout'
   export * from './memory-flip-board' // add this line
```

Now create `memori-flip-board.js` on `web-components/src/workshop/memory-flip-board`

TODO: do the step by step of this js and at the end, a scritp tag on index and a console.log or a simple `app-modal` to test that `levelup` event is being emited
```js
import { html, registerTriggers, updateVars } from '../../../global/web-tools'


// [ ] Alejo, meta copilit aca

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

  static TRAP_PENALTY = 3

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
      <main>
      
      </main>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    // this.generateComponents()
  }

  generateComponents() {

    const gridContainer = this.shadowRoot.querySelector('main')
    gridContainer.innerHTML = ''

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

    const grid = html`
      <grid-layout gap="1px" columns="${this.level}" rows="${this.level}">
      </grid-layout>
    `

    for (let colIndex = 1; colIndex <= this.level; colIndex++) {
      for (let rowIndex = 1; rowIndex <= this.level; rowIndex++) {
        let pairEmoji = getRandomItem(pairArray)
        if (!pairEmoji) pairEmoji
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

    this.shadowRoot.querySelector('main').appendChild(grid)

    Array.from(this.shadowRoot.querySelectorAll('flip-card'))
      .map(flipItem => {
        this.#openCards.set(flipItem, false)
        return flipItem
      })
      .forEach(flipItem => flipItem.addEventListener('click', event => {
        if (this.#waiting) return
        const flipId = event.target.id
        if (!flipId) return
        const flipCard = this.shadowRoot.querySelector(`#${flipId}`)
        // flipCard.flip()
        if (!this.#openCards.has(flipCard)) return console.warn('flip card should be here')
        if (this.#openCards.get(flipCard)) return
        this.#openCards.set(flipCard, true)
        flipCard.flip()
        if (flipCard.dataset.pairId === trapEmoji) {
          this.attempts += MemoriFlipBoardComponent.TRAP_PENALTY
          return
        }
        if (!this.#currentCard) {
          this.#currentCard = flipCard
          return
        }
        this.#waiting = true
        
        setTimeout(() => {
          if (this.#currentCard.dataset.pairId === flipCard.dataset.pairId) {
            this.#currentCard.setAttribute('data-paired', '')
            flipCard.setAttribute('data-paired', '')
            console.log(this.#currentCard.dataset.pairId, flipCard.dataset.pairId)
            this.#currentCard = null
            this.#waiting = false
            this.#didIWon()
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

      }))

  }


  connectedCallback() {
    updateVars(this)
    registerTriggers(this, (event) => this.showAll(event))

  }

  #didIWon() {
    console.log('#didIWon')
    let yesYoyDid = true
    const allItems = Array.from(this.shadowRoot.querySelectorAll('flip-card'))
    console.log(allItems)
    allItems
      .filter(flipCard => flipCard.dataset.pairId !== trapEmoji)
      .forEach(flipCard => {
        console.log(flipCard, flipCard.dataset, flipCard.hasAttribute('data-paired'))
        yesYoyDid = yesYoyDid && flipCard.hasAttribute('data-paired')
      })

    if (!yesYoyDid) return
    const event = new CustomEvent('done', {
      bubbles: true, composed: true,
      detail: {
        level: this.level,
        attempts: this.attempts,
        username: this.getAttribute('username'),
        time: 0,
      }
    })
    console.log(event)
    this.dispatchEvent(event)
    this.setAttribute('level', this.level + 1)

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'level') return
    // this.level = newValue
    this.generateComponents()
  }

}

window.customElements.define('memory-flip-board', MemoriFlipBoardComponent)

```

## Section 2.2: Data components

### Activity 2.2.1: Data point and data set

A `data-point` tag represents a single data entry. Imagine this as a record in a SQL table.

Data sets are a collection of data points.

We can make the `data-set` listen for events and add the content of `event.detail` or the data attributes from the `event.target`.

Let's see this in action.
When we pass a level, `memory-flip-board` will emit the `levelup` event, we can capture the data from that event to use it later in other parts of the UI.
Create a `data-set` tag under the `memory-flip-board`
```html
   <memory-flip-board id="game-board" level="2"  preview></memory-flip-board>
   ...
   <data-set id="game-current-level
game-current-level" visible trigger="#game-board" on="levelup"></data-set>
```
The `visible` attibute is for dev pourposes, it will allow us to see a changelog of the value.

If you inspect the html of the page, you will see a new `data-point` every time the there is an event on `data-set`
```html
   <data-point id="data-point-1681247878649" visible="" data-level="5" data-__id="data-point-1681246258858"></data-point>
```

the field `id` and `data-__id` is automatically added if none provided, this is the id of the record and shoudl be unique in the page.

Data sets emit an `updated` event when something change.
lets go back to the `app-route` for the `#games` route and lets dynamically update the level on the UI.
```html
   change ...
   <app-route id="game-route" hash="game">
     <h1>I'm Game</h1>
     <ui-data-sync trigger="#username-selection-modal" on="accepted" >
       <p>Welcome <span data-key="username"></span></p>
     </ui-data-sync>
   
   for ...
    <app-route id="game-route" hash="game">

        <!-- This is new -->
        <ui-data-sync trigger="#game-current-level" on="updated">
          <h1>On level <span data-key="level">1</span></h1>
        </ui-data-sync>

        <ui-data-sync trigger="#username-selection-modal" on="accepted">
          <p>Welcome <span data-key="username"></span></p>
        </ui-data-sync>
  ...
```


Now that we have this new tool, lets save all the important information so we don't have to promt the user for it.

First, lets save the username, the one we get when the navigation to game page happends, [on step 2.1.2](#activity-212-hash-routing)

Under our previous `data-set`, lets create a new one, we are going to use the `#username-selection-modal` the one that opens when the #game page is activated
```html
  // username-selection-modal is the modal that pop up every time we navigate to #game
  <data-set id="current-username" trigger="#username-selection-modal" on="accepted" visible ></data-set>
```

On the game route, the `ui-data-sync` that is listening to the same modal, lets switch it to listen to the new `data-set`. Our goal here is to link that UI change to the dataset instead of the modal. (for decoupling)
```html
     change ...    
     <ui-data-sync trigger="#username-selection-modal" on="accepted">
     
     for ...
     <ui-data-sync trigger="#current-username" on="updated">
   ...
```


Lastly, lets add another `data-set` that will act as our game log, this time we will use the `append` attribute to let the data set know that all values should be stored.

Think of a data-set without the append as a regular variable and with the append as an array.
```html
  <data-set id="game-log" visible append trigger="#game-board" on="levelup"></data-set>
```
No extra UI changes for this one just yet

### Activity 2.2.2: Data query

Great! Now we can store data, but we can only create data-points.
In order to delete, update or append we can use the `data-query` component.
This component provide an easy way to perfrom crud operation on data sets.

operations like:
- `get` an item
- `list` items
- `put` an item
- `delete` an item
- `clear` all the items

When a query is perfomed, the result will be delivered as an event, the type of the event will be the same as the type of operation, like the ones in the previous list.

Lets add a query to clear the current username. Inside the `data-set` for `current-username`
lets add a `data-query`
```html
  ...
  <data-set id="current-username" trigger="#username-selection-modal" on="accepted" visible>
    <data-query id="clear-current-user" type="clear" trigger="#logout-btn" on="click">
  </data-set>
  ...
```
And lets add a logout button with the matching id. In the `app-layout` on the `header` slot, lets add the button inside the nav tag
```html
  ...
  <app-layout>

    <header slot="header">Welcome to our memory flip game</header>
    <b slot="left-header">Game stats</b>
    <nav slot="top-menu" class="">
      <a href="#">Home</a>
      <a href="#game">Game</a>
      <a href="#leaderboard">Leaderboard</a>

      <!-- add this button -->
      <button id="logout-btn">logout</button>
    </nav>
 ...
```

for `#get-current-level` data set, we are only using a get query, no trigger for now.
```html
   <data-set id="game-current-level" trigger="#game-board" on="levelup">
      <data-query id="get-current-level" type="get"></data-query>
    </data-set>
```

and for `#game-log`, because this is is appending all events, the if we use `get` it will emit an event with an array of values, if we use `list` instead, it will emit an event for each `data-point`. This is great, so each item will be handled individually. No trigger for now.
```html
  <data-set id="game-log" visible append trigger="#game-board" on="levelup">
    <data-query id="list-game-logs" type="list"></data-query>
  </data-set>
```


### Activity 2.2.3: Data store

Data sets are great! they help us to store state and share it accros our webapp.
The only issue is, they are not persistent, if we refresh the browsers, that data is gone.
would it be nice if we just have a magic tag, that by only wraping our data sets on it, it will store all of it on [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) or [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and it magically integrates with all the `data-query` we alreary wrote...


Introducing... (>\*.\*)> `data-store` <(\*.\*<) 
This component will handle the heavy lifting of setting up IndexedDB and keeping datasets in sync after a refresh.

Lets see it in action!
Create a `data-store` tag with an id of `current-session` and move the `#current-username` and `#game-current-level` data sets inside.
```html
...
<data-store id="current-session">

  <data-set id="game-current-level" trigger="#game-board" on="levelup">
    ...
  </data-set>

  <data-set id="current-username" trigger="#username-selection-modal" on="accepted" visible>
    ...
  </data-set>

</data-store>
...
```

And create another `data-store` for the `#game-log`
```html
...
<data-store id="logs-store">
  <data-set id="game-log" visible append trigger="#game-board" on="levelup">
    ...
  </data-set>
</data-store>
...
```

After this, go to the browser refresh the app, provide a username and open [devtools]() go to storage, and indexeddb. There you should see an entry with the key `current-session_current-username` the value is a json wich contains the username you provided.
![indexeddb screenshot](./assets/indexeddb-1.png)


Play the first level and refresh indexeddb again
![indexeddb screenshot 2](./assets/indexeddb-2.png)

And now we see both data stores and all the data-sets.

_note: the IndexedDB key is composed from the data-store id and the data-set id_

Also notice that datasets will keep their state when refresh
![dataset screenshoot](./assets/indexeddb-3.png)


### Activity 2.2.4: ui sync components

We are already familiar with the `ui-data-sync`, we used a couple of time already, but there are other 2 components we can leverage to make this application interactive.

But first lets warm up with the familiar `ui-data-sync`. Level, username and score are important pieces of information that we want to always keep up to date.

For username, lets update the existing `ui-data-sync`  so it uses the `data-set` as trigger instead of the `app-modal`
```html
from ...
<ui-data-sync trigger="#username-selection-modal" on="accepted">
  <p>Welcome <span data-key="username"></span></p>
</ui-data-sync>
to...
<ui-data-sync trigger="#current-username" on="updated">
  <p>Welcome <span data-key="username"></span></p>
</ui-data-sync>
...
```

And last for this step is to reflect the current score on the `left-content` slot from `app-layout` component:
```html
update ...
<plain-card>
  <h2 slot="title">My Score</h2>
  <section slot="main">
    <b>Best Score:</b><span>0</span>
  </section>
</plain-card>
with this...
<plain-card>
  <h2 slot="title">My Score</h2>
  <section slot="main">

    <ui-data-sync trigger="#game-current-level" on="updated">
      <section>
        <b>Level:</b><span data-key="level"></span><br>
        <b>Attempts:</b><span data-key="attempts"></span><br>
        <b>Username:</b><span data-key="username"></span><br>
      </section>
    </ui-data-sync>

  </section>
</plain-card>
...
```

This works great with single items, but how can we handle when a `data-set` has the `append` attribute. In this case, we can use the `ui-data-repeat` to provide a template that will be used to create every instance of the items send by the dataset.

On the leaderboard route lets create a list of plain cards, each one will represent a new game log from `#game-log` data set.
The html that go inside the `template` tag will be cloned and used for each event.
Remember `data-key` attribute or `name` attribute will be used to let the ui component know where to add the values of the event.

```html
...
<app-route hash="leaderboard">
  <h1>Game log</h1>

  <hr>

  <ui-data-repeat id="game-log-cards" trigger="#game-log" on="updated">
    <template>
      <plain-card>
        <h2 slot="title" data-key="username">username</h2>
        <section slot="main">
          <b>Level:</b><span data-key="level"></span><br>
          <b>Attempts:</b><span data-key="attempts"></span><br>
        </section>
      </plain-card>
    </template>
  </ui-data-repeat>


</app-route>
...
```

## Section 2.3: Event components

### Activity 2.3.1: basic event handling
Here we want to discover different ways we can listen and group events. So far we have done direct connections between an event emitter (like a button) and an event listener (like a modal using the `trigger` attribute).

This is a good approach on simple cases, but sometimes we want the same modal to react to multiple event emitters.
Let's see some examples:

**let's start with the basic**

In this example, we have one `button` and `app-modal`. As a trigger we are passing the id of the button (note the `#`) an the event will be `click`.
```html
  <button id="btn" >click me</button>

  <app-modal trigger="#btn" on="click" ></app-modal>
```

**Now, let's say we need to listen to 2 buttons**

Not an issue! `trigger` accepts any valid CSS selector, so we can do something like this:
```html
  <button id="btn-1" data-modal >click me</button>
  <button id="btn-2" data-modal >or click me</button>

  <app-modal trigger="[data-modal]" on="click" ></app-modal>
```
Here we added a `data-modal` attribute and passed `[data-modal]` as the trigger. By doing this, `app-modal` will listen to any element that has `data-modal` and emits a click event.

**Well! what if the other element emits a different event**

Let's look at this scenario. We currently have a `data-set` and a `data-query`. The issue here is that we want to listen to the `data` event on the `data-set` and `get` on `data-query`.
```html
...
<plain-card>
  ...
  <!-- this component should listen to... -->
  <ui-data-sync trigger="#game-current-level" on="updated">
    ...
...
<!-- this data set and .... -->
<data-set id="game-current-level" trigger="#game-board" on="levelup">
  <!-- this data query. And both emit different events -->
  <data-query id="get-current-level" type="get"></data-query>
</data-set>
...
```


Introducing `event-source` and `event-group`.
With `event-source` we can listen to a trigger and it will emit a new `data` event. In other words, it is acting as the man in the middle in order to decouple the consumers from the producers of events.  


Let's review the initial example with an `event-source`.
Step 1, keep the current event flow, `data-set` is the one updating the `plain-card`.
The only diference is that we are going to add an `event-source` in the middle:
```html
...
<plain-card>
  ...
  <!-- update trigger and event to newly created event-source... -->
  <ui-data-sync trigger="#level-updated" on="data">
    ...
...

<!-- add event source and set the trigger to data-set -->
<event-source id="level-updated" trigger="#game-current-level" on="updated"></event-source>

<!-- no change on data-set -->
<data-set id="game-current-level" trigger="#game-board" on="levelup">
...
```

Now is just a matter of testing in the browser. Test also the functionallity, if you win a match you sould see the updated score.
If we inspect the html, we should see the `event-source`
![event-source tag on html](./assets/event-source-1.png)

Let's do the same for the `data-query`: 
```html
...
<plain-card>
  ...
  <!-- update trigger and event to newly created event-source for the get query -->
  <ui-data-sync trigger="#query-level" on="data">
    ...
...
<!-- add this new event-source and use the query as trigger -->
<event-source id="query-level" trigger="#get-current-level" on="get"></event-source>
<event-source id="level-updated" trigger="#game-current-level" on="updated"></event-source>

<data-store id="current-session">

<data-set id="game-current-level" trigger="#game-board" on="levelup">
  <data-query id="get-current-level" type="get"></data-query>
...
```

In this case, our score won't be updated when we clear a level, because we are no longer listening to the `memory-flip-board`. Instead we are waiting on the `data-query` to react to an event. 
Ideally, we want this query to execute when the page loads, so we can get the data saved by `data-store` on [IndexedDB](). Luckly for us, `event-source` tags can react to a `load` even on `window`.

Lets implement this change:
```html
...
<!-- add this new event-source and use the query as trigger -->
<event-source id="on-load" trigger="window" on="load"></event-source>

...

<data-set id="game-current-level" trigger="#game-board" on="levelup">
  <!-- set the new event source #on-load as trigger -->
  <data-query id="get-current-level" type="get" trigger="#on-load" on="data"></data-query>
...
```

To test this, lets refresh the browser play a couple of levels and then refresh again.
You should see the highest level achieve there.
![updated ui screenshot](./assets/event-source-2.png)



### Activity 2.3.2: working with multiple event flows

As we learned in the previous activity, the `event-source` tag acts as a mediator. It listens to events from a source and then immediately emits a data event with the values passed from the previous event.

If you need to group multiple events and capture them, you can use the `event-group`. This element automatically subscribes to all children event sources and emits a `data` event for each event received from the `event-source`.

Let use it to group the `data-query` and the `data-set` to always refresh the score
```html
...
<event-group id="level-group">
  <event-source id="query-level" trigger="#get-current-level" on="get"></event-source>
  <event-source id="level-updated" trigger="#game-current-level" on="updated"></event-source>
</event-group>
...
```

and lets update the `plain-card` for current score and we should be able to see changes while we play and also that change should still be there if we refresh:
```html
...
<plain-card>
  ..
    <!-- update trigger to new event-group id -->
    <ui-data-sync trigger="#level-group"  on="data">
...
```

**Note:** _if you need to delete items on IndexedDB, on devtools, go to storage then IndexedDB then look for the item you want to delete, right click, then delete_
![delete item from idexeddb](./assets/indexeddb-4.png)

That was easy, right!
Lets do it again, this time, lets keep the game log up to date with each score emmited by the `memory-flip-board`.

First, locate the `data-store` with id=`logs-store`. Here we will se the `data-set` and `data-query`. We want both events to activate the `ui-data-repeat` on the leaderboard page. And we also want the query to be executed on page load.
```html
...
<!-- create event-group with event-source for data-set and data-query -->
<event-group id="all-game-logs">
  <event-source trigger="#list-game-logs" on="list" ></event-source>
  <event-source trigger="#game-log" on="updated" ></event-source>
</event-group>

<!-- this is what we already have -->
<data-store id="logs-store">
  <data-set id="game-log" visible append trigger="#game-board" on="levelup">
    <!-- Add on-load trigger so query execute on page load -->
    <data-query id="list-game-logs" type="list" trigger="#on-load" on="data"></data-query>
  </data-set>
</data-store>
...
```

Then, on the `leaderboard` route, lets go to the `ui-data-repeat` and change the trigger to the `event-group`:
```html
...
<ui-data-repeat id="game-log-cards" trigger="#all-game-logs" on="data">
...
```

Now you can play all you want and you will see how many matches have you played on that browser.


### Activity 2.3.3: 







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