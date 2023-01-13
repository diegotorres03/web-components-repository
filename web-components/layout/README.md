
# Layouts web components

this will be a collection of web components that contain pre-defined layouts so users don't need to deal with this.


The envisioned way of use will be something like this

```html
<app-layout>
    <nav slot="top-menu">
        <a href="#item1">menu item 1</a>
        <a href="#item2">menu item 2</a>
        <a href="#item3">menu item 3</a>
        <a href="#item4">menu item 4</a>
    </nav>

    <app-accordion slot="left-menu" >
        <section class="accordion-tab">
            <h1>title 1</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate accusantium officiis, modi
                veritatis</p>
            <button id="open-modal">open</button>
        </section>

        <section class="accordion-tab">
            <h4>some links</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate accusantium officiis, modi
                veritatis</p>
        </section>

        <section class="accordion-tab">
            <h6>title 3</h6>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate accusantium officiis, modi
                veritatis</p>
        </section>

    </app-accordion>

    <app-router slot="main-content" >          
        <app-route class="route" hash="route1" >
            <h1>groups path</h1>
        </app-route>

        <app-route class="route" hash="route2">
            <h1>items path</h1>
        </app-route>

        <app-route class="route" hash="route3">
            <h1>orders path</h1>
        </app-route>
    </app-router>

    <footer slot="footer">
        <span>some links and stuff here</span>
    </footer>

    

</app-layout>

```


# TODO:

- [ ] finish css layout
- [ ] add responsiveness
- [ ] .