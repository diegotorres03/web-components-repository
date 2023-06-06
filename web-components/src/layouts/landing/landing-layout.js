import { html, registerTriggers } from '../../global/web-tools';

import componentHtml from './landing-layout.html';
import componentStyle from './landing-layout.css';

export default class LandingLayoutComponent extends HTMLElement {
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
    registerTriggers(this, (event) => console.log(event));
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  adoptedCallback() {}
}

window.customElements.define('landing-layout', LandingLayoutComponent);
