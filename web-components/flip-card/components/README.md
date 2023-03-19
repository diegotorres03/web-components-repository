






## steps

1. **create an empty flip card**, this will create an empty flip card with sample text inside, the card will flip when the mouse is over the card.
```html
<flip-card></flip-card>
```

2. **add content**, use the `slot` attibute and se to `front` or `back` accordingly.
```html
    <flip-card>
        <section slot="front">
            <h1>Hover to reveal more options</h1>
            <small>nexts steps behind this card</small>
        </section>

        <div slot="back">
            <button id="open-modal-1">open modal 1</button>
            <button id="open-modal-2">open modal 2</button>
        </div>
    </flip-card>
```



