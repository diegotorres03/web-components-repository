import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools';

import componentHtml from './app-layout.html';
import componentCss from './app-layout.css';
import globalStyles from '../../../global/style-tools.css';

export default class AppLayoutComponent extends HTMLElement {
  static get observedAttributes() {
    return ['hide-left'];
  }

  get isHidden() {
    //
    return (
      this.shadowRoot.querySelector('[data-left-content-hide]').style
        .display === 'none'
    );
  }

  constructor() {
    super();
    const template = html`
      <style>
        ${globalStyles}
      </style>
      <style>
        ${componentCss}
      </style>
      ${componentHtml}
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template);
    this.setupResize();
  }

  // 15-08-23
  // showLeftContent() {
  //   const leftContent = this.shadowRoot.querySelector(
  //     '[data-left-content-hide]',
  //   );
  //   leftContent.style.display = 'flex';
  // }

  // hideLeftContent() {
  //   const leftContent = this.shadowRoot.querySelector(
  //     '[data-left-content-hide]',
  //   );
  //   leftContent.style.display = 'none';
  //   console.log('leftContent', leftContent);
  // }

  setupResize() {
    // this.querySelector || this.shadowRoot....
    // Seleccionar los elementos del DOM
    const resizerElement = this.shadowRoot.querySelector('.resizer');
    const sideBarElement = this.shadowRoot.querySelector('.al-split__left');
    const toggle = this.shadowRoot.querySelector('#hidder-btn');

    // Función para inicializar el redimensionamiento
    const initializeResizer = (resizerElement, sideBarElement) => {
      let initialMouseX, initialWidth;
      // Controlador de evento 'mousedown'
      const handleMouseDown = (event) => {
        // Almacenar la posición inicial del mouse en initialMouseX
        initialMouseX = event.clientX;

        // Obtener el ancho actual de la barra lateral
        const sidebarWidth = window.getComputedStyle(sideBarElement).width;
        initialWidth = parseInt(sidebarWidth, 10);

        // Agregar listeners para los eventos 'mousemove' y 'mouseup'
        this.shadowRoot.addEventListener('mousemove', handleMouseMove);
        this.shadowRoot.addEventListener('mouseup', handleMouseUp);
      };

      // Controlador de evento 'mousemove'
      const handleMouseMove = (event) => {
        // Calcular el movimiento del mouse en el eje X
        const mouseMovementX = event.clientX - initialMouseX;

        // Calcular el nuevo ancho de la barra lateral
        const newWidth = initialWidth + mouseMovementX;

        // Limitar el ancho mínimo de la barra lateral a 700px
        if (newWidth >= 50) {
          sideBarElement.classList.remove('hidden');
          sideBarElement.style.width = `${newWidth}px`;
        } else {
          sideBarElement.classList.add('hidden');
        }
      };

      // Controlador de evento 'mouseup'
      const handleMouseUp = () => {
        // Eliminar los listeners de los eventos 'mousemove' y 'mouseup'
        this.shadowRoot.removeEventListener('mousemove', handleMouseMove);
        this.shadowRoot.removeEventListener('mouseup', handleMouseUp);
      };

      // Agregar el listener 'mousedown' al elemento resizer
      resizerElement.addEventListener('mousedown', handleMouseDown);

      toggle.addEventListener('click', function () {
        sideBarElement.classList.toggle('hidden');
        console.log('asda');
      });
    };

    // Inicializar el redimensionamiento de la barra lateral
    initializeResizer(resizerElement, sideBarElement);
  }

  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, (event) => console.log(event));

    console.log(globalStyles);
    const leftContent = this.querySelector('[slot="left-content"]');
    console.log('leftContent', leftContent);
    if (leftContent.hasAttribute('hide-left')) {
      this.hideLeftContent();
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue)
    if (name === 'hide-left') {
      console.log('hide-left', newValue);
      if (newValue === null) this.hideLeftContent();
      else this.showLeftContent();
    }
  }

  adoptedCallback() {}
}

window.customElements.define('app-layout', AppLayoutComponent);
