import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools';

import componentHtml from './testimonial-card.html';
import componentStyle from './testimonial-card.css';

export default class TestimonialCardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['testimonial', 'name', 'position', 'company'];
  }

  testimonial =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, nulla nemo. Distinctio sequi quidem omnis. Provident, fugit equi quidem nisi!';
  name = 'Jake Hazard';
  position = 'Secret Agent';
  company = 'The Secret Service';

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

  attributeChangedCallback(name, oldValue, newValue) {
    TestimonialCardComponent.observedAttributes.forEach((attrName) => {
      if (name === attrName) {
        this[attrName] = newValue;
      }
    });
  }

  adoptedCallback() {}
}

window.customElements.define('testimonial-card', TestimonialCardComponent);
