import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../../global/web-tools';

import componentHtml from './landing-footer-column.html';
import componentStyle from './landing-footer-column.css';

export default class LandingFooterColumn extends HTMLElement {
  static get observedAttributes() {
    return ['data-title'];
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

    const elements = Array.from(this.querySelectorAll('p'));
    // console.log(':D', elements);

    const listItems = elements.map((element) => {
      const li = document.createElement('li');
      li.appendChild(element);
      // console.log(element.textContent);

      return li;
    });

    listItems.forEach((element) => {
      this.appendChild(element);
    });
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-title' && newValue) {
      // Asignar el nuevo valor al html
      console.log(name, oldValue, newValue);
      this.shadowRoot.querySelector('#title').textContent = newValue;
    }
  }

  adoptedCallback() {}
}

window.customElements.define('landing-footer-column', LandingFooterColumn);
