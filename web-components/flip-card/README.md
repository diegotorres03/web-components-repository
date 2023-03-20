
# Definition

Flip cards are the cards in your website that will flip when you hover your mouse over them. There will be information, links or images in the back face of the card which will be visible when you hover over the cards.

## Slots
- **front** use it for front card
- **back** use it for back card

## Example

```html
<flip-card>
    <section slot="front" >
        <h1>this is the front</h1>
        <p>this will be the front of the card, add any valid html here</p>
    </section>
    <section slot="back" >
        <h1>this is the back</h1>
        <p>this will be the back of the card, add any valid html here</p>
    </section>
</flip-card>

```

