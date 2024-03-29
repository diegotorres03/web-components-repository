import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../global/web-tools';

import componentHtml from './landing-header.html';
import componentStyle from './landing-header.css';

export default class LandingHeaderComponent extends HTMLElement {
  // Retornar atributos que serán observados (propensos a cambiar)
  static get observedAttributes() {
    return ['data-title', 'data-subtitle', 'data-logo'];
  }

  constructor() {
    super();
    const template = html` <style>
        ${componentStyle}
      </style>
      ${componentHtml}`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template);
  }

  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, (event) => console.log(event));

    const title = this.getAttribute('title');
  }

  disconnectedCallback() {}

  // Solo los atributos que se retornan en 'observedAttributes' serán observados
  attributeChangedCallback(name, oldValue, newValue) {
    // Si el atributo es 'title' y existe un nuevo valor
    if (name === 'data-title' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#title').textContent = newValue;
    } else if (name === 'data-subtitle' && newValue) {
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#subtitle').textContent = newValue;
    } else if (name === 'data-logo' && newValue) {
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#logo').setAttribute('src', newValue);
    }
  }

  adoptedCallback() {}
}

window.customElements.define('landing-header', LandingHeaderComponent);
