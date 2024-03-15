import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../../global/web-tools';

import componentHtml from './landing-testimonial-card.html';
import componentStyle from './landing-testimonial-card.css';

export default class LandingTestimonialCard extends HTMLElement {
  static get observedAttributes() {
    return ['data-content', 'data-name', 'data-position', 'data-img'];
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
    // Si el atributo es 'name' y existe un nuevo valor
    if (name === 'data-name' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#name').textContent = newValue;
    } else if (name === 'data-content' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#content').textContent = newValue;
    } else if (name === 'data-position' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#position').textContent = newValue;
    } else if (name === 'data-img' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#img').setAttribute('src', newValue);
    }
  }

  adoptedCallback() {}
}

window.customElements.define(
  'landing-testimonial-card',
  LandingTestimonialCard,
);
