```html
<mobile-layout>
  <!-- Menú inferior donde se coloca un div con los botones a utilizar -->
  <div slot="nav-menu">
    <button>😀</button>
    <button>😂</button>
  </div>

  <!-- Slot=main + class=section-card obtiene un estilo especial -->
  <div
    slot="main"
    class="section-card"
  >
    <h2>Main content</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi maiores
      repellat aliquam veniam temporibus eos mollitia ipsa vel!
    </p>
  </div>

  <!-- cta coloca un color llamativo el elemento -->
  <div
    slot="main"
    class="section-card cta"
  >
    <h3>Important content</h3>
    <p>Lorem ipsum dolor sit, amet consectetur</p>
  </div>

  <div
    slot="main"
    class="section-card"
  >
    <h3>Other content</h3>
    <p>Lorem ipsum dolor sit, amet consectetur</p>
  </div>
</mobile-layout>
```
