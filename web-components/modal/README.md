

## steps


1. **create an empty modal**
```html
<app-modal></app-modal>
```


2. **create the button** to be used as trigger to open the modal. Remember to add the `id=""` property with an unique value
```html
<button id="open-modal">open modal!</button>
```


3. **set the button as trigger**, by adding the `trigger="<button id here>"` attribute to the `app-modal`.
You can also spesify the event to listen by passing the event name as value fot the `trigger-event` attribute.
```html
<app-modal id="modal-1" trigger="open-modal-1"></app-modal>
```


4. **let's add some content**  By using the `slot` attribute, we can tell the modal component where to place our content. Valid values are `title`, `main` and `footer`.
```html
  <app-modal trigger="open-modal" trigger-event="click">
        <h1 slot="title">this is the main title</h1>
        <section slot="main">
            <h2>this is the main content</h2>
            <p>feel free to add your html here</p>
        </section>
        <footer slot="footer" >
            <!-- [ ] this is not replacing the footer -->
            <small>this is the foother</small>
        </footer>
    </app-modal>
```















