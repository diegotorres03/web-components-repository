# Section 1.2: Creating our first web component
In this section we are going to create a component we will call our `secret-card` component. This component will be like our flip-card component, however it will be password protected, so in order to see what is on the other side of the card the user will need to provide an accepted password.

Here we will be taking the html we did in the previus section as starting point for our component, we just need to move that code to a better place to keep our repository organized.

---

## Activity 1.2.1: Create required files
To get started we will need to create some new files and folders. Inside the `src/components` folder create an `index.js` which will be the index for all components created in this lab. And add the following `export` statement to it:
  ```js
  export * from './secret-card'
  ```
Next, create a folder called `src/components/secret-card` and create the following files inside it:
- `index.js` - This will be the access point to our component. Add the following `export` statement to it:
  ```js
  export * from './secret-card'
  ```
- `secret-card.js` - Here we will define our component and its functionality
- `secret-card.html` - Here we will copy and pasted what we did in the previous section
- `secret-card.css` - Any extra style for this component can be added here



When finished, your folder structure should look like this:

- `web-components-app`:
  - `src`:
    - `components`:
      - index.js
      - `secret-card`:
        - index.js
        - secret-card.css
        - secret-card.html
        - secret-card.js

Finally, add the following line to `./src/index.js`:
  ```js
  export * from './components'
  ```

Now that our file and folder structure is ready, move all the HTML inside the `body` tags from our `index.html` from session 1 and paste it into `secret-card.html`. Do not including the `body`, `html` or `header` tags themselves. Save the file.

When we are finished, our `secret-card.html` should look like this:
```html
<!-- this is the html we are moving from index to secret-card.js -->
<flip-card disabled trigger="app-modal" on="accepted" style="width: 500px;">
  <section slot="front">
    <h1>This card holds a secret</h1>
    <small>The secret is on the other side </small>
  </section>

  <section slot="back">
    
    <ui-data-sync trigger="app-modal" on="accepted">
      <h1>Hello <span name="alias"></span></h1>
    </ui-data-sync>

  </section>
</flip-card>

<button id="open-modal-btn" data-attribute="you can use data attributes too">open</button>
<button data-attribute >this one open the modal too</button>

<app-modal trigger="[data-attribute]" on="click">
  <h1 slot="title">Provide a secret</h1>
  <section slot="main">
    <input type="text" name="alias">
  </section>
</app-modal>
```


## Activity 1.2.2: Create SecretCardComponent class
In `secret-card.js` we will now provide the component definition and it's functionality.

First we want to import some dependencies. Add the following lines to import the `html` stored in  `./web-components-app/src/lib/web-tools.js` and create a class named `SecretCardComponent`. This class will extend the native `HTMLElement` class:
  ```js
  import { html } from '../../lib/web-tools'

  export default class SecretCardComponent extends HTMLElement {
    constructor() {
      super()
    }
  }
  ```

Also add the following two import statements to import any HTML and CSS from our newly created secret-card fHTML and CSS files:
  ```js
  ...  
  import componentStyle from './secret-card.css'
  import componentHtml from './secret-card.html'
  ...
  ```

Let's use the imported assets in our component by creating a template and attaching it to the shadow root of the component. We will achieve this by adding the following lines to our `SecretCardComponent` constructor after calling `super()`:
  ```js
      const template = html`
        <style>${componentStyle}</style>
        ${componentHtml}
      `

      // add this to create a new shadow rood for your component, 
      // so you can isolate the internal and external styles and html
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template)
  ```

Finally, register the web component on the browser by calling `window.customElements.define(..., ...)` outside the class:
  ```js
  // here we are registering our component on the browser
  // first argument is how you will use the tag <secret-card>
  window.customElements.define('secret-card', SecretCardComponent)
  ```

When finished, our `secret-card.js` should look like this:
```js
  import { html } from '../../lib/web-tools'
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

Save our updates and let's now we go back to our `index.html` from session 1 and try out the the new component we just created by replacing the previous body content (everything with the body tags) with this single line:
```html
  <secret-card></secret-card>
```
Save your changes.  

The web page should look exactly the same, however if you click either of the buttons you will notice they no longer work. This is because we are now in the context of inside a web component. 



## Activity 1.2.3: Get interactive elements from `secret-card.js`
Lets first clean up the HTML in our `secret-card.html` a little. Since we are going to use JavaScript to handle events, lets remove all `trigger` and `on` attributes, and lets also delete the buttons we created before. Additionally, for the back of the card, lets replace the `ui-data-sync` and its content with our secret. In our example below we are adding a 💰 favicon as our secret, but you can feel free to use your imagination. 

Finally, lets update out `app-modal`. Update the title for something more meaningful such as "Enter password", and we can remove the `<p>..</p>` line completely.
Our `secret-card.html` should now look something like this:
```html
<flip-card disabled style="width: 500px;">
    <section slot="front">
      <h1>This card holds a secret</h1>
      <small>The secret is on the other side </small>
    </section>
  
    <section slot="back">
      <!-- add your secret here -->
      <h1>💰</h1>
    </section>
  </flip-card>
  
  <app-modal>
    <h1 slot="title">Enter password</h1>
    <section slot="main">
      <input type="text" name="alias">
    </section>
  </app-modal>
