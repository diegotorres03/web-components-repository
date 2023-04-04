creating a simple `flip-card` and giving it some size
```html
  <div style="width: 500px; height: 300px;">
    <flip-card ></flip-card>
  </div>
```

adding content to `flip-card` by using the `slot` attribute
```html
  <div style="width: 500px; height: 300px;">
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

preventing card to flip by passing the `disable` attribute
```html
  <div style="width: 500px; height: 300px;">
    <flip-card disabled>
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


adding `button`, a `app-modal` and linking them toguether.
`trigger` attibute is a css selector, `on` is the event name
```html
  <div style="width: 500px; height: 300px;">
    <flip-card disabled>
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>the secret is in the other side </small>
      </section>

      <section slot="back">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>

  <button id="open-modal-btn">open</button>

  <app-modal trigger="#open-modal-btn" on="click">
    <h1 slot="title" >This is the new title</h1>
    <section slot="main" >
      <p>add html here =)</p>
      <input type="text" name="alias" id="">
    </section>
  </app-modal>

```

linking `flip-card` and `app-modal` with `trigger` attribute
```html
  <div style="width: 500px; height: 300px;">
    <flip-card disabled trigger="app-modal" on="accepted">
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>the secret is in the other side </small>
      </section>

      <section slot="back">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, blanditiis eius. Ea ipsum minus, amet commodi, delectus iure dolorem quasi doloribus cum facilis hic illum! Cupiditate est doloremque vero delectus.</p>
      </section>
    </flip-card>
  </div>

  <button id="open-modal-btn">open</button>

  <app-modal trigger="#open-modal-btn" on="click">
    <h1 slot="title" >Do you want to know the secret</h1>
    <section slot="main" >
      <p>But first, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```

adding `data-sync` and also linking it to app-modal
```html
  <div style="width: 500px; height: 300px;">
    <flip-card disabled trigger="app-modal" on="accepted">
      <section slot="front">
        <h1>This card holds a secret</h1>
        <small>the secret is in the other side </small>
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
    <h1 slot="title" >Do you want to know the secret</h1>
    <section slot="main" >
      <p>But first, let us know your name</p>
      <input type="text" name="name" id="">
    </section>
  </app-modal>
```


end chapter 1

---


```html

```

```html

```

```html

```