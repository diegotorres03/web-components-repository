import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../global/web-tools';

import componentHtml from './landing-hero.html';
import componentStyle from './landing-hero.css';

export default class LandingHeroComponent extends HTMLElement {
  // Retornar atributos que serán observados (propensos a cambiar)
  static get observedAttributes() {
    return ['data-title', 'data-subtitle', 'data-image'];
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
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-title' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#title').textContent = newValue;
    } else if (name === 'data-subtitle' && newValue) {
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#subtitle').textContent = newValue;
    } else if (name === 'data-image' && newValue) {
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#image').setAttribute('src', newValue);
    }
  }

  adoptedCallback() {}
}

window.customElements.define('landing-hero', LandingHeroComponent);