```


Now we want to select and store a reference for the `flip-card` and `app-modal` elements. Lets do this by adding the following two small chunks of code to our `secret-card.js`.
Fisrt we need 2 [private variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), we will later store references to `app-modal` and `flip-card`:
```js
...
export default class SecretCardComponent extends HTMLElement {

   // 1. Private variables to store a reference to flip-card and modal
   #flipCard
   #modal
   //

   constructor() {
      super()
      const template = html`
         <style>${componentStyle}</style>
         ${componentHtml}
      `
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template)

      // 2. Selecting elements from shadow dom, because the content is inside the shadow root, thats why we select
      // from this.shadowRoot, for slotted content, is just this.querySelector ...
      this.#flipCard = this.shadowRoot.querySelector('flip-card')
      this.#modal = this.shadowRoot.querySelector('app-modal')
      //

   }

}
...
```

Now we are going to listen to the `click` event on the `flip-card`. When this event is detected is should open the modal and ask the user to enter a password. So add the following code to the end of the `SecretCardComponent` constructor: 
```js
...
// when flip card is clicked, show the modal
this.#flipCard.addEventListener('click', event => this.#modal.show())

this.#modal.addEventListener('accepted', event => {
   console.log(event) // data is located on event.detail
})
...
```

Finally, for completeness, in `secret-card.html`, let's change the input type from `name` to `password`:
```html
...
    <input type="password" name="secret">
...
```

Save all changes and go ahead and test them out. When we click on the flip card we should now see our modal pop up and ask us to enter a password which will be star'd out so it is not visible to the user.


## Activity 1.2.4: Get a value from an attribute
So at this point we have defined our secret (💰) on the back side of our flip card and enabled the password protection on the flip card via the modal. The last thing we need to do now is set a password and configure our modal component to verify the password provided in the modal against that password. Lets add a new property called `password` to the `secret-card` component. This is where we will set the password that the modal will validate against. 

In `index.html`, let's add this property (**Note** You can add whatever string you want for the password):
```html
  <secret-card password="mypassword"></secret-card>
```


Now, let's use this value inside the `secret-card.js` file on the handler for the `accepted event` and save our changes:
```js
...
this.#modal.addEventListener('accepted', event => {
  console.log(event)

  // here we are getting the data from the event (secret will be inside)
  const { secret } = event.detail

  // here we are reading the attribute value passed on index.html
  if (secret === this.getAttribute('password'))
      this.#flipCard?.flip()

})
```

So far this is what we have:
`src/components/secret-card.js`
```js
import { html } from '../../lib/web-tools'

import componentStyle from './secret-card.css'
import componentHtml from './secret-card.html'

export default class SecretCarddComponent extends HTMLElement {

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
      console.log(event) // data is located on event.detail

      // here we are getting the data from the event (secret will be inside)
      const { secret } = event.detail

      // here we are reading the attrivute value passed on index.html
      if (secret === t?his.getAttribute('password'))
        this.#flipCard?.flip()

    })

  }
}
// console.log('registering this card')
window.customElements.define('secret-cardd', SecretCarddComponent)
```

`src/components/secret-card.html`
```html
<flip-card disabled style="width: 500px;">
<section slot="front">
    <h1>This card holds a secret</h1>
    <small>The secret is on the other side </small>
</section>

<section slot="back">
    <!-- add your flavor here -->
    <h1>💰</h1>
</section>
</flip-card>

<app-modal>
<h1 slot="title">Do you want to know the secret?</h1>
<section slot="main">
    <p>First, let us know the password</p>
    <input type="password" name="secret">
</section>
</app-modal>
```

`index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <secret-card password="superSecret"></secret-card>

</body>

</html>
```


Now, lets go to the browser. If we refresh it, we should be able to provide our password to the modal, click `Accept` and the flipcard should reveal its content!
![opening modal on click](../assets/secret-card-2.png)
![flip card revealing its secret](../assets/secret-card-3.png)


## Activity 1.2.5: Implement the `trigger` and `on` attributes
Let's enable this component to listen to events from other components by using the `trigger` and `on` attributes.
In order to achieve this, we are going to be using the `registerTriggers` helper function from `web-components-app/src/lib/web-tools.js`. Feel free to explore the source code for this function and any other component used on this workshop.
First, let's import `registerTriggers` in `src/components/secret-card.js` by updating our `import { html }..` line to include `registerTriggers` as shown here:
```js
// this is a set of global tools to simplify development
import { html, registerTriggers } from '../../lib/web-tools'
...
```

Our goal is to register event listeners when the component is mounted on the DOM.
Then call the `registerTriggers` function which, internally, will get all the elements that match the [css selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). Then register a listener for the event specified in the `on` attribute.
We only need to pass a callback function to handle those events.
Here we are using the [connectedCallback](link to doc) life cycle event. This will be called when the component is mounted on the DOM.

So add the following to the end of the `SecretCardComponent`:
```js
  ...
  // this is one of multiple lifecycle callbacks we have for web components
  connectedCallback() {
    registerTriggers(this, () => this.#modal.show())
  }

```

Finally, let's test it in `index.html` by adding a button and configuring `trigger` and `on` attributes in the secret card:
```html
...
<body>

  <button id="reveal-btn">reveal secret</button>
  
  <secret-card trigger="#reveal-btn" on="click" password="mypassword"></secret-card>
  
</body>
...
```

<Add a line or two to recap what has be show>


---

