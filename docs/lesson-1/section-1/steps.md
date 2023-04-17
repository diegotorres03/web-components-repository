
# Section 1.1: Using our first components

In this section, we want to understand the basics of how web componets are used and how we should keep those considerations in mind when implementing our components.

Before we begin, in this lesson we want to understand how to get data from a component, and how to pass data to a component.


### **passing data to a component:**

1. The ideal mechanism to pass data to a component is by using `attributes`, in this case we are constricted to a simple values (no comples json objects the way you migth do it when using a framework)
   ```html
    <user-card username="Diego" alias="diegotrs" photo="https://path-to.photo"></user-card>
   ```
2. If complex data must be passsed, we can also leverage the hability to pass html to a component.
   ```html
    <user-card alias="diegotrs">
        <data-set name="interests">
            <data-point name="archery" since="2004" />
            <data-point name="web development" since="2006"  />
            <data-point name="purpose built databases" since="2010"  />
            <data-point name="Serverless" since="2014"  />
        </data-set>
    <user-card>
   ```

3. If you want to add data to an native element, you can always use the `data-` attributes, those will be attached to the element and you can capture them on the event:
4. In order to get data from an element, the prefered way is to listen to an event, remember, if data attributes are present in the element, they will be carried on the event:
   ```html
   
    <button id="user-btn" data-name="diego" data-last="torres">click me!</button>


    <script>
        const btn = document.querySelector('#user-btn')
        
        // you can access dataset directly if you have the element
        console.log(btn.dataset)

        btn.addEventListener('click', event => {

            // or get the element on event.target and then access the dataset
            // this is usefull when event is passed to other elements
            console.log(event.target.dataset)
        })
    </script>
    
   ``` 


---


## Activity 1.1.1: Add a flip card
Create a simple `flip-card` in your [index.html](../index.html) by adding the following line to the `<body>` section:
```html
<flip-card style="width: 500px;"></flip-card>
```
Now save your changes and refresh your browser. Congratulations, you have just added your first web component! Move your mouse over the flip card to interact with it. Also, feel free to adjust the width value if you want to play with the size of the flip card.

Now lets add content to our `flip-card` by using the `slot` attribute. Add the following to the `<flip-card>` section, save and refresh the browser page:
```html
...
  <section slot="front">
    <h1>This card holds a secret</h1>
    <small>The secret is on the other side </small>
  </section>

  <section slot="back">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
  </section>
...
```
Perfect! Now we have some content added! 

Additionally, lets prevent the card from flipping when we move our mouse over it by passing the `disable` attribute:
```html
<flip-card disabled style="width: 500px;">
...
</flip-card>
```


---




## Activity 1.1.2: Create a button and a modal
Lets build on this now by adding a `button` and a `modal` to our web page. 

For the modal content, we are going to use the slots `title` and `main`. (**Note**: at this stage the button and the modal are not connected. We will come to that later). Add the following `button` and `app-modal` html under the `<flip-card>` section of our index.html file, save and refresh our browser page:
```html
...
<button>open</button>

<app-modal>
   <h1 slot="title" >This is the new title</h1>
   <section slot="main" >
      <p>Add text here</p>
      <input type="text" name="alias">
   </section>
</app-modal>
```

Our click button should now appear on the page. Notice however that when you click it it does nothing. Lets change that so when we click on it our modal will appear. The idea here is that the `button`, when clicked, will emit a `click` event. We are going to listen for this event by using the `trigger` and `on` attributes in `app-modal`, which act as the listener for the click event.

The `trigger` attribute is the CSS query the `app-modal` component will be listening for.

The `on` attribute is the event type the `app-modal` component is listening for.

So lets update our `app-modal` definition to include `trigger` and `on` attributes as follows: 

```html
...
<app-modal trigger="button" on="click">
...
```

Now if you click on the button again, this time our modal should appear!


The issue with this however is, because we have specified `button` as the trigger for our modal, this modal will get triggered any time any button on the page is clicked. So lets see how to add more granularity to control what action each button triggers if we decide to add multiple buttons to our page. We'll accomplish this using the `id` attribute.

Update our `button` and `app-modal` component definitions as follows:
```html
...
<button id="open-modal-btn">open</button>

<app-modal trigger="#open-modal-btn" on="click">
...
```

However, if we want multiple different buttons to trigger the same action, we can accomplish this using data attributes as follows. Go ahead and try it:
```html
...
<button id="open-modal-btn" data-attribute="you can use data attributes too">open</button>
<button data-attribute >this one open the modal too</button>

<app-modal trigger="[data-attribute]" on="click">
...
```

---



## Activity 1.1.3: Connect the flip-card to the app-modal
First, lets connect our flip-card component to our app-modal component so when we click `accept` in our modal it will flip our flip-card! Update our `flip-card` definition as follows and try it out:
```html
...
<flip-card disabled trigger="app-modal" on="accepted"  style="width: 500px;">
  ...
</flip-card>
...
```

Now that thats working, we are going to demonstrate how to get the data sent in an event, and how to change a components `textContent` or an attribute, so add some text in the text box on our app-modal and click accept we should see our flip card update. 

Inside the back slot section, lets replace the `<p>..</p>` section with the following `ui-data-sync`. Don't forget to save and refresh the browser page:
```html
...
<flip-card disabled trigger="app-modal" on="accepted">
   ...
   <section slot="back">

     <!-- adding this ui-data-sync and listening to the accepted event from app-modal -->
     <ui-data-sync trigger="app-modal" on="accepted">
       <h1>Hello <span name="alias"></span></h1>
     </ui-data-sync>

...
```
Now when you click a button, enter some text in the text box, click `Accept` and see what happens!

**Note:** We are going to cover `ui-data-sync` in more detail later on the lab.


**Final Snippet**
If you have been following along so far, here is what your `index.html` should look like:
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
    <h1 slot="title">This is the new title</h1>
    <section slot="main">
      <p>Add html here =)</p>
      <input type="text" name="alias">
    </section>
  </app-modal>

</body>

</html>
```


---

