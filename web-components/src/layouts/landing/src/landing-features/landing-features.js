import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../global/web-tools';

import componentHtml from './landing-features.html';
import componentStyle from './landing-features.css';

export default class LandingFeaturesComponent extends HTMLElement {
  static get observedAttributes() {
    return ['data-title', 'data-subtitle'];
  }

  constructor() {
    super();
    const template = html`
      <style>
        ${componentStyle}
      </style>
      ${componentHtml}
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template);
  }

  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, (event) => console.log(event));
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
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#subtitle').textContent = newValue;
    }
  }

  adoptedCallback() {}
}

window.customElements.define('landing-features', LandingFeaturesComponent);
